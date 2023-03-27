import { createPortal } from 'react-dom';
const Modal = ({ open, children }) => {
  const modalDOM = document.querySelector('#rootModal');

  if (!modalDOM || !open) return null;
  return createPortal(<div id="modal">{children}</div>, modalDOM);
};

export default Modal;
