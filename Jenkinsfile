pipeline {
    // agent { dockerfile true }
    agent {
        docker {
            image 'node:17-alpine'
            args '-p 3030:3030'
        }
    }

    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
        stage("Build") {
            // agent {
            //     docker {
            //         reuseNode true
            //     }
            // }
            steps {
                sh "npm install"
            }
        }
      
    }
}