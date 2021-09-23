<template>
<div class="container">
    <ValidationObserver ref="loginForm">
        <div class="
          cred-panel
          mx-auto
          px-0
          col-12 col-md-8 col-lg-6
        ">
            <div class="px-4 mt-3">
                <p class="title-text2 mt-3 mb-0">Sign into Dealz</p>
                <p class="helper-text3">Please fill up the following details to register.</p>
            </div>
            <div class="cred-panel2" style="min-height:300px">
                <!-- Email -->
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <b-form-input placeholder="Email Address" v-model="email" type="email" :state="errors.length > 0 ? false : null" class="input-style mt-3 mt-md-4" />
                    <span class="text-danger helper-text4">{{ errors[0] }}</span>
                </ValidationProvider>
                <!-- Email -->

                <!-- Password -->
                <ValidationProvider name="passowrd" rules="required" v-slot="{ errors }" class="w-100">
                    <b-input-group class="password mt-3" @keyup.enter="login">
                        <b-form-input placeholder="Password" v-model="password" class="input-style" :state="errors.length > 0 ? false : null" :type="`${isPassword ? 'password' : 'text'}`"></b-form-input>
                        <b-input-group-append :class="`eye-input ${errors.length > 0 ? 'error' : ''}`" @click="togglePassword">
                            <b-icon icon="eye" aria-hidden="true" v-if="!isPassword"></b-icon>
                            <b-icon icon="eye-slash" aria-hidden="true" v-else></b-icon>
                        </b-input-group-append>
                    </b-input-group>
                    <span class="text-danger helper-text4">{{ errors[0] }}</span>
                </ValidationProvider>
                <!-- Password -->

                <b-form-checkbox id="checkbox-1" name="checkbox-1" class="data2 mt-3 mt-md-4">
                    Remember Me
                </b-form-checkbox>
                <p class="data2 float-right link" @click="forgotPass">Forgot Password</p>
                <b-button @click="login" block class="my-btn bg-primary-light">
                    <b-spinner class="mr-2" small v-if="isProcessing"></b-spinner>
                    <p v-else class="">Sign in</p>
                </b-button>
                <p class="data2 mt-2">or sign in using</p>
                <b-button @click="login" block class="my-btn" style="background:#DFE6EC;">
                    <div class="row justify-content-center">
                        <img :src="require('~/assets/img/google-icon.png')" width="20" height="20" class="float-left mr-2" alt="">
                        <p class="visible">
                            Sign in with Google
                        </p>
                    </div>

                </b-button>
                <b-button @click="login" block class="my-btn" style="background:#DFE6EC;">
                    <div class="row justify-content-center">
                        <img :src="require('~/assets/img/apple-icon.svg')" width="20" height="20" class="float-left mr-2" alt="">
                        <p class="visible">Sign in with Apple</p>
                    </div>
                </b-button>

                <p class="data2 mt-2">Don't have an account? <a href="/register"><b>Register now</b></a></p>
            </div>
        </div>
    </ValidationObserver>
</div>
</template>

<script>
import axios from 'axios';
import {
    mapMutations
} from 'vuex'
import {
    BCard,
    BInputGroup,
    BFormInput,
    BButton,
    BFormCheckbox,
} from "bootstrap-vue";
import {
    ValidationProvider,
    ValidationObserver,
    extend
} from "vee-validate";
import {
    required,
    email
} from "vee-validate/dist/rules";

extend("required", {
    ...required,
    message: "This field is required",
});

extend("email", {
    ...email,
    message: "This field must be a valid email",
});

export default {
    middleware: 'check-login',
    components: {
        BCard,
        BInputGroup,
        BFormInput,
        BButton,
        BFormCheckbox,
        ValidationObserver,
        ValidationProvider,
    },
    data: () => ({
        isPassword: true,
        email: null,
        password: null,
        isProcessing: false,
    }),
    methods: {
        togglePassword() {
            this.isPassword = !this.isPassword;
        },
        async login() {
            this.$refs.loginForm.validate().then((success) => {
                if (!success) {
                    return;
                }
                this.isProcessing = true;
                try {
                    let response = this.$auth.loginWith('local', {
                        data: {
                            email: this.email,
                            password: this.password
                        }
                    })
                    //autofetch is true in nuxt.config so no need to set user
                    // this.$auth.setUser(response)
                    var token = response.data.token
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    var decoded = JSON.parse(jsonPayload)

                    if (decoded.User_type == 'User') {
                        this.$router.push('/user')
                    } else if (decoded.User_type == 'Lawyer') {
                        this.$router.push('/lawyer')
                    } else if (decoded.User_type == 'Admin') {
                        this.$router.push('/admin')
                    }
                    this.successToast(response.data.message);

                } catch (err) {
                    this.isProcessing = false
                    this.failureToast('Login failure! Check your credentials again.');
                    console.log(err)
                }
            })
        },
        forgotPass() {
            this.$router.push('/forgot-password')
        }
    },
};
</script>

<style lang="scss">
@import "~/assets/styles/pages/login-signup.scss";
@import "~/assets/styles/typography.scss";
@import "~/assets/styles/color.scss";

.hoverable:hover {
    cursor: pointer;
    border: 2px solid #28eea1;
    ;
}

.visible {
    color: #182744;
}
</style>
