<template>
    <div>
        <div v-if="message" class="bg-green-500 font-semibold p-2 my-2 text-white rounded">{{ message }}</div>

        <div v-if="! loaded">Loading...</div>
        
        <div v-else class="bg-teal-500 text-white p-2 my-2 rounded">
            <form @submit.prevent="onSubmit($event)">
            <div class="form-group my-2 py-2">
                <label for="user_name" class="font-bold">Name : </label>
                <input id="user_name" v-model="user.name" class="outline-none w-full bg-teal-600 rounded border-none p-1" />
            </div>
            <div class="form-group my-2 py-2">
                <label for="user_email" class="font-bold">Email : </label>
                <input id="user_email" type="email" v-model="user.email" class="outline-none w-full bg-teal-600 rounded border-none p-1"/>
            </div>
            <div class="form-group my-2">
                <button type="submit" class="bg-teal-600 py-2 px-4 font-semibold rounded hover:bg-teal-700" :disabled="saving">Update</button>
                <button :disabled="saving" @click.prevent="onDelete($event)" class="bg-red-600 py-2 px-4 font-semibold rounded hover:bg-red-700">Delete</button>
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
                message: null,
                loaded: false,
                saving: false,
                user: {
                    id: null,
                    name: "",
                    email: "",
                }
            };
        },
        created() {
            users_api.find(this.$route.params.id)
                .then((response) => {
                    this.loaded = true;
                    this.user = response.data.data;
                })
                .catch((err) => {
                this.$router.push({ name: '404' });
                });
        },
        methods: {
            onSubmit(event) {
               this.saving = true;

                users_api.update(this.user.id, {
                    name: this.user.name,
                    email: this.user.email,
                }).then((response) => {
                    this.message = 'User updated succesfully.';
                    setTimeout(() => this.message = null, 2000);
                    this.user = response.data.data;
                }).catch(error => {
                    console.log(error)
                }).then(() => this.saving = false);
            },
            onDelete() {
                this.saving = true;
                users_api.delete(this.user.id)
                    .then((response) => {
                        this.message = 'User Deleted';
                        setTimeout(() => this.$router.push({ name: 'users.index' }), 2000);
                    });
            }
        },
        
    }
</script>
<style scoped>

</style>