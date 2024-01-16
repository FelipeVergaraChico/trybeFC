import { Request, Response, Router } from 'express';

import ControllerTeam from '../controller/ControllerTeam';

const router = Router();
const controllerTeam = new ControllerTeam();

router.get('/', (req: Request, res: Response) => controllerTeam.allTeams(req, res));
router.get('/:id', (req: Request, res: Response) => controllerTeam.teamById(req, res));

export default router;
