import { Router } from "express";
import auth from "../../middlewares/auth";
import { jobController } from "./job.controller";

const router = Router();

router.post("/create-job", auth("admin"), jobController.createJsob);
router.get("/all-jobs", jobController.getAllJobs);

router.get("/single-job/:id", jobController.getSingleJob);
router.get("/recent-jobs", jobController.recentJobs);

router.post("/apply-job", auth("user"), jobController.applyForJob);

router.get("/applied-user", auth("admin"), jobController.jobAppliedUser);

router.patch("/update-job/:id", auth("admin"), jobController.updateJob);

router.post("/save-job", auth("user"), jobController.saveForJob);
router.get("/saved-jobs", auth("user"), jobController.getSavedJobs);

router.delete("/remove-saved-job", auth("user"), jobController.removeSavedJob);

router.delete("/delete-job", auth("admin"), jobController.deleteJob);

export const jobRoutes= router;