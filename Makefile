# Docker image name

IMAGE_NAME=kasagilabo_challenge
CONTAINER_NAME=kasagilabo

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Run the Docker container
up:
	docker run --rm -v $(shell pwd)/records:/usr/src/app/records $(IMAGE_NAME)

# Remove the Docker container
down:
	@echo "Nothing to stop, the container is removed after it runs."
