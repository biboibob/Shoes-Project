## STAGE 1 ##

# pull official base image 
# Although react is not a node application, it needs to use node to build the application. So as the first step, we have to import node.
FROM node:17-alpine as builder

# set working directory
# Although react is not a node application, it needs to use node to build the application. So as the first step, we have to import node.
WORKDIR /app

# install app dependencies
# As the next step, we need to copy the package.json and the .lock file. If you are using npm, this will be package-lock.json. 
# If you are using yarn this will be yarn.lock. Otherwise, we won’t be able to use yarn/npm commands in the next layer. 
# These files should be copied to the working directory which we defined above. For that, we add a . 
# after the copy command. But copying the yarn.lock file is not required. You can exclude
COPY package.json .
COPY package-lock.json .


# In the next step, we have to install all the dependencies which we used in the project. So you have to run yarn install or npm install 
RUN npm install

# add app
# After that, we need to copy the rest of the content to the working directory 
COPY . . 

# Then we do a build with yarn build 
RUN npm run build

# Jenkinsfile reference
RUN apk add -U subversion

# start app 
CMD ["npm", "start"]


## STAGE 2 ##

# we are going to create a new image using the above create image with Nginx. 
# Nginx is used to develop server-side applications. So the first step is to import Nginx. 
FROM nginx:1.19.0

# Then we are going to create and set a new working directory in our new image.
WORKDIR /usr/share/nginx/html

# The next step is to remove default Nginx static resources 
RUN rm -rf ./*

# Then we need to copy the 1st stage’s static resources onto the current image 
COPY --from=builder /app/build .

# Finally, we need to give instructions to run the application inside the container with ENTRYPOINT. For this, we have to use an array of strings.
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]


## STAGE 3 ##   

## Jenkins Configuration

FROM jenkins/jenkins:2.401.2-jdk17

USER root

RUN apt-get update 

RUN  apt-get install \
     ca-certificates \
     curl \
     gnupg 

RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg

RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list

RUN  apt-get update

RUN  apt-get install -y docker-ce-cli

USER jenkins

RUN jenkins-plugin-cli --plugins "blueocean docker-workflow"



