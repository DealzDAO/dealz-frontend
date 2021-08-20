<template>
<div class="container">
    <ValidationObserver ref="registerForm">
        <div class="
         cred-panel
          mx-auto
          px-0
          col-12 col-md-8 col-lg-6
        ">
            <div class="px-4 mt-3">
                <p class="title-text2 mt-3 mb-0">Register as a user</p>
                <p class="helper-text3">Please fill up the following details to register.</p>
            </div>
            <div class="cred-panel2">
                <!-- avatar -->
                <p class="helper-text3">Select a desired avatar</p>
                <div class="row justify-content-around px-3">
                    <div v-for="(item,i) in avatars" :key="i" @click="selectAvatar(item)">
                        <b-avatar  class="bg-white hoverable" :class="getSelected(item)"  rounded="lg" size="58px" :src="require(`~/assets/img/${item.title}.png`)"></b-avatar>
                    </div>
                </div>
                <!-- end avatar -->
                <!-- Full Name -->
                <ValidationProvider name="fullName" rules="required" ref="name" v-slot="{ errors }">
                    <b-form-input placeholder="Full Name" v-model="fullName" type="text" :state="errors.length > 0 ? false : null" class="text-box mt-md-4 mb-0" />
                    <span class="helper-text3 text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <!-- Email -->

                <!-- Email -->
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" ref="email">
                    <b-form-input placeholder="Email Address" v-model="email" type="email" :state="errors.length > 0 ? false : null" class="text-box mt-md-4 mb-0" />
                    <span class="helper-text3 text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <!-- Email -->

                <!-- Password -->
                <ValidationProvider name="password" rules="required|min8|uppercase1|lowercase1|number1|specialChar" v-slot="{ errors }" ref="email">
                    <b-form-input placeholder="Password" v-model="password" type="password" :state="errors.length > 0 ? false : null" class="text-box mt-md-4 mb-0" />
                    <span class="helper-text3 text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <!-- <ValidationProvider name="passowrd" rules="required" ref="password" v-slot="{ errors }" class="w-100">
                    <b-input-group class="password text-box mt-md-4">
                        <b-form-input placeholder="Password"  v-model="password" :state="errors.length > 0 ? false : null" :type="`${isPassword ? 'password' : 'text'}`"></b-form-input>
                        <b-input-group-append :class="`eye-input ${errors.length > 0 ? 'error' : ''}`" @click="togglePassword">
                            <b-icon icon="eye" aria-hidden="true" v-if="!isPassword"></b-icon>
                            <b-icon icon="eye-slash" aria-hidden="true" v-else></b-icon>
                        </b-input-group-append>
                    </b-input-group>
                    <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider> -->
                <!-- Password -->

                <!-- Practice -->
                <ValidationProvider name="practice" v-slot="{ errors }">
                    <b-form-select v-model="selected" :options="practice" class="text-box mt-4"></b-form-select>
                    <span class="helper-text3 text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <!-- End practice -->

                <!-- State -->
                <ValidationProvider name="practice" v-slot="{ errors }">
                    <b-form-select v-model="selected" :options="state" class="text-box mt-2"></b-form-select>
                    <span class="helper-text3 text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <!-- End state -->

                <b-form-checkbox id="checkbox-1" name="checkbox-1" v-model="agreeTerm">
                    <span class="para-text">I agree with Dealz <strong>terms</strong> and <strong>policies.</strong></span>
                </b-form-checkbox>
                <span class="helper-text3 text-danger">{{ agreeText }}</span>

                <b-button class="btn-block bg-primary-light mt-2" @click="register">
                    <span>{{btnText}}</span>
                </b-button>
            </div>
        </div>
    </ValidationObserver>
</div>
</template>

<script>
import {
    BCard,
    BInputGroup,
    BFormInput,
    BButton,
    BFormCheckbox,
    BFormSelect,
    BSpinner,
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
import ApiService from "@/services/index.js";

extend("required", {
    ...required,
    message: "This field is required",
});

extend("email", {
    ...email,
    message: "This field must be a valid email",
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
export default {
    components: {
        BCard,
        BInputGroup,
        BFormInput,
        BButton,
        BFormCheckbox,
        BFormSelect,
        BSpinner,
        ValidationObserver,
        ValidationProvider,
    },
    data: () => ({
        avatars: [{
            title: 'avatar1'
        }, {
            title: 'avatar2'
        }, {
            title: 'avatar3'
        }, {
            title: 'avatar4'
        }, {
            title: 'avatar5'
        }, {
            title: 'avatar6'
        }],
        state: [{
                value: null,
                text: 'Select state'
            },
            {
                value: 'a',
                text: 'This is First option'
            },
        ],
        practice: [{
                value: null,
                text: 'Select practice'
            },
            {
                value: 'Art',
                text: 'Art'
            },
            {
                value: 'Crypto',
                text: 'Crypto'
            },
            {
                value: 'Music',
                text: 'Music'
            },
            {
                value: 'Startup',
                text: 'Startup'
            },
        ],
        selectedAvatar: 'avatar1',
        selected: null,
        isPassword: true,
        fullName: null,
        email: null,
        password: null,
        profession: null,
        agreeTerm: false,
        agreeText:'',
        btnText:'Sign in',
        professions: [{
                value: null,
                text: "Please select a profession",
                disabled: true
            },
            {
                value: "Music Artist",
                text: "Music Artist"
            },
            {
                value: "Designer",
                text: "Designer"
            },
            {
                value: "Founder",
                text: "Founder"
            },
        ],
        isProcessing: false,
    }),
    watch:{
        agreeTerm(newValue,oldValue){
            if(newValue==true){
                this.agreeText=''
            }
        }
    },
    methods: {
        togglePassword() {
            this.isPassword = !this.isPassword;
        },
        register() {
            this.$refs.registerForm.validate().then((success) => {
                if (!success) {
                    return;
                }
                else if(!this.agreeTerm){
                    this.agreeText='You must agree to terms and conditions'
                    return;
                }
                this.btnText='Signing you in...'
                let userData = {
                    name: this.fullName,
                    email: this.email,
                    password: this.password,
                    User_type: "User",
                    profession: 'Employee',
                };
                this.isProcessing = true;
                ApiService.register(userData)
                    .then((response) => {
                        this.successToast(response.data.message);
                        this.$router.push('/login')

                    })
                    .catch((errors) => {
                        this.btnText='Sign in'
                        errors.response.data.errors.forEach((err) => {
                            this.$refs[err.param].setErrors([err.msg]);
                        });
                    })
                    .finally(() => {
                        this.isProcessing = false;
                    });
            });
        },
        getSelected(item) {
            if (item.title == this.selectedAvatar) {
                return 'selected'
            }
        },
        selectAvatar(item) {
            this.selectedAvatar = item.title
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
</style>
