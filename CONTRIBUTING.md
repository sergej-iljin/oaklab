# Contributing to OakLab

OakLab is a public database for reproducible oak infusion and aging experiments.

The project follows **Share → Reproduce → Compare**.

## Submit an experiment

The preferred contribution is a Pull Request that adds or updates an experiment record.

Before submitting:

1. Record only values that are actually known.
2. Leave unknown values as null; do not estimate them.
3. Keep units explicit.
4. Separate measurements from sensory observations.
5. If this is a replication, set replication.sourceId to the original OakLab experiment ID.
6. Include source notes when the record is transcribed from an existing notebook or experiment log.

The current public dataset uses `data.json` as an index and stores each experiment in `data/experiments/<ID>.json`. The formal record structure is documented in `schema/experiment.schema.json`. When adding an experiment, add its record file and its index entry. Do not duplicate the full record inside `data.json`.

## Review

Every contribution is checked automatically by GitHub Actions. A maintainer reviews the experimental record before publication.

A record should not be marked published merely because it passes technical validation. Publication means the project has accepted the record as a documented experiment.

## Reproducibility

OakLab does not rank experiments as universally better or worse. The goal is to preserve conditions and observations so other people can reproduce the work and compare results under documented conditions.
