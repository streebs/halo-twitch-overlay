<template>
    <div class="m-3">
        <input v-model="gamertag" type="text">
        <button class="btn btn-primary" @click="navigateTo()">GO</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                gamertag: ""
            }
        },
        methods: {
            navigateTo() {
                this.$router.push({
                    name: "tracker",
                    params: {gamertag: this.gamertag}
                })
            },  
        }

    }
</script>

<style>
    /* .input-group {
        background-color: #014052;
    }
    .form-control {
        background-color: #014052;
    } */
</style>