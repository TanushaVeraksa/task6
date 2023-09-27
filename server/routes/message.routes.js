const Router = require('express');
const router = new Router();
const Message = require('../models/Message');
const events = require('events');

const emitter = new events.EventEmitter();

router.get('/', async(req, res) => {
    return res.send({message: 'All is working!'})
})

router.get('/get-message', async(req, res) => {
    emitter.once('newMessage', (message)=> {
       res.json(message);
    })   
})

router.post('/new-message', async(req, res) => {
    const {message, tag} = req.body;
    // const newMessage = await Message({message: message, tag: tag});
    // await newMessage.save();
    emitter.emit('newMessage', {message: message, tag: tag})
    res.status(200)
})

module.exports = router;