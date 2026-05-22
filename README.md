
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
| [`mitmachen.html`](mitmachen.html) | Befehle einreichen, Offline-Download & PWA-Info |
| [`powershell/`](powershell/) | Alle `.ps1` Skript-Dateien |
 
---
 
## ⚡ Windows Admin Cheatsheet (`index.html`)
 
**147 Befehle** in 13 Kategorien mit Beschreibung, Tags, Live-Suche und Kategorie-Filter.
 
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
 
On-Premises (2016/2019) und Exchange Online mit Produkt-Switcher und Live-Suche.
 
**On-Premises:** Verbinden, Postfächer, Message Tracking, Berechtigungen, Migration & Hybrid, Diagnose  
**Exchange Online:** Verbinden, Postfächer, Berechtigungen, Nachrichtenfluss, Compliance, Verteilergruppen
 
---
 
## 🔥 Fortinet Cheatsheet (`forti.html`)
 
CLI-Referenz für FortiGate, FortiManager und FortiAnalyzer mit Produkt-Filter.
 
> Kompatibel mit FortiOS 7.x / 6.4 und FortiManager/FortiAnalyzer 7.x
 
---
 
## 💚 PowerShell Script-Bibliothek (`scripts.html`)
 
Fertige, dokumentierte Skripte mit Direkt-Download, Code-Vorschau und Verwendungsbeispielen.  
`Set-PowerPlan-Win11` hat einen interaktiven Block-Konfigurator – einzelne Blöcke ein-/ausschalten und Script live generieren.
 
| Skript | Kategorie |
|--------|-----------|
| `Get-SystemInventory.ps1` | Systeminfo – HTML-Report mit CPU, RAM, Disk, Software, Updates |
| `Get-LocalAdmins.ps1` | Benutzer – Lokale Admins lokal & remote auslesen |
| `Test-NetworkConnectivity.ps1` | Netzwerk – Ping & Port-Tests für anpassbare Zielliste |
| `Get-InstalledSoftware.ps1` | Software – Inventar mit Filter, CSV & HTML-Export |
| `Set-PowerPlan-Win11.ps1` | System – Energieprofil & Netzwerk-Einstellungen konfigurieren |
 
---
 
## 🤝 Mitmachen (`mitmachen.html`)
 
Kollegen können direkt Befehle, Scripts und Ideen einreichen – öffnet fertig formatierte Outlook-Mail.
 
- **Win-Befehl / Forti-Befehl** – Titel, Befehl, Kategorie, Beschreibung, Tags
- **PS Script** – Name, Code, Verwendungsbeispiele, Parameter  
- **Idee** – Freiform-Vorschlag
**Wichtig:** In `mitmachen.html` die eigene E-Mail-Adresse eintragen:
```javascript
const MAIL_TO = 'deine@email.de';
```
 
Außerdem auf dieser Seite: ZIP-Download der gesamten Offline-Version und PWA-Installationshinweise.
 
---
 
## 📱 PWA & Offline-Nutzung
 
Das Cheatsheet ist als **Progressive Web App (PWA)** eingerichtet:
 
- Beim ersten Aufruf cached der Service Worker (`sw.js`) alle Seiten und Skripte automatisch
- Danach funktioniert alles **ohne Internet**
- In Chrome/Edge erscheint ein „App installieren" Button in der Adressleiste
### ZIP-Download
 
Auf `mitmachen.html` gibt es einen **ZIP-Download** Button – lädt alle HTML, JS und PS1-Dateien herunter. Entpacken und `index.html` im Browser öffnen.
 
> **Hinweis:** Der Code-Viewer in `scripts.html` benötigt einen lokalen Webserver (kein `file://`):
> ```powershell
> python -m http.server 8080   # oder: npx serve .
> ```
 
---
 
## 🔄 Updates deployen
 
Wenn du Änderungen auf GitHub pushst, müssen Nutzer mit gecachter Version benachrichtigt werden.
 
**Schritt 1:** In `sw.js` die Versionsnummer aktualisieren:
```js
// Vorher:
const CACHE_VERSION = '20260522-1307';
 
// Nachher (aktuelles Datum/Uhrzeit):
const CACHE_VERSION = '20260523-0900';
```
 
**Was dann passiert:**
1. Browser erkennt dass `sw.js` sich geändert hat
2. Neuer Service Worker wird im Hintergrund installiert
3. Beim nächsten Besuch erscheint automatisch ein grüner Banner: **„Neue Version verfügbar!"**
4. Nutzer klickt **„Jetzt aktualisieren"** → Seite lädt neu mit frischen Inhalten
5. Wer den Banner ignoriert, bekommt die neue Version beim übernächsten Besuch automatisch
> **Tipp:** Einfach merken – nach jedem Push `sw.js` öffnen und die Uhrzeit in `CACHE_VERSION` anpassen. Das ist alles.
 
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
nav.js
sw.js
manifest.json
README.md
powershell/
  Get-SystemInventory.ps1
  Get-LocalAdmins.ps1
  Test-NetworkConnectivity.ps1
  Get-InstalledSoftware.ps1
  Set-PowerPlan-Win11.ps1
```
 
3. **Settings → Pages → Branch: `main` → `/` (root) → Save**
4. Nach ~1 Minute erreichbar unter `https://DEINNAME.github.io/REPO-NAME`
5. Link oben in dieser README anpassen
6. In `mitmachen.html` die E-Mail-Adresse für Einreichungen eintragen
---
 
## ➕ Eigene Befehle hinzufügen
 
**Windows** in `index.html` → SECTIONS-Array:
```javascript
{ name: 'Befehlsname', cmd: 'der-befehl', desc: 'Beschreibung.', tags: ['admin'] },
```
 
**Fortinet** in `forti.html` → passende Section (`id: 'fg-diag'` etc.):
```javascript
{ name: 'Befehlsname', cmd: 'diagnose ...', desc: 'Beschreibung.', tags: ['fg','cli'] },
```
 
**PS Script** in `scripts.html` → SCRIPTS-Array:
```javascript
{
  id: 'mein-skript',
  title: 'Mein-Skript',
  file: 'powershell/Mein-Skript.ps1',
  category: 'system',   // system | benutzer | netzwerk | software
  icon: '🔧',
  iconBg: 'rgba(124,140,248,.12)',
  subtitle: 'Kurzbeschreibung',
  desc: 'Ausführliche Beschreibung.',
  tags: ['system'],
  usage: [{ label: 'Standard', cmd: '.\\Mein-Skript.ps1' }],
  params: [{ name: '-Parameter', desc: 'Beschreibung.' }],
  requirements: 'PowerShell 5.1+, Admin-Rechte',
},
```
 
---
 
## 🧭 Navigation
 
Alle Seiten haben:
- **Logo-Dropdown** – Klick aufs Logo öffnet Seiten-Auswahl
- **Tab-Leiste** – direkt unter dem Header für schnellen Seitenwechsel
- **`Strg+K`** – Suchfeld fokussieren, `Escape` leert und schließt
- **↑ Scroll-Button** – erscheint nach 300px, bringt zurück nach oben
---
 
## 📄 Lizenz
 
Frei verwendbar für private und kommerzielle Zwecke.  
Kein Gewähr für die Korrektheit der Befehle – immer in einer Testumgebung prüfen.
