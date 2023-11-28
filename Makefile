ENV_FILE := .env
include $(ENV_FILE)
export $(shell sed 's/=.*//' $(ENV_FILE))

setup:
	@npm i -g typescript
	@npm i -g yarn
	@yarn install

# make start env=dev
start:
	@yarn build
	@yarn start

# make run
run: build_docker_image
	@docker-compose -f ./docker/docker-compose.local.yml up --remove-orphans

# make build_docker_image
build_docker_image:
	@docker build -f ./docker/Dockerfile -t test-app:latest --platform linux/amd64 .

# make push_docker_image
push_docker_image: build_docker_image
	@echo aws ecr get-login-password --region $(REGION) --profile $(AWS_PROFILE) | docker login --username AWS --password-stdin $(AWS_ACCOUNT_ID).dkr.ecr.$(REGION).amazonaws.com
	@docker tag test-app:latest $(AWS_ACCOUNT_ID).dkr.ecr.$(REGION).amazonaws.com/$(REPO_NAME):latest
	@docker push $(AWS_ACCOUNT_ID).dkr.ecr.$(REGION).amazonaws.com/$(REPO_NAME):latest
