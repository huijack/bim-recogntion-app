const FormTextArea = ({ label, name }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize font-semibold">{label}</span>
      </label>
      <textarea
        name={name}
        id={name}
        className="textarea textarea-bordered textarea-lg resize-none"
      ></textarea>
    </div>
  )
}
export default FormTextArea
