import { createContext, useEffect, useReducer, useState } from 'react';
import useComponentDidUpdate from '../hooks/useComponentDidUpdate';
import { retrieveNotesFromLocalStorage, saveNotesToLocalStorage } from '../libs/ProcessLocalStorage';

/**
 *
 */
const initialStore = {
    storeContent: retrieveNotesFromLocalStorage(),
    /**
     * @param { { type : 'add-note' | 'edit' | 'delete' | 'reset', value : any, id : string } } _
     */
    updateStore: (_) => {},
};

const AppContext = createContext(initialStore);

/**
 *
 * @param { {id : string; title : string; content : string}[] } state
 * @param { { type : 'add-note' | 'edit' | 'delete' | 'reset', value : any, id : string } } action
 */
const reducer = (state, action) => {
    const { type, value, id } = action;
    console.log({ action });
    switch (type) {
        case 'add-note':
            return [...state, { ...value, id }];
        case 'edit':
            const filterState = state.filter(({ id: noteId }) => {
                return id !== noteId;
            });
            return [...filterState, { ...value, id }];
        case 'delete':
            return state.filter(({ id: noteId }) => id !== noteId);

        case 'reset':
            return [{ ...value, id }];
        default:
            break;
    }
};

export const useAppContext = () => {
    const [appState, updateStore] = useReducer(reducer, initialStore.storeContent);

    useComponentDidUpdate(() => {
        saveNotesToLocalStorage(appState);
    }, [appState]);

    useEffect(() => {
        const retrieveLocalStorageContentAndUpdateStore = () => {
            updateStore({ type: 'reset', value: retrieveNotesFromLocalStorage() });
        };
        window.addEventListener('storage', retrieveLocalStorageContentAndUpdateStore);

        return () => window.removeEventListener('storage', retrieveLocalStorageContentAndUpdateStore);
    }, []);

    return {
        storeContent: appState,
        updateStore,
    };
};

export default AppContext;
