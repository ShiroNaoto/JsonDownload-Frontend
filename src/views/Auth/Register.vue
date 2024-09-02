<script setup>
import { reactive } from 'vue';
import useUsers from '@/composables/users';

const { storeUser, errors } = useUsers();
const logoPath = '/dist/img/logotickets.png';

const form = reactive({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: ""
})
</script>


<template>
    <div class="dark-mode hold-transition register-page">
        <div class="register-box">
            <div class="card card-outline card-warning bg-gradient-dark">
                <div class="card-header text-center">
                    <a href="#" class="h1"><img :src="logoPath" alt="AdminLTE Logo" class="brand-image" width="50"
                            height="50"><b> Client</b> Demo</a>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">Please enter your information here!</p>

                        <div class="input-group mb-3">
                            <input type="text" id="name" v-model="form.name" class="form-control"
                                placeholder="Full name" autocomplete="off">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <input type="text" id="username" v-model="form.username" class="form-control"
                                placeholder="Username" autocomplete="off">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <input type="email" id="email" v-model="form.email" class="form-control" placeholder="Email"
                                autocomplete="off">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <input type="password" id="password" v-model="form.password" class="form-control"
                                placeholder="Enter Password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <input type="password" id="password_confirmation" v-model="form.password_confirmation"
                                autocomplete="new-password" class="form-control" placeholder="Retype Password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <label for="agreeTerms">
                                        the <a href="https://www.youtube.com/watch?v=A9vmwIo0lfA">terms &
                                            conditions</a>
                                    </label>
                                </div>
                            </div>

                            <div class="col-4">
                                <button @click.prevent="storeUser(form)" class="btn btn-warning btn-block">Register</button>
                            </div>
                        </div>
                    <router-link to="/" class="text-center">I already have a membership</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.register-page {
    background-image: url('/dist/img/cover2.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>