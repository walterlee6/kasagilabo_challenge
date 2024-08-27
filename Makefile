# Docker image and container names
IMAGE_NAME=kasagilabo_challenge
CONTAINER_NAME=kasagilabo

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Run the Docker container

up:
	docker run --name $(CONTAINER_NAME) \
		-v $(shell pwd)/records:/usr/src/app/records \
		$(IMAGE_NAME)
#docker-compose -p ${CONTAINER_NAME} -f docker-compose.yml up --remove-orphans --force-recreate -d



# Stop and remove the Docker container

down:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)
#docker-compose -p ${CONTAINER_NAME} -f docker-compose.yml down --remove-orphans 

