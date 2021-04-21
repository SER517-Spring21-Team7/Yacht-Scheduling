# Yacht-Scheduling
## Overview
The concept of fractional yachting is a game-changer and one that is rapidly being adopted in the recreational marine industry. The Yacht Solutions is one of the pioneering organizations worldwide supporting the lifestyle supported by yacht dealerships and luxury yacht manufacturers around the world. The fractional yachting system allows the members the satisfaction of access to beautiful late model yachts, without all of the day-to-day responsibilities normally associated with ownership. Currently, The Yacht Solutions uses a third-party application for its fractional yachting business. Using the third-party application to operate the growing fractional yachting business can be very expensive. Apart from additional expenses on adding new watercraft and members, the application can only provide general features required in the industry. Overcoming the functionality restriction while cutting the operation cost market is one of the main driving forces behind this project. We, Team 7, as a part of our capstone project plan on delivering an application that would migrate the fractional yachting business completely in-house with minimal maintenance and operation cost. It will also provide the flexibility to make changes as the market needs evolve. We will be using Amazon Web Services to run this web application; it can be accessed directly from The Yacht Solution website. It is expected that this application will be used by the back-office administrators for watercraft and membership-related administrative functions, and members of the system for watercraft reservation-related functions.
## Installation Guide
### Database requirement
You need to configure a postgreSQL database and provide the connection details in *tys_webserver/src/main/resources/application.properties*. This database can be local or on the cloud, we have used AWS RDS to host our database the connection details can be found in the source code.
### Local Development
**Environment setup**

To run the server side application you must have Java, Maven and Spring installed on your development system. If you are using an IDE such as Eclipse, maven comes by default and spring plugin can be downloaded from here. We recommend working with an IDE for development purposes to make things easier. In case you want to configure the environment from scratch please follow the steps below.
- Install Java JDK by following the instructions from here.
- Install maven by following the instructions from here.
- Install spring by following the instructions from here.
- Install Node.js with npm by following the instructions from here.

Additionally, you will need to install Git to work with the source code.

**Source code**

The source code can be found at Yacht-Scheduling git repository.
- Clone the repository
*git clone https://github.com/SER517-Spring21-Team7/Yacht-Scheduling.git*
- Switch to develop branch before making any changes in the source code
*git checkout develop*

**Installation & running**

- Navigate to the *tys_webclient* directory
- Run *npm install*
- Run *npm start* - The client should start on localhost:3000
- Navigate to the *tys_webserver* directory and open in IDE
- Build the java project directly from the IDE
- Run java project as spring boot app directly from IDE, *Run As > Spring Boot App* - The server should start on localhost:8080

### Production
**Environment setup**

You need to have an AWS account and basic understanding of AWS services for production deployment.
- Create an EC2 instance and allow traffic on the 8080 port - Note down public IP.
- Make sure Java (runtime environment) is installed on the EC2 system.
- Create a S3 bucket and make it publically accessible.
- Configure S3 bucket to host a static website - Note down website URL.

Additionally, you also need to have local development environment setup (see above) to help clone the code and build the deployable packages.

**Source code**

The source code can be found at Yacht-Scheduling git repository.
- Clone the repository
*git clone https://github.com/SER517-Spring21-Team7/Yacht-Scheduling.git*
- Create a branch name “deploy” and switch to the new branch
*git branch deploy*
*git checkout deploy*
- Make changes in the client side to point API to EC2 instance public IP.
- Make changes in the server side to allow CORS from S3 static website URL.

**Installation**

- Navigate to the *tys_webclient* directory
- Run *npm clean install* - This will clean and deps and install them again
- Run *npm build* - This will generate a build directory with all the client side code.
- Navigate to the *tys_webserver* directory and open in IDE
- Build the java project directly from the IDE, *Run as > Maven Build* - This will create a .jar file with compiled server side code in the target directory.

**Deployment**

- Upload everything from build directory to the root of S3 bucket
- Make sure index.html is at the root of S3 bucket
- Copy .jar file to any directory on EC2 instance

**How to run**

- Run server on EC2 *java -jar /path/to/jarfile/filename.jar* add & at end of command to run the service in background.
You do not need to run anything in S3, just hit the URL and the application should work.

----------------------------------------------------------------------------------------------------------------------
