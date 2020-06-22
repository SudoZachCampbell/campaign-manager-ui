pipeline {
  agent any 
  stages {
    stage('Clean') {
      steps {
        sh 'docker container ls -a'
        sh 'docker container rename ddcatalogueui ddcatalogueui_old || true'
        sh 'docker container stop ddcatalogueui_old || true'
        sh 'docker container ls -a'
      }
      post {
        failure {
            echo 'This build has failed. See logs for details.'
            sh 'docker container rename ddcatalogueui_old ddcatalogueui || true'
        }
      }   
    }
    stage('Build') {
      steps {
        sh 'docker build -t ddcatalogueui:latest .'
        sh 'docker image ls -a'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker ps -aqf "ancestor=ddcatalogueui" | xargs docker stop | xargs docker rm || true'
        sh 'docker run -dit -p 80:3000 --name ddcatalogueui ddcatalogueui'
        sh 'docker container ls -a'
        sh 'docker container rm ddcatalogueui_old || true'
      }
      post {
        failure {
            echo 'This build has failed. See logs for details.'
            sh 'docker container rename ddcatalogueui_old ddcatalogueui || true'
        }
      }   
    }
  }
}