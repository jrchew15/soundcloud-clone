import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormPage';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="modal-button" id="login-modal-button" onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
