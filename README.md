
---

# MazeCrawler # 
 
---

This goal of this project is to learn about the MERN stack. The final goal is to make a text-based adventure game that you can play co-operatively with friends.

---

( I don't know if things will work right out of the box, so here is how to manually set up and run the project. You might not have to download anything yourself, but you will definitely use the following commands to run the project. )

---

To use this application, you need to have Node installed on your computer as well as React, Express, and the Mongodb Node library (these can be brought in using npm after Node is installed).

You will also have to have mongodb-community installed separately from the project to run in the background. I installed mongodb using brew -> brew install mongodb-community . You might have to google how to do it yourself if not on a mac.

React libraries will need to be in the client/maze-crawler-frontend folder (I believe), and to start the frontend use the command -> npm start.

Express and Mongodb Library need to be in the server folder. to start the backend use the command -> node serverApp.js .

---

## An important thing to know is that the database needs to be started before the server! ##

---

I use brew to run the database as a service like this -> brew services start mongodb-community , but if you have mongodb installed by anything other than brew, then you will have to start it in a different manner. To stop the service I use the command -> brew services stop mongodb-community. You may have to google this part if not using brew.

---

## caution: ##
The version of mongodb that I am using is mongodb-community, which runs locally on your machine. If you want to use 
the cloud service (mongodb atlas), then you will need to change the code to be compatible. All the code changes should take place in the server folder -> in the file serverApp.js -> in the section called "setting up mongodb".

---

# How The Project is Laid Out #

---

## Frontend ##

- src: this contains all of the files that contribute to building and making the front-end
    * components: these make up the ui elements as well as defining their behavior. Each component is exported and used by App.js

    * services: this is the socket stuff needed for the frontend as well as the command parser that is used in the components

    * App.js: this is the highest level components that calls all the other components from the components folder

    * css: App.css holds all the styling for the ui. This includes styling for App.js as well as every component in the components folder

    * index.css: this is some default css stuff provided by react for index.js - doesn't do much other then specify some fonts

    * index.js: this is what instantiates the React-dom and is responsible for passing App.js to React. This is the entry point to the application, but there is no need to mess with it. All edits should be done in App.js or in the components.

---

# Backend #

---

- server: this is where all the programs that make up the backend service are located

    + serverApp.js: this is the backend program that runs. It is the only one, and is the entry point for the backend.

---

# Database #

---

The database used is mongodb community, this runs locally on the machine running the project and needs to be installed separately. If you want to use the atlas service, then you will have to update the code to accommodate that change.

---

# How To Use #

---

1) start the database

2) start the server and front-end (order does not matter)

3) open in browser - if project not responding make sure that the url is the same as the origin field inside of the cors object. it will be some location like localhost followed by port 3000.

4) to use the site use the input bars and submit buttons to send messages to the display and the chat window.
    - the display window is for sending commands to the server to login and play the game
        + note that to send commands to the server you have to be logged in. So far the only commands recognized are run, walk, north, east, south, west. Experiment writing sentences of what you want to do that include those words. 
        
        + to login either type login or new user to make a new account. It will ask for your username and password to verify your account. just follow the prompts and you'll be good.
    
    - the chat window is for sending chats to other people on the server
        
        + note that you have to be logged in to send chat messages


5) prepare to be bored. There is no game setup yet, so the commands do nothing, but if you set the host address to your local ip address instead of localhost, then you can have other people on the same network as you load the application on their computers as well. 

    - note that if you want to do this, then you need to update this in both the services/socketService.js file and in the server/serverApp.js file inside of the cors origin field. The ports should not be changed unless you know what you are doing, but you can specify new ip addresses. The ip address used in both files should be the same.

---
