const NOTE_KEY = 'notes';

/**
 * @returns { {id : string; title : string; content : string}[] | [] }
 */
export const retrieveNotesFromLocalStorage = () => {
    const rawContents = window.localStorage.getItem(NOTE_KEY);
    if (rawContents) {
        return JSON.parse(rawContents);
    } else {
        return [];
    }
};

/**
 *
 * @param { {id : string; title : string; content : string}[] } notes
 * @returns { boolean }
 */

export const saveNotesToLocalStorage = (notes) => {
    try {
        const strignifiedNotes = JSON.stringify(notes);
        window.localStorage.setItem(NOTE_KEY, strignifiedNotes);
        return true;
    } catch (error) {
        return false;
    }
};
