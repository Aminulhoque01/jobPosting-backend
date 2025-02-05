import { Router } from "express";

import auth from "../../middlewares/auth";
import fileUploadHandler from "../../middlewares/fileUploadHandler";
import { BlogController } from "./blog.controller";


const UPLOADS_FOLDER = 'uploads/users';
const upload = fileUploadHandler(UPLOADS_FOLDER);

const router= Router();

router.post("/post-blog", auth("admin"), upload.single('featureImage'), BlogController.creteBlog);
router.get("/",  BlogController.getAllBlog);
router.get("/:id",  BlogController.getSingleBlog);
router.patch("/update-blog/:id", auth("admin"),  BlogController.updateBlog);
router.delete("/:id", auth("admin") , BlogController.deleteBlog);

export const BlogRoutes=router;