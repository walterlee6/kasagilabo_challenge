# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /kasagilabo

# Copy the rest of the application files
COPY . /kasagilabo

# Install the necessary dependencies
RUN npm install

# Run the program when the container starts
CMD ["npm", "run", "read"]
