import entryStorage from './storage.js';
import Vue from 'vue/dist/vue.js';

// app Vue instance
var app = new Vue({
    // app initial state
    data: {
        entries: entryStorage.fetch(),
        newEntry: '',
        editedEntry: null,
        visibility: 'all'
    },

    // watch entries change for localStorage persistence
    watch: {
        entries: {
            handler: function (entries) {
                entryStorage.save(entries);
            },
            deep: true
        }
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
        addEntry: function () {
            var value = this.newEntry && this.newEntry.trim();
            if (!value) {
                return;
            }
            this.entries.push({
                id: entryStorage.uid++,
                title: value,
                gold: 0,
                silver: 0,
                bronze: 0
            });
            this.newEntry = '';
        },

        removeEntry: function (entry) {
            this.entries.splice(this.entries.indexOf(entry), 1);
        },

        editEntry: function (entry) {
            this.beforeEditTitle = entry.title;
            this.beforeEditGold = entry.gold;
            this.beforeEditSilver = entry.silver;
            this.beforeEditBronze = entry.bronze;
            this.editedEntry = entry;
        },

        doneEdit: function (entry) {
            if (!this.editedEntry) {
                return;
            }
            this.editedEntry = null;
            entry.title = entry.title.trim();
            if (!entry.title) {
                this.removeEntry(entry);
            }
        },

        cancelEdit: function (entry) {
            this.editedEntry = null;
            entry.title = this.beforeEditTitle;
            entry.gold = this.beforeEditGold;
            entry.silver = this.beforeEditSilver;
            entry.bronze = this.beforeEditBronze;
        },
    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
        'entry-focus': function (el, binding) {
            if (binding.value) {
                el.focus();
            }
        }
    }
});

export default app;
