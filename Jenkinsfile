pipeline {
    agent { dockerfile true }

    // agent any

    tools {nodejs "node"}

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
                }
            }
        }
      
    }
}