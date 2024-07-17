function useLocalStorage() {
    const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

    const setItem = (key, value) => {
        if (isLocalStorageAvailable) {
            localStorage.setItem(key, value);
        } else {
            console.error('localStorage is not available');
            // Optionally handle the error or use a fallback
        }
    };

    const getItem = (key) => {
        if (isLocalStorageAvailable) {
            return localStorage.getItem(key);
        } else {
            console.error('localStorage is not available');
            return null; // Optionally handle the error or use a fallback
        }
    };

    const removeItem = (key) => {
        if (isLocalStorageAvailable) {
            localStorage.removeItem(key);
        } else {
            console.error('localStorage is not available');
            // Optionally handle the error or use a fallback
        }
    };

    return { setItem, getItem, removeItem };
}

export default useLocalStorage;
