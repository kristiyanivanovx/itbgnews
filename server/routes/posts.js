const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const posts = [
        {
            id: 1,
            title: 'System76 Pangolin Linux-first laptop with AMD internals now in stock',
            fullURL: 'https://system76.com/laptops/pangolin',
            shortURL: 'system76.com',
            creatorUsername: 'sampling',
            commentsCount: 123,
            upvotesCount: 9,
            dateCreated: '29-08-2021',
        },
        {
            id: 2,
            title: 'Tor is a great sysadmin tool (2020)',
            fullURL: 'https://www.jamieweb.net/blog/tor-is-a-great-sysadmin-tool/',
            shortURL: 'jamieweb.net',
            creatorUsername: 'azalemeth',
            commentsCount: 6,
            upvotesCount: 6,
            dateCreated: '31-08-2021',
        },
        {
            id: 3,
            title: 'Apple banned a pay equity Slack channel',
            fullURL: 'https://www.theverge.com/2021/8/31/22650751/apple-bans-pay-equity-slack-channel',
            shortURL: 'theverge.com',
            creatorUsername: 'jbredeche',
            commentsCount: 0,
            upvotesCount: 3,
            dateCreated: '30-08-2021',
        },
    ];

    res.json(posts);
});

router.post('/create', (req, res) => {
    console.log(req.body)
})

module.exports = router;
