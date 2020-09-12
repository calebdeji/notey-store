import { useEffect, useState } from "react";

const usePop = (handleClick) => {
    const [closeClassName, setcloseClassName] = useState(false);
    useEffect(() => {
        const timerId = setTimeout(() => {
            closeModal();
        }, 3000);
        return () => {
            clearTimeout(timerId);
        };
    });
    const closeModal = () => {
        setcloseClassName(true);
        setTimeout(() => {
            handleClick();
        }, 450);
    };
    return { closeClassName, closeModal };
};

export const usePopActivation = () => {
    const [isActive, setisActive] = useState(false);
    const [isPopUpError, setisPopUpError] = useState(false);
    const [popUpMessage, setpopUpMessage] = useState("");

    const handlePopUpError = (message) => {
        setisPopUpError(true);
        setpopUpMessage(message);
        handleIsActive(true);
    };
    const cancelAllSubscription = () => {
        setisPopUpError(false);
        setisActive(false);
        setpopUpMessage("");
    };
    const handleIsActive = (status) => {
        setisActive(status);
    };
    const handleNoPopError = (message) => {
        setpopUpMessage(message);
        handleIsActive(true);
    };
    return {
        isActive,
        isPopUpError,
        handlePopUpError,
        handleNoPopError,
        popUpMessage,
        cancelAllSubscription,
    };
};
export default usePop;
