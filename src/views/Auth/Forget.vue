<script setup>
const logoPath = '/dist/img/logotickets.png';
</script>

<template>
    <div class="dark-mode hold-transition login-page">
        <div class="login-box">
            <div class="card card-outline card-warning bg-gradient-dark">
                <div class="card-header text-center">
                    <a href="#" class="h1">
                        <img :src="logoPath" alt="AdminLTE Logo" class="brand-image" width="50"
                            height="50">
                        <b> Ticket</b> System
                    </a>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
                    <form action="recover-password.html" method="post">
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="Email">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary btn-block">Request new password</button>
                            </div>
                        </div>
                    </form>
                    <p class="mt-3 mb-1">
                        <router-link to="/">Return to Login page</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-page {
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