#!/bin/bash
cd /home/kavia/workspace/code-generation/detox-in-e-commerce-platform-131676-131686/detox_in_backend
source venv/bin/activate
flake8 .
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

