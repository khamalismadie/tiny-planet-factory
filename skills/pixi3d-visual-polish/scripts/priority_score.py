#!/usr/bin/env python3
"""Rank improvements by (impact * gameplay * confidence) / (cost * risk).

Input: JSON file or stdin with a list of objects containing keys
visual_impact, gameplay_impact, confidence, cost, risk (integers 1-5).
Output: JSON list sorted by descending priority.
"""
from __future__ import annotations
import json
import sys
from pathlib import Path

KEYS = ("visual_impact", "gameplay_impact", "confidence", "cost", "risk")


def main() -> int:
    raw = Path(sys.argv[1]).read_text(encoding="utf-8") if len(sys.argv) > 1 else sys.stdin.read()
    try:
        items = json.loads(raw)
    except json.JSONDecodeError as exc:
        print(f"Invalid JSON: {exc}", file=sys.stderr)
        return 2
    if not isinstance(items, list):
        print("Expected a JSON list", file=sys.stderr)
        return 2
    scored = []
    for index, item in enumerate(items):
        try:
            values = [int(item[key]) for key in KEYS]
        except (KeyError, TypeError, ValueError) as exc:
            print(f"Item {index}: missing/invalid score ({exc})", file=sys.stderr)
            return 2
        if any(v < 1 or v > 5 for v in values):
            print(f"Item {index}: scores must be 1-5", file=sys.stderr)
            return 2
        visual, gameplay, confidence, cost, risk = values
        priority = (visual * gameplay * confidence) / (cost * risk)
        scored.append({**item, "priority": round(priority, 3)})
    scored.sort(key=lambda entry: entry["priority"], reverse=True)
    print(json.dumps(scored, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
