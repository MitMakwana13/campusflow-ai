"""
CampusFlow AI - PPO Training Runner
Delegates to train_rl.py for Stable-Baselines3 PPO PyTorch Neural Network training.
"""

import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from train_rl import train_ppo_agent

def run_verifiable_training(total_episodes: int = 50):
    print("=========================================================================")
    print("      CampusFlow AI - PPO Optimization Training Pipeline                 ")
    print("=========================================================================\n")
    train_ppo_agent(total_timesteps=total_episodes * 20)

if __name__ == "__main__":
    run_verifiable_training(50)
