/* eslint-disable react/prop-types */

const SuccessModal = ({ message }) => {
  return (
    <div className="dark:text-black modal-overlay">
      <dialog id="success_modal" className="modal" open>
        <div className="modal-box flex gap-6 h-18 text-center w-[400px] align-middle dark:bg-slate-900 bg-white">
          <span className="loading loading-spinner loading-md "></span>
          <p className=" text-black-500 text-2xl dark:text-gray-300 ">
            {message}
          </p>
        </div>
      </dialog>
    </div>
  );
};

export default SuccessModal;
