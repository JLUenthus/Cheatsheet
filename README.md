# 🛠️ IT Admin Cheatsheet

Eine interaktive Web-Referenz für Windows- und Fortinet-Administratoren.  
Befehle suchen, filtern und per Klick in die Zwischenablage kopieren – plus eine fertige PowerShell-Skript-Bibliothek zum direkten Download.

🔗 **[→ Zur Live-Version](https://jluenthus.github.io/Cheatsheet/)**

---

## 📋 Inhalt

| Seite | Beschreibung |
|-------|-------------|
| [`index.html`](index.html) | Windows Admin Cheatsheet – MSC-Konsolen, Netzwerk, PowerShell, GPO, Remote & mehr |
| [`forti.html`](forti.html) | Fortinet Cheatsheet – FortiGate, FortiManager, FortiAnalyzer CLI-Befehle |
| [`mitmachen.html`](mitmachen.html) | Formular zum Einreichen von Befehlen, Scripts & Ideen per Outlook |
| [`scripts.html`](scripts.html) | PowerShell Script-Bibliothek – fertige Skripte zum Download |
| [`mitmachen.html
powershell/`](powershell/) | Ordner mit allen `.ps1` Skript-Dateien |

---

## ⚡ Windows Admin Cheatsheet (`index.html`)

Über **100 Befehle** in 10 Kategorien mit Beschreibung und Kontext-Tags.

**Kategorien:**
- 🖥️ MMC-Konsolen (.msc)
- 📊 Systeminformationen
- 🌐 Netzwerk & Netzlaufwerke (`net use`, `netsh`, `ipconfig` ...)
- ⚡ PowerShell
- 👥 Benutzer & Gruppen
- 💾 Datenträger & Reparatur (DISM, SFC, chkdsk)
- ⚙️ Prozesse & Dienste
- 🔗 Remote & Support
- 🛡️ GPO & Richtlinien
- 🚀 Schnellbefehle

---

## 🔥 Fortinet Cheatsheet (`forti.html`)

CLI-Referenz für Fortinet-Produkte mit Produkt-Filter und Live-Suche.

**Produkte:**
- **FortiGate** – Grundbefehle, Netzwerk/Interfaces, Firewall-Policy, VPN (IPSec + SSL), Debug Flow, Logs, Benutzer & Auth
- **FortiManager** – Grundbefehle, Policy & Deployment, Diagnose
- **FortiAnalyzer** – Grundbefehle, Logs & Diagnose

> Kompatibel mit FortiOS 7.x / 6.4 und FortiManager/FortiAnalyzer 7.x

---

## 💚 PowerShell Script-Bibliothek (`scripts.html`)

Fertige, dokumentierte PowerShell-Skripte mit Direkt-Download.

| Skript | Kategorie | Beschreibung |
|--------|-----------|-------------|
| [`Get-SystemInventory.ps1`](mitmachen.html
powershell/Get-SystemInventory.ps1) | Systeminfo | HTML-Report mit CPU, RAM, Disk, Software, Updates |
| [`Get-LocalAdmins.ps1`](mitmachen.html
powershell/Get-LocalAdmins.ps1) | Benutzer & AD | Lokale Administratoren lokal & remote auslesen |
| [`Test-NetworkConnectivity.ps1`](mitmachen.html
powershell/Test-NetworkConnectivity.ps1) | Netzwerk | Ping & Port-Tests für anpassbare Zielliste |
| [`Get-InstalledSoftware.ps1`](mitmachen.html
powershell/Get-InstalledSoftware.ps1) | Software | Software-Inventar mit Filter, CSV & HTML-Export |

---

## 🚀 GitHub Pages einrichten

1. Repo auf GitHub erstellen (z.B. `it-admin-cheatsheet`)
2. Alle Dateien hochladen – **Struktur beibehalten:**
```
index.html
forti.html
scripts.html
README.md
mitmachen.html
powershell/
  Get-SystemInventory.ps1
  Get-LocalAdmins.ps1
  Test-NetworkConnectivity.ps1
  Get-InstalledSoftware.ps1
```
3. **Settings → Pages → Branch: `main` → `/` (root) → Save**
4. Nach ~1 Minute erreichbar unter:  
   `https://DEINNAME.github.io/REPO-NAME`

> 💡 Den Link oben in dieser README anpassen nach dem Deployen.

---

## 🔧 Lokal testen (Code-Viewer)

Der Code-Viewer in `scripts.html` benötigt einen lokalen Webserver (kein `file://`):

```powershell
# Python
python -m http.server 8080

# Node.js
npx serve .
```

Dann im Browser öffnen: `http://localhost:8080`

---

## ➕ Eigene Skripte hinzufügen

1. `.ps1`-Datei in den Ordner `mitmachen.html
powershell/` legen
2. In `scripts.html` das `SCRIPTS`-Array um einen Eintrag erweitern:

```javascript
{
  id: 'mein-skript',
  title: 'Mein-Skript',
  file: 'mitmachen.html
powershell/Mein-Skript.ps1',
  category: 'system',          // system | benutzer | netzwerk | software
  icon: '🔧',
  iconBg: 'rgba(124,140,248,.12)',
  subtitle: 'Kurzbeschreibung',
  desc: 'Ausführliche Beschreibung was das Skript macht.',
  tags: ['system', 'export'],
  usage: [
    { label: 'Standard', cmd: '.\\Mein-Skript.ps1' },
    { label: 'Mit Parameter', cmd: '.\\Mein-Skript.ps1 -Parameter "Wert"' },
  ],
  params: [
    { name: '-Parameter', desc: 'Beschreibung des Parameters.' },
  ],
  requirements: 'PowerShell 5.1+, Admin-Rechte',
},
```

---

## 🤝 Mitmachen

Weitere Befehle, Skripte oder Korrekturen? Pull Requests sind willkommen!  
Einfach einen Issue öffnen oder direkt einen PR erstellen.

---

## 📄 Lizenz

Frei verwendbar für private und kommerzielle Zwecke.  
Kein Gewähr für die Korrektheit der Befehle – immer in einer Testumgebung prüfen.
