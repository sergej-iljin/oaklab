# OakLab

**Open database for reproducible oak infusion and aging experiments.**

OakLab is built around **Share → Reproduce → Compare**. An experiment is a structured record of conditions and observations, not a rating.

## v0.2 data model

Each experiment uses a versioned schema. The model separates:

- **Oak** — type, species/origin when known, physical form, toast and preparation.
- **Liquid** — base, ABV and volume.
- **Extraction** — oak dose, duration, temperature and handling conditions.
- **Observations** — appearance, aroma, taste, mouthfeel and notes.
- **Replication** — a link to the source experiment through `sourceId`.
- **Evidence** — photos, attachments and source notes.
- **Status** — draft or published.

Unknown values remain `null`; they must not be inferred.

## Data integrity

OakLab distinguishes experimental facts from interpretation. A missing measurement stays missing. Tasting observations are recorded as observations, not converted into universal ratings.

The founding dataset contains eight oak variants from the original project notes. Records should be completed from those notes before being treated as published experimental data.

## Roadmap

1. Structured v0.2 experiment schema
2. Shared public dataset
3. Reproduction workflow
4. Comparison of replicated experiments
5. Public contribution workflow

## Run

Open `index.html` directly, or serve the directory with any static HTTP server.

## License

MIT
