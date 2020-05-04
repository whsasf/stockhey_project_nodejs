pipeline {
    agent {
        docker {
            image 'node:10.16'
            args '--name stockhey -p 8087:3000'
        }
    }
    triggers {
        GenericTrigger(
	        genericVariables: [
	            [key: 'ref',value: '$.ref']
	        ],

            token: 'secret',

	        causeString: 'Triggered on $ref',
            printContributedVariables: true,
	        printPostContent: true
	    ) 
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Deliver') { 
            steps {
                sh 'npm start & echo $! > .pidfile' 
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh 'kill $(cat .pidfile)'
            }

        }
    }
}
