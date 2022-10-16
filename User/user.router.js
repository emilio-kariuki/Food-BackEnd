import userController  from "./user.controller.js";
import {Router} from 'express'

//creating the root router
const router = Router()

router.route('/')
    .get(userController.getMany)
    .post(userController.createOne)

router.route('/:id')
    .get(userController.getOne)
    .put(userController.updateOne)
    .delete(userController.deleteOne)

export default router
