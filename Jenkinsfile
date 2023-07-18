pipeline {
    agent { dockerfile true }

    tools{nodejs "node"}

    stages {
        stage("Build") {
            steps {
                bat "npm install"
            }
        }
      
    }
}