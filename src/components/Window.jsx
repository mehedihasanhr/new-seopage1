import * as React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#modal-root');

const Window = ({ children, onClose, show }) => {
    const [modalIsOpen, setIsOpen] = React.useState(show);
    
    function openModal() {
        setIsOpen(true);
    }
    
    function closeModal() {
        setIsOpen(false);
        onClose();
    }
    
    return (
        <div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
        >
            {children}
            <button onClick={closeModal}>close</button>
        </Modal>
        </div>
    );
};

export default Window;