This Tutorial should help you to configure the initial setup for docker and jenkins for Continous Integration/Continous Development (CI/CD). before we heads up for the steps, you need prerequisite below to run the whole scenario :

1. Jenkins Installed in your computer
2. Docker desktop installed in your desktop
3. Using JDK-17 above

## Step 1 - Initialize your Dockerfile 📂

### Making an Directory path for your dockerfile
So if you've a react app, to make it more clean and accessable you could make a new folder called dockerfile on your source code, and make a few folder inside of it like JenkinsBuild, Docker, etc. The purpose of this step is to make our code segmentation for docker it self. Here's what it looks like 
> ![image](https://github.com/biboibob/Shoes-Project/assets/75656538/b109932f-39eb-4a3e-b2b7-4d586656d4fd)


## Step 2 - Install and Run Jenkins on Docker 🐳

We asume you've already install jenkins on your local computer, then we want run it in your local container, what steps should we take?. According to official jenkins website instruction for windows (https://www.jenkins.io/doc/book/installing/docker/) we should do a couple configuration to make docker isolated.

### Pull Jenkins Image from Docker

```
docker pull jenkins/jenkins
```

### Making a bridge network

```
docker network create jenkins
```

### Run a docker:dind Docker image

```
  docker run --name jenkins-docker --rm --detach ^
  --privileged --network jenkins --network-alias docker ^
  --env DOCKER_TLS_CERTDIR=/certs ^
  --volume jenkins-docker-certs:/certs/client ^
  --volume jenkins-data:/var/jenkins_home ^
  --publish 2376:2376 ^
  docker:dind
```

### Customize the official Jenkins Docker image 

> * I prefer using latest to avoid any warning or error that may come during or pos installation, you chould chose the LTS version too
> ```
> FROM jenkins/jenkins:latest
> USER root
> RUN apt-get update && apt-get install -y lsb-release
> RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
>   https://download.docker.com/linux/debian/gpg
> RUN echo "deb [arch=$(dpkg --print-architecture) \
>   signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
>   https://download.docker.com/linux/debian \
>   $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
> RUN apt-get update && apt-get install -y docker-ce-cli
> USER jenkins
> RUN jenkins-plugin-cli --plugins "blueocean docker-workflow"
> ```

> * In this case im building jenkins in seperate docker file so in case to access it you should use `-f` command to get into the directory
> ```
> docker build -t docker-jenkins-shoes-i -f  ./Docker/JenkinsBuild/Dockerfile .
> ```

### Run your docker-jenkins-shoes-i image as a container in Docker 

* Here's some point to be noticing, you could probably see the publish network may diffrent on the insturction site than mine, thats because we already have jenkins running on our local with port `8080`. so if you run `docker-jenkins-shoes-c` container with port `8080` it may cause warning because port `8080` is currently used. What you should do? you should change the local port (left one) from `8080` to `8000` and let the container port (right side) as it should be.
```
docker run --name docker-jenkins-shoes-c --restart=on-failure --detach ^
  --network jenkins --env DOCKER_HOST=tcp://docker:2376 ^
  --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 ^
  --volume jenkins-data:/var/jenkins_home ^
  --volume jenkins-docker-certs:/certs/client:ro ^
  --publish 8000:8080 --publish 50000:50000 docker-jenkins-shoes-i
```

## Step 3 - Setup Dockerfile for React-Application Image Build ⚛️

### Make a dockerfile inside docker folder

Remember the docker folder we make in step 1? there's 2 folder inside of it, `Jenkinsbuild` and `App`. So those 2 file is working seperately, the `Jenkinsbuild` for building the image of jenkins to running on server, and the `App` is to build a react application image. I assume you dont have any trouble with jenkinsbuild since we've set it up on Step 2. So you could make a new dockerfile inside the `App` folder instead.


### Create and Configure Dockerfile in App folder

Here's some point need attention. You should choose your node build carefully since there's a diffrent between debian and alipne system to running some snippet. For example Debian based Linux distributions use `apt` as their package manager meanwhile alpine using `apk` (Mine using Node-Bullseye). And the build for React Application should look like this 

```
## STAGE 1 ##

# pull official base image 
# Although react is not a node application, it needs to use node to build the application. So as the first step, we have to import node.
FROM node:16.11.1-bullseye as builder

RUN apt-get update -y && apt-get upgrade -y && \
    apt-get install -y

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

# Then we do a build with yarn builds test
RUN npm run build


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

```

## Step 4 - Configure Plugins on Jenkins inside Docker 🧩

### Access Plugin on Jenkins 

If you can access your jenkins from your container, your dashboard may looks like this and in the sidebar you could see manage jenkins and click it

> ![image](https://github.com/biboibob/Shoes-Project/assets/75656538/b009e617-3399-4547-b3f3-7776b4e261b8)

And then there's Plugins option in system configuration section. Click it

> ![image](https://github.com/biboibob/Shoes-Project/assets/75656538/2a2333bb-2ac5-4020-bd9b-c80390524ec0)

### Download Required Plugins to run pipeline we will be making

* Node JS
* Docker 
* Job Configuration History Plugin (This Plugin Need to Restore some pipeline removed accidently)

> ![image](https://github.com/biboibob/Shoes-Project/assets/75656538/dec6bfa8-4f90-4838-a99e-393e7c80366c)

## Step 5 - Nodejs And Docker Installation Setup ⚙️

So after finised installed plugins we need, go back to manage page and in system configuration section there's tools option. Click it and scroll down and you'll see NodeJS installation. Make a same configuration as image below for NodeJS

> ![image](https://github.com/biboibob/Shoes-Project/assets/75656538/bb0c0045-71d9-4ea4-b03f-68f89ce062d2)

And for Docker Installtion, Follow configuration below

> ![image](https://github.com/biboibob/Shoes-Project/assets/75656538/2c247b18-ae39-49a5-9423-e8ea3ea8bacc)















