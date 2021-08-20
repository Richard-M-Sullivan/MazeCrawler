# MazeCrawler
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
