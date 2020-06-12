import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "./components/Home";
import UsersIndex from "./components/UsersIndex";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', name:'home', component: Home },
        { path: '/users', name:'users.index', component: UsersIndex },
    ],
    mode: 'history',
});
