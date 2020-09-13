import React, { useContext, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';

import strimHTML from '../../libs/strimHTML';
import AppContext from '../../App/AppContext';

import './home.css';
import { useHistory } from 'react-router-dom';
import { note } from '../../utils/routes';
import { Helmet } from 'react-helmet';
import { usePopActivation } from '../../components/PopUp/usePop';
import PopUp from '../../components/PopUp/PopUp';
import EmptySpace from '../../components/EmptySpace/EmptySpace';

const Home = () => {
    const { storeContent, updateStore } = useContext(AppContext);
    const { push } = useHistory();
    const { isActive, cancelAllSubscription, handleNoPopError, popUpMessage } = usePopActivation();
    const navigateToNote = (id) => {
        push(`${note}/view/${id}`);
    };

    const deleteNote = (id) => {
        updateStore({ type: 'delete', id });
        handleNoPopError('Note deleted successfully');
    };

    if (storeContent === undefined || storeContent.length === 0 || !storeContent[0]?.id) {
        return <EmptySpace message='Ooops! You have no saved notes' />;
    }

    return (
        <>
            <Helmet>
                <title> Notey Store | home</title>
            </Helmet>
            <main className='home fade-in'>
                {storeContent.map(({ id, title, content }) => {
                    return (
                        <article className='home__note' key={id}>
                            <section
                                className='home__note__section'
                                onClick={() => {
                                    navigateToNote(id);
                                }}
                            >
                                <h3 className='home__note__section__title'> {title} </h3>

                                <p>{strimHTML(content)}</p>
                            </section>
                            <EditSection
                                id={id}
                                handleDelete={() => {
                                    deleteNote(id);
                                }}
                            />
                        </article>
                    );
                })}
            </main>
            {isActive && <PopUp message={popUpMessage} handleClick={cancelAllSubscription} isError={false} />}
        </>
    );
};

const EditSection = ({ id, handleDelete }) => {
    const [isPopUpSectionVisible, setIsPopUpSectionVisible] = useState(false);
    const { push } = useHistory();
    const handlePop = () => {
        setIsPopUpSectionVisible((prevValue) => !prevValue);
    };
    const dismissPop = () => {
        setIsPopUpSectionVisible(false);
    };
    const navigateToEdit = () => {
        push(`${note}/edit/${id}`);
    };

    return (
        <ClickAwayListener className='home__note__section__icon' onClickAway={dismissPop}>
            <button className='home__note__section__icon__button' onClick={handlePop}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            {isPopUpSectionVisible && (
                <div className='home__note__section__icon_actions'>
                    <button onClick={navigateToEdit}>Edit</button>
                    <button onClick={handleDelete}> Delete</button>
                </div>
            )}
        </ClickAwayListener>
    );
};

export default Home;
