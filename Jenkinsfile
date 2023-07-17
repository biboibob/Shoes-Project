pipeline {
    agent {
        docker {
            image 'node:17-alpine'
            args '-p 8000:80'
        }
    }
    environtment {
        CI = "true"
    }
    stages {
        stage("Build") {
            steps {
                sh "npm install"
            }
        }
      
    }
}