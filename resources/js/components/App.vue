<template>
    <div>
        <h1 class="text-3xl border-dashed border-b border-teal-500 my-2 py-2 text-teal-700">Vue Router Demo App</h1>

        <div class="text-teal-500 py-2">
            <router-link :to="{ name: 'home' }" class="">Home</router-link>
            <span class="font-bold">|</span>
            <router-link :to="{ name: 'users.index' }" class="">Users</router-link>
        </div>

        <div class="border-dashed border-t border-teal-500 py-2">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped>

</style>
