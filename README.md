# UOA Dessert Society's Members Mobile App.
Established in 2021.

## Team Leadership

- Kinzi Ceolin (Project Manager)
- Avikash Naidu (Tech Lead)

## How users can get started with the project 

WINDOWS:

1.Remove all versions of node from device if it exists
2.Utilise Node Version Manager and install npm and node 
	Node Version Manager – nvm Install Guide https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/ 
3.If your node version is above 18 or below 16, switch to node version 16.14.2 
	Some other versions not tested by the team may also work 
4.Install yarn 
	Installation | Yarn https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
5.Clone the repo
6.Open terminal inside the client folder and run ‘yarn install’ to install dependencies 
7.Go inside client folder and create a file called ‘.env’ with the following content
	BASE_URL=http://localhost:9002
	API_KEY=AIzaSyCrlN9M3inv_lDEqBoa3AodLxhpvYd_iwI
8.Go to the server folder and open terminal and run ‘yarn install’ to install necessary packages
9.In MongoDB, Security → Database Access, click + Add New Database User
	Choose ReadAndWriteAdmin in Built-in role 
	Fill the other information and click Add User 
10.Go inside server folder and create a file called ‘.env’ with the following content
(Replace UserName and Password with the actual username and password of the mongodb database user you have created in step 9)
	MONGODB_URI = mongodb+srv://{UserName}:{Password}@uads-cluster.sw67y.mongodb.net/ retryWrites=true&w=majority
	PORT = 9002
	NODE_ENV = development
11.Run ‘npm install mongodb’
12.Run ‘yarn run dev’ to start on default port 9002
13.Go back to client folder terminal and run ‘yarn start’ then follow expo instructions


Mac:
Utilise Node Version Manager and install npm and node
Install yarn 
Text: Node Version Manager – nvm Install Guide 
Video: Installation | Yarn 
Check yarn version by ‘yarn --v’
 If the version is not 1.22.4, run ‘yarn set version 1.22.4’ yarn set version 
Some other earlier versions not tested by the team may also work
Clone the repo
Open terminal under the client folder  ‘cd client’
Run ‘yarn’ or ‘yarn install’ to install dependencies (This step will take a while)
Go inside client folder and create a file called ‘.env’ with the following content
BASE_URL=http://localhost:9002
API_KEY=AIzaSyCrlN9M3inv_lDEqBoa3AodLxhpvYd_iwI
Open terminal under the server folder ‘cd server’
Run ‘yarn’ or ‘yarn install’ to install dependencies  (This step will take a while)
In MongoDB, Security → Database Access, click + Add New Database User
Choose ReadAndWriteAdmin in Built-in role 
Fill the other information and click Add User 
Go inside server folder and create a file called ‘.env’ with the following content
MONGODB_URI = mongodb+srv://{UserName}:{Password}@uads-cluster.sw67y.mongodb.net/ retryWrites=true&w=majority
PORT = 9002
NODE_ENV = development
Run ‘npm install mongodb’
Run ‘yarn run dev’ to start on default port 9002
Go back to client folder terminal 
Run ‘yarn start’ 
Follow expo instructions to open the web page (click w) 

Node versions that have been tested working:
(above or equal to v12 and below or equal to v16)
16.14.2
16.16.0
16.20.0
Troubleshooting:
QR Code generated in terminal in client does not work
Iphone mode does not work
If some steps were redone and problems occurred running ‘yarn run dev’ or ‘yarn start’, try delete the mode_modules folder in both client and server, run ‘yarn cache clean’, and install all dependencies again
If cleaning cache does not work, delete the repo and clone it again

