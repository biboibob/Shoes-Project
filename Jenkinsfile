pipeline {
    // agent { dockerfile true }
    agent {
        docker {
            image 'node:17-alpine'
            args '-p 3030:3030'
        }
    }
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
                    sh 'docker build -t shoes-project-docker-with-jenkins-i .' 
                }
            }
        }
      
    }
}