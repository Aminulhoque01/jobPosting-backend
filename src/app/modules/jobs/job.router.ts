import { Router } from "express";
import auth from "../../middlewares/auth";
import { jobController } from "./job.controller";
import fileUploadHandler from "../../middlewares/fileUploadHandler";

const UPLOADS_FOLDER = 'uploads/users';
const upload = fileUploadHandler(UPLOADS_FOLDER);

const router = Router();

router.post("/create-job", auth("admin"), upload.single('image'), jobController.createJsob);
router.get("/all-jobs", jobController.getAllJobs);

router.get("/single-job/:id", jobController.getSingleJob);
router.get("/recent-jobs", jobController.recentJobs);

router.post("/apply-job", auth("user"), jobController.applyForJob);



router.patch("/update-job/:id", auth("admin"), upload.single("image"), jobController.updateJob);

router.post("/save-job", auth("user"), jobController.saveForJob);
router.get("/saved-jobs", auth("user"), jobController.getSavedJobs);

router.delete("/remove-saved-job", auth("user"), jobController.removeSavedJob);

router.delete("/delete-job/:id", auth("admin"), jobController.deleteJob);

router.get("/application-user", auth("admin"), jobController.JobApplicationMember )

router.get("/total-job", auth("admin"),jobController.totalJob )
router.get("/count", jobController.countCaregory) 


export const jobRoutes= router;