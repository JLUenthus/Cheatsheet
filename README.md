
# 🛠️ IT Admin Cheatsheet

Eine interaktive Web-Referenz für Windows-, Exchange- und Fortinet-Administratoren.  
Befehle suchen, filtern und per Klick in die Zwischenablage kopieren – plus eine fertige PowerShell-Skript-Bibliothek zum direkten Download.

🔗 **[→ Zur Live-Version](https://jluenthus.github.io/Cheatsheet/)**

---

## 📋 Seiten

| Seite | Beschreibung |
|-------|-------------|
| [`index.html`](index.html) | Windows Admin Cheatsheet – 147 Befehle in 13 Kategorien |
| [`exchange.html`](exchange.html) | Exchange Cheatsheet – On-Premises & Exchange Online (EXO) |
| [`forti.html`](forti.html) | Fortinet Cheatsheet – FortiGate, FortiManager, FortiAnalyzer |
| [`scripts.html`](scripts.html) | PowerShell Script-Bibliothek – fertige Skripte zum Download |
| [`mitmachen.html`](mitmachen.html) | Befehle, Scripts & Ideen per Outlook einreichen |
| [`powershell/`](powershell/) | Ordner mit allen `.ps1` Skript-Dateien |

---

## ⚡ Windows Admin Cheatsheet (`index.html`)

**147 Befehle** in 13 Kategorien mit Beschreibung, Kontext-Tags, Live-Suche und Kategorie-Filter.

| Kategorie | Inhalt |
|-----------|--------|
| 🖥️ MMC-Konsolen | compmgmt, diskmgmt, devmgmt, gpedit, secpol, certlm ... |
| 📊 Systeminformationen | systeminfo, msinfo32, dsregcmd, winver, slmgr, resmon |
| 🌐 Netzwerk & Netzlaufwerke | ipconfig, netstat, net use, netsh, tracert, nslookup |
| ⚡ PowerShell | Execution Policy, Get-Process, Invoke-Command, PSSession |
| 👥 Benutzer & Gruppen | net user, net localgroup, whoami, query user |
| 💾 Datenträger & Reparatur | chkdsk, sfc, DISM, reagentc, rstrui |
| ⚙️ Prozesse & Dienste | taskkill, tasklist, sc, Get-Service |
| 🔗 Remote & Support | mstsc, quickassist, WinRM, Enable-PSRemoting |
| 🛡️ GPO & Richtlinien | gpupdate, gpresult, secpol |
| 📋 Event Logs & Diagnose | Get-WinEvent, Absturz-Events, CSV-Export, Memory-Fehler |
| 🏢 Active Directory | Get-ADUser, Passwort reset, Konto sperren, AD-Sync |
| 🖨️ Drucker & Spooler | Spooler reset, Get-Printer, TCP/IP Ports, Druckjobs |
| 🚀 Schnellbefehle | shell:startup, regedit, appwiz.cpl, optionalfeatures |

---

## 📧 Exchange Cheatsheet (`exchange.html`)

CLI-Referenz für Exchange On-Premises (2016/2019) und Exchange Online, mit Produkt-Switcher.

**On-Premises (6 Kategorien):**
- Verbinden & Session, Postfächer, Message Tracking, Berechtigungen, Migration & Hybrid, Diagnose

**Exchange Online / EXO (6 Kategorien):**
- Verbinden, Postfächer, Berechtigungen, Nachrichtenfluss, Compliance, Verteilergruppen

---

## 🔥 Fortinet Cheatsheet (`forti.html`)

CLI-Referenz für Fortinet-Produkte mit Produkt-Filter (FG / FMG / FAZ) und Live-Suche.

| Produkt | Kategorien |
|---------|-----------|
| FortiGate | Grundbefehle, Netzwerk/Interfaces, Firewall-Policy, VPN (IPSec + SSL), Debug Flow, Logs, Benutzer & Auth |
| FortiManager | Grundbefehle, Policy & Deployment, Diagnose |
| FortiAnalyzer | Grundbefehle, Logs & Diagnose |

> Kompatibel mit FortiOS 7.x / 6.4 und FortiManager/FortiAnalyzer 7.x

---

## 💚 PowerShell Script-Bibliothek (`scripts.html`)

Fertige, dokumentierte PowerShell-Skripte mit Direkt-Download, Code-Vorschau und Verwendungsbeispielen.

| Skript | Kategorie | Beschreibung |
|--------|-----------|-------------|
| [`Get-SystemInventory.ps1`](powershell/Get-SystemInventory.ps1) | Systeminfo | HTML-Report mit CPU, RAM, Disk, Software, Updates |
| [`Get-LocalAdmins.ps1`](powershell/Get-LocalAdmins.ps1) | Benutzer & AD | Lokale Administratoren lokal & remote auslesen |
| [`Test-NetworkConnectivity.ps1`](powershell/Test-NetworkConnectivity.ps1) | Netzwerk | Ping & Port-Tests für anpassbare Zielliste |
| [`Get-InstalledSoftware.ps1`](powershell/Get-InstalledSoftware.ps1) | Software | Software-Inventar mit Filter, CSV & HTML-Export |

---

## 🤝 Mitmachen (`mitmachen.html`)

Kollegen können direkt Befehle, Scripts und Ideen einreichen – ohne GitHub-Account:

- **Win-Befehl** – Titel, Befehl, Kategorie, Beschreibung, Tags
- **Forti-Befehl** – Produkt (FG/FMG/FAZ), Kategorie, Befehl, Tags
- **PS Script** – Name, Code, Verwendungsbeispiele, Parameter
- **Idee** – Freiform-Vorschlag für neue Features oder Kategorien

Beim Absenden öffnet sich Outlook mit einer fertig formatierter Mail inkl. Copy-Paste-Code.  
**Wichtig:** In `mitmachen.html` die eigene E-Mail-Adresse eintragen:
```javascript
const MAIL_TO = 'deine@email.de';
```

---

## 🚀 GitHub Pages einrichten

1. Repo auf GitHub erstellen (z.B. `it-admin-cheatsheet`)
2. Alle Dateien hochladen – **Struktur beibehalten:**

```
index.html
exchange.html
forti.html
scripts.html
mitmachen.html
README.md
powershell/
  Get-SystemInventory.ps1
  Get-LocalAdmins.ps1
  Test-NetworkConnectivity.ps1
  Get-InstalledSoftware.ps1
```

3. **Settings → Pages → Branch: `main` → `/` (root) → Save**
4. Nach ~1 Minute erreichbar unter `https://DEINNAME.github.io/REPO-NAME`
5. Den Link ganz oben in dieser README anpassen

---

## 🔧 Lokal testen

Der Code-Viewer in `scripts.html` benötigt einen lokalen Webserver (`file://` wird vom Browser blockiert):

```powershell
# Python
python -m http.server 8080

# Node.js
npx serve .
```

Dann im Browser: `http://localhost:8080`

---

## ➕ Eigene Befehle hinzufügen

**Windows-Befehl** in `index.html` → SECTIONS-Array:
```javascript
{ name: 'Befehlsname',
  cmd: 'der-befehl',
  desc: 'Beschreibung was der Befehl macht.',
  tags: ['admin', 'info'] },
```

**Forti-Befehl** in `forti.html` → SECTIONS-Array, passende Section (`id: 'fg-diag'` etc.):
```javascript
{ name: 'Befehlsname',
  cmd: 'diagnose ...',
  desc: 'Beschreibung.',
  tags: ['fg', 'cli', 'diag'] },
```

**PS Script** in `scripts.html` → SCRIPTS-Array:
```javascript
{
  id: 'mein-skript',
  title: 'Mein-Skript',
  file: 'powershell/Mein-Skript.ps1',
  category: 'system',          // system | benutzer | netzwerk | software
  icon: '🔧',
  iconBg: 'rgba(124,140,248,.12)',
  subtitle: 'Kurzbeschreibung',
  desc: 'Ausführliche Beschreibung.',
  tags: ['system'],
  usage: [
    { label: 'Standard', cmd: '.\\Mein-Skript.ps1' },
  ],
  params: [
    { name: '-Parameter', desc: 'Beschreibung.' },
  ],
  requirements: 'PowerShell 5.1+, Admin-Rechte',
},
```

---

## 📄 Lizenz

Frei verwendbar für private und kommerzielle Zwecke.  
Kein Gewähr für die Korrektheit der Befehle – immer in einer Testumgebung prüfen.
