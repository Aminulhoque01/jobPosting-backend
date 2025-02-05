import express from 'express'
import { treatmentController } from './treatment.controller';
import { treatmentValidation } from './treatment.vallidation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
    '/create-treatment',
    auth('common'),
    validateRequest(treatmentValidation.TreatmentValidationSchema),
    treatmentController.createTreatment
)
router.patch(
    '/update-treatment/:id',
    auth('common'),
    validateRequest(treatmentValidation.UpdateTreatmentValidationSchema),
    treatmentController.updateTreatment
)
router.get(
    '/get-all-treatment',
    auth('common'),
    treatmentController.getAllTreatment
)
router.delete(
    '/delete-treatment/:id',
    auth('common'),
    treatmentController.deleteOneTreatmnet
)


export const treatmentRoutes = router;