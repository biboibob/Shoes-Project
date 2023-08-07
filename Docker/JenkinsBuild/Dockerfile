## STAGE 1 ##   

## Docker Configuration

# # Use a base image (e.g., Ubuntu)
# FROM ubuntu:latest

# # Update the package lists and install lsb-release
# RUN apt-get update && apt-get install -y lsb-release

# # Install Docker prerequisites
# RUN apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# # Install Docker-in-Docker
# RUN curl -fsSL https://get.docker.com | sh

## Jenkins Configuration

FROM jenkins/jenkins:latest

USER root

RUN apt-get update && apt-get install -y lsb-release

RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg

RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list

RUN apt-get update && apt-get install -y docker-ce-cli

USER jenkins

RUN jenkins-plugin-cli --plugins "blueocean docker-workflow"


