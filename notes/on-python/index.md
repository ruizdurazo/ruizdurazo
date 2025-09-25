---
title: On Python
date: 2025-09-25
description_short: Snippets and tips on Python.
description_long: Snippets and tips on Python.
image:
image_alt:
repository:
author_name: Enrique Ruiz Durazo
author_email: enrique@ruizdurazo.com
author_x: ruizdurazo
acknowledgements:
further_reading: true
_:
---

## Intro

Python is easy and useful for many different things.

It's popular in a lot of fields including 3D design software, science, and AI research. It was the first language I learned, and I still use it for some backend development and data analysis stuff.

![Python](./images/sssss.png "Sssss")[size: l, aspect: 860x540]

Here's a list of snippets I've found useful.

<!-- --- -->

## Basics

<!-- --- -->

### [PY] Python 101

Python is simple and readable. But like JavaScript, it's a bit quirky.

```python
# 1. Variables
x = 10  # No need to declare type
y = "hello"  # Dynamic typing
z = [1, 2, 3]  # Lists (mutable)
t = (1, 2, 3)  # Tuples (immutable)
d = {"key": "value"}  # Dictionaries

# - - - - - - - - - -

# 2. Functions
def greet(name="World"):
    return f"Hello, {name}!"

# Lambda functions (like arrow functions in JS)
square = lambda x: x ** 2

# Calling functions
result = greet("Python")
print(result)
# Expected output: Hello, Python!

# - - - - - - - - - -

# 3. Classes
class Dog:
    # The constructor method
    def __init__(self, name):
        self.name = name

    # Class method
    def bark(self):
        return f"{self.name} says woof!"

# Creating class instances
my_dog = Dog("Buddy")
print(my_dog.bark())
# Expected output: Buddy says woof!

# - - - - - - - - - -

# 4. Lists and list comprehensions
numbers = [1, 2, 3, 4, 5]
squared = [x ** 2 for x in numbers]
print(squared)
# Expected output: [1, 4, 9, 16, 25]

# - - - - - - - - - -

# 5. Conditionals
if x > 0:
    print("x is positive")
elif x == 0:
    print("x is zero")
else:
    print("x is negative")
# Expected output: x is positive

# - - - - - - - - - -

# 6. Loops
# For loops
for num in numbers:
    print(num, end=" ")
# Expected output: 1 2 3 4 5

# While loops
count = 0
while count < 3:
    print(count)
    count += 1
# Expected output: 0 1 2
```

<!-- --- -->

### [PY] Typical headaches: Mutable defaults, `is` vs `==`

Python will bite you if you're not careful.

```python
# 1. Mutable default arguments
def add_item(item, items=[]):  # DON'T DO THIS
    items.append(item)
    return items

print(add_item("a"))
# Expected output: ['a']
print(add_item("b"))
# Expected output: ['a', 'b']  # WTF?

# The fix: Use None as default
def add_item_fixed(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item_fixed("a"))
# Expected output: ['a']
print(add_item_fixed("b"))
# Expected output: ['b']

# - - - - - - - - - -

# 2. `is` vs `==`
# `==` checks value equality
# `is` checks identity (same object in memory)
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)
# Expected output: True
print(a is b)
# Expected output: False
print(a is c)
# Expected output: True
```

<!-- --- -->

### [PY] How to work with virtual environments: uv, venv, pip

Virtual environments keep your project dependencies isolated.

Right now you basically have two options to create and manage them: `uv`, or `venv`&nbsp;+&nbsp;`pip`.

**uv (newer, faster Rust-based tool)**

`uv` is a newer, faster alternative way to manage Python dependencies and virtual environments.

`uv` is cool because it has a `pyproject.toml` file that looks like the `package.json` file in the JS world. The versions of the dependencies get saved in the `uv.lock` file. You can specify the Python version in the `pyproject.toml` file. And you can specify the Python version of the venv with a `.python-version` file.

```bash
# Create a virtual environment (creates a `.venv` directory by default)
uv venv

# Activate it (same as above)
# On Mac/Linux:
source .venv/bin/activate

# Create a new project
uv new my-project

# Add a dependency
uv add requests
# Add a dev dependency
uv add --dev pytest

# Remove a dependency
uv remove requests

# Add a dependency from a specific version
uv add requests==2.28.1

# Upgrade a dependency
uv upgrade requests

# Install dependencies
uv sync
# Install all dependencies (including dev dependencies)
uv sync --dev

# - - - - - - - - - -

# `uv` also has `pip` commands.
# Install packages (faster than `pip`)
uv pip install requests pandas fastapi

# Save dependencies to a `requirements.txt` file
uv pip freeze > requirements.txt

# Install from `requirements.txt`
uv pip install -r requirements.txt

# - - - - - - - - - -

# Run a script
uv run my-script.py

# Deactivate the virtual environment
deactivate
```

**venv + pip**

Using `venv` + `pip` is the standard, old-school way to work with virtual environments.

```bash
# Create a virtual environment with `venv`
python -m venv venv
# or
python3 -m venv venv

# Activate the virtual environment
# On Mac/Linux:
source venv/bin/activate

# You'll see `(venv)` in your terminal prompt

# Install packages using `pip` or `pip3`
pip install requests pandas fastapi

# Save dependencies to a `requirements.txt` file
pip freeze > requirements.txt

# Install from `requirements.txt`
pip install -r requirements.txt

# Deactivate the virtual environment
deactivate
```

```python
# Check if you're in a virtual environment
import sys
print(sys.prefix != sys.base_prefix)
# Expected output: True (if in venv)
```

<!-- --- -->

### [PY] How to handle imports and modules: \_\_init\_\_.py, relative imports

```python
# 1. Basic imports
import os
import json
from datetime import datetime
from pathlib import Path

# - - - - - - - - - -

# 2. Import specific functions
from math import sqrt, pi

# - - - - - - - - - -

# 3. Import with alias
import pandas as pd
import numpy as np

# Example usage
np.sqrt(2)
pd.read_csv("data.csv")

# - - - - - - - - - -

# 4. Import everything with `*` (avoid doing this)
# This is cringe because you'll import stuff you don't even need,
# and when you use a method you imported, you won't immediately
# know from which module it came from.
from module import *
```

In order to make your own code more cleanly importable, you can use packages. Adding a `__init__.py` file makes a directory a package. It can be empty or contain initialization code. Then, you can import a module, method, or class as you need.

```python
# Working with packages

# 1. Structure your project to use packages.
# 2. Add `__init__.py` files to make directories packages.

# Assuming this project structure:
# mypackage/
# ├─ __init__.py
# ├─ module1.py
# └─ subpackage/
#    ├─ __init__.py
#    └─ module2.py

# 3. Import a method from a subpackage.
# Inside file `module1.py` you can do:
from subpackage.module2 import method1

# 4. Use what you imported.
method1()
```

<!-- --- -->

### [PY] How to do loop operations in a single line: comprehensions, generator expressions

```python
# 1, List comprehensions
# Basic syntax: [expression for item in iterable if condition]
numbers = [1, 2, 3, 4, 5]

# Square all numbers
squares = [x ** 2 for x in numbers]
print(squares)
# Expected output: [1, 4, 9, 16, 25]

# Filter and transform
evens_squared = [x ** 2 for x in numbers if x % 2 == 0]
print(evens_squared)
# Expected output: [4, 16]

# Nested comprehensions
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [item for row in matrix for item in row]
print(flattened)
# Expected output: [1, 2, 3, 4, 5, 6, 7, 8, 9]

# - - - - - - - - - -

# 2. Dict comprehensions
# Basic syntax: {key: value for item in iterable if condition}
words = ["hello", "world", "python"]
word_lengths = {word: len(word) for word in words}
print(word_lengths)
# Expected output: {'hello': 5, 'world': 5, 'python': 6}

# Swap keys and values
inverted = {v: k for k, v in word_lengths.items()}
print(inverted)
# Expected output: {5: 'world', 6: 'python'}

# - - - - - - - - - -

# 3. Set comprehensions
unique_lengths = {len(word) for word in words}
print(unique_lengths)
# Expected output: {5, 6}

# - - - - - - - - - -

# 4. Generator expressions (memory efficient)
# Use () instead of []
squares_gen = (x ** 2 for x in range(1000000))
print(type(squares_gen))
# Expected output: <class 'generator'>

# Only computes values as needed
print(next(squares_gen))
# Expected output: 0
print(next(squares_gen))
# Expected output: 1
```

<!-- --- -->

## Types

<!-- --- -->

### [PY] How to type hint your code: Type annotations

Python is a dynamically typed language, so you'll want to use type hints to make your code more robust, and be able to catch bugs as early as linting with something like `ruff` or `pyright`.

```python
# You don't have to import simple types like `str`,  
# `int`, `float`, `bool`, etc.
# But you'll want to import more type hints from
# the built-in `typing` module.
from typing import List, Dict, Optional, Union, Tuple, Callable, Any

# - - - - - - - - - -

# 1. Basic type hints (like strings, numbers, booleans)
def greet(name: str) -> str:
    return f"Hello, {name}!"

age: int = 30
pi: float = 3.14159
is_active: bool = True

# - - - - - - - - - -

# 2. Collection types (lists, dictionaries, tuples)
def process_numbers(numbers: List[int]) -> float:
    return sum(numbers) / len(numbers)

user_scores: Dict[str, int] = {"Alice": 95, "Bob": 87}

def get_coordinates() -> Tuple[float, float]:
    return (40.7128, -74.0060)

# - - - - - - - - - -

# 3. Optional and Union types

# Optional (can be None)
def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)  # Returns None if not found

# Union (multiple possible types)
def process_id(user_id: Union[int, str]) -> str:
    return f"Processing user {user_id}"

# - - - - - - - - - -

# 4. Callable types
def apply_function(
    func: Callable[[int], int],
    value: int
) -> int:
    return func(value)

square: Callable[[int], int] = lambda x: x ** 2
result = apply_function(square, 5)
print(result)
# Expected output: 25

# - - - - - - - - - -

# 5. Type aliases
UserId = int
UserDict = Dict[UserId, Dict[str, Any]]

def get_user_info(users: UserDict, user_id: UserId) -> Optional[Dict[str, Any]]:
    return users.get(user_id)

# - - - - - - - - - -

# 6. Generic types (advanced)
from typing import TypeVar, Generic

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: List[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

int_stack: Stack[int] = Stack()
int_stack.push(1)
int_stack.push(2)
```

<!-- --- -->

## Testing

<!-- --- -->

### [PY] How to write unit tests: pytest

Testing is crucial in the age of AI and vibe-coding.

The bottleneck in software development used to be writing code, but now it's mostly reviewing, testing, and debugging because it has to be done manually.

Having tests makes you go faster and more confidently.

Say you have a calculator you want to test. You can write tests for it like this:

```python
# `calculator.py`

def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def multiply(a, b):
    return a * b

def subtract(a, b):
    return a - b
```

```python
# `test_calculator.py`
import pytest
from calculator import add, divide

# Basic tests
# You can use the `assert` keyword to test your code.
def test_add():
    # Add as many test cases as you need.
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0

def test_divide():
    assert divide(10, 2) == 5
    assert divide(9, 3) == 3

def test_divide_by_zero():
    # You can use the `pytest.raises` context manager to test exceptions.
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)

# Run with: `pytest test_calculator.py -v`
```

<!-- --- -->
