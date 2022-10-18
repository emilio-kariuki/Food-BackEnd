import { crudController } from "../Middleware/crud.js";
import {User} from './user.model.js'

export default crudController(User)
