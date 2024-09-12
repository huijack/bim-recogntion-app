const FormTextArea = ({ label, name, readonly, className, value }) => {
  return (
    <div className={`form-control ${className}`}>
      <label htmlFor={name} className="label">
        <span className="label-text capitalize font-semibold">{label}</span>
      </label>
      <textarea
        name={name}
        id={name}
        className="textarea textarea-bordered textarea-lg resize-none"
        readOnly={readonly}
        value={value}
      ></textarea>
    </div>
  )
}
export default FormTextArea
