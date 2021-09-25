# itbgnews

Project of the web development study group in IT Bulgaria

Used for a starting point - https://github.com/bradtraversy/react_express_starter

## How to start (React + Express)

```bash
# Install dependencies for server
npm run server-install

# Install dependencies for Next
npm run client-install

# Run the Express server and Next server concurrently
npm run dev
```

## How to configure the Docker images

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
