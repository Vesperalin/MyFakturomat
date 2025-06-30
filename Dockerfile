FROM node:22-alpine

# sets working directory: my-fakturomat
WORKDIR /my-fakturomat

# copies package*.json, so that it can install all dependencies
COPY package*.json ./

# installs all dependencies
RUN npm install

# copies rest of the files
COPY . .

# exposes on port 3000 - it won't be opened yet
EXPOSE 3000

# command that is run when container starts
# in my case it runs dev mode
CMD ["npm", "run", "dev"]
