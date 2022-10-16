import {User}  from './user.model.js'
import { userController } from '../auth.js'



export const login = userController(User).signIn
export const register = userController(User).signUp
