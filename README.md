# Cral Champions

**Cral Champions** è un sito statico per visualizzare e gestire classifiche, calendario, risultati, statistiche, squadre, riepiloghi giornata e schede giocatore di un torneo CRAL Champions.

Il progetto è pensato per funzionare sia in locale sia pubblicato su GitHub Pages.  
I dati vengono letti da file CSV e le immagini da cartelle locali del progetto.

---

## Funzionalità principali

- Home riepilogativa con:
  - numero squadre;
  - numero giocatori;
  - partite disputate;
  - stato aggiornamento dati a giornata `X/Y`;
  - grafico top marcatori;
  - grafico punti squadre;
  - grafico andamento squadre con proiezione finale.
- Scheda **Classifiche**:
  - classifica squadre;
  - classifica marcatori;
  - classifica MVP;
  - classifica portieri.
- Scheda **Statistiche**:
  - media gol per partita dei giocatori.
- Scheda **Squadre**:
  - elenco squadre;
  - elenco giocatori per squadra;
  - foto giocatori;
  - loghi squadre;
  - ruolo giocatore;
  - evidenza del capitano con fascia `C`.
- Scheda **Calendario**:
  - calendario tabellare;
  - calendario a blocchi per giornata;
  - gestione squadre a riposo.
- Scheda **Risultati**:
  - partite giocate con loghi squadre e risultato.
- Scheda **Riepilogo giornate**:
  - filtro per giornata;
  - partite della giornata;
  - marcatori;
  - MVP della giornata;
  - miglior portiere;
  - autogol;
  - statistiche di giornata.
- Scheda dettaglio giocatore al click sul nome.
- Scheda dettaglio portiere con logica dedicata.
- Ricerca globale per squadra, giocatore o partita.
- Tema chiaro/scuro con salvataggio della preferenza.
- Ordinamento cliccabile delle colonne nelle tabelle.
- Stampa / esportazione PDF.
- Caricamento automatico da CSV.
- Caricamento manuale di una cartella locale con CSV e immagini.

---

## Struttura consigliata del progetto

```text
CralChampions/
├── index.html
├── README.md
├── manifest.csv
├── config.csv
├── classifica_squadre.csv
├── classifica_marcatori.csv
├── classifica_mvp.csv
├── classifica_portieri.csv
├── risultati_partite.csv
├── calendario.csv
├── riepilogo_giornate.csv
└── immagini/
    ├── logo_cral.png
    ├── squadre/
    │   ├── blackjack.png
    │   └── ...
    └── giocatori/
        ├── saracinogianvito.png
        └── ...
```

I file CSV possono stare nella root del repository oppure nella cartella `data/`.  
Il codice prova prima a caricare da `data/` e poi dalla root.

---

## Avvio del progetto

Il progetto è completamente statico.

Puoi aprire direttamente `index.html` nel browser, ma per un funzionamento più stabile del caricamento CSV è consigliato usare un server locale.

Esempio con Python:

```bash
python -m http.server 8000
```

Poi apri:

```text
http://localhost:8000
```

---

## File CSV riconosciuti automaticamente

| File | Uso |
|---|---|
| `config.csv` | Titolo e sottotitolo del sito |
| `manifest.csv` | Elenco dei CSV da caricare automaticamente |
| `classifica_squadre.csv` | Classifica generale squadre |
| `classifica_marcatori.csv` | Classifica marcatori |
| `classifica_mvp.csv` | Classifica MVP |
| `classifica_portieri.csv` | Classifica portieri |
| `risultati_partite.csv` / `risultati.csv` / `partite.csv` | Risultati partite |
| `calendario.csv` / `calendario_andata_ritorno.csv` | Calendario |
| `riepilogo_giornate.csv` | Riepilogo giornate |
| `squadra_NomeSquadra.csv` | Rosa di una singola squadra |

Sono riconosciuti anche file riepilogo separati per giornata, ad esempio:

```text
giornata_1.csv
riepilogo_giornata_1.csv
referto_giornata_1.csv
```

---

## Manifest

Il file `manifest.csv` indica quali CSV caricare.

Esempio:

```csv
file
config.csv
classifica_squadre.csv
classifica_marcatori.csv
classifica_mvp.csv
classifica_portieri.csv
risultati_partite.csv
calendario.csv
riepilogo_giornate.csv
squadra_BlackJack.csv
squadra_Red Lions.csv
```

I file di riepilogo possono essere già presenti nel manifest anche se non esistono ancora perché il torneo è in corso. L'interfaccia non mostra alert bloccanti per i riepiloghi mancanti.

---

## Configurazione sito

Il file `config.csv` può contenere titolo e sottotitolo.

Esempio:

```csv
chiave;valore
titolo;Cral Champions
sottotitolo;Classifiche, calendario, risultati e statistiche giocatori
```

Puoi cambiare titolo e sottotitolo senza modificare il codice HTML.

---

## Classifica squadre

Esempio:

```csv
Posizione;Squadra;PG;V;N;P;GF;GS;DR;Punti
1;BlackJack;3;3;0;0;12;5;7;9
```

Il nome squadra viene usato per:

- tabella classifica;
- grafico punti squadre;
- grafico andamento squadre;
- associazione del logo;
- scheda dettaglio giocatore.

Nel grafico andamento squadre i nomi vengono presi dalla classifica senza alterazioni automatiche.  
Ad esempio `BlackJack` resta `BlackJack`.

---

## Classifica marcatori

Esempio:

```csv
Posizione;Giocatore;Squadra;Gol
1;Saracino Gianvito;BlackJack;6
```

Sono riconosciute intestazioni equivalenti come:

```text
Gol
Goal
Reti
Giocatore
Calciatore
Player
```

---

## Classifica MVP

Esempio:

```csv
Posizione;Giocatore;Squadra;Punti MVP
1;Bianchi Luca;Real Cral;8
```

Sono riconosciute intestazioni equivalenti come:

```text
MVP
Punti MVP
Punti
Giocatore
Player
```

---

## Classifica portieri

Esempio:

```csv
Posizione;Portiere;Squadra;Punti
1;Verdi Marco;BlackJack;7
```

Sono riconosciute intestazioni equivalenti come:

```text
Portiere
Giocatore
Player
Punti
Punti PT
Miglior portiere
```

---

## CSV squadre

Ogni squadra può avere un file dedicato con nome:

```text
squadra_NomeSquadra.csv
```

Esempio:

```csv
Cognome;Nome;Ruolo;Numero;Capitano
Rossi;Mario;Attaccante;10;Sì
Bianchi;Luca;Portiere;1;
Verdi;Marco;Centrocampista;8;
```

Il sito prova a riconoscere automaticamente:

- nome;
- cognome;
- nome completo;
- ruolo;
- numero;
- capitano.

Il capitano viene evidenziato con una fascia gialla `C`.

---

## Ruoli giocatore

I ruoli vengono normalizzati per evitare doppioni o sigle ripetute.

Esempi:

```text
P / PT / Portiere        → 🧤 Portiere
C / CC / Centrocampista  → 🧠 Centrocampista
A / ATT / Attaccante     → 💣 Attaccante
D / Difensore            → Difensore
```

Nella scheda giocatore viene mostrato il badge ruolo in alto accanto alla squadra, senza ripetizioni tipo `A · A`, `C · C` o `P · P`.

---

## Scheda dettaglio giocatore

Cliccando sul nome di un giocatore si apre una scheda premium in stile Champions, ottimizzata per desktop e mobile.

La scheda mostra:

- foto giocatore;
- nome;
- logo e nome squadra;
- ruolo;
- totale gol;
- dettaglio gol per giornata;
- totale punti MVP;
- dettaglio **MVP della giornata**;
- informazioni collegate ai CSV disponibili.

### Gol per giornata

La scheda usa i riepiloghi giornata per ricostruire i gol segnati.

Se nei riepiloghi sono presenti righe di tipo `Totale marcatore giornata`, queste vengono usate per evitare sottoconteggi.  
Esempio: se un giocatore ha segnato 3 gol nella giornata 1, la scheda mostra correttamente `Giornata 1 — 3`.

---

## Scheda dettaglio portiere

Per i portieri la scheda usa una logica dedicata.

Mostra:

- foto portiere;
- nome;
- logo e nome squadra;
- badge `🧤 Portiere`;
- gol subiti dalla squadra;
- giornate in cui ha ottenuto il riconoscimento di miglior portiere;
- punti ricevuti come miglior portiere;
- eventuali gol segnati, solo se presenti.

Per i portieri non vengono mostrati:

- punti MVP;
- scheda MVP della giornata.

La sezione **Miglior portiere** mostra le giornate in cui il portiere è stato premiato.

---

## Riepilogo giornate

La scheda **Riepilogo giornate** supporta sia un CSV unico sia file separati per giornata.

Sono supportate sezioni come:

```text
Partita
Marcatore
Totale marcatore giornata
MVP
Miglior portiere
Autogol
Statistica
```

Le sezioni principali vengono mostrate con questo ordine prioritario:

### Marcatori della giornata

```text
Sezione
Giocatore
Gol / Goal / Reti
```

### MVP della giornata

```text
Sezione
Giocatore
Punti
```

### Miglior portiere

```text
Sezione
Giocatore / Portiere
Punti
```

Le righe `Riposa X` non vengono mostrate nei riepiloghi giornata, perché le squadre a riposo sono già indicate nel calendario.

---

## Calendario

Sono supportati due formati.

### Formato tabellare

```csv
Giornata;Squadra casa;Squadra trasferta;Data;Note
1;BlackJack;Red Lions;AAAA-MM-GG;
```

### Formato a blocchi

```csv
GIORNATA 1;;
Casa;Trasferta;Note
BlackJack;Red Lions;
Green Foxes;Yellow Bears;
;;Riposa: Blue Tigers
```

Il formato a blocchi è utile per calendari divisi per giornata e per gestire squadre a riposo.

---

## Risultati

Esempio con colonne gol:

```csv
Giornata;Squadra casa;Squadra trasferta;Gol casa;Gol trasferta;Note
1;BlackJack;Red Lions;3;2;
```

Esempio con colonna risultato:

```csv
Giornata;Squadra casa;Squadra trasferta;Risultato
1;BlackJack;Red Lions;3 - 2
```

---

## Grafici Home

La Home include tre grafici principali.

### Top marcatori

Mostra i migliori marcatori del torneo.

### Punti squadre

Mostra i punti attuali delle squadre.

### Andamento squadre con proiezione finale

Mostra l'andamento delle squadre giornata per giornata e una proiezione verso la fine del campionato.

Il grafico usa:

- nomi squadra presi dalla classifica;
- colori derivati dai loghi squadra;
- colori secondari quando il colore principale è troppo simile a quello di un'altra squadra;
- colori alternativi ad alto contrasto se i colori del logo non sono abbastanza distinguibili.

L'obiettivo è mantenere una logica visiva legata all'identità delle squadre senza perdere leggibilità.

---

## Immagini

Sono supportati questi formati:

```text
png, jpg, jpeg, webp, gif, svg
```

Cartelle consigliate:

```text
immagini/squadre/
immagini/giocatori/
```

Esempi:

```text
immagini/squadre/blackjack.png
immagini/giocatori/saracinogianvito.png
```

Il nome file viene normalizzato per facilitare l'associazione tra CSV e immagini.

Se un'immagine non viene trovata, il sito mostra automaticamente iniziali o fallback grafico.

---

## Ricerca e ordinamento

La barra di ricerca filtra la sezione attiva.

La ricerca funziona su:

- squadre;
- giocatori;
- partite;
- valori contenuti nei CSV.

Per i giocatori, il codice prova ad allineare nome e cognome anche quando i CSV usano formati diversi:

```text
Nome Cognome
Cognome Nome
solo Nome
solo Cognome
```

Quando il filtro viene riconosciuto come ricerca giocatore:

- in **Squadre** viene mostrata solo la squadra del giocatore;
- in **Classifiche** viene nascosta la classifica squadre;
- in **Classifiche** restano solo le classifiche in cui il giocatore è presente;
- in **Riepilogo giornate** restano solo i dati relativi al giocatore;
- le sezioni vuote non pertinenti vengono nascoste.

Le tabelle sono ordinabili cliccando sulle intestazioni.

---

## Tema scuro

Il pulsante luna/sole permette di cambiare tema.  
La scelta viene salvata nel browser tramite `localStorage`.

---

## Dipendenze

Il progetto usa Chart.js caricato da CDN:

```text
https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js
```

Se Chart.js non viene caricato, il sito continua a funzionare ma i grafici non vengono mostrati.

---

## Pubblicazione su GitHub Pages

Per pubblicare il progetto:

1. Caricare `index.html`, CSV, README e cartelle immagini nel repository GitHub.
2. Aprire il repository su GitHub.
3. Andare in **Settings > Pages**.
4. Selezionare il branch, di solito `main`.
5. Selezionare la cartella `/root` se i file sono nella root del repository.
6. Salvare.

L'URL avrà una forma simile a:

```text
https://nomeutente.github.io/nome-repository/
```

Per usare un URL personalizzato serve configurare un dominio custom su GitHub Pages.

---

## Riutilizzo per tornei futuri

Per usare lo stesso progetto in un nuovo torneo basta aggiornare:

- CSV;
- immagini squadre;
- immagini giocatori;
- `manifest.csv`;
- `config.csv`, se vuoi cambiare titolo o sottotitolo.

Il file `index.html` può rimanere lo stesso, purché i nomi dei file e delle colonne restino compatibili con quelli descritti in questo README.

---

## Note tecniche

- Il sito è completamente statico.
- Non richiede backend o database.
- I dati vengono letti da CSV.
- Le immagini vengono cercate automaticamente in base ai nomi di squadre e giocatori.
- Il codice evita inserimenti HTML non sicuri dai CSV.
- Il caricamento manuale cartella funziona meglio su browser basati su Chromium, come Chrome o Edge.
- Su GitHub Pages il caricamento automatico funziona se i CSV sono pubblicati nel repository e i nomi corrispondono a quelli indicati nel manifest.

---

## Licenza

Progetto realizzato per uso interno del torneo Cral Champions.
