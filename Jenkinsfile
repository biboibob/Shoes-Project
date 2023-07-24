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
                    // Adding Network host to resolve deb.debian failed to fetch
                    sh script: 'docker build --network host -t docker-jenkins-shoes-i .' 
                    sh script: 'docker build --network host -t shoes-project-react-app .'
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