 const strimHTML = (content) => {
    let strimmedDetails = content.replace(/(<([^>]+)>)/gi, "");

    return `${strimmedDetails.substr(0, 100)} ...`;
};

export default strimHTML