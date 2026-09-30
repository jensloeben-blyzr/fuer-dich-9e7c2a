# DateBloom für Nancy

Persönliche, deutschsprachige Date-Einladung nach der Video-Vorlage: sechs Schritte, spielerisch ausweichender Nein-Button, Datum/Uhrzeit, Essenswahl und ein scherzhafter Date-Vertrag ohne Zahlung.

## Starten und prüfen

- Vorschau: `python3 -m http.server 8764 --bind 127.0.0.1`
- Gesamte Testsuite: `node --test app.test.cjs`
- Browserprüfung: Einladung öffnen → Ja → Datum/Uhrzeit → Essen → Date-Vertrag → Bestätigung. Gewählten Termin und Essen in der WhatsApp-URL kontrollieren. Zurücknavigation und Tastatur-Nein sind unterstützt.

## Antworten

Keine Datenbank, kein Tracking, keine automatische Nachricht. Nancy verschickt die vorbereitete Antwort selbst über WhatsApp oder kopiert sie. Im WhatsApp-Empfängerdialog muss sie Jens auswählen. Die Auswahl bleibt nur im aktuellen Tab und wird beim Neuladen zurückgesetzt.

## Veröffentlichung

Statische Dateien auf GitHub Pages, ohne laufenden lokalen Server. Keine Zugangssperre: Wer den Link kennt, kann die Seite öffnen. Suchmaschinen werden per `noindex` um Nichtaufnahme gebeten; das ist kein Zugriffsschutz. Das Referenzvideo wird nicht hochgeladen.

## Änderungen · 2026-09-30

- Persönliche Einladung für Nancy und Jens erstellt; Datum und Uhrzeit werden auf zukünftige, tatsächlich existierende lokale Termine geprüft.
- Handy-Layout, Tastaturbedienung, reduzierte Animationen und manuelles Kopieren bei gesperrter Zwischenablage berücksichtigt.
- Abholen-Uhrzeit und Date-Vertrag übernehmen Nancys Auswahl, nicht die festen Beispielwerte aus dem Video.
- Copy näher an den englischen Humor der Vorlage gebracht: Korb kassieren, Date-Night-Vibe, selbstironisches „no big deal“ und eine kleine Portion Schmetterlinge; Ablauf unverändert.
