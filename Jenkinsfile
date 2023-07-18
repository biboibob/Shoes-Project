pipeline {
    agent {
        docker {
            image 'node:17-alpine'
            args '-p 8000:80'
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