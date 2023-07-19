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
                sh './Jenkins/scripts/test.sh'
            }
      
    }
}