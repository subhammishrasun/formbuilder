import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const server=import.meta.env.VITE_SERVER;



export default function ViewForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    axios.get(`${server}/forms/${id}`).then((res) =>
      setForm(res.data)
    );
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div>
      <h2>{form.title}</h2>

      <form onSubmit={handleSubmit} className="form-grid">
        {form.fields.map((field, index) => (
          <div key={index}>
            <label>{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              required
            />
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}