import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "email", "password", "number", "date"],
    required: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  placeholder: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    fields: {
      type: [fieldSchema],
      validate: {
        validator: function (val) {
          return val.length <= 20;
        },
        message: "Maximum 20 fields allowed",
      },
    },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

export default Form;