import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './processNote.css';

import AppContext from '../../App/AppContext';
import { Helmet } from 'react-helmet';
import { usePopActivation } from '../../components/PopUp/usePop';
import PopUp from '../../components/PopUp/PopUp';
import EmptySpace from '../../components/EmptySpace/EmptySpace';

const initialFormStateValue = {
    title: '',
    content: '',
};

const ProcessNote = () => {
    const { id: slugId } = useParams();
    const { pathname } = useLocation();
    const { storeContent, updateStore } = useContext(AppContext);
    const [formState, setFormState] = useState(initialFormStateValue);
    const [matchedContent, setMatchedContent] = useState('fetching');
    const {
        handleNoPopError,
        isActive,
        popUpMessage,
        cancelAllSubscription,
        handlePopUpError,
        isPopUpError,
    } = usePopActivation();

    const isAddNote = useMemo(() => {
        return slugId ? false : true;
    }, [slugId]);

    useEffect(() => {
        if (slugId && storeContent.length !== 0) {
            const matchedContent = storeContent.find(({ id }) => {
                return id === slugId;
            });

            setMatchedContent(matchedContent);
            setFormState(matchedContent);
        } else {
            setMatchedContent(undefined);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slugId, pathname]);

    const handleChange = ({ target }) => {
        const { id, value } = target;
        setFormState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    /**
     *
     * @param {string} values
     * @returns { boolean }
     */
    const isStringEmpty = (values) => {
        return values.trim() === '';
    };

    /**
     *
     * @param { Event } event
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        if (isStringEmpty(formState.title) || isStringEmpty(formState.content)) {
            handlePopUpError('None of the field should be empty');
        } else {
            const newNoteId = storeContent?.length || 0;
            updateStore({
                type: isAddNote ? 'add-note' : 'edit',
                value: {
                    title: formState.title,
                    content: formState.content,
                },
                id: isAddNote ? `note-${newNoteId}` : matchedContent.id,
            });
            if (isAddNote) setFormState(initialFormStateValue);

            handleNoPopError(isAddNote ? 'Note added successfully' : 'Note edited successfully');
        }
    };
    if (matchedContent === 'fetching' && !isAddNote) {
        return <p></p>;
    } else if (!isAddNote && matchedContent === undefined) {
        return <EmptySpace message='Note not found' />;
    }

    return (
        <>
            <Helmet>
                <title> Notey Store | {isAddNote ? 'Add Note' : 'Edit '}</title>
            </Helmet>
            <section className='processNoteContainer fade-in'>
                <form className='processNoteContainer__form' onSubmit={handleSubmit}>
                    <section className='processNoteContainer__form__section'>
                        <label htmlFor='title' className='processNoteContainer__form__section__label'>
                            {' '}
                            Title
                        </label>
                        <input
                            className='processNoteContainer__form__section__input'
                            type='text'
                            placeholder='Title'
                            value={formState.title}
                            id='title'
                            onChange={handleChange}
                        />
                    </section>
                    <section className='processNoteContainer__form__section'>
                        <label htmlFor='content' className='processNoteContainer__form__section__label'>
                            {' '}
                            Content
                        </label>
                        <ReactQuill
                            theme='snow'
                            value={formState.content}
                            className='processNoteContainer__form__section__quill'
                            onChange={(value) => {
                                handleChange({ target: { id: 'content', value } });
                            }}
                        />
                    </section>
                    <button className='processNoteContainer__form__save-button'>Save</button>
                </form>
            </section>
            {isActive && (
                <PopUp message={popUpMessage} isError={isPopUpError} handleClick={cancelAllSubscription} />
            )}
        </>
    );
};

export default ProcessNote;
