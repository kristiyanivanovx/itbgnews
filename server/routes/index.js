const router = require("express").Router()
const {makeTree} = require("../utilities/makeTree")
const redisClient = require("../config/redisConfig")
const comments = require("../models/comment")
router.get("/" , cache, async (req , res) => {
    const alldata = await comments.find({})
    redisClient.set("tree" , JSON.stringify(makeTree(alldata)))
    res.json({
        "tree" : alldata
    })
})


// this is for caching tree
async function cache(req , res , next){
    redisClient.get("tree" , (err , data) => {
        if (err) {
            throw err
        }else if(data !== null){
            res.json({
                "tree" : JSON.parse(data)
            })
            return
        }else{
            next()
        }
    })
}


module.exports = router
