import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FieldBuilder from "../components/FieldBuilder";
import FieldPreview from "../components/FieldPreview";
import axios from 'axios';

const server = import.meta.env.VITE_SERVER;


export default function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);

  useEffect(() => {
    axios.get(`${server}/forms/${id}`).then((res) => {
      setTitle(res.data.title);
      setFields(res.data.fields);
    });
  }, [id]);

  const addField = (field) => {
    if (fields.length >= 20)
      return alert("Maximum 20 inputs allowed");

    setFields([...fields, { ...field, order: fields.length }]);
  };

  const deleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateForm = async () => {
    await axios.put(`${server}/forms/${id}`, { title, fields });
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Form</h2>

      <input
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

      <button onClick={updateForm}>Update Form</button>
    </div>
  );
}