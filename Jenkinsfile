pipeline {
    // agent { dockerfile true }
    agent any

    tools{nodejs "node"}

    stages {
        stage("Build") {
            steps {
                bat "npm install"
                
            }
        }
      
    }
}