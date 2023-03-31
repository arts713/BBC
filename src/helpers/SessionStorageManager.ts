class SessionStorageManager {
    public getItem<T>(keyName: string): T | undefined {
        const item = window.sessionStorage.getItem(keyName);

        if (item) {
            return JSON.parse(item) as T;
        }

        return undefined;
    }

    public setItem<T>(keyName: string, data: T): void {
        window.sessionStorage.setItem(keyName, JSON.stringify(data));
    }
}

export default SessionStorageManager;
