import entryStorage from './storage.js';
import Vue from 'vue';

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
                completed: false
            });
            this.newEntry = '';
        },

        removeEntry: function (entry) {
            this.entries.splice(this.entries.indexOf(entry), 1);
        },

        editEntry: function (entry) {
            this.beforeEditCache = entry.title;
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
            entry.title = this.beforeEditCache;
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
