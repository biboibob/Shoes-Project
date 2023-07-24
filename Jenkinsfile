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
        CI = 'true'
    }
    stages {
        stage("Build") {
            steps {
                sh "npm install"
            }
        }
        stage('Test') {
            steps {
                // Chmod means you run on highest user (probably admin)
                sh 'chmod +x ./Jenkins/scripts/test.sh'
            }
        }
        stage("Build Docker Image Network") {
            steps {
                script {
                    // Adding Image for Network (-f represent file path location)
                    sh script: 'docker build --network host -t docker-jenkins-shoes-i -f ./Docker/JenkinsBuild/Dockerfile .' 
                }
            }
        }
        stage("Build Docker Image App") {
            steps {
                script {
                    //Adding Image for Applicatioon (-f represent file path location)
                    sh script: 'docker build  -t shoes-project-react-app -f ./Docker/App/Dockerfile --no-cache .'

                    //Tagging Port For App
                    sh script: 'docker tag react-app localhost:5000/shoes-project-react-app'

                    // Pushing Tagging Port to Docker
                    sh script: 'docker push localhost:5000/shoes-project-react-app'

                    // Remove Existing shoes-project 
                    sh script: 'docker rmi -f shoes-project-react-app localhost:5000/shoes-project-react-app'
                }
            }
        }
      
    }
}