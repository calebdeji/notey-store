import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import '../ProcessNote/node_modules/react-quill/dist/quill.snow.css';

import AppContext from '../App/AppContext';

const EditNote = () => {
    const { id: slugId } = useParams();
    const { storeContent } = useContext(AppContext);
    const [matchedContent, setMatchedContent] = useState(undefined);

    useEffect(() => {
        const matchedContent = storeContent.find(({ id }) => {
            return id === slugId;
        });
        setMatchedContent(matchedContent);
    }, []);

    if (matchedContent === undefined || storeContent === undefined) {
        return <p> No note fund </p>;
    }

    return (
        <section>
            <form action=''>
                <section>
                    <label htmlFor='title'> Title</label>
                    <input type='text' placeholder='Title' />
                </section>

                <ReactQuill theme='snow' value={matchedContent} />
            </form>
        </section>
    );
};

export default EditNote;
