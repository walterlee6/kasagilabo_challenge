# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the necessary dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Make sure the output directory exists
RUN mkdir -p output

# Run the program when the container starts
CMD ["node", "reader/program.js"]

# The container will expose the result.txt file to the host
VOLUME ["/usr/src/app/records"]
