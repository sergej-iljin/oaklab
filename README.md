# OakLab

**Open database for reproducible oak infusion and aging experiments.**

OakLab is built around **Share → Reproduce → Compare**. An experiment is a structured record of conditions, observations, sensory evaluations and evidence.

## Current working version

The current dataset contains the eight founding oak variants and the first tasting session dated **2026-09-04**.

The tasting system is fixed at **10 criteria × 1–5 = maximum 50 points**, plus a separate **overall impression 1–10**. Bitterness and astringency are stored as separate criteria. The obsolete combined bitterness/astringency score is not part of the data model.

The web interface currently provides:

- experiment cards with search and toast filtering;
- full experiment detail view;
- first-tasting results with all 10 criteria;
- side-by-side comparison of the latest tasting session for all samples;
- JSON export of the current in-browser dataset;
- creation of local draft experiments;
- versioned JSON records and automated data validation;
- evidence metadata for the first-tasting photo set.

## Data model

Each experiment uses schema version 2:

- **Oak** — type, species/origin when known, physical form, toast and preparation.
- **Liquid** — base, ABV and volume.
- **Extraction** — oak dose, duration, temperature and handling conditions.
- **Observations** — appearance, aroma, taste, mouthfeel and notes.
- **Tasting sessions** — dated sensory evaluations using the fixed 10-criterion system.
- **Replication** — a link to the source experiment through `sourceId`.
- **Evidence** — photos, attachments and source notes.
- **Status** — draft or published.

Unknown values remain `null`; they must not be inferred.

## Validation

Run:

```bash
node scripts/validate-data.mjs
```

The validator checks the index, record files, schema-critical fields, tasting scores and that every /50 total equals the sum of the ten criteria.

## Run locally

Serve the repository with any static HTTP server and open `index.html`.

## Deployment

GitHub Pages is configured to deploy the `main` branch automatically.

## Next data entry

The application is ready for subsequent tasting sessions. New results should be added as another item in the relevant experiment's `tastingSessions` array; previous sessions must remain unchanged.

## License

MIT
