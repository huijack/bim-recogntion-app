const ModalBtn = ({ confirmUpdate }) => {
  return (
    <>
      <input type="checkbox" id="open-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmation</h3>
          <p className="py-4">Are you sure you want to update your profile?</p>
          <div className="modal-action">
            <button
              onClick={confirmUpdate}
              className="btn btn-secondary uppercase font-semibold"
            >
              confirm
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="open-modal">
          Close
        </label>
      </div>
    </>
  )
}
export default ModalBtn
