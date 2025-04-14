import express from 'express';
const router = express.Router();
import controllers from '../controllers/regist.controllers.js';

router.get('/', (req, res) => {
  res.send('Hello World!');
});
router.post('/', controllers.regist);
router.post('/signin', controllers.signin);
// router.post('/contact', controllers.signin);
router.post('/contact', controllers.contact);

// router.put('/users/:id', (req, res) => {
//   res.send('some user is updated!');
// });


// router.delete('/users/:id', (req, res) => {
//   res.send('some user is removed!');
// });

export default router;
