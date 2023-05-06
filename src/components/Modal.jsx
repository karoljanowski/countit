import React, { useState } from 'react'

    export default function Modal(props) {
    return (
        <div className='modal'>
            <div className="modal__content">
                <p>{props.text}</p>
                <button className='modal__button' onClick={props.closeModal}>Close</button>
            </div>
        </div>
    )
}
