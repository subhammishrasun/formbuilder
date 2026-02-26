import { useState } from "react";

export default function FieldBuilder({ onAdd }) {
  const [type, setType] = useState("text");
  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const handleAdd = () => {
    if (!label) return alert("Label required");

    onAdd({
      type,
      label,
      placeholder,
    });

    setLabel("");
    setPlaceholder("");
  };

  return (
    <div>
      <h3>Add Field</h3>

      <select onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="password">Password</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
      </select>

      <input
        placeholder="Field Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />

      <input
        placeholder="Placeholder"
        value={placeholder}
        onChange={(e) => setPlaceholder(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}