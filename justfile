# List all the recipes
_default:
    @just --list

# Bootstrap a new setup
bootstrap: deps up

# CLI for backend
_be_cli *commands:
    docker compose -f docker-compose.cli.yml run --rm be-cli {{ commands }}

# CLI for frontend
_fe_cli *commands:
    docker compose -f docker-compose.cli.yml run --rm fe-cli {{ commands }}

# Install deps for frontend
deps-fe:
    @just _fe_cli npm install

# Install deps for backend
deps-be:
    @just _be_cli npm install

# Install deps for both frontend and backend
deps: deps-fe deps-be

# Start the local docker-compose env
up:
    docker compose up -d
    open http://localhost:8080

# Stop the local docker-compose env
down:
    docker compose down

# Add package to FE deps
add-fe package *args:
    @just _fe_cli npm i {{ package }} {{ args }}

# Add package to BE deps
add-be package *args:
    @just _be_cli npm i {{ package }} {{ args }}

# Bash into FE
sh-fe:
    @just _fe_cli bash

# Bash into BE
sh-be:
    @just _be_cli bash

# Run backend tests
test-be:
    @just _be_cli npm run test
    @just _be_cli npm run test:e2e
