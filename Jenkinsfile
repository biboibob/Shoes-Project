/* groovylint-disable CompileStatic, LineLength */
pipeline {
    agent any

    tools { nodejs 'node' }

    // agent { dockerfile true }

    // agent {
    //     docker {
    //         image 'node:17-alpine'
    //         args '-p 3030:3030'
    //     }
    // }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('biboibob-dockerhub')
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        // stage('Test') {
        //     steps {
        //         // Chmod means you run on highest user (probably admin)
        //         sh 'chmod +x ./Jenkins/scripts/test.sh'
        //     }
        // }
        stage('Building Image') {
            steps {
                script {
                    // Adding Image for Network (-f represent file path location)
                    // sh script: 'docker container exec -it docker-jenkins-shoes-c bash'

                    // sh script: 'docker images'
                    // sh scrpit: 'docker image rm shoes-project-react-app'
                    sh script: 'docker build --no-cache -t shoes-project-react-app:$(git rev-parse --short HEAD) -f ./Docker/App/Dockerfile  .'
                }
            }
        }
        stage('login') {
            steps {
                script {
                    // try login to dockerhub with environtment we declare above
                    // sh script:'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin docker.io'
                    sh script: 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
                }
            }
        }
        stage('Deploy Image') {
            steps {
                script {
                    // try login to dockerhub with environtment we declare above
                    sh script: 'docker push shoes-project-react-app:$(git rev-parse --short HEAD)'

                // docker.withRegistry('', registryCredential) {
                //     dockerImage.push()
                // }
                }
            }
        }
        stage('Checking Images In Registry') {
            steps {
                script {
                    sh script: 'docker images'
                }
            }
        }
    }
    post {
            always {
                //Command to Logout Docker after do several stages above
                sh 'docker logout'
            }
    }
}
