import { Router } from "express";
import auth from "../../middlewares/auth";
import { ContactController } from "./contact.controller";

const router = Router();

router.route('/').post(ContactController.createContactToAdmin)
router.route('/get-message').get(ContactController.getMessage)

export const ContactRoutes = router