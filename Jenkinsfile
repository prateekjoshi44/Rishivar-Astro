pipeline {
    agent { label 'HostingerSlave'}
    environment {
        CONTAINER_NAME = 'rishivar-astro-react-app'
    }
    stages {
        stage('Build') {
            steps {
                script {
                    sh "docker build -t ${CONTAINER_NAME} ."
                }
            }
        }
        stage('Stop') {
            steps {
                script {
                    sh "docker-compose down"
                }
            }
        }
        stage('Start') {
            steps {
                script {
                    sh "docker-compose up -d"
                }
            }
        }
    }
}
