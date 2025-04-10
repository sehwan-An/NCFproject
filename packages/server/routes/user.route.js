import express from 'express'
const router = express.Router()
import regist from '../controllers/regist.controllers.js'

router.get('/users', (req, res) => {
    res.send('Hello World!')
  })
  
  
  router.put('/users/:id', (req,res) => {
    res.send('some user is updated!')
  })
router.post('/', regist)
router.post('/signin', regist)

  router.delete('/users/:id', (req,res) =>
  {
    res.send('some user is removed!')
  })
  

export default router