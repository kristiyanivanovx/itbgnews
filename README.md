# itbgnews

Project of the web development study group in IT Bulgaria.

![itbgnews design](./assets/itbgnews.svg)

## How to configure, install & start the application (React + Express + Redis + MongoDB)

You will need Node.js version 14. Check it with `node -v`.

Other than that, you will also need MongoDB and Redis. 
- Redis [mandatory]:
    - Quick Start: https://redis.io/topics/quickstart.
    - Installation: https://redis.io/download (Windows - https://github.com/dmajkic/redis/downloads)


- MongoDB [mandatory] (If you have Docker installed, you could spin up a container with MongoDB):
    - docker run -it -p 27017:27017 -v ${pwd/server/db}:/mongo/db mongo:4.0.4
    - ... or install it directly on your machine


- Cloudinary [mandatory]
    - Register at https://cloudinary.com/, choose the free plan. Save your credentials for later.


- SendGrid (needed for email sending)
   - Register at https://sendgrid.com/, verify your account. Create a single sender and then an API Key. Save it for later.


- Redis (only needed for deployment in production)
  - Register at https://redis.com, verify your account. Choose a plan (there is a free option). Save your credentials for later.


- MongoDB (only needed for deployment in production)
    - Register at https://account.mongodb.com/, verify your account. 
  Create a free database with the name `itbgnews` and save the connection string for later. Should look like: `mongodb+srv://xyz:abc@orgnmae/itbgnews?retryWrites=true&w=majority`


### Environment Variables and Configuration
Create a new file in the `/server/` directory, called `.env`. You could use `.env.example` for a starting point.

In a Node.js interpreter (starts up by typing `node` in the terminal), run `crypto.randomBytes(60).toString('hex')` twice. 

Use the first value for `JWT_ACCESS_SECRET` and the second one for `JWT_REFRESH_SECRET`.

You could change `JWT_ACCESS_TIME` and `JWT_REFRESH_TIME` to your liking. Using shorter durations is advised.

----

If you plan to deploy the app, you will need to configure few more things:
- Provide a value for `DATABASE_URL` either in the .env file, or from the platform you're using.
- Provide values for `CLOUDINARY_NAME`, `CLOUDINARY_URL`, `CLOUDINARY_SECRET` either in the .env file, or from the platform you're using.
- Provide values for `SENDER_EMAIL` (the one you've registered in SendGrid and created the Single Sender with) and `MAIL_API` (your API Key).
- Provide values for `REDIS_HOST`, `REDIS_PORT` and `REDIS_PASSWORD`.
- Provide values for `REMOTE_FRONTEND_HOST` and `REMOTE_BACKEND_HOST`.

### Running the application

```bash
# Install dependencies for server (in project root folder)
npm run server-install

# Install dependencies for Next  (in project root folder)
npm run client-install

# Start redis (Linux, on windows start the redis-server.exe)
redis-server

# start up MongoDB this way or use your local installation
docker run -it -p 27017:27017 -v ${pwd/server/db}:/mongo/db mongo:4.0.4

# Run the Express server and Next server concurrently (in project root folder)
npm run dev
```

Now, the Next.js application should be up and running on the following address: http://localhost:3000

For the Express.js API, the address should be: http://localhost:5000/

## How to build the Docker images and start the app

Notes: 
- Change the `host` value in `/server/config/redisConfig.js` from `127.0.0.1` to `redis`.
- Change the `connectionString` value in `/server/config/mongooseConfig.js` from `localhost` to `mongodb`.
- Set `NODE_ENV=development` in both `/server/Dockerfile` and `/client/Dockerfile`
```bash
docker build -t "itbgnews-server" ./server/ --no-cache
```

```bash
docker build -t "itbgnews-client" ./client/ --no-cache
```

```bash
docker-compose up
```

## API Usage Documentation (by Jora)

## ================ Routes ================

--------------------------- Posts -----------------------------

GET      /posts/?page=1&limit=5 => returns posts post by page and limit

GET      /posts/comments => returns the post and comments of post with id req.body must have (post_id)

POST     /posts => creating a post req.body must have (formText && formUrl)

PATCH    /posts => updating a post req.body must have (post_id && (formText || formUrl))

DELETE   /posts/ => deletes a post post by id req.body must have (post_id && user_id) (does not remove it from the server)

PATCH    /posts/upvote => adds/removes an upvote req.body must have (post_id && user_id)

--------------------------- Comments --------------------------

POST     /comments => creating a comment to a post, req.body must have (parent_post_id && author_id && (parent_comment_id || null) && formText)

PATCH    /comments => updating a comment req.body must have (comment_id && formText)

DELETE   /comments => deletes a comment by id req.body must have (comment_id) (does not remove it from the server)

PATCH    /comments/upvote => adds/removes an upvote req.body must have (comment_id && user_id)

## ================ Error Statuses ================
400 - User gave wrong(bad) data.

201 - Succsessfully created an object

200 - Everything was Successful

404 - Object not found

500 - Serverside problem

304 - Not Modified

405 - Method not allowed
