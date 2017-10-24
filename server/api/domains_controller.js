import { Router } from 'express'
import { Domain, Domains } from '../models/domains'
import { Users, User } from '../models/users'

const router = Router()


/* GET users listing. */
router.get('/domains', async function (req, res, next) {

    try {
      // var result = await Domain.forge().query((qb) => {
      //   qb.where({id: 5});
      // }).fetch({withRelated: ['user']});
      var result = await User.forge().query((qb) => {
        qb.where({_id: 1});
      }).fetch({withRelated: ['domains']});
      res.status(200).json(result);
      
    } catch(e) {
      console.log(e)
      res.status(500).json(e);
 
    }

})


export default router
