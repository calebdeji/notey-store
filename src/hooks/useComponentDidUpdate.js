import { useRef, useEffect } from 'react';

/**
 *
 * @param { Function } callback
 * @param {[]} dep
 */
const useComponentDidUpdate = (callback, dep) => {
    const hasMount = useRef(false);
    useEffect(() => {
        if (hasMount.current) {
            callback();
        } else {
            hasMount.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dep);
};
export default useComponentDidUpdate;
