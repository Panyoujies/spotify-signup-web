/**
 * 获取缓存的 LocalStorage
 */
export function getLocalStorage(stroe_name: string): string | null {
    const token = localStorage.getItem(stroe_name);
    if (!token) {
        return sessionStorage.getItem(stroe_name);
    }
    return token;
}

/**
 * 缓存 LocalStorage
 * @param token LocalStorage
 * @param remember 是否永久存储
 */
export function setLocalStorage(store_name: string, store?: string, remember?: boolean) {
    removeLocalStorage(store_name);
    if (store) {
        if (remember) {
            localStorage.setItem(store_name, store);
        } else {
            sessionStorage.setItem(store_name, store);
        }
    }
}

/**
 * 移除 LocalStorage
 */
export function removeLocalStorage(stroe_name: string) {
    localStorage.removeItem(stroe_name);
    sessionStorage.removeItem(stroe_name);
}
