# CSI2132 Group 1 Project Report
**Group Member** </br>
Hongyi Lin, 300053082 </br>
Rodger Retanal, 300052309 </br>
Kangwei Liao, 8568800

<hr>

## Index
* [Overview](#overview)
* [Implementation](#implementation)
* [DDLs](#ddls)
* [Guide](#guide)

<hr>

## Overview
   For this project, our group designed a Airbnb-like website. We call it LLR-BnB.
Hongyi Lin is the backend developer for this project. He is responsible for the server functionality and the database queries. Rodger Retanal is the middle man. He is responsible for connecting the UI and backend. Kangwei Liao is the UI designer. He is resposible for the website UI. 

- This website allows you to register as a Guest, Host, or Employee. You are automatically registered as a guest when you register. As a Guest, you are able to request bookings for properties as well as make reviews for properties. If you're booking reques gets approve by the Host, you can then pay for it in the 'Profile Page.' 
-In order to become Host you must register a property, you can register as much properties as you want. You can register a propoerty in the inital registration form or register a property in the 'Add Property Page.' As a host, you are able to to reject or approve booking request made by Guests. Keep in mind as Host you still hold the same functionality as a Guest.
   There is a dedicated query requirment page than did not fit with our project.

## Implementation
* Database Management System (DBMS): PostgreSQL
* Package Manager: NPM.
* Programming Language
    * UI: React.js along with HtML and CSS.
    * Backend/API: Node.js with Express.js Framework; using node-postgres module to connect to the PostgreSQL database.

## DDLs
```sql
CREATE TABLE usr
(
    uid serial,
    firstname varchar(35) NOT NULL,
    middlename varchar(35),
    lastname varchar(35) NOT NULL,
    email varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    phonenum character varying(15),
    created timestamp,
    country varchar(30),
    CONSTRAINT usr_pkey PRIMARY KEY (uid),
    CONSTRAINT email_unique UNIQUE (email),
    CONSTRAINT usr_country_fkey FOREIGN KEY (country)
        REFERENCES branch (country)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
```
```sql
CREATE TABLE guest
(
    uid integer NOT NULL,
    gid serial,
    CONSTRAINT guest_pkey PRIMARY KEY (uid, gid),
    CONSTRAINT unique_gid UNIQUE (gid),
    CONSTRAINT guest_uid_fkey FOREIGN KEY (uid)
        REFERENCES usr (uid)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
```
```sql
CREATE TABLE host
(
    uid integer NOT NULL,
    hid serial,
    CONSTRAINT host_pkey PRIMARY KEY (uid, hid),
    CONSTRAINT unique_hid UNIQUE (hid),
    CONSTRAINT host_uid_fkey FOREIGN KEY (uid)
        REFERENCES usr (uid)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
```
```sql
CREATE TABLE employee
(
    empid serial,
    uid integer NOT NULL,
    salary real,
    position varchar(30),
    CONSTRAINT employee_pkey PRIMARY KEY (empid, uid),
    CONSTRAINT employee_uid_fkey FOREIGN KEY (uid)
        REFERENCES usr (uid)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT position_check CHECK (position in ('employee', 'manager'))
)
```
```sql
CREATE TABLE login
(
    email varchar(255),
    password varchar(100),
    CONSTRAINT login_pkey PRIMARY KEY (email),
    CONSTRAINT login_email_fkey FOREIGN KEY (email)
        REFERENCES usr (email)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
```
```sql
CREATE TABLE branch
(
    country varchar(30),
    CONSTRAINT branch_pkey PRIMARY KEY (country)
)
```
```sql
CREATE TABLE property
(
    prid serial,
    address varchar(255),
    property_type varchar(25),
    hid integer,
    country varchar(30),
    title varchar(60),
    CONSTRAINT property_pkey PRIMARY KEY (prid),
    CONSTRAINT property_country_fkey FOREIGN KEY (country)
        REFERENCES branch (country)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT property_hid_fkey FOREIGN KEY (hid)
        REFERENCES host (hid)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT property_property_type_check CHECK (property_type in ('House', 'Apartment', 'Hotel', 'Bed and Breakfast'))
)
```
```sql
CREATE TABLE room
(
    prid integer NOT NULL,
    rmid serial,
    room_type varchar(30),
    bed_num integer,
    CONSTRAINT room_pkey PRIMARY KEY (prid, rmid),
    CONSTRAINT room_prid_fkey FOREIGN KEY (prid)
        REFERENCES property (prid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT room_room_type_check CHECK (room_type in ('bedroom', 'washroom'))
)
```
```sql
CREATE TABLE pricing
(
    prcid serial,
    guest_num integer,
    prid integer NOT NULL,
    price real,
    CONSTRAINT pricing_pkey PRIMARY KEY (prcid, prid),
    CONSTRAINT pricing_prid_fkey FOREIGN KEY (prid)
        REFERENCES property (prid)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
```
```sql
CREATE TABLE rental_agreement
(
    rtid serial,
    gid integer,
    hid integer,
    prid integer,
    signing varchar(30),
    start_date date,
    end_date date,
    signing_date date,
    CONSTRAINT rental_agreement_pkey PRIMARY KEY (rtid),
    CONSTRAINT rental_agreement_gid_fkey FOREIGN KEY (gid)
        REFERENCES guest (gid)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT rental_agreement_hid_fkey FOREIGN KEY (hid)
        REFERENCES host (hid)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT rental_agreement_prid_fkey FOREIGN KEY (prid)
        REFERENCES property (prid)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT rental_agreement_signing_check CHECK (signing in ('pending', 'approved', 'disapproved')),
    CONSTRAINT rental_agreement_check CHECK (start_date <= end_date)
)
```
```sql
CREATE TABLE payment
(
    pid serial,
    rtid integer NOT NULL,
    amount real,
    method varchar(30),
    status varchar(30),
    card_num numeric(16,0),
    CONSTRAINT payment_pkey PRIMARY KEY (pid, rtid),
    CONSTRAINT payment_rtid_fkey FOREIGN KEY (rtid)
        REFERENCES rental_agreement (rtid)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT payment_method_check CHECK (method in ('credit card', 'debit card')),
    CONSTRAINT payment_status_check CHECK (status in ('pending', 'completed'))
)
```
```sql
CREATE TABLE review
(
    rvid serial,
    gid integer,
    prid integer,
    rating real,
    communication integer,
    cleanliness integer,
    value integer,
    comment varchar(140),
    created timestamp,
    CONSTRAINT review_pkey PRIMARY KEY (rvid),
    CONSTRAINT review_gid_fkey FOREIGN KEY (gid)
        REFERENCES guest (gid)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT review_prid_fkey FOREIGN KEY (prid)
        REFERENCES property (prid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT review_rating_check CHECK (1.0 <= rating AND rating <= 5.0),
    CONSTRAINT review_communication_check CHECK (1 <= communication AND communication <= 5),
    CONSTRAINT review_cleanliness_check CHECK (1 <= cleanliness AND cleanliness <= 5),
    CONSTRAINT review_value_check CHECK (1 <= value AND value <= 5)
)
```

## Guide
In order to run this website you would need NPM and Node.js installed in your system. These are the links to install them:
- https://www.npmjs.com/get-npm
- https://nodejs.org/en/

Summary:
1. Open up the airbnb and airbnb-api directory in seperate Terminal/command line.
2. Run 'npm install' in the terminal/command line for both airbnb and airbnb-api directory.
3. Start a local host server.
   * Run 'npm start' on the airbnb-api directory first. It is cruscial that the airbnb-api is running on port 30000.
   * Run 'npm start' on the airbnb dirctory. Since the airbnb-api is running on port 30000 it will ask you to run in port     3001.
4. A window should open up your default browser with our website. If not search up 'localhost:3001' in your choosen browser.

The project consist of two directories: airbnb and airbnb-api. The airbnb directory contains all of the code for the User Interface, and the airbnb-api directory contains all of the code for the API/backend. To run this website both of these directories must be running.

* In order to run this website you need two Terminals/Command Line running: one terminal will be opened and dedicated for the aibnb directory and the second one will be opened and dedicated for the airbnb-api. 

![alt text](https://raw.githubusercontent.com/iamnotrodger/llr_bnb/master/photos/step1.png)

* After opening them you need to run the 'npm install' command for both airbnb and airbnb-api inorder to install the libraries/dependencies we used for this project. This should create a 'node_module' directory for both the airbnb and airbnb-api directory.


![alt text](https://raw.githubusercontent.com/iamnotrodger/llr_bnb/master/photos/step2.png)

* After installing all the libraries/dependencies you must run a localhost server for both the aribnb and airbnb-api. In order to do this you must run the command 'npm start.' You must run this command at the airbnb-api directory first because it is crucial that the airbnb-api server is running on port 3000 because that's where the UI makes it's call to the airbnb-api. After running 'npm start' on the airbnb-api directory you must run this command again on the airbnb directory. Since the aibnb-api is running on port 30000 it will ask you to run the airbnb server in port 30001.

![alt text](https://raw.githubusercontent.com/iamnotrodger/llr_bnb/master/photos/step3.png)
![alt text](https://raw.githubusercontent.com/iamnotrodger/llr_bnb/master/photos/step4.png)

After both server is runnign a window should open up in your default browser with our website running on 'localhost:3001.' If not, search up 'localhost:30001' in your browser if you ran the airbnb server on port 3001.

![alt text](https://raw.githubusercontent.com/iamnotrodger/llr_bnb/master/photos/step5.png)

