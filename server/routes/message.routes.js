const Router = require('express');
const router = new Router();
const Message = require('../models/Message');
const events = require('events');

const emitter = new events.EventEmitter();

router.get('/', async(req, res) => {
    const {tags} = req.query;
    let message;
    if(tags.length !== 1) {
        message = await Message.find({tag: [...tags]});
    } else {
        message = await Message.find({});
    }
    return res.send(message)
})

router.get('/tags', async(req, res) => {
    const tags = Array.from(new Set((await Message.find({})).map(elem => elem.tag))).filter(elem => elem != '');
    return res.send(tags)
})

router.get('/get-message', async(req, res) => {
    emitter.once('newMessage', ({message, tag})=> {
       res.json({message: message, tag: tag});
    })   
})

router.post('/new-message', async(req, res) => {
    const {message, tag} = req.body;
    const newMessage = await Message({message: message, tag: tag});
    await newMessage.save();
    emitter.emit('newMessage', {message: message, tag: tag})
    res.status(200)
})

module.exports = router;