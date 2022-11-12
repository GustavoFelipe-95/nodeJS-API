include .env

.PHONY: up

up:
	docker-composer up -d

.PHONY: down

down:
	docker-composer down

.PHONY: logs

logs:
	docker-composer logs -f