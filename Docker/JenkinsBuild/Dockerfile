## STAGE 1 ##   

## Jenkins Configuration

FROM jenkins/jenkins:2.401.2-jdk17

ENV TZ="Asia/Jakarta"

USER root

##Adding -V to detail the breaking error when apt-get install/update
RUN apt-get update && apt-get install -y -V --fix-missing lsb-release

RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg

RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list

RUN apt-get update && apt-get install -y -V --fix-missing docker-ce-cli

USER jenkins

RUN jenkins-plugin-cli --plugins "blueocean docker-workflow"


