import { Request, Response, Router } from 'express';

import LoginVal from '../middlewares/loginVal';
import TokenVal from '../middlewares/tokenVal';
import ControllerLogin from '../controller/ControllerLogin';

const router = Router();
const controllerLogin = new ControllerLogin();

router.post(
  '/',
  LoginVal.validate,
  (req: Request, res: Response) => controllerLogin.login(req, res),
);

router.get(
  '/role',
  TokenVal.validate,
  (req: Request, res: Response) => ControllerLogin.role(req, res),
);

export default router;
