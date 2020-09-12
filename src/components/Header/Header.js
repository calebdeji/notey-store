import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { addNote, home } from '../../utils/routes';
import './header.css';

const Header = () => {
    const { push } = useHistory();
    const navigateToAddNote = () => {
        push(addNote);
    };

    return (
        <header className='header'>
            <button className='header__add-note' onClick={navigateToAddNote}>
                Add Note
            </button>
            <Link to={home}>
                <span className='header__app-name'>Notey Store</span>
            </Link>
        </header>
    );
};

export default Header;
