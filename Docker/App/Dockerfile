## STAGE 1 ##

# pull official base image 
# Although react is not a node application, it needs to use node to build the application. So as the first step, we have to import node.
FROM node:16-alpine as builder

RUN apk update && \
    apk upgrade && \
    apk install autoconf automake libtool nasm make pkg-config git apt-utils


ENV TZ="Asia/Jakarta"

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


ENV TZ="Asia/Jakarta"

# Then we are going to create and set a new working directory in our new image.
WORKDIR /usr/share/nginx/html

# The next step is to remove default Nginx static resources 
RUN rm -rf ./*

# Then we need to copy the 1st stage’s static resources onto the current image 
COPY --from=builder /app/build .

# Expose the port.
EXPOSE 3030

# Finally, we need to give instructions to run the application inside the container with ENTRYPOINT. For this, we have to use an array of strings.
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]