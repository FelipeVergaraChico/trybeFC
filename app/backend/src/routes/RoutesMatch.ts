import { Request, Response, Router } from 'express';
import ControllerMatch from '../controller/ControllerMatch';
import TokenVal from '../middlewares/tokenVal';

const router = Router();
const controllerMatch = new ControllerMatch();

router.get('/', (req: Request, res: Response) => controllerMatch.allMatches(req, res));
router.patch(
  '/:id/finish',
  TokenVal.validate,
  (req: Request, res: Response) => controllerMatch.finishMatch(req, res),
);
router.patch(
  '/:id',
  TokenVal.validate,
  (req: Request, res: Response) => controllerMatch.updateMatch(req, res),
);
router.post(
  '/',
  TokenVal.validate,
  (req: Request, res: Response) => controllerMatch.createMatch(req, res),
);
export default router;
