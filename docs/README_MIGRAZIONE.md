# Migrazione landing + tornei per anno

La root del repository contiene la landing page.

Il torneo 2026 e stato spostato in:

```text
tornei/2026/
```

## Struttura finale

```text
index.html
preview.html
tornei.json
tornei/
  2026/
    index.html
    preview.html
    data/
    immagini/
```

## Aggiungere un nuovo anno

Copiare la cartella dell'anno precedente:

```bash
cp -R tornei/2026 tornei/2027
```

Poi aggiornare i CSV e le immagini in:

```text
tornei/2027/data/
tornei/2027/immagini/
```

Infine aggiungere il nuovo anno in `tornei.json`.
