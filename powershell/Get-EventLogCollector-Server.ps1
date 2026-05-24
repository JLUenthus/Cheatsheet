<#
.SYNOPSIS
    Event Log Collector für Windows Server 2019/2022 – AdminSheet Event Log Analyzer

.DESCRIPTION
    Sammelt relevante Event Logs eines Windows Servers und exportiert sie
    als strukturierte JSON-Datei für den AdminSheet Event Log Analyzer.

    Gesammelte Bereiche:
    - Systemfehler & Dienst-Abstürze
    - Active Directory & Domänen-Fehler
    - DNS & DHCP Probleme
    - RDS / Remote Desktop Services
    - Hyper-V (falls vorhanden)
    - Netzwerk & Clustering
    - Sicherheit & Anmeldungen
    - Backup & VSS Fehler
    - Disk & Speicher Probleme

.PARAMETER Hours
    Zeitraum in Stunden (Standard: 24). Max: 168 (7 Tage)

.PARAMETER OutputPath
    Speicherort der JSON-Datei. Standard: Desktop

.PARAMETER IncludeRoles
    Welche Server-Rollen gesammelt werden sollen.
    Standard: All (AD, DNS, DHCP, RDS, HyperV, IIS, File)

.EXAMPLE
    .\Get-EventLogCollector-Server.ps1
    .\Get-EventLogCollector-Server.ps1 -Hours 48
    .\Get-EventLogCollector-Server.ps1 -Hours 24 -IncludeRoles AD,DNS,RDS

.NOTES
    Autor: AdminSheet
    Version: 1.0
    Benötigt: PowerShell 5.1+, Admin-Rechte
    Kompatibel: Windows Server 2016/2019/2022
#>

param(
    [ValidateRange(1,168)]
    [int]$Hours = 24,
    [string]$OutputPath = "$env:USERPROFILE\Desktop\EventLog_Server_$(Get-Date -Format 'yyyyMMdd_HHmm').json",
    [ValidateSet('All','AD','DNS','DHCP','RDS','HyperV','IIS','File')]
    [string[]]$IncludeRoles = @('All')
)

#Requires -RunAsAdministrator

$ErrorActionPreference = 'SilentlyContinue'
$StartTime = (Get-Date).AddHours(-$Hours)
$Results   = @()
$Summary   = @{ Critical=0; Error=0; Warning=0; Info=0; Total=0 }
$All       = $IncludeRoles -contains 'All'

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   AdminSheet – Event Log Collector (Windows Server)  ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "  Zeitraum: Letzte $Hours Stunden" -ForegroundColor Gray
Write-Host "  Von:      $($StartTime.ToString('dd.MM.yyyy HH:mm'))" -ForegroundColor Gray
Write-Host "  Bis:      $(Get-Date -Format 'dd.MM.yyyy HH:mm')" -ForegroundColor Gray
Write-Host ""

function Collect-Events {
    param($LogName, $IDs, $Level, $Label, $Category)
    Write-Host "  Sammle: $Label..." -ForegroundColor DarkGray -NoNewline
    $filter = @{ LogName = $LogName; StartTime = $StartTime }
    if ($IDs)   { $filter.Id    = $IDs }
    if ($Level) { $filter.Level = $Level }
    $events = Get-WinEvent -FilterHashtable $filter -ErrorAction SilentlyContinue
    if (-not $events) { Write-Host " (keine)" -ForegroundColor DarkGray; return }
    foreach ($e in $events) {
        $lvl = switch ($e.Level) { 1{"Critical"} 2{"Error"} 3{"Warning"} default{"Info"} }
        $Summary[$lvl]++
        $Summary.Total++
        $script:Results += [PSCustomObject]@{
            TimeCreated  = $e.TimeCreated.ToString("yyyy-MM-ddTHH:mm:ss")
            Id           = $e.Id
            Level        = $lvl
            LogName      = $LogName
            ProviderName = $e.ProviderName
            Category     = $Category
            Message      = ($e.Message -replace '\r?\n',' ' -replace '\s+',' ').Substring(0, [Math]::Min(400, ($e.Message -replace '\r?\n',' ' -replace '\s+',' ').Length))
        }
    }
    Write-Host " $($events.Count) Ereignisse" -ForegroundColor Green
}

function Log-LogAvailable { param($LogName)
    return [bool](Get-WinEvent -ListLog $LogName -ErrorAction SilentlyContinue)
}

# ── SYSTEM GRUNDLAGE (immer) ─────────────────────────────
Write-Host "► System & Dienste" -ForegroundColor Yellow
Collect-Events 'System' @(41,6008)               $null   'Ungeplante Neustarts'             'Absturz'
Collect-Events 'System' @(7000,7001,7009,7011,7023,7024,7031,7034,7043) @(1,2,3) 'Dienst-Fehler' 'System'
Collect-Events 'System' @(1,3,6,7,14,15)         @(1,2)  'Kritische Systemfehler'           'System'
Collect-Events 'System' @(55,98,153,157,158,129)  $null   'Disk & Dateisystem Fehler'        'Hardware'
Collect-Events 'System' @(2004,2013,2019,2020)    $null   'Speicher Fehler'                  'System'
Collect-Events 'System' @(9,11,51,52)             $null   'Festplatten I/O Fehler'           'Hardware'
Collect-Events 'Application' @(1000,1001,1002)    @(1,2)  'Anwendungsabsturz'               'Absturz'

# ── NETZWERK (immer) ─────────────────────────────────────
Write-Host "► Netzwerk & Verbindungen" -ForegroundColor Yellow
Collect-Events 'System' @(4199,4200)              $null   'IP-Adress Konflikte'              'Netzwerk'
Collect-Events 'System' @(5719,5722,5723)         $null   'Netlogon / Domänenverbindung'     'Netzwerk'
Collect-Events 'System' @(1014)                   $null   'DNS-Auflösung fehlgeschlagen'     'Netzwerk'

# ── SICHERHEIT (immer) ───────────────────────────────────
Write-Host "► Sicherheit & Anmeldungen" -ForegroundColor Yellow
Collect-Events 'Security' @(4625,4740)            $null   'Fehlgeschlagene Anmeldungen / Kontosperrung' 'Sicherheit'
Collect-Events 'Security' @(4648,4672)            $null   'Privilegierte Anmeldungen'        'Sicherheit'
Collect-Events 'Security' @(4720,4722,4723,4724,4725,4726) $null 'Benutzerkonto-Änderungen' 'Sicherheit'
Collect-Events 'Security' @(4728,4732,4756)       $null   'Gruppenänderungen'                'Sicherheit'
Collect-Events 'Security' @(1102)                 $null   'Audit-Log gelöscht'               'Sicherheit'

# ── ACTIVE DIRECTORY ─────────────────────────────────────
if ($All -or $IncludeRoles -contains 'AD') {
    Write-Host "► Active Directory" -ForegroundColor Yellow
    Collect-Events 'Directory Service' $null @(1,2) 'AD Directory Service Fehler' 'ActiveDirectory'
    Collect-Events 'System' @(5774,5775,5781,5783,5807) $null 'NETLOGON AD Fehler'   'ActiveDirectory'
    if (Log-LogAvailable 'DFS Replication') {
        Collect-Events 'DFS Replication' @(2213,5002,5008,5014) $null 'DFSR Replikation Fehler' 'ActiveDirectory'
    }
}

# ── DNS ──────────────────────────────────────────────────
if ($All -or $IncludeRoles -contains 'DNS') {
    Write-Host "► DNS Server" -ForegroundColor Yellow
    if (Log-LogAvailable 'DNS Server') {
        Collect-Events 'DNS Server' $null @(1,2) 'DNS Server Fehler'               'DNS'
    }
    Collect-Events 'System' @(409,410,708,7062) $null 'DNS Dienst Fehler'          'DNS'
}

# ── DHCP ─────────────────────────────────────────────────
if ($All -or $IncludeRoles -contains 'DHCP') {
    Write-Host "► DHCP Server" -ForegroundColor Yellow
    if (Log-LogAvailable 'Microsoft-Windows-Dhcp-Server/Operational') {
        Collect-Events 'Microsoft-Windows-Dhcp-Server/Operational' @(1020,1063,1064,1065) $null 'DHCP Pool erschöpft / Fehler' 'DHCP'
    }
    Collect-Events 'System' @(1008,1059) $null 'DHCP Dienst Fehler'               'DHCP'
}

# ── RDS / REMOTE DESKTOP ─────────────────────────────────
if ($All -or $IncludeRoles -contains 'RDS') {
    Write-Host "► Remote Desktop Services" -ForegroundColor Yellow
    if (Log-LogAvailable 'Microsoft-Windows-TerminalServices-LocalSessionManager/Operational') {
        Collect-Events 'Microsoft-Windows-TerminalServices-LocalSessionManager/Operational' `
            @(21,22,23,24,25,39,40,41) $null 'RDS Session Events'                'RDS'
    }
    if (Log-LogAvailable 'Microsoft-Windows-TerminalServices-RemoteConnectionManager/Operational') {
        Collect-Events 'Microsoft-Windows-TerminalServices-RemoteConnectionManager/Operational' `
            @(1149,261,263,1158) $null 'RDS Verbindungs-Fehler'                  'RDS'
    }
    Collect-Events 'System' @(1058,1030) $null 'RDS Lizenz / Policy Fehler'       'RDS'
    if (Log-LogAvailable 'Microsoft-Windows-RemoteDesktopServices-RdpCoreTS/Operational') {
        Collect-Events 'Microsoft-Windows-RemoteDesktopServices-RdpCoreTS/Operational' `
            @(70,72,98,131,140) $null 'RDP Core Transport Fehler'                'RDS'
    }
}

# ── HYPER-V ──────────────────────────────────────────────
if ($All -or $IncludeRoles -contains 'HyperV') {
    if (Log-LogAvailable 'Microsoft-Windows-Hyper-V-Worker-Admin') {
        Write-Host "► Hyper-V" -ForegroundColor Yellow
        Collect-Events 'Microsoft-Windows-Hyper-V-Worker-Admin'   $null @(1,2) 'Hyper-V Worker Fehler'    'HyperV'
        Collect-Events 'Microsoft-Windows-Hyper-V-VMMS-Admin'     $null @(1,2) 'Hyper-V VMMS Fehler'      'HyperV'
        Collect-Events 'Microsoft-Windows-Hyper-V-High-Availability-Admin' $null @(1,2) 'Hyper-V HA Fehler' 'HyperV'
    }
}

# ── VSS & BACKUP ─────────────────────────────────────────
Write-Host "► Backup & VSS" -ForegroundColor Yellow
Collect-Events 'Application' @(12289,8193,8194) $null 'VSS Fehler (Schattenkopie)'      'Backup'
Collect-Events 'Application' @(4,19,20,24,97)   $null 'Windows Server Backup Fehler'    'Backup'

# ── IIS ──────────────────────────────────────────────────
if ($All -or $IncludeRoles -contains 'IIS') {
    if (Log-LogAvailable 'System') {
        Write-Host "► IIS & Web" -ForegroundColor Yellow
        Collect-Events 'System'      @(15016)    $null 'IIS Startfehler'                 'IIS'
        Collect-Events 'Application' @(1309,1310) $null 'ASP.NET Fehler'                 'IIS'
    }
}

# ── METADATEN ────────────────────────────────────────────
Write-Host ""
Write-Host "► Systeminformationen sammeln..." -ForegroundColor Yellow

$os    = Get-CimInstance Win32_OperatingSystem
$cs    = Get-CimInstance Win32_ComputerSystem
$proc  = Get-CimInstance Win32_Processor | Select-Object -First 1
$disks = Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" |
         Select-Object DeviceID,
             @{N="Size_GB";E={[math]::Round($_.Size/1GB,1)}},
             @{N="Free_GB";E={[math]::Round($_.FreeSpace/1GB,1)}}

# Rollen erkennen
$roles = @()
if (Get-WindowsFeature AD-Domain-Services  -ErrorAction SilentlyContinue | Where Installed) { $roles += 'ActiveDirectory' }
if (Get-WindowsFeature DNS                 -ErrorAction SilentlyContinue | Where Installed) { $roles += 'DNS' }
if (Get-WindowsFeature DHCP                -ErrorAction SilentlyContinue | Where Installed) { $roles += 'DHCP' }
if (Get-WindowsFeature RDS-RD-Server       -ErrorAction SilentlyContinue | Where Installed) { $roles += 'RemoteDesktop' }
if (Get-WindowsFeature Hyper-V             -ErrorAction SilentlyContinue | Where Installed) { $roles += 'HyperV' }
if (Get-WindowsFeature Web-Server          -ErrorAction SilentlyContinue | Where Installed) { $roles += 'IIS' }
if (Get-WindowsFeature FS-FileServer       -ErrorAction SilentlyContinue | Where Installed) { $roles += 'FileServer' }

$metadata = @{
    ComputerName     = $env:COMPUTERNAME
    CollectedAt      = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss")
    CollectedBy      = $env:USERNAME
    CollectorType    = "WindowsServer"
    CollectorVersion = "1.0"
    HoursCollected   = $Hours
    OS               = "$($os.Caption) Build $($os.BuildNumber)"
    Architecture     = $os.OSArchitecture
    CPU              = $proc.Name
    RAM_GB           = [math]::Round($cs.TotalPhysicalMemory/1GB,1)
    Uptime_Hours     = [math]::Round(((Get-Date) - $os.LastBootUpTime).TotalHours,1)
    LastBoot         = $os.LastBootUpTime.ToString("yyyy-MM-ddTHH:mm:ss")
    Disks            = $disks
    Domain           = $cs.Domain
    DetectedRoles    = $roles
}

# ── EXPORT ───────────────────────────────────────────────
$Output = @{
    Metadata = $metadata
    Summary  = $Summary
    Events   = ($Results | Sort-Object TimeCreated -Descending)
}

$Output | ConvertTo-Json -Depth 10 | Out-File -FilePath $OutputPath -Encoding UTF8

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                  Sammlung abgeschlossen              ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "  Gesamt:        $($Summary.Total) Ereignisse" -ForegroundColor White
Write-Host "  Kritisch:      $($Summary.Critical)"         -ForegroundColor Red
Write-Host "  Fehler:        $($Summary.Error)"            -ForegroundColor Red
Write-Host "  Warnungen:     $($Summary.Warning)"          -ForegroundColor Yellow
Write-Host "  Erkannte Rollen: $($roles -join ', ')"       -ForegroundColor Cyan
Write-Host ""
Write-Host "  Datei gespeichert:" -ForegroundColor Green
Write-Host "  $OutputPath"        -ForegroundColor Cyan
Write-Host ""
Write-Host "  → Jetzt auf AdminSheet hochladen:" -ForegroundColor Gray
Write-Host "    https://jluenthus.github.io/Cheatsheet/eventlog.html" -ForegroundColor Gray
Write-Host ""

explorer.exe /select, $OutputPath
