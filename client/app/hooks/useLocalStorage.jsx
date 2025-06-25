'use client'

function useLocalStorage() {
    const setItem = (key, value) => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(key, value);
        } else {
            console.error('localStorage is not available');
        }
    };

    const getItem = (key) => {
        if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem(key);
        } else {
            console.error('localStorage is not available');
            return null;
        }
    };

    const removeItem = (key) => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem(key);
        } else {
            console.error('localStorage is not available');
        }
    };

    return { setItem, getItem, removeItem };
}

export default useLocalStorage;
