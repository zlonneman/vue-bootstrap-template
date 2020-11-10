import Vue from 'vue';
import {can}  from './permissions';

Vue.mixin({
    methods: {
        can: function(permission) {
            return can(permission);
        }
    }
});
