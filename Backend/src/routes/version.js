const { json } = require('body-parser');
const { Router } = require('express');
const router  = Router();
const pkg = require('../../package.json');
const array = [
    "body-parser",
    "cors",
    "express",
    "faker",
    "mongodb",
    "mongoose",
    "morgan",
    "nodemon"
]
router.get('/', (req, res) => {
    return res.send(`${pkg.description} v${pkg.version}`);
});
router.get('/dependencies',(req, res) => {
    const json = JSON.stringify(array)
    return res
    .status(200)
    .json(`these are dependencies: ${JSON.parse(json)}`);
});
module.exports = router;