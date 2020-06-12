import Vue from 'vue';
import router from './router';
import App from './components/App'

require('./bootstrap');

const app = new Vue({
    el: '#app',
    components: {
        "app": App,
    },
    router,
});
