import React from 'react';
import { ReactComponent as CancelIcon } from './images/Cross.svg';
import usePop from './usePop';
import { ReactComponent as ErrorOutlineSharp } from './images/error.svg';
import { ReactComponent as DoneSharp } from './images/tick.svg';
import './pop.css';

const PopUp = ({ message, isError, handleClick }) => {
    const { closeClassName, closeModal } = usePop(handleClick);

    return (
        <div
            className={`pop-container  ${isError ? 'pop-container--error' : 'pop-container--no-error'} ${
                closeClassName && 'pop-container--close'
            }`}
        >
            <span className='pop-container__span'>
                {' '}
                {isError ? (
                    <ErrorOutlineSharp className='pop-container__icons' />
                ) : (
                    <DoneSharp className='pop-container__icons' />
                )}{' '}
                {message}{' '}
            </span>
            <button onClick={closeModal} type='button'>
                <CancelIcon className='pop-container__icons' />
            </button>
        </div>
    );
};
export default PopUp;
