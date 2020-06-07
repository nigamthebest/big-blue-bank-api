**This is a Project to build REST APIs for a Movie Catalog and Review Service  Using Node JS**

In this Project I have used [express.js](https://expressjs.com/) framework for the REST API Logic and [MONGODB](https://www.mongodb.com/) for persistance



---

## How to Install and Run the Project

You’ll start by editing this README file to learn how to edit a file in Bitbucket.

1. Clone the Repo **Source** on the left side.
2. Click the README.md link from the list of files.
3. Click the **Edit** button.
4. Delete the following text: *Delete this line to make a change to the README from Bitbucket.*
5. After making your change, click **Commit** and then **Commit** again in the dialog. The commit page will open and you’ll see the change you just made.
6. Go back to the **Source** page.

---
## How to Start Mongo DB as a docker image 
1. Get Mongo Docker image **docker pull mongo**
2. Run mongo docker image **docker run -d -p 27017-27019:27017-27019 -v mongo_data_dir:/data/db mongo**
3. Import seed data to mango DB database by running **./init-db-sh**
4. Connect to Mongodb to verify if data is imported **mongo mongodb://localhost/movie_db**
5. Veify number of objects inserted in movies collection **db.movies.find().count()** this should return 2
## How to Run the Application 
1. 
