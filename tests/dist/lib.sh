#!/usr/bin/env bash

FAILED=0

assert_count() {
  local file="$1"
  local re="$2"
  local expected="$3"
  if [ ! -f "$file" ]; then
    echo "FAIL: file not found: $file"
    FAILED=1
    return
  fi
  local count
  count=$(grep -oE "$re" "$file" 2>/dev/null | wc -l)
  if [ "$count" -ne "$expected" ]; then
    echo "FAIL: expected $expected occurrences of '$re' in $file, got $count"
    FAILED=1
  fi
}

assert_present() {
  local file="$1"
  local re="$2"
  if [ ! -f "$file" ]; then
    echo "FAIL: file not found: $file"
    FAILED=1
    return
  fi
  if ! grep -qE "$re" "$file"; then
    echo "FAIL: expected '$re' to be present in $file"
    FAILED=1
  fi
}

assert_absent() {
  local file="$1"
  local re="$2"
  if [ ! -f "$file" ]; then
    return
  fi
  if grep -qE "$re" "$file"; then
    echo "FAIL: expected '$re' to be absent in $file"
    FAILED=1
  fi
}

assert_file() {
  local path="$1"
  if [ ! -e "$path" ]; then
    echo "FAIL: expected file to exist: $path"
    FAILED=1
  fi
}

assert_missing_file() {
  local path="$1"
  if [ -e "$path" ]; then
    echo "FAIL: expected file to be removed: $path"
    FAILED=1
  fi
}
