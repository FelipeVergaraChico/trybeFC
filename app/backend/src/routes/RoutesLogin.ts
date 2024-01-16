import { Request, Response, Router } from 'express';

import LoginVal from '../middlewares/loginVal';
import ControllerLogin from '../controller/ControllerLogin';

const router = Router();
const controllerLogin = new ControllerLogin();

router.post(
  '/',
  LoginVal.validate,
  (req: Request, res: Response) => controllerLogin.login(req, res),
);

export default router;
