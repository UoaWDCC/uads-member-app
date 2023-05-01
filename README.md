# UOA Dessert Society's Members Mobile App.
Established in 2021.

## Team Leadership

- Kinzi Ceolin (Project Manager)
- Avikash Naidu (Tech Lead)

## How users can get started with the project 

### WINDOWS:<br>

1. Remove all versions of node from device if it exists<br>
2. Utilise Node Version Manager and install npm and node <br>
	> [Node Version Manager – nvm Install Guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) <br>
3. If your node version is above 18 or below 16, switch to node version 16.14.2 
	> Some other versions not tested by the team may also work <br>
4. Install yarn <br>
	> [Installation | Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)<br>
5. Clone the repo<br>
6. Open terminal inside the client folder and run ‘yarn install’ to install dependencies <br>
7. Go inside client folder and create a file called ‘.env’ with the following content<br>
	> *BASE_URL=http://localhost:9002*<br>
	> *API_KEY=AIzaSyCrlN9M3inv_lDEqBoa3AodLxhpvYd_iwI*<br>
8. Go to the server folder and open terminal and run ‘yarn install’ to install necessary packages<br>
9. In MongoDB, Security → Database Access, click + Add New Database User<br>
	> Choose ReadAndWriteAdmin in Built-in role <br>
	> Fill the other information and click Add User <br>

10. Go inside server folder and create a file called ‘.env’ with the following content<br>
(Replace UserName and Password with the actual username and password of the mongodb database user you have created in step 9)<br>
> *MONGODB_URI = mongodb+srv://{UserName}:{Password}@uads-cluster.sw67y.mongodb.net/ > retryWrites=true&w=majority*<br>
> *PORT = 9002*<br>
> *NODE_ENV = development*<br>
11. Run ‘npm install mongodb’<br>
12. Run ‘yarn run dev’ to start on default port 9002<br>
13. Go back to client folder terminal and run ‘yarn start’ then follow expo instructions<br>


### Mac:<br>

1. Utilise Node Version Manager and install npm and node<br>
2. Install yarn <br>
	> Text Instruction: [Node Version Manager – nvm Install Guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)<br>
	> Video Instruction: [Installation | Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)<br>
3. Check yarn version by ‘yarn --v’<br>
	>If the version is not 1.22.4, run ‘yarn set version 1.22.4’ yarn set version<br> 
	Some other earlier versions not tested by the team may also work<br>
4. Clone the repo<br>
5. Open terminal under the client folder  ‘cd client’<br>
	> Run ‘yarn’ or ‘yarn install’ to install dependencies (This step will take a while)<br>
6. Go inside client folder and create a file called ‘.env’ with the following content<br>
	> *BASE_URL=http://localhost:9002*<br>
	> *API_KEY=AIzaSyCrlN9M3inv_lDEqBoa3AodLxhpvYd_iwI*<br>
7. Open terminal under the server folder ‘cd server’<br>
	> Run ‘yarn’ or ‘yarn install’ to install dependencies  (This step will take a while)<br>
8. In MongoDB, Security → Database Access, click + Add New Database User<br>
	> Choose ReadAndWriteAdmin in Built-in role <br>
	> Fill the other information and click Add User <br>
9. Go inside server folder and create a file called ‘.env’ with the following content<br>
	> (Replace UserName and Password with the actual username and password of the mongodb database user you have created in step 9)<br>
	> *MONGODB_URI = mongodb+srv://{UserName}:{Password}@uads-cluster.sw67y.mongodb.net/ retryWrites=true&w=majority*<br>
	> *PORT = 9002*<br>
	> *NODE_ENV = development*<br>
10. Run ‘npm install mongodb’<br>
11. Run ‘yarn run dev’ to start on default port 9002<br>
12. Go back to client folder terminal <br>
	> Run ‘yarn start’ <br>
	> Follow expo instructions to open the web page (click w) <br>

### Node versions that have been tested working:<br>
(above or equal to v12 and below or equal to v16)<br>
16.14.2<br>
16.16.0<br>
16.20.0<br>

### Troubleshooting:<br>
1. QR Code generated in terminal in client does not work<br>
2. Iphone mode does not work<br>
3. If some steps were redone and problems occurred running ‘yarn run dev’ or ‘yarn start’, try delete the mode_modules folder in both client and server, run ‘yarn cache clean’, and install all dependencies again<br>
4. If cleaning cache does not work, delete the repo and clone it again<br>

*** 
