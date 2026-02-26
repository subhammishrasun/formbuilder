import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldBuilder from "../components/FieldBuilder";
import FieldPreview from "../components/FieldPreview";
import axios from 'axios';

const server = import.meta.env.VITE_SERVER;

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  const addField = (field) => {
    if (fields.length >= 20)
      return alert("Maximum 20 inputs allowed");

    setFields([...fields, { ...field, order: fields.length }]);
  };

  const deleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const saveForm = async () => {
    await axios.post(`${server}/forms`, { title, fields });
    navigate("/");
  };

  return (
    <div>
      <h2>Create Form</h2>

      <input
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <FieldBuilder onAdd={addField} />

      <div className="form-grid">
        {fields.map((field, index) => (
          <div key={index} className="card">
            <FieldPreview field={field} readOnly={true} />
            <button onClick={() => deleteField(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <button onClick={saveForm}>Save Form</button>
    </div>
  );
}