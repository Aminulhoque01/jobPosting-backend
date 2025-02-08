import express from 'express';
import { AdminRoutes } from '../app/modules/admin/admin.routes';
import { AuthRoutes } from '../app/modules/Auth/auth.route';
import { ContactRoutes } from '../app/modules/contact/contact.routes';
import { SettingsRoutes } from '../app/modules/settings/settings.routes';
import { UserRoutes } from '../app/modules/user/user.route';
import { NotificationRoutes } from '../app/modules/notification/notification.routes';
import { treatmentRoutes } from '../app/modules/treatment/treatment.route';
import { clientRoute } from '../app/modules/client/client.route';
import { patientRoute } from '../app/modules/patient/patient.route';
import { jobRoutes } from '../app/modules/jobs/job.router';
import { applicaitonJobRoutes } from '../app/modules/applyJob/apllyjob.router';
import { BlogRoutes } from '../app/modules/blog/blog.route';
import { FaqRoutes } from '../app/modules/faq/faq.router';
const router = express.Router();

const apiRoutes = [
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/settings',
    route: SettingsRoutes,
  },
  {
    path: '/notifications',
    route: NotificationRoutes,
  },
  {
    path: '/contact',
    route: ContactRoutes,
  },
  {
    path: '/job',
    route: jobRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: '/faq',
    route: FaqRoutes,
  },
  
  {
    path:"/apply",
    route:applicaitonJobRoutes
  }
 
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
