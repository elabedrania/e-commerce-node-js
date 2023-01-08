const SupportMessage = require('../Models/contactModel');
const auth = require('../VTOKEN');

const router = require('express').Router();

//send a message
router.post('/newMessage', (req, res) => {
    let message = new SupportMessage({ ...req.body })
    message.save()
    res.send({ msg: "success", data: message })
})



//get all messages into my admin dashboard
router.get('/allMessage', (req, res) => {
    
        SupportMessage.find({}, (err, data) => {
            if (err) {
              res.send(err)
            }
            res.send(data)
          })
        
    

   
  })



module.exports = router;
