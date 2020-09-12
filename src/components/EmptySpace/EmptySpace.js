import React from 'react';

import { ReactComponent as EmptyImage } from './empty.svg';
import './emptyspace.css';

const EmptySpace = ({ message }) => {
    return (
        <div className='empty-space fade-in'>
            <p className='empty-space__message'>{message}</p>
            <EmptyImage />
        </div>
    );
};

export default EmptySpace;
