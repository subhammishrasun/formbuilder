export default function FieldPreview({ field, readOnly }) {
  return (
    <div>
      <label>{field.label}</label>
      <input
        type={field.type}
        placeholder={field.placeholder}
        readOnly={readOnly}
        required
      />
    </div>
  );
}