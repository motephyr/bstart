import { Router } from 'express'
import { Users, User } from '../models/users'

const router = Router()



/* GET users listing. */
router.get('/users', async function (req, res, next) {
  try {
    var result = (await Users.forge().orderBy('_id').fetch()).toJSON();
    res.status(200).json(result);
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  }
})

router.get('/users/:id', async function (req, res, next) {
  try {
    var result = (await User.findById(req.params.id)).toJSON();
    res.status(200).json(result);
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  }
})

router.post('/users/email', async function (req, res, next) {
  try {
    var result = (await User.findOne({email:req.body.email})).toJSON();
    res.status(200).json(result);
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  }
})

router.post('/users/', async function (req, res, next) {
  try {
    var params = req.body
    params.emailVerified = true
    params.emailVerificationTimestamp = (new Date()).toISOString()
    var users = (await User.forge(params).save()).toJSON();
    res.status(200).send("ok");
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  }
})

router.patch('/users/:id', async function (req, res, next) {
  try {
    //console.log(req.body)
    var result = (await User.update(req.body,{id: req.body._id})).toJSON();
    res.status(200).json(result);
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  }
})

router.patch('/users/lock/:id', async function (req, res, next) {
  try {
    var user = (await User.findById(req.params.id)).toJSON();
    var params = {}
    if (user.accountLocked == false){
      params = {accountLocked: true, accountLockedUntil: (new Date('9999')).toISOString()}
    } else {
      params = {accountLocked: false, accountLockedUntil: null}      
    }
    var result = (await User.update(params,{id: req.params.id})).toJSON();
    res.status(200).json(result);
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  }
})


router.delete('/users/:id', async function (req, res, next) {
  try {
    var result = (await User.destroy({id: req.params.id})).toJSON();
    res.status(200).json(result);
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  }
})

export default router
