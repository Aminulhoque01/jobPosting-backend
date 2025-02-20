import { Router } from "express";
import auth from "../../middlewares/auth";
import { addFaq, editFaq, getFaqs, getFaqSingle, removeFaq } from "./faq.controller";

const router = Router();

router.post("/add", auth("admin"),addFaq);
router.get("/faq", getFaqs);
router.get("/faq/:id", auth("admin"), getFaqSingle);
router.patch("/faq/:id", auth("admin"), editFaq);
router.delete("/faq/:id", auth("admin"), removeFaq);


export const FaqRoutes= router;