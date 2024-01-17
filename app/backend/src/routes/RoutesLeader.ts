import { Request, Response, Router } from 'express';
import ControllerLeaderBoard from '../controller/ControllerLeader';

const router = Router();
const controllerLeaderBoard = new ControllerLeaderBoard();

router.get('/home', (req: Request, res: Response) => controllerLeaderBoard.leaderBoard(req, res));
router.get(
  '/away',
  (req: Request, res: Response) => controllerLeaderBoard.leaderBoardAway(req, res),
);

export default router;
