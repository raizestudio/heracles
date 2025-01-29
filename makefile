.PHONY: test coverage format lint

# Run all tests with pytest
test:
	pytest --asyncio-mode=auto

# Run tests with coverage
coverage:
	pytest --cov=. --cov-report=term-missing --cov-report=html

# Format code with Black and isort
format:
	black . && isort .

# Lint code with Flake8
lint:
	flake8 .

# Install dependencies
install:
	pip install -r requirements.txt
