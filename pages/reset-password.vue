<template>
<div class="container">
    <ValidationObserver ref="resetForm">
        <div class="
          cred-panel
          mx-auto
          px-0
          col-12 col-md-8 col-lg-6
        ">
            <div class="px-4 mt-3">
                <p class="title-text2 mt-3 mb-0">Password Reset</p>
                <p class="helper-text3">Please enter your password.</p>
            </div>
            <div class="cred-panel2" style="min-height:300px">
                <!-- Password -->
                <ValidationProvider name="passowrd" rules="required|min8|uppercase1|lowercase1|number1|specialChar" v-slot="{ errors }" class="w-100">
                    <b-input-group class="password mt-3" @keyup.enter="login">
                        <b-form-input placeholder="Password" v-model="password" class="input-style" :state="errors.length > 0 ? false : null" :type="`${isPassword ? 'password' : 'text'}`"></b-form-input>
                        <b-input-group-append :class="`eye-input ${errors.length > 0 ? 'error' : ''}`" @click="togglePassword">
                            <b-icon icon="eye" aria-hidden="true" v-if="!isPassword"></b-icon>
                            <b-icon icon="eye-slash" aria-hidden="true" v-else></b-icon>
                        </b-input-group-append>
                    </b-input-group>
                    <span class="text-danger helper-text4">{{ errors[0] }}</span>
                </ValidationProvider>
                <!-- end password -->

                <!--confirm Password -->
                <ValidationProvider name="confirmPassword" rules="required" v-slot="{ errors }" class="w-100">
                    <b-input-group class="password mt-3" @keyup.enter="login">
                        <b-form-input placeholder="Enter your password again" v-model="confirmPassword" class="input-style" :state="errors.length > 0 ? false : null" :type="`${isPassword ? 'password' : 'text'}`"></b-form-input>
                        <b-input-group-append :class="`eye-input ${errors.length > 0 ? 'error' : ''}`" @click="togglePassword">
                            <b-icon icon="eye" aria-hidden="true" v-if="!isPassword"></b-icon>
                            <b-icon icon="eye-slash" aria-hidden="true" v-else></b-icon>
                        </b-input-group-append>
                    </b-input-group>
                    <span class="text-danger helper-text4" id="confirm">{{ errors[0] }}</span>
                </ValidationProvider>
                <!-- end confirm password -->

                <b-button @click="resetPassword" block class="my-btn bg-primary-light mt-3">
                    <b-spinner class="mr-2" small v-if="saving"></b-spinner>
                    <p v-else>Save new password</p>
                </b-button>
            </div>
        </div>
    </ValidationObserver>
</div>
</template>

<script>
import axios from 'axios'
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

extend('min8', {
    validate: value => {
        return value.length >= 8;
    },
    message: 'Minimum 8 characters'
});
extend('uppercase1', {
    validate: value => {
        return /(?=.*[A-Z])/.test(value);
    },
    message: 'Must have an uppercase'
});
extend('lowercase1', {
    validate: value => {
        return /(?=.*[a-z])/.test(value);
    },
    message: 'Must have a lowercase'
});
extend('number1', {
    validate: value => {
        return /(?=.*\d)/.test(value);
    },
    message: 'Must contain a number'
});
extend('specialChar', {
    validate: value => {
        return /(?=.*[!@#\$%\^&\*])/.test(value);
    },
    message: 'Must contain a special character ex-!,@,#,%,&'
});
extend('confirm', {
    validate: value => {
        return this.password = this.confirmPassword;
    },
    message: 'Password is not matching'
});
export default {
    middleware: 'check-login',
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data() {
        return {
            isPassword: true,
            password: '',
            confirmPassword: '',
            saving: false,
            userId:''
        }
    },
    watch: {
        confirmPassword() {
            if (this.confirmPassword.length > 0) {
                if (this.password != this.confirmPassword) {
                    document.getElementById('confirm').innerHTML = 'Password is not matching'
                } else {
                    document.getElementById('confirm').innerHTML = ''

                }
            }
        }
    },
    mounted() {
        var currentUrl = window.location.href;
        let params = (new URL(currentUrl)).searchParams;
        this.userId=params.get('id')
    
    },
    methods: {
        togglePassword() {
            this.isPassword = !this.isPassword;
        },
        loginPage() {
            this.$router.push('/login')
        },
        resetPassword() {
            if (this.password == this.confirmPassword) {
                this.$refs.resetForm.validate().then((success) => {
                    if (!success) {
                        return;
                    }
                    this.saving = true
                    axios
                        .post(
                            this.$axios.defaults.baseURL + "/auth/reset-password", {
                                'password': this.password,
                                'confirmPassword': this.confirmPassword,
                                'id':this.userId
                            }
                        )
                        .then(res => {
                            if (res.data.Success == 'False') {
                                this.failureToast(res.data.message);
                            } else {
                                this.$router.push('/login')
                                this.successToast('Password reset successfull. You can login now.');
                            }

                        })
                        .catch(err => {
                            console.log(err)
                        });
                })
            } else {
                return;
            }

        }
    }
}
</script>

<style lang="scss">
@import "~/assets/styles/pages/login-signup.scss";
@import "~/assets/styles/typography.scss";
@import "~/assets/styles/color.scss";
</style>
