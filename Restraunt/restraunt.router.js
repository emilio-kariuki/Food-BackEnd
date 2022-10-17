import restrauntController from "./restraunt.controller.js";
import {Router} from 'express'

const router = Router();

router.route('/')
    .get(restrauntController.getMany)
    .post(restrauntController.createOne)

router.route('/:id')
    .get(restrauntController.getOne)
    .put(restrauntController.updateOne)
    .delete(restrauntController.deleteOne)

export default router

