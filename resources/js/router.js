import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "./components/Home";
import UsersIndex from "./components/UsersIndex";
import UsersCreate from "./components/UsersCreate";
import UsersEdit from "./components/UsersEdit";
import NotFound from "./components/NotFound";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/',                name:'home',        component: Home },
        { path: '/users',           name:'users.index', component: UsersIndex },
        { path: '/users/create',    name:'users.create',component: UsersCreate },
        { path: '/users/:id/edit',  name:'users.edit',  component: UsersEdit },
        { path: '/404',             name: '404',        component: NotFound },
        { path: '*',                redirect: '/404' },
    ],
    mode: 'history',
});
