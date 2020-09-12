import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Markdown from 'react-markdown/with-html';
import AppContext from '../../App/AppContext';
import { ReactComponent as GoBackIcon } from '../../assets/left-arrow.svg';
import { Helmet } from 'react-helmet';

import './note.css';
import { note } from '../../utils/routes';
import EmptySpace from '../../components/EmptySpace/EmptySpace';

const Note = () => {
    const { storeContent } = useContext(AppContext);
    const [noteCotent, setnoteCotent] = useState('fetching');
    const { id: slugId } = useParams();
    const { goBack, push } = useHistory();

    useEffect(() => {
        const matchedNote = storeContent.find(({ id }) => {
            return id === slugId;
        });
        setnoteCotent(matchedNote);
    }, []);

    const navigateToEditNote = () => {
        push(`${note}/edit/${noteCotent.id}`);
    };

    if (storeContent === undefined) return <EmptySpace message='Your note store is empty' />;
    else if (noteCotent === 'fecthing') return <p> fecthing</p>;
    else if (noteCotent === undefined) return <EmptySpace message='Note not found' />;

    return (
        <>
            <Helmet>
                <title> Notey Store | Note</title>
            </Helmet>
            <div className='note-container fade-in'>
                <nav className='note-container__nav'>
                    <button className='note-container__nav__back' onClick={goBack}>
                        <GoBackIcon className='note-container__nav__back__icon ' />
                    </button>
                    {noteCotent.id && (
                        <button className='note-container__nav__edit' onClick={navigateToEditNote}>
                            edit
                        </button>
                    )}
                </nav>
                <section className='note-container__section '>
                    <h3> {noteCotent.title} </h3>
                    <article>
                        <Markdown escapeHtml={false} source={noteCotent.content} />
                    </article>
                </section>
            </div>
        </>
    );
};

export default Note;
