pipeline {
  agent{
      any
  }
  environment {
    DOCKER_IMAGE = 'shahdelwan/binary2dec'
    DOCKER_TAG = "${env.BUILD_NUMBER}"
  }
  stages{
      stage('Fetch code from github repo')
      {
        steps{
            git branch: 'main',
            url: 'https://github.com/shahdelwan0/Binary2Decimal.git'
        }
      }
      stage("Build docker image") 
      {
        steps {
          script {
            docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
          }
        }
      }
      stage("push to docker hub") 
      {
        steps {
          script {
            docker.withDockerRegistry('', 'dockerhub-credentials') {
              docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
              docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push('latest')
            }
          }
        }
      }
      stage('deploy') {
        steps{
            sh """ 
              docker stop binary2dec || true
              docker rm binary2dec || true
              docker run -d --name binary2dec -p 80:80 ${DOCKER_IMAGE}:${DOCKER_TAG}
            """
        }
      }
  }
  post{
      success {
        echo 'Deployment successful'
      }
      failure {
        echo 'Deployment failed'
      }
  }


}