import { Router } from "express";

import auth from "../../middlewares/auth";
import { applyJobController } from "./applyjob.controller";
import fileUploadHandler from "../../middlewares/fileUploadHandler";
const UPLOADS_FOLDER = 'uploads/users';
const upload = fileUploadHandler(UPLOADS_FOLDER);
 



const router= Router();

router.post("/", auth("user"),   upload.single('resume'), applyJobController.applyJob );
router.get("/my-apply", auth("user"), applyJobController.getUserAppliedJobs );

export const applicaitonJobRoutes= router;