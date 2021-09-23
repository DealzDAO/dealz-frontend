<template>
<div class="container">
    <ValidationObserver ref="forgotForm">
        <div class="
          cred-panel
          mx-auto
          px-0
          col-12 col-md-8 col-lg-6
        ">
            <div class="px-4 mt-3">
                <p class="title-text2 mt-3 mb-0">Password Reset</p>
                <p class="helper-text3">Please enter your email address to reset the password</p>
            </div>
            <div class="cred-panel2" style="min-height:300px">
                <!-- Email -->
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <b-form-input placeholder="Email Address" v-model="email" type="email" :state="errors.length > 0 ? false : null" class="input-style mt-3 mt-md-4" />
                    <span class="text-danger helper-text4">{{ errors[0] }}</span>
                </ValidationProvider>
                <!-- Email -->

                <b-button @click="sendResetLink" block class="my-btn bg-primary-light mt-3">
                    <p>{{sendText}}</p>
                </b-button>

                <b-button @click="loginPage" block class="my-btn bg-secondary-soft mt-3">
                    <p class="text-helper2">Go Back</p>
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

extend("email", {
    ...email,
    message: "This field must be a valid email",
});
export default {
    middleware: 'check-login',
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data() {
        return {
            email: '',
            sendText: 'Send Password Reset Link'
        }
    },
    methods: {
        loginPage() {
            this.$router.push('/login')
        },
        sendResetLink() {
            this.$refs.forgotForm.validate().then((success) => {
                if (!success) {
                    return;
                }
                this.sendText = 'Sending...'

                axios
                    .post(
                        this.$axios.defaults.baseURL + "/auth/forget-password", {
                            'email': this.email
                        }
                    )
                    .then(res => {
                        if (res.data.Success == 'False') {
                            this.failureToast(res.data.message);
                        } else {
                            this.$store.commit('dealz/setEmail',this.email)
                            this.$router.push('/login')
                            this.successToast(res.data.message);
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    });
            })

        }
    }
}
</script>

<style lang="scss">
@import "~/assets/styles/pages/login-signup.scss";
@import "~/assets/styles/typography.scss";
@import "~/assets/styles/color.scss";
</style>
