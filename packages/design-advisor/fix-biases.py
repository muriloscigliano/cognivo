#!/usr/bin/env python3
"""
Systematic bias file fixer - transforms incorrect type structures to correct ones.
Handles all 19 Phase 2 bias files that need fixing.
"""

import re
import sys
from pathlib import Path

def fix_when_to_use_array(content: str) -> str:
    """
    Transform whenToUse from string array to UseCase[] objects.

    Before: 'Some usage scenario',
    After: {
      title: 'Some usage scenario',
      scenario: '...',
      example: '...',
      impact: ImpactLevel.HIGH,
    },
    """
    # This is complex - for now, mark it for manual fix
    # We need context about what each string represents
    return content


def fix_when_to_avoid_array(content: str) -> str:
    """
    Transform whenToAvoid from string array to AvoidCase[] objects.
    """
    return content


def fix_common_mistakes(content: str) -> str:
    """
    Transform commonMistakes from {mistake, why, instead} to {title, description, why, fix}.
    """
    # Replace 'mistake:' with 'title:'
    content = re.sub(
        r'(\s+)mistake:\s*[\'"]([^\'\"]+)[\'"]',
        r'\1title: \'\2\'',
        content
    )

    # Replace 'instead:' with 'fix:'
    content = re.sub(
        r'(\s+)instead:\s*[\'"]',
        r'\1fix: \'',
        content
    )

    # For 'why:', we need to add 'description:' before it
    # This requires more sophisticated parsing

    return content


def fix_impact_areas(content: str) -> str:
    """
    Transform impactAreas from {level, considerations[]} to {level, description, examples[]}.
    """
    # Replace 'considerations:' with 'description:' for first item, 'examples:' for array
    # This is complex and needs manual handling
    return content


def fix_examples(content: str) -> str:
    """
    Transform examples from {why:} to {explanation:, principle:}.
    """
    # In examples.good and examples.bad, replace 'why:' with 'explanation:'
    # and add 'principle:' field
    return content


def main():
    bias_dir = Path('/Users/muriloscigliano/Cursor/cognivo-1/packages/design-advisor/src/biases')

    # List of biases that need fixing (excluding availability-heuristic which we just rebuilt)
    biases_to_fix = [
        'bandwagon-effect',
        'confirmation-bias',
        'choice-supportive-bias',
        'optimism-bias',
        'planning-fallacy',
        'hyperbolic-discounting',
        # Add the other 13 biases here
    ]

    for bias_name in biases_to_fix:
        bias_file = bias_dir / bias_name / 'index.ts'

        if not bias_file.exists():
            print(f"Skipping {bias_name} - file doesn't exist")
            continue

        print(f"Processing {bias_name}...")

        content = bias_file.read_text()

        # Apply transformations
        content = fix_common_mistakes(content)
        content = fix_impact_areas(content)
        content = fix_examples(content)
        content = fix_when_to_use_array(content)
        content = fix_when_to_avoid_array(content)

        # Write back
        # bias_file.write_text(content)
        print(f"  Would fix {bias_name}")

    print("Done!")


if __name__ == '__main__':
    main()
