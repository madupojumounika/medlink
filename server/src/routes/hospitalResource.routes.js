import { Router } from "express";
import { hospitalResourceController } from "../controllers/hospitalResource.controller.js";

const router = Router();

router.post("/", hospitalResourceController.createResource);
router.get("/", hospitalResourceController.getAllResources);
router.get("/:id", hospitalResourceController.getResourceById);
router.put("/:id", hospitalResourceController.updateResource);
router.delete("/:id", hospitalResourceController.deleteResource);

export default router;
