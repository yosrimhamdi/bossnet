// check if user is watching the dom element
export const userIsWatching = (element) => {
    const { bottom, top } = element.getBoundingClientRect();
    return bottom >= 0 && document.scrollingElement.clientHeight - top >= 0;
};