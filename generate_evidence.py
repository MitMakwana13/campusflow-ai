"""
CampusFlow AI - Automated Evidence & Research Artifact Generator
Regenerates research training logs, reward vectors, SVG plots, and comparative evaluation JSONs.
"""

import os
import sys

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from rl.training.train import run_verifiable_training
from rl.evaluation.report import run_evaluation
from rl.evaluation.plot_reward import generate_reward_plot

def main():
    print("=========================================================================")
    print("      CampusFlow AI — Automated Evidence Artifact Generator              ")
    print("=========================================================================\n")

    print("[1/3] Running PPO Training Rollout Loop (50 episodes)...")
    run_verifiable_training(total_episodes=50)

    print("\n[2/3] Programmatically computing Evaluation Matrix...")
    run_evaluation()

    print("\n[3/3] Generating Vector SVG Reward Plot & CSV Data...")
    generate_reward_plot()

    print("\n=========================================================================")
    print(" ALL EVIDENCE ARTIFACTS REGENERATED SUCCESSFULLY. READY FOR EXAMINERS!   ")
    print("=========================================================================")

if __name__ == "__main__":
    main()
