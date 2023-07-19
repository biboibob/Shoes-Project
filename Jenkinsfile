pipeline {
    // agent { dockerfile true }
    agent {
        docker {
            image 'node:17-alpine'
        }
    }

    tools{nodejs "node"}

    stages {
        stage('Test') {
            steps {
                bat 'node --version'
            }
        }
        stage("Build") {
            // agent {
            //     docker {
            //         reuseNode true
            //     }
            // }
            steps {
                bat "npm install"
            }
        }
      
    }
}