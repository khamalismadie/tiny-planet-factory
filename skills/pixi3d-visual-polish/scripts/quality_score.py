#!/usr/bin/env python3
"""Compute the three independent 100-point quality scores.

Input: JSON object with keys visual, technical, gameplay, each a map of
category name to raw score 0-10. Missing categories count as 0 and are
reported. Output: JSON with weighted totals and interpretation.
"""
from __future__ import annotations
import json
import sys
from pathlib import Path

WEIGHTS = {
    "visual": {
        "art_direction": 10, "environment": 10, "geometry": 8, "materials": 8,
        "lighting": 10, "camera": 8, "characters": 8, "animation": 10,
        "vfx": 8, "ui_ux": 8, "game_feel": 6, "visual_performance": 6,
    },
    "technical": {
        "architecture": 15, "compatibility": 15, "performance": 20,
        "asset_management": 10, "memory_management": 10, "error_handling": 10,
        "testing": 10, "maintainability": 10,
    },
    "gameplay": {
        "controls": 20, "collision_physics": 20, "game_mechanics": 20,
        "level_integrity": 15, "feedback": 10, "save_progression": 10,
        "regression_safety": 5,
    },
}


def band(total: float) -> str:
    if total < 40:
        return "Prototype"
    if total < 60:
        return "Basic"
    if total < 75:
        return "Production Ready"
    if total < 85:
        return "Polished"
    if total < 95:
        return "Premium"
    return "Exceptional"


def main() -> int:
    raw = Path(sys.argv[1]).read_text(encoding="utf-8") if len(sys.argv) > 1 else sys.stdin.read()
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        print(f"Invalid JSON: {exc}", file=sys.stderr)
        return 2
    result = {}
    for group, weights in WEIGHTS.items():
        scores = data.get(group) or {}
        total = 0.0
        missing = []
        for key, weight in weights.items():
            value = scores.get(key)
            if value is None:
                missing.append(key)
                value = 0
            try:
                value = float(value)
            except (TypeError, ValueError):
                print(f"{group}.{key}: score must be numeric", file=sys.stderr)
                return 2
            if not 0 <= value <= 10:
                print(f"{group}.{key}: score must be 0-10", file=sys.stderr)
                return 2
            total += value / 10 * weight
        result[group] = {"total": round(total, 1), "band": band(total), "missing": missing}
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
