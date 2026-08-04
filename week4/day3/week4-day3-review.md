# Week 4 Day 3 Review

## Data structures

- List: an ordered collection with direct access by position.
- Queue: first in, first out; useful for tasks waiting to be processed.
- Stack: last in, first out; useful for undo history and nested operations.
- Tree: hierarchical parent-child data; useful for the DOM and file systems.

## Big-O notation

- Accessing an array element by index is O(1).
- Scanning a list is O(n).
- A nested comparison of every pair is O(n²).
- Efficient divide-and-conquer sorting is O(n log n) on average.

## Quick sort

Quick sort chooses a pivot, places smaller values before it and larger values
after it, then recursively sorts both partitions. Its average time complexity is
O(n log n), while an unbalanced pivot can produce O(n²) worst-case performance.

The accompanying React implementation and interactive algorithm examples are
in [`src/Week4.jsx`](../src/Week4.jsx).
