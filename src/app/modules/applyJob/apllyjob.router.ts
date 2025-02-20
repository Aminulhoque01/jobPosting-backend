import { Router } from "express";

import auth from "../../middlewares/auth";
import { applyJobController } from "./applyjob.controller";
import fileUploadHandler from "../../middlewares/fileUploadHandler";
const UPLOADS_FOLDER = 'uploads/users';
const upload = fileUploadHandler(UPLOADS_FOLDER);
 



const router= Router();

// router.post("/", auth("user"), upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'coverLetter', maxCount: 1 }]), applyJobController.applyJob );
router.post(
    "/",
    auth("user"),
    upload.fields([{ name: "resume", maxCount: 1 }, { name: "coverLetter", maxCount: 1 }]),
    applyJobController.applyJob
);

router.get("/my-apply", auth("user"), applyJobController.getUserAppliedJobs );

router.get("/recentapply", auth("admin"), applyJobController.recentApplyedJob);
router.get("/total-applicaiton", auth("admin"), applyJobController.totalApplication);
router.get("/applied-user", auth("admin"), applyJobController.jobAppliedUser);

router.post("/shorlist/:id", auth("admin"), applyJobController.shortlistUser)
router.post("/reject/:id", auth("admin"), applyJobController.creteReject)
router.get("/shorlist", auth("admin"), applyJobController.getShortlist)
router.get("/totla-shorlist", auth("admin"), applyJobController.totalShorlistUser)

export const applicaitonJobRoutes= router;