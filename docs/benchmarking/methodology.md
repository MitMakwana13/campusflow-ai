# CampusFlow AI - Benchmark Methodology & Empirical Reproducibility

## Overview
CampusFlow AI provides a multi-trial statistical evaluation suite (`scripts/run_benchmark_suite.py`) to benchmark the hybrid RL optimizer against institutional datasets.

## Benchmark Datasets
- **`auro_bsc_it`**: Live academic department dataset (School of IT, AURO University).
- **`engineering_small`**: Synthetic benchmark dataset (10 rooms, 15 courses, 8 faculty).
- **`engineering_medium`**: Synthetic benchmark dataset (25 rooms, 40 courses, 20 faculty).
- **`engineering_large`**: Large scale benchmark dataset (50 rooms, 100 courses, 50 faculty).

## Evaluated Profiles
Each dataset is benchmarked across 5 independent trials per trade-off profile:
1. **Balanced** (Equal weights)
2. **Faculty Friendly** (50% faculty preference, 20% room utilization)
3. **Room Efficient** (50% room utilization, 20% faculty preference)
4. **Student Friendly** (50% gap minimization, 25% room utilization)

## Statistical Aggregation
For each metric $M$, the mean $\mu$ and standard deviation $\sigma$ are calculated across $N=5$ trials:
$$\mu = \frac{1}{N} \sum_{i=1}^{N} M_i, \quad \sigma = \sqrt{\frac{1}{N} \sum_{i=1}^{N} (M_i - \mu)^2}$$
