# CampusFlow AI — Scientific Experimentation Guide

## Experiment Tracking Directory (`rl/experiments/`)
Every optimization experiment stores:
- `metadata.json` (Seed, algorithm, timestamp)
- `config.yaml` (Hyperparameters)
- `notes.md` (Dissertation observations)
- `training_metrics.json`
- `evaluation.json`
- `reward_curve.svg`

## Regenerating Research Artifacts
To execute the automated evidence generation pipeline:

```bash
python generate_evidence.py
```
