# Project configuration
PROJECT_NAME = chatup-frontend
DOCKER_REGISTRY_REPO = northamerica-northeast1-docker.pkg.dev/iron-burner-389219/awesoon

# General Parameters
TOPDIR = $(shell git rev-parse --show-toplevel)
CONDA_SH := $(shell find ~/*conda*/etc -name conda.sh | tail -1)
ACTIVATE := source $(CONDA_SH) && conda activate $(PROJECT_NAME)
ifeq ($(shell uname -p), arm)
DOCKER_PLATFORM = --platform linux/amd64
else
DOCKER_PLATFORM =
endif


default: help

help: # Display help
	@awk -F ':|##' \
		'/^[^\t].+?:.*?##/ {\
			printf "\033[36m%-30s\033[0m %s\n", $$1, $$NF \
		}' $(MAKEFILE_LIST) | sort

build-docker: ## Build the docker image
	docker build $(DOCKER_PLATFORM) -t $(PROJECT_NAME) .

tag-docker: ## Tag the docker image
	docker tag $(PROJECT_NAME) $(DOCKER_REGISTRY_REPO)/$(PROJECT_NAME):latest

push-docker: ## push the image to registry
	docker push $(DOCKER_REGISTRY_REPO)/$(PROJECT_NAME):latest
