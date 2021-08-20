<template>
<div class="container">
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
            <b-form-input placeholder="Email Address" type="email" class="input-style mt-3 mt-md-4" />
            <!-- Email -->

            <b-button @click="login" block class="my-btn bg-primary-light mt-3">
                <p>Send Password Reset Link</p>
            </b-button>

            <b-button @click="loginPage" block class="my-btn bg-secondary-soft mt-3">
                <p class="text-helper2">Go Back</p>
            </b-button>

        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        loginPage() {
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/styles/pages/login-signup.scss";
@import "~/assets/styles/typography.scss";
@import "~/assets/styles/color.scss";
</style>
