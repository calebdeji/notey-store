export const editorFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'image',
    'color',
    'font',
];
export const editorModules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],

        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],

        [{ color: [] }],
        [{ font: [] }],
    ],
    clipboard: {
        matchVisual: false,
    },
};
