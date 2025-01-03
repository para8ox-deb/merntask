pipeline {
    agent any
    tools {
        nodejs 'sonarnode' 
    }

    environment {
        NODEJS_HOME = 'C:\\Program Files\\nodejs'  
        SONAR_SCANNER_PATH = 'C:\\Users\\Aakash\\Downloads\\sonar-scanner-cli-6.2.1.4610-windows-x64\\sonar-scanner-6.2.1.4610-windows-x64\\bin'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                set PATH=%NODEJS_HOME%;%PATH%
		npm ci
  		npm install
                '''
            }
        }

	stage('Debug ESLint Plugins') {
 		steps {
		 // Check if eslint-plugin-react is installed
		 bat '''
		 set PATH=%NODEJS_HOME%;%PATH%
		 npm list eslint-plugin-react || echo "eslint-plugin-react not found"
		 '''
 		}
 	}

        stage('Lint') {
            steps {
                bat '''
                set PATH=%NODEJS_HOME%;%PATH%
                npm run lint
                '''
            }
        }

        stage('Build') {
            steps {
                bat '''
                set PATH=%NODEJS_HOME%;%PATH%
                npm run build
                '''
            }
        }

        stage('SonarQube Analysis') {
            environment {
                SONAR_TOKEN = credentials('sonar-token') 
            }
            steps {
                bat '''
                set PATH=%SONAR_SCANNER_PATH%;%PATH%
                where sonar-scanner || echo "SonarQube scanner not found."		
		sonar-scanner -Dsonar.projectKey=merntask ^
				-Dsonar.sources=. ^
				-Dsonar.host.url=http://localhost:9000 ^
				-Dsonar.token=%SONAR_TOKEN%
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
