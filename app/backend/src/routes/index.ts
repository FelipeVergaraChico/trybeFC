import { Router } from 'express';
import routesTeam from './RoutesTeam';
import routesLogin from './RoutesLogin';
import routesMatch from './RoutesMatch';
import routesLeader from './RoutesLeader';

const router = Router();

router.use('/teams', routesTeam);
router.use('/login', routesLogin);
router.use('/matches', routesMatch);
router.use('/leaderBoard', routesLeader);

export default router;
