import express from "express";
import {
  createForm,
  getAllForms,
  getFormById,
  updateForm,
  deleteForm,
} from "../controllers/formController.js";

const router = express.Router();

router.route("/")
  .get(getAllForms)
  .post(createForm);

router.route("/:id")
  .get(getFormById)
  .put(updateForm)
  .delete(deleteForm);

export default router;