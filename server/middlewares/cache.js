const redisClient = require("../config/redisConfig")


async function cache(req, res, next) {
  const post = req.params.postId
  redisClient.get('post '+ post._id.toString(), (err, data) => {
    if (err) {
      throw err;
    } else if (data !== null) {
      res.json({
        tree: JSON.parse(data),
      });

      return;
    } else {
      next();
    }
  })
}

function rebaseRedis(req , res , next){
  const postId = req.params.postId
  redisClient.del("post "+postId.toString())
  next()
}

module.exports = {
  cache,
  rebaseRedis
}