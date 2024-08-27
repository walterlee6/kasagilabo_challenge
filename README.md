Kasagi Labo Programming Challenge
=================================

### QUESTIONS
#### CHALLENGE A
1. Write a program that will generate four(4) types of printable random
objects and store them in a single file, each object will be separated by
a ",".  These are the 4 objects: alphabetical strings, real numbers,
integers, alphanumerics. The alphanumerics should contain a random
number of spaces before and after it (not exceeding 10 spaces).
The output should be 10MB in size.

#### CHALLENGE B
2. Create a program that will read the generated file above and print to
the console the object and its type. Spaces before and after the
alphanumeric object must be stripped.

#### CHALLENGE C
3. Dockerize Challenge B. Write a docker file so that it reads the output
from Challenge A as an input. Once this container is started, the program
in challenge B is executed to process this file. The output should be saved
in a file and should be exposed to the Docker host machine.


### SOLUTION
1. Run this command to install all the dependencies
    ```
   npm install
   ```
2. Run and wait for awhile for it to generate the random output into ``` records/output.txt```
   ```
   npm start
   ```
3. It will build the docker image 
   ```
   sudo make build
   ```
4. It will run ```reader/program.js``` in the kasagilabo container
   ```
   sudo make up
   ```
5. It will shut down and remove the container
   ```
    sudo make down
   ```
   
