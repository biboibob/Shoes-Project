pipeline {

    agent any

    tools {nodejs "node"}

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
        stage("Build") {
            steps {
                sh "npm install"
            }
        }
        // stage('Test') {
        //     steps {
        //         // Chmod means you run on highest user (probably admin)
        //         sh 'chmod +x ./Jenkins/scripts/test.sh'
        //     }
        // }
        stage("Building Image") {
            steps {
                script {
                    // Adding Image for Network (-f represent file path location)
                    // sh script: 'docker container exec -it docker-jenkins-shoes-c bash'
                    
                    // sh script: 'docker images'
                    sh scrpit: 'docker image rm shoes-project-react-app'
                    sh script: 'docker build --no-cache -t shoes-project-react-app -f ./Docker/App/Dockerfile  .'
                }
            }
        }
        stage('login') {
              steps {
                // try login to dockerhub with environtment we declare above
               sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('push') {
              steps {
                // try login to dockerhub with environtment we declare above
               sh 'docker push shoes-project-react-app'
            }
        }
        stage("Checking Images In Registry") {
            steps {
                script {
                    sh script: 'docker images'
                }
            }
        }
        
       
        // stage("Build Docker Image Network") {
        //     steps {
        //         script {
        //             // Adding Image for Network (-f represent file path location)
        //             sh script: 'docker build --network host -t docker-jenkins-shoes-i .' 
        //         }
        //     }
        // }
        // stage("Build Docker Image App") {
        //     steps {
        //         script {
        //             //Adding Image for Applicatioon (-f represent file path location)
        //             sh script: 'docker build --network host -t shoes-project-react-app --no-cache .'

        //             //Tagging Port For App
        //             sh script: 'docker tag shoes-project-react-app localhost:5000/shoes-project-react-app'

        //             // Pushing Tagging Port to Docker
        //             sh script: 'docker push localhost:5000/shoes-project-react-app'

        //             // Remove Existing shoes-project 
        //             sh script: 'docker rmi -f shoes-project-react-app localhost:5000/shoes-project-react-app'
        //         }
        //     }
        // }
      
    }
    post {
        always {
            //Command to Logout Docker after do several stages above
            sh 'docker logout'
        }
    }
}