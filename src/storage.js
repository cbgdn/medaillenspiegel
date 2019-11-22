// localStorage persistence
const STORAGE_KEY = 'medaillenspiegel_1';

var entryStorage = {
    fetch: function () {
        var entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        entries.forEach(function (entry, index) {
            entry.id = index;
        })
        entryStorage.uid = entries.length;
        return entries;
    },
    save: function (entries) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    }
}

export default entryStorage;
