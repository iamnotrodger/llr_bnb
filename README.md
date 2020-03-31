**Group Member** </br>
Hongyi Lin, 300053082 </br>
Rodger Retanal, 300052309 </br>
Kangwei Liao, 8568800

<hr>

## Index
* [Overview](#overview)
* [Implementation](#implementation)
* [Guide](#guide)

<hr>

## Overview
   For this project, our group designed a Airbnb-like website. We call it LLR-BnB.
Hongyi Lin is the backend developer for this project. He is responsible for the server functionality and the database queries. Rodger Retanal is the middle man. He is responsible for connecting the UI and backend. Kangwei Liao is the UI designer. He is resposible for the website UI. 

- This website allows you to register as a Guest, Host, or Employee. You are automatically registered as a guest when you register. As a Guest, you are able to request bookings for properties as well as make reviews for properties. If you're booking reques gets approve by the Host, you can then pay for it in the 'Profile Page.' 
-In order to become Host you must register a property, you can register as much properties as you want. You can register a propoerty in the inital registration form or register a property in the 'Add Property Page.' As a host, you are able to to reject or approve booking request made by Guests. Keep in mind as Host you still hold the same functionality as a Guest. There is a dedicated query requirment page than did not fit with our project.

## Implementation
* Database Management System (DBMS): PostgreSQL
* Package Manager: NPM.
* Programming Language
    * UI: React.js along with HtML and CSS.
    * Backend/API: Node.js with Express.js Framework; using node-postgres module to connect to the PostgreSQL database.

## Guide
In order to run this website you would need NPM and Node.js installed in your system. These are the links to install them:
* [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)
* [https://nodejs.org/en/](https://nodejs.org/en/)

Summary:
1. Open up the airbnb and airbnb-api directory in seperate Terminal/command line.
2. Run `npm install` in the terminal/command line for both airbnb and airbnb-api directory.
3. Start a local host server.
   * Run `npm start` on the airbnb-api directory first. It is cruscial that the airbnb-api is running on port 3000.
   * Run `npm start` on the airbnb dirctory. Since the airbnb-api is running on port 3000 it will ask you to run in port 3001.
4. A window should open up your default browser with our website. If not search up 'localhost:3001' in your choosen browser.

The project consist of two directories: airbnb and airbnb-api. The airbnb directory contains all of the code for the User Interface, and the airbnb-api directory contains all of the code for the API/backend. To run this website both of these directories must be running.

* In order to run this website you need two Terminals/Command Line running: one terminal will be opened and dedicated for the aibnb directory and the second one will be opened and dedicated for the airbnb-api. 

    ![alt text](https://raw.githubusercontent.com/iamnotrodger/llr_bnb/master/photos/step1.png)

* After opening them you need to run the 'npm install' command for both airbnb and airbnb-api inorder to install the libraries/dependencies we used for this project. This should create a 'node_module' directory for both the airbnb and airbnb-api directory.


    ![alt text](https://raw.githubusercontent.com/iamnotrodger/llr_bnb/master/photos/step2.png)

* After installing all the libraries/dependencies you must run a localhost server for both the aribnb and airbnb-api. In order to do this you must run the command 'npm start.' You must run this command at the airbnb-api directory first because it is crucial that the airbnb-api server is running on port 3000 because that's where the UI makes it's call to the airbnb-api. After running 'npm start' on the airbnb-api directory you must run this command again on the airbnb directory. Since the aibnb-api is running on port 3000 it will ask you to run the airbnb server in port 3001.

    ![alt text](https://raw.githubusercontent.com/iamnotrodger/llr_bnb/master/photos/step3.png)
    ![alt text](https://raw.githubusercontent.com/iamnotrodger/llr_bnb/master/photos/step4.png)

* After both server is runnign a window should open up in your default browser with our website running on 'localhost:3001.' If not, search up 'localhost:3001' in your browser if you ran the airbnb server on port 3001.

    ![alt text](https://raw.githubusercontent.com/iamnotrodger/llr_bnb/master/photos/step5.png)

