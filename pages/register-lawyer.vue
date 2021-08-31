<template>
<div class="container">

    <div class="
          cred-panel
          mx-auto
          px-0
          col-12 col-md-8 col-lg-6
        ">
        <div class="px-4 mt-3">
            <div class="row px-1 justify-content-between">
                <div>
                    <div class="reg-dots d-inline-block" :class="getDotBg(1)"></div>
                    <div class="reg-dots d-inline-block" :class="getDotBg(2)"></div>
                    <div class="reg-dots d-inline-block" :class="getDotBg(3)"></div>
                </div>
                <p class="mb-0 text-helper" v-if="tab==3" @click="tab==1">
                    <b-icon icon="arrow-bar-left"></b-icon>
                    <span>Logout</span>
                </p>
            </div>
            <p class="title-text2 mt-3 mb-0">Register as a Lawyer</p>
            <p class="helper-text3">{{formText}}</p>
        </div>

        <div class="cred-panel2">
            <div v-if="tab==1">
                <ValidationObserver ref="registerForm1">
                    <!-- Full Name -->
                    <ValidationProvider name="fullName" rules="required" ref="name" v-slot="{ errors }">
                        <b-form-input placeholder="Full Name" v-model="fullName" type="text" :state="errors.length > 0 ? false : null" class="text-box mt-md-4 mb-0" />
                        <span class="helper-text4 text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <!-- Email -->

                    <!-- Firm -->
                    <ValidationProvider name="firm" rules="max100" v-slot="{ errors }">
                        <b-form-input placeholder="Firm (Optional)" v-model="firm" :state="errors.length > 0 ? false : null" class="text-box mt-md-4 mb-0" />
                        <span class="helper-text4 text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <!-- Firm -->

                    <!-- Email -->
                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" ref="email">
                        <b-form-input placeholder="Email Address" v-model="email" type="email" :state="errors.length > 0 ? false : null" class="text-box mt-md-4 mb-0" />
                        <span class="helper-text4 text-danger mt-n3">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <!-- Email -->

                    <!-- Password -->
                    <ValidationProvider name="password" rules="required|min8|uppercase1|lowercase1|number1|specialChar" v-slot="{ errors }">
                        <b-form-input placeholder="Password" v-model="password" :state="errors.length > 0 ? false : null" :type="`${isPassword ? 'password' : 'text'}`" class="text-box mt-md-4 mb-0" />
                        <span class="helper-text4 text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <!-- Password -->

                    <!-- Practice -->
                    <ValidationProvider name="practice" v-slot="{ errors }">
                        <b-form-select v-model="selected" :options="practice" class="text-box mt-2"></b-form-select>
                        <span class="helper-text4 text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <!-- End practice -->

                    <!-- State -->
                    <ValidationProvider name="practice" v-slot="{ errors }">
                        <b-form-select v-model="selected" :options="state" class="text-box mt-2"></b-form-select>
                        <span class="helper-text4 text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <!-- End state -->

                    <b-form-checkbox id="checkbox-1" name="checkbox-1" v-model="agreeTerm">
                        <span class="para-text">I agree with Dealz <strong>terms</strong> and <strong>policies.</strong></span>
                    </b-form-checkbox>
                    <span class="helper-text3 text-danger">{{ agreeText }}</span>

                    <b-button @click="next" class="btn-block bg-primary-light mt-2">
                        <span>{{btnText}}</span>
                    </b-button>
                </ValidationObserver>
            </div>
            <div v-if="tab==2">
                <ValidationObserver ref="registerForm2">
                    <!-- avatar -->
                    <p class="helper-text3">Select a desired avatar</p>
                    <div class="row justify-content-around px-3">
                        <div v-for="(item,i) in avatars" :key="i" @click="selectAvatar(item)">
                            <b-avatar class="bg-white hoverable" :class="getSelected(item)" rounded="lg" size="58px" :src="require(`~/assets/img/${item.title}.png`)"></b-avatar>
                        </div>
                    </div>
                    <!-- end avatar -->

                    <!-- bio -->
                    <div class="row px-3">
                        <ValidationProvider name="fullName" rules="max500" ref="name" v-slot="{ errors }">
                            <b-form-textarea placeholder="Your bio" class="radius10 my-2" style="width:400px;"></b-form-textarea>
                            <span class="helper-text4 text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <!-- end bio -->

                    <!-- id or passport -->
                    <div>
                        <div class="row justify-content-between px-3">
                            <p class="helper-text3">Driver license or passport</p>
                            <p class="text-date text-primary-light">PDF, PNG, JPG</p>
                        </div>
                        <b-input-group class="text-box2 mt-n2">
                            <template #append>
                                <b-input-group-text class="bg-white input-append">
                                    <b-icon icon="paperclip" class="form-icon"></b-icon>
                                </b-input-group-text>
                            </template>
                            <b-form-input v-model="passport" style="border-right:0px" placeholder="Select a file to upload" @click="onLicenseClick"></b-form-input>
                        </b-input-group>
                        <input ref="licenseUploader" class="d-none" type="file" accept="image/png,image/jpg,application/pdf" @change="onLicenseSelect">

                    </div>
                    <!-- end license -->

                    <!-- attorney license -->
                    <div class="mt-3">
                        <div class="row justify-content-between px-3">
                            <p class="helper-text3">Your attorney license</p>
                            <p class="text-date text-primary-light">PDF, PNG, JPG</p>
                        </div>
                        <b-input-group class="text-box2 mt-n2">
                            <template #append>
                                <b-input-group-text class="bg-white input-append">
                                    <b-icon icon="paperclip" class="form-icon"></b-icon>
                                </b-input-group-text>
                            </template>
                            <b-form-input v-model="attorney" style="border-right:0px" placeholder="Select a file to upload" @click="onAttorneyClick"></b-form-input>
                            <input ref="attorneyUploader" class="d-none" type="file" accept="image/png,image/jpg,application/pdf" @change="onAttorneySelect">
                        </b-input-group>
                    </div>
                    <!-- end license -->

                    <b-button @click="next2" class="btn-block bg-primary-light mt-3">
                        <span>{{btnText2}}</span>
                    </b-button>
                </ValidationObserver>
            </div>
            <div v-if="tab==3">
                <div class="row">
                    <div class="col">
                        <!-- <b-img src="" style="" alt="empty box image"></b-img> -->
                        <p class="helper-text2 text-center">The inbox is empty</p>
                    </div>
                </div>
                <div class="row p-2 w-100" style="position:absolute;bottom:10px;">
                    <b-form-input class="radius-input" placeholder="Write here"></b-form-input>
                    <b-button class="bg-primary-light btn-icon ml-3">
                        <b-icon class="text-white" icon="arrow-right"></b-icon>
                    </b-button>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import axios from 'axios';
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
extend('max100', {
    validate: value => {
        return value.length <= 100;
    },
    message: 'Less than 100 characters'
});
extend('max500', {
    validate: value => {
        return value.length <= 500;
    },
    message: 'Less than 500 characters'
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
        tab: 2,
        btnText: 'Next',
        btnText2: 'Finish Registration',
        formText: 'Please fill up the following details to register.',

        selected: null,
        isPassword: true,
        selectedAvatar: 'avatar1',
        fullName: null,
        firm: null,
        email: null,
        password: null,
        profession: null,
        lawyerIdentity: null,
        lawyerIdentityUrl: null,
        attorneyIdentity: null,
        attorneyIdentityUrl: null,
        agreeTerm: false,
        agreeText: '',
        passport:'',
        attorney:'',
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
    watch: {
        agreeTerm(newValue, oldValue) {
            if (newValue == true) {
                this.agreeText = ''
            }
        }
    },
    methods: {
        togglePassword() {
            this.isPassword = !this.isPassword;
        },
        next() {
            this.$refs.registerForm1.validate().then((success) => {
                if (!success) {
                    return;
                } else if (!this.agreeTerm) {
                    this.agreeText = 'You must agree to terms and conditions'
                    return;
                }

                this.btnText = 'Continuing...'
                window.setTimeout(() => {
                    this.tab = 2
                }, 1000);
            })
        },
        next2() {
            this.btnText2 = 'Continuing...'
            window.setTimeout(() => {
                this.tab = 3
                this.formText = "Our team will review your details and get back to you. Should we require further details, we will communicate via the chatbox below."
            }, 1000);
        },
        getDotBg(n) {
            if (this.tab == n) {
                return 'bg-primary-light'
            } else {
                return 'bg-dots'
            }
        },
        getSelected(item) {
            if (item.title == this.selectedAvatar) {
                return 'selected'
            }
        },
        selectAvatar(item) {
            this.selectedAvatar = item.title
        },
        onLicenseClick() {
            this.$refs.licenseUploader.click()
        },
        onLicenseSelect(e) {
            var file = e.target.files[0]
            var formData = new FormData();
            formData.append("image", file);
            axios.post('https://dealzlegal.herokuapp.com/api/user/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res=>this.passport=res.data.url)
            .catch(err=>console.log(err.response))
        },
        onAttorneyClick() {
            this.$refs.attorneyUploader.click()
        },
        onAttorneySelect(e) {
            var file = e.target.files[0]
            var formData = new FormData();
            formData.append("image", file);
            axios.post('https://dealzlegal.herokuapp.com/api/user/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res=>this.attorney=res.data.url)
            .catch(err=>console.log(err.response))
        },
        register() {
            this.$refs.registerForm2.validate().then((success) => {
                if (!success) {
                    return;
                }
                let userData = {
                    name: this.fullName,
                    email: this.email,
                    password: this.password,
                    User_type: "Lawyer",
                    attorney_id_card: this.lawyerIdentityUrl,
                    lawyer_id_card: this.attorneyIdentityUrl,
                };
                this.isProcessing = true;
                ApiService.register(userData)
                    .then((response) => {
                        this.successToast(response.data.message);
                        this.$router.push("/login");
                    })
                    .catch((errors) => {
                        errors.response.data.errors.forEach((err) => {
                            this.$refs[err.param].setErrors([err.msg]);
                        });
                    })
                    .finally(() => {
                        this.isProcessing = false;
                    });
            });
        },
    },
    watch: {
        lawyerIdentity(file) {
            ApiService.uploadImage(file)
                .then((response) => {
                    this.lawyerIdentityUrl = response.data.url;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        attorneyIdentity(file) {
            ApiService.uploadImage(file)
                .then((response) => {
                    this.attorneyIdentityUrl = response.data.url;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>

<style lang="scss">
@import "~/assets/styles/pages/login-signup.scss";
@import "~/assets/styles/typography.scss";
@import "~/assets/styles/color.scss";

.reg-dots {
    width: 10px;
    height: 10px;
    margin: 0px 8px;
    border-radius: 50%;
}

.bg-dots {
    background-color: #C8D4DF;
}
</style>
