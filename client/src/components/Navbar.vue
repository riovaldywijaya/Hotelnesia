<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white px-lg-3 py-lg-2 shadow-sm sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand me-5 fw-bold fs-3 h-font" href="#"><span class="h-font" style="color: #2e44c1">Hotel</span>nesia</a>
        <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link me-2" aria-current="page" href="#">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/rooms" class="nav-link me-2" href="#">Rooms</RouterLink>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link me-2" href="#">Facilities</a>
            </li>
            <li class="nav-item">
              <a class="nav-link me-2" href="#">Contact Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li> -->
          </ul>
          <div class="d-flex" role="search">
            <button type="button" class="btn btn-outline-dark shadow-none me-lg-3 me-2" data-bs-toggle="modal" data-bs-target="#loginModal" v-if="!isLogin">Login</button>
            <button type="button" class="btn btn-outline-dark shadow-none" data-bs-toggle="modal" data-bs-target="#registerModal" v-if="!isLogin">Register</button>
            <button type="button" class="btn btn-outline-dark shadow-none" v-if="isLogin" @click.prevent="clickLogout">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- LOGIN -->
    <div class="modal fade" id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submitLogin">
            <div class="modal-header">
              <h5 class="modal-title d-flex align-items-center"><i class="bi bi-person-circle fs-3 me-2"></i> User Login</h5>
              <button type="reset" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <input type="email" class="form-control shadow-none" v-model="formLogin.email" />
              </div>
              <div class="mb-4">
                <label class="form-label">Password</label>
                <input type="password" class="form-control shadow-none" v-model="formLogin.password" />
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <button type="submit" class="btn btn-dark shadow-none">Login</button>
                <!-- <a href="" class="text-secondary text-decoration-none">Forgot Password?</a> -->
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- REGISTER -->
    <div class="modal fade" id="registerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <form enctype="multipart/form-data" @submit.prevent="submitRegister">
            <div class="modal-header">
              <h5 class="modal-title d-flex align-items-center">
                <i class="bi bi-person-lines-fill"></i>
                User Registration
              </h5>
              <button type="reset" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <span class="badge rounded-pill bg-light text-dark mb-3 text-wrap lh-base"> Note : Your details must match with your ID, that will be required during check-in. </span>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-6 ps-0 mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control shadow-none" v-model="formRegister.name" />
                  </div>
                  <div class="col-md-6 p-0 mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control shadow-none" v-model="formRegister.email" />
                  </div>
                  <div class="col-md-6 ps-0 mb-3">
                    <label class="form-label">Phone Number</label>
                    <input type="number" class="form-control shadow-none" v-model="formRegister.phoneNumber" />
                  </div>
                  <div class="col-md-6 p-0 mb-3">
                    <label class="form-label">Picture</label>
                    <input type="file" class="form-control shadow-none" name="profilePicture" @change="onFileChange" />
                  </div>
                  <div class="col-md-12 p-0 mb-3">
                    <label class="form-label">Address</label>
                    <textarea class="form-control shadow-none" rows="1" v-model="formRegister.address"></textarea>
                  </div>
                  <!-- <div class="col-md-6 ps-0 mb-3">
                    <label class="form-label">Pincode</label>
                    <input type="number" class="form-control shadow-none" />
                  </div> -->
                  <div class="col-md-6 p-0 mb-3">
                    <label class="form-label">Date of birth</label>
                    <input type="date" class="form-control shadow-none" v-model="formRegister.dateOfBirth" />
                  </div>
                  <div class="col-md-6 ps-0 mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control shadow-none" v-model="formRegister.password" />
                  </div>
                  <!-- <div class="col-md-6 p-0 mb-3">
                    <label class="form-label">Confirm password</label>
                    <input type="password" class="form-control shadow-none" />
                  </div> -->
                </div>
              </div>
              <div class="text-center my-1">
                <button type="submit" class="btn btn-dark shadow-none">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main';
export default {
  data() {
    return {
      formLogin: {
        email: '',
        password: '',
      },
      formRegister: {
        name: '',
        email: '',
        phoneNumber: null,
        profilePicture: null,
        address: '',
        dateOfBirth: '',
        password: '',
      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.formRegister.profilePicture = files[0];
      },
    };
  },
  methods: {
    ...mapActions(useMainStore, ['register', 'login', 'logout']),
    submitRegister() {
      this.register(this.formRegister);
    },
    submitLogin() {
      this.login(this.formLogin);
    },
    clickLogout() {
      this.logout();
    },
  },
  computed: {
    ...mapState(useMainStore, ['access_token']),
    isLogin() {
      return this.access_token ? true : false;
    },
  },
};
</script>

<style></style>
