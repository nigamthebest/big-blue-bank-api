## Author Ankit Nigam
## Course CT70A9130_15.04.2020 Software Development Skills: Back-End of LUT
**This is a Project to build REST APIs for a Movie Catalog and Review Service  Using Node JS**


In this Project I have used [express.js](https://expressjs.com/) framework for the REST API Logic and [MONGODB](https://www.mongodb.com/) for persistance

---
## How to Start Mongo DB as a docker image 
1. Ensure you have docker installed on your machine
2. Get Mongo Docker image **docker pull mongo**
3. Run mongo docker image **docker run -d -p 27017-27019:27017-27019 -v mongo_data_dir:/data/db mongo**
4. Import seed data to mango DB database by running **./init-db-sh** from the directory **db** under the main directory
5. Connect to Mongodb to verify if data is imported **mongo mongodb://localhost/movie_db**
6. Veify number of objects inserted in movies collection **db.movies.find().count()** this should return 2
---
## How to Install and Run the Project

You’ll start by editing this README file to learn how to edit a file in Bitbucket.

1. Clone the Repo **git clone https://ankitnig@bitbucket.org/ankitnig/ankit-nigam-course-work-for-sw-dev-backend.git** on the local machine.
2. Ensure you have **node** and **npm** installed on the machine
3. Go to the directory **cd ankit-nigam-course-work-for-sw-dev-backend** using terminal
4. Run **npm install** this should install all the required dependencies
5. Run **npm start** this should start the application this will start the application rnning on **http://localhost:3000/movies**
6. To Test User registration and Login you can hit the application with **curl** like this **curl --location --request POST 'localhost:3000/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email_address": "{Set a Unique Username}",
    "password": "{password of your choice}",
    "first_name":"John",
    "last_name":"Smith"
}'** this should return a JWT token response like this **{
    "access_tokenith": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYW5raXQxMjM1NjRAb3V0bG9vay5jb20ifSwiaWF0IjoxNTkyNDUxNDkwLCJleHAiOjE1OTI0NjE0OTB9.fZCUhzCJEUsvI-SryM2MUVnkOTfGR2vvmmhkuq94yMQ"
}**
7. Similarly for doing Authentication for the registered user with **curl** like this **curl --location --request POST 'localhost:3000/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email_address": "{Username}",
    "password": "{password of your choice}"
}'** this should return a JWT token response like this **{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYW5raXQxMjM1NjRAb3V0bG9vay5jb20ifSwiaWF0IjoxNTkyNDUxNDkwLCJleHAiOjE1OTI0NjE0OTB9.fZCUhzCJEUsvI-SryM2MUVnkOTfGR2vvmmhkuq94yMQ"
}**
7. You have to use the access_token you get from the Login or the registration API end points to call the Movie Listing end point here is how you can do it with Curl **curl --location --request GET 'http://localhost:3000/movies' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYW5raXQxMjM1NjRAb3V0bG9vay5jb20ifSwiaWF0IjoxNTkyNDUzNTAwLCJleHAiOjE1OTI1Mzk5MDB9.z7lfNnUiVvmNBxVWr7RrP76HiOlCpW3f7LMf7TYYJC8'**

