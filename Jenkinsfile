pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:30'
        }
    }
    stages {
        stage("Build") {
            steps {
                sh "npm install"
            }
        }
      
    }
}