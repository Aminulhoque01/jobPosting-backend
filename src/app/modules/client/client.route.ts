

import express from 'express'
import { clientController } from './client.controller';
import validateRequest from '../../middlewares/validateRequest';
import { clientValidation } from './client.validation';
import auth from '../../middlewares/auth';

const router = express.Router();


router.post(
    '/create-client',
    auth('common'),
    validateRequest(clientValidation.ClientFormValidationSchema),
    clientController.createClient
)
router.patch(
    '/update-client/:id',
    auth('common'),
    validateRequest(clientValidation.UpdateClientFormValidationSchema),
    clientController.updateClient
)
router.get(
    '/read-client',
    auth('common'),
    clientController.getAllClient
)
router.delete(
    '/delete-client/:id',
    auth('common'),
    clientController.deleteClient
)



export const clientRoute = router