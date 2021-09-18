const router = require("express").Router()
const redisClient = require("../config/redisConfig")
const comments = require("../models/comment")
const {makeTree} =  require("../utilities/makeTree")

router.get("/" , cache, async (req , res) => {
    const allData = await comments.find({}).lean()
    const treeData = makeTree(allData)
    redisClient.set("tree" , JSON.stringify(allData))
    res.json({
        "tree" : treeData
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
