import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './index.js';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="modal-button" id="signup-modal-button" onClick={() => setShowModal(true)}>Create Account</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
