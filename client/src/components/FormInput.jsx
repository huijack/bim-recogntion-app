const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize font-semibold">
          {label || name}
        </span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={`input input-bordered ${size}`}
        defaultValue={defaultValue}
        required
      />
    </div>
  )
}
export default FormInput
