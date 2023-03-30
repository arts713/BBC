class SessionStorageManager {
    getItem<T>(keyName: string): T | undefined {
        const item = window.sessionStorage.getItem(keyName);

        if (item) {
            return JSON.parse(item) as T;
        }

        return;
    }

    setItem(keyName: string, data: any): void {
        window.sessionStorage.setItem(keyName, JSON.stringify(data));
    }
}

export default SessionStorageManager;
