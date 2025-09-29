import express from "express";
import { getAllBruxos, getBruxoById, createBruxo, deleteBruxo, updateBruxo } from "../controllers/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos);
router.get("/:id", getBruxoById);
router.post("/", createBruxo);
router.delete("/:id", deleteBruxo);
router.put("/:id", updateBruxo);

export default router;