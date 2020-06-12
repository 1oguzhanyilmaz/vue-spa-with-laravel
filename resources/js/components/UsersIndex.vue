<template>
     <div class="users">
        <div v-if="error" class="error">
            <p>{{ error }}</p>
        </div>

        <ul v-if="users">
            <li v-for="{ id, name, email } in users" class="my-2 py-2 px-4 bg-gray-200 rounded text-white text-sm font-semibold flex">
                <div class="w-12 h-12 bg-teal-600 mr-4 rounded-full flex items-center justify-center">
                    {{ id }}
                </div>
                <div class="flex-1 bg-teal-500 rounded p-4">
                    <p><span class="font-bold">Name :</span> {{ name }} </p>
                    <p><span class="font-bold">Email :</span> {{ email }}</p>
                </div>
            </li>
        </ul>

        <div class="pagination text-center my-2 py-2 border-t">
            <button :disabled="! prevPage" @click.prevent="goToPrev" class="bg-teal-500 px-2 py-1 text-white rounded mr-4">Previous</button>
            <span class="text-teal-500">{{ paginatonCount }}</span>
            <button :disabled="! nextPage" @click.prevent="goToNext" class="bg-teal-500 px-2 py-1 text-white rounded ml-4">Next</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    const getUsers = (page, callback) => {
        const params = { page };

        axios
            .get('/api/users', { params })
            .then(response => {
                callback(null, response.data);
            }).catch(error => {
                callback(error, error.response.data);
            });
    };

    console.log('##################################');
    console.log(getUsers);

    export default {
        name: "UsersIndex",
        data() {
            return {
                users: null,
                meta: null,
                links: {
                    first: null,
                    last: null,
                    next: null,
                    prev: null,
                },
                error: null,
            };
        },
        computed: {
            nextPage() {
                if (! this.meta || this.meta.current_page === this.meta.last_page) {
                    return;
                }

                return this.meta.current_page + 1;
            },
            prevPage() {
                if (! this.meta || this.meta.current_page === 1) {
                    return;
                }

                return this.meta.current_page - 1;
            },
            paginatonCount() {
                if (! this.meta) {
                    return;
                }
                const { current_page, last_page } = this.meta;

                return `${current_page} of ${last_page}`;
            },
        },
         beforeRouteEnter (to, from, next) {
            getUsers(to.query.page, (err, data) => {
                next(vm => vm.setData(err, data));
            });
        },
        // when route changes and this component is already rendered,
        // the logic will be slightly different.
        beforeRouteUpdate (to, from, next) {
            this.users = this.links = this.meta = null
            getUsers(to.query.page, (err, data) => {
                this.setData(err, data);
                next();
            });
        },
        methods: {
            goToNext() {
                this.$router.push({
                    query: {
                        page: this.nextPage,
                    },
                });
            },
            goToPrev() {
                this.$router.push({
                    name: 'users.index',
                    query: {
                        page: this.prevPage,
                    }
                });
            },
            setData(err, { data: users, links, meta }) {
                if (err) {
                    this.error = err.toString();
                } else {
                    this.users = users;
                    this.links = links;
                    this.meta = meta;
                }
            },
        }
    }
</script>
<style scoped>

</style>