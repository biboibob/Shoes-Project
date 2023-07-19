pipeline {
    // agent { dockerfile true }
    agent {
        docker {
            image 'node:17-alpine'
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