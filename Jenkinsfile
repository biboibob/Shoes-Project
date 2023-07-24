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
        stage("Build Docker Image") {
            steps {
                script {
                    // Adding Image for Network (-f represent file path location)
                    sh script: 'docker build --network host -t docker-jenkins-shoes-i -f ./Docker/JenkinsBuild/Dockerfile .' 

                    //Adding Image for Applicatioon (-f represent file path location)
                    sh script: 'docker build  -t shoes-project-react-app -f ./Docker/App/Dockerfile .'
                }
            }
        }
        stage("Deploy") {
            steps {
                script {
                    sh script: 'docker run -p 3020:3020 shoes-project-react-app'
                }
            }
        }
      
    }
}