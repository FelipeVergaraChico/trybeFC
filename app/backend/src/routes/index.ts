import { Router } from 'express';
import routesTeam from './RoutesTeam';
import routesLogin from './RoutesLogin';
import routesMatch from './RoutesMatch';

const router = Router();

router.use('/teams', routesTeam);
router.use('/login', routesLogin);
router.use('/matches', routesMatch);

export default router;
