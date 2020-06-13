**This is a Project to build REST APIs for a Movie Catalog and Review Service  Using Node JS**

In this Project I have used [express.js](https://expressjs.com/) framework for the REST API Logic and [MONGODB](https://www.mongodb.com/) for persistance



---

## How to Install and Run the Project

You’ll start by editing this README file to learn how to edit a file in Bitbucket.

1. Clone the Repo **git clone https://ankitnig@bitbucket.org/ankitnig/ankit-nigam-course-work-for-sw-dev-backend.git** on the local machine.
2. Ensure you have **node** and **npm** installed on the machine
3. Go to the directory **cd ankit-nigam-course-work-for-sw-dev-backend** using terminal
4. Run **npm install** this should install all the required dependencies
5. Run **npm start** this should start the application this will start the application rnning on **http://localhost:3000/movies**


---
## How to Start Mongo DB as a docker image 
1. Ensure you have docker installed on your machine
2. Get Mongo Docker image **docker pull mongo**
3. Run mongo docker image **docker run -d -p 27017-27019:27017-27019 -v mongo_data_dir:/data/db mongo**
4. Import seed data to mango DB database by running **./init-db-sh** from the directory **db** under the main directory
5. Connect to Mongodb to verify if data is imported **mongo mongodb://localhost/movie_db**
6. Veify number of objects inserted in movies collection **db.movies.find().count()** this should return 2
## How to Run the Application 
1. Cline 
