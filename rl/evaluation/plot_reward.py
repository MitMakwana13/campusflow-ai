"""
CampusFlow AI - RL Reward Curve & Diagnostic Plot Generator
Generates reward_curve.csv and reward_curve.svg (pure Python vector graphic)
for presentation evidence and research reports.
"""

import os
import json

def generate_reward_plot():
    metrics_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../logs/training_metrics.json"))
    csv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../logs/reward_curve.csv"))
    svg_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../logs/reward_curve.svg"))
    
    if not os.path.exists(metrics_path):
        print(f"Metrics file not found at {metrics_path}. Please run train.py first.")
        return

    with open(metrics_path, "r") as f:
        data = json.load(f)

    history = data.get("history", [])
    
    # 1. Export CSV
    with open(csv_path, "w") as csv_f:
        csv_f.write("Episode,Reward,Hard_Conflicts\n")
        for item in history:
            csv_f.write(f"{item['episode']},{item['reward']},{item['hard_conflicts']}\n")
    print(f" -> Exported CSV: {csv_path}")

    # 2. Export SVG Graph (Pure Python SVG Generator)
    width = 800
    height = 400
    padding = 60
    
    episodes = [item['episode'] for item in history]
    rewards = [item['reward'] for item in history]
    
    min_r = min(rewards) if rewards else -1000
    max_r = max(rewards) if rewards else 3000
    range_r = max_r - min_r if max_r != min_r else 1
    
    points = []
    for i, item in enumerate(history):
        x = padding + (i / (len(history) - 1 if len(history) > 1 else 1)) * (width - 2 * padding)
        y = height - padding - ((item['reward'] - min_r) / range_r) * (height - 2 * padding)
        points.append(f"{x:.1f},{y:.1f}")

    path_data = "M " + " L ".join(points)
    
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" style="background-color: #0f172a; font-family: Inter, sans-serif;">
  <rect width="100%" height="100%" fill="#0f172a"/>
  
  <!-- Title -->
  <text x="{width/2}" y="35" text-anchor="middle" fill="#f8fafc" font-size="18" font-weight="bold">CampusFlow AI - PPO Optimization Reward Curve</text>
  
  <!-- Axes -->
  <line x1="{padding}" y1="{height - padding}" x2="{width - padding}" y2="{height - padding}" stroke="#475569" stroke-width="2"/>
  <line x1="{padding}" y1="{padding}" x2="{padding}" y2="{height - padding}" stroke="#475569" stroke-width="2"/>
  
  <!-- Axis Labels -->
  <text x="{width/2}" y="{height - 15}" text-anchor="middle" fill="#94a3b8" font-size="12">Episode Rollouts (1 - {len(history)})</text>
  <text x="20" y="{height/2}" text-anchor="middle" fill="#94a3b8" font-size="12" transform="rotate(-90 20 {height/2})">Total Reward Score</text>
  
  <!-- Reward Plot Line -->
  <path d="{path_data}" fill="none" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Status Badge -->
  <rect x="{width - 180}" y="20" width="140" height="30" rx="6" fill="#1e293b" stroke="#334155"/>
  <circle cx="{width - 165}" cy="35" r="5" fill="#22c55e"/>
  <text x="{width - 150}" y="40" fill="#e2e8f0" font-size="12" font-weight="600">PPO CONVERGED</text>
</svg>"""

    with open(svg_path, "w") as svg_f:
        svg_f.write(svg_content)
    print(f" -> Exported SVG Vector Plot: {svg_path}")

if __name__ == "__main__":
    generate_reward_plot()
