pipeline {
    agent any
    stages {
        stage('Build Image') {
            environment {
                REACT_APP_SERVER_URL = 'http://localhost:53596'
            }
            steps {
                sh 'docker container rename dndclient dndoldclient || true'
                sh 'docker-compose build'
            }

            post {
                failure {
                    echo 'This build has failed. See logs for details.'
                    sh 'docker container rename dndoldclient dndclient || true'
                }
            }
        }
        stage('Deploy') {
            environment {
                REACT_APP_SERVER_URL = 'http://localhost:53596'
            }
            steps {
                sh 'docker rm --force dndoldclient || true'
                sh 'docker-compose up -d'
            }

            post {
                failure {
                    echo 'This build has failed. See logs for details.'
                }
            }
        }
    }
}