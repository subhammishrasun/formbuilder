import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const server=import.meta.env.VITE_SERVER;

export default function Home() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${server}/forms`).then((res) => setForms(res.data));
  }, []);

  return (
    <div>
      <h1>Form Builder</h1>

      <button onClick={() => navigate("/form/create")}>
        Create Form
      </button>

      {forms.map((form) => (
        <div key={form._id} className="card">
          <h3>{form.title}</h3>
          <button onClick={() => navigate(`/form/${form._id}`)}>
            View
          </button>
          <button onClick={() => navigate(`/form/${form._id}/edit`)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}