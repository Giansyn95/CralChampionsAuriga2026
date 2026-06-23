# CRAL Champions Auriga - Landing archivio tornei

Questo pacchetto contiene i file aggiornati per gestire la landing principale del torneo CRAL Champions Auriga e l'archivio delle diverse edizioni.

## File inclusi

- `index.html`  
  Landing page principale. Legge `tornei.json`, mostra l'edizione corrente, mette in evidenza le ultime edizioni e permette di aprire l'archivio completo.

- `tornei.json`  
  Configurazione delle edizioni del torneo. Ogni edizione è descritta con anno, stagione, cartella, URL, stato e ordinamento.

- `migrazione-landing-tornei.yml`  
  Workflow GitHub Actions per creare o aggiornare la struttura delle edizioni, spostare i file del torneo dentro la cartella corretta e rigenerare la landing.

- `README.md`  
  Questo file di spiegazione.

## Obiettivo della struttura

La struttura permette di distinguere più tornei nello stesso anno, ad esempio:

```text
tornei/2026-estate/
tornei/2026-inverno/
tornei/2025/
```

L'edizione estiva 2026 non usa più la cartella generica `tornei/2026/`, ma la cartella specifica:

```text
tornei/2026-estate/
```

Questo evita conflitti quando nello stesso anno esistono sia un torneo estivo sia un torneo invernale.

## Configurazione in `tornei.json`

Ogni elemento dentro `tornei` rappresenta una edizione. Esempio:

```json
{
  "id": "2026-estate",
  "anno": "2026",
  "stagione": "Estate",
  "slug": "estate",
  "nome": "Estate",
  "cartella": "tornei/2026-estate",
  "titolo": "CRAL Champions - Auriga",
  "descrizione": "Classifiche, calendario, risultati, squadre e statistiche giocatori dell'edizione estiva.",
  "url": "tornei/2026-estate/",
  "stato": "in-corso",
  "corrente": true,
  "ordine": 20262,
  "attivo": true
}
```

### Campi principali

- `id`: identificativo univoco dell'edizione, per esempio `2026-estate` o `2026-inverno`.
- `anno`: anno mostrato graficamente nella landing.
- `stagione`: nome leggibile della stagione, per esempio `Estate` o `Inverno`.
- `slug`: versione tecnica della stagione, in minuscolo.
- `cartella`: percorso della cartella dell'edizione.
- `titolo`: titolo del torneo mostrato nella scheda principale.
- `descrizione`: testo descrittivo dell'edizione.
- `url`: link alla pagina dell'edizione.
- `stato`: può essere `in-corso`, `concluso` o `prossimo`.
- `corrente`: se `true`, l'edizione viene mostrata come torneo corrente.
- `ordine`: valore numerico usato per ordinare le edizioni dalla più recente alla più vecchia.
- `attivo`: se `false`, l'edizione non viene mostrata nella landing.

## Logica della landing `index.html`

La landing:

1. carica il file `tornei.json`;
2. individua l'edizione corrente usando `corrente: true`;
3. mostra nella scheda principale:
   - badge `Edizione in corso`;
   - stagione solo in piccolo accanto al badge, per esempio `Estate`;
   - titolo del torneo sotto il badge;
   - descrizione;
   - anno grande sulla destra;
   - pulsante di accesso all'edizione;
4. mostra nell'archivio solo le ultime edizioni in primo piano;
5. mostra un pulsante per aprire la lista completa delle edizioni più vecchie.

La quantità di edizioni in primo piano è configurabile in `tornei.json`:

```json
"archivio": {
  "primoPiano": 2
}
```

Con questa configurazione, la landing mostra gli ultimi 2 tornei in evidenza; gli altri restano nascosti finché l'utente non apre l'archivio completo.

## Workflow GitHub Actions

Il file `.github/workflows/migrazione-landing-tornei.yml` serve per creare o aggiornare una edizione.

Input disponibili quando si avvia manualmente il workflow:

- `anno`: anno del torneo, per esempio `2026`.
- `stagione`: `estate` oppure `inverno`.
- `stato`: `in-corso`, `concluso` oppure `prossimo`.
- `corrente`: `true` oppure `false`.

Esempio per il torneo estivo 2026:

```text
anno: 2026
stagione: estate
stato: in-corso
corrente: true
```

Il workflow crea o aggiorna:

```text
tornei/2026-estate/
```

Poi aggiorna `tornei.json` con una voce coerente con la struttura creata.

## Come installare i file nel repository

1. Copiare `index.html` nella root del repository.
2. Copiare `tornei.json` nella root del repository.
3. Copiare `migrazione-landing-tornei.yml` in:

   ```text
   .github/workflows/migrazione-landing-tornei.yml
   ```

4. Fare commit e push su GitHub.
5. Eseguire il workflow manualmente da GitHub Actions quando serve creare o aggiornare una nuova edizione.

## Note sulla visualizzazione

La landing è pensata per desktop e mobile:

- layout responsive;
- tema chiaro/scuro;
- focus visibile da tastiera;
- skip link per accessibilità;
- archivio compatto con pulsante per mostrare le edizioni più vecchie.

## Modifiche rispetto alla versione precedente

- La cartella `2026` è stata sostituita da `2026-estate`.
- `tornei.json` ora supporta più edizioni nello stesso anno.
- La scheda principale non ripete più la stagione più volte: la stagione compare solo nel badge piccolo accanto a `Edizione in corso`.
- Sotto al badge viene mostrato il titolo del torneo.
- L'archivio mostra gli ultimi 2 tornei in primo piano e mette i precedenti dietro un pulsante.
