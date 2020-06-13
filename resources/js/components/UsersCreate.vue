<template>
    <div>
        <h1 class="my-2 text-2xl font-semibold text-teal-600">Create a User</h1>
        <div v-if="message" class="bg-green-500 font-semibold p-2 my-2 text-white rounded">{{ message }}</div>
        <div class="bg-teal-500 text-white p-2 my-2 rounded">
            <form @submit.prevent="onSubmit($event)">
                <div class="form-group my-2 py-2">
                    <label for="user_name" class="font-bold">Name</label>
                    <input id="user_name" v-model="user.name" class="outline-none w-full bg-teal-600 rounded border-none p-1" />
                </div>
                <div class="form-group my-2 py-2">
                    <label for="user_email">Email</label>
                    <input id="user_email" type="email" v-model="user.email" class="outline-none w-full bg-teal-600 rounded border-none p-1" />
                </div>
                <div class="form-group my-2 py-2">
                    <label for="user_password">Password</label>
                    <input id="user_password" type="password" v-model="user.password" class="outline-none w-full bg-teal-600 rounded border-none p-1" />
                </div>
                <div class="form-group my-2 py-2">
                    <button type="submit" :disabled="saving" class="bg-teal-600 py-2 px-4 font-semibold rounded hover:bg-teal-700">
                        {{ saving ? 'Creating...' : 'Create' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import users_api from '../users';

    export default {
        name: "UsersEdit",
        data() {
            return {
                saving: false,
                message: false,
                user: {
                    name: '',
                    email: '',
                    password: '',
                }
            };
        },
        methods: {
            onSubmit($event) {
                this.saving = true;
                this.message = false;
                users_api.create(this.user)
                    .then((response) => {
                        console.log(response);
                        this.$router.push({ name: 'users.edit', params: { id: response.data.data.id } });
                    })
                    .catch((e) => {
                        this.message = e.response.data.message || 'There was an issue creating the user.';
                    })
                    .then(() => this.saving = false)
            }
        },
        
    }
</script>
<style scoped>

</style>