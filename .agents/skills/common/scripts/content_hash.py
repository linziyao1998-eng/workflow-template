#!/usr/bin/env python3
"""SHA-256 of exact UTF-8 Markdown, including all whitespace."""
import argparse
import hashlib
import json
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('path', type=Path)
    parser.add_argument('--json-field', help='Top-level string field, e.g. body')
    args = parser.parse_args()
    raw = args.path.read_bytes()
    if args.json_field:
        value = json.loads(raw)[args.json_field]
        if not isinstance(value, str):
            parser.error('JSON field must be a string')
        raw = value.encode('utf-8')
    else:
        raw.decode('utf-8')  # Reject a non-UTF-8 artifact, preserve bytes otherwise.
    print(hashlib.sha256(raw).hexdigest())


if __name__ == '__main__':
    main()
