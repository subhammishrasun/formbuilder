import Form from "../models/form.js";

/**
 * @desc    Create new form
 * @route   POST /api/forms
 */
export const createForm = async (req, res, next) => {
  try {
    const { title, fields } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Form title is required" });
    }

    if (fields && fields.length > 20) {
      return res.status(400).json({ message: "Maximum 20 fields allowed" });
    }

    const form = await Form.create({ title, fields });

    res.status(201).json(form);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all forms
 * @route   GET /api/forms
 */
export const getAllForms = async (req, res, next) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single form by ID
 * @route   GET /api/forms/:id
 */
export const getFormById = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update form
 * @route   PUT /api/forms/:id
 */
export const updateForm = async (req, res, next) => {
  try {
    const { title, fields } = req.body;

    if (fields && fields.length > 20) {
      return res.status(400).json({ message: "Maximum 20 fields allowed" });
    }

    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    form.title = title || form.title;
    form.fields = fields || form.fields;

    const updatedForm = await form.save();

    res.status(200).json(updatedForm);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete form
 * @route   DELETE /api/forms/:id
 */
export const deleteForm = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    await form.deleteOne();

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    next(error);
  }
};