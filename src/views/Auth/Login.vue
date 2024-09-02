<script setup>
import { reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const form = reactive({
  username: '',
  password: ''});

const swal = inject('$swal');

async function submit() {
  const showMessage = (icon, title, text, html) => 
    swal.fire({ icon, title, text, html, showConfirmButton: false, timer: 2500 });

  try {
    showMessage('info', 'Checking User...', 'Please Wait!');
      const response = await axios.post('login', form);

    if (response.data.status) {
      showMessage('success', 'Logged In!');

      // Store the token and user data
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('accessToken', response.data.token);

      // Set the token in Axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      router.push({ name: 'Dashboard' });
    } else {
      showMessage('error', 'Failed to Login.', 'Invalid username or password.');
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      showMessage('warning', 'Failed to Login.', 'Please enter your username & password!');
    } else if (error.response && error.response.status === 403) {
      showMessage('error', 'Account Unauthorized.', 'Please wait for your account to be activate!');
    } else if (error.response && error.response.status === 401) {
      showMessage('error', 'Failed to Login.', 'Invalid Credentials!');
    }
  }
}

const logoPath = '/dist/img/logotickets.png';
</script>

<template>
  <div class="dark-mode hold-transition login-page">
    <div class="login-box">
      <div class="card card-outline card-warning bg-gradient-dark">
        <div class="card-header text-center">
          <a href="#" class="h1">
            <img :src="logoPath" alt="AdminLTE Logo" class="brand-image" width="50" height="50">
            <b> Client</b> Demo
          </a>
        </div>
        <div class="card-body ">
          <p class="login-box-msg">Sign in to start your session</p>

          <!-- Email/Username -->
          <div class="input-group mb-3">
            <input type="text" v-model="form.username" name="username" class="form-control" placeholder="Enter Username"
              autocomplete="username" required autofocus>
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-user"></span>
              </div>
            </div>
          </div>

          <!-- Password -->
          <div class="input-group mb-3">
            <input type="password" v-model="form.password" name="password" class="form-control"
              placeholder="Enter Password" required>
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="row">
            <p class="col-8">
              <router-link to="/forget">I forgot my password</router-link>
            </p>
            <div class="col-4">
              <button @click.prevent="submit" class="btn btn-warning btn-block">Sign In</button>
            </div>
            <p class="col-8">
              <router-link to="/register">Register Membership</router-link>
            </p>
          </div>
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