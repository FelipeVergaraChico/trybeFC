import { Router } from 'express';
import routesTeam from './RoutesTeam';
import routesLogin from './RoutesLogin';

const router = Router();

router.use('/teams', routesTeam);
router.use('/login', routesLogin);

export default router;
