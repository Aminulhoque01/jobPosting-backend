import express from 'express'
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { patientValidation } from './patient.validation';
import { patientController } from './patient.controller';


const router = express.Router()

router.post(
    '/create-service',
    auth('common'),
    // validateRequest(patientValidation.createPatientSchema),
    patientController.createService
)
router.patch(
    '/update-service/:id',
    auth('common'),
    validateRequest(patientValidation.updatePatientSchema),
    patientController.updateService
)
router.get(
    '/get-all-service',
    auth('common'),
    patientController.getAllService
)
router.delete(
    '/delete-service/:id',
    auth('common'),
    patientController.deleteService
)

export const patientRoute = router;

