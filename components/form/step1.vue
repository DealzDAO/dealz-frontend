<template>
<div>
    <div class="container">
        <div class="row p-3">
            <div class="col">
                <p class="data2">Enter the name of your contract</p>
                <ValidationObserver ref="contractForm">
                    <ValidationProvider name="title" rules="required|max200" v-slot="{ errors }">
                        <b-form-input v-model="title" placeholder="Contract Name" class="text-box" style="border-radius:10px" />
                        <span class="text-danger helper-text4">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <div class="row justify-content-between px-3 mt-3">
                        <p class="data2">Write your contract here</p>
                        <p class="data2 text-primary-light link" @click="onClick">
                            <b-icon icon="upload"></b-icon>
                            Upload a Microsoft Word document
                        </p>
                    </div>
                    <input ref="docUpload" class="d-none" type="file" @change="onDocSelect" accept=".docx">
                    <ValidationProvider name="detail" rules="required" v-slot="{ errors }">
                        <editor api-key="u6uz6imfxze284v1oj8ahn7iiw763kggsw7mgwt11wl0jr81" :init="config" v-model="detail" />
                        <span class="text-danger helper-text4">{{ errors[0] }}</span>
                    </ValidationProvider>
                    
                    <p class="data2 mt-4"><b>Step 2:</b> <span class="helper-text">Review Contract</span></p>
                    <div class="row justify-content-between px-3">
                        <b-button class="my-btn px-5 bg-primary-light" @click="next">
                            <p>Continue</p>
                        </b-button>
                        <div>
                            <b-button class="btn-outlined" @click="saveDraft" :disabled="btnDisabled">
                                <p class="text-primary-light">{{btnText}}</p>
                            </b-button>
                            <b-button class="my-btn bg-white">
                                <p class="text-danger-light">Continue</p>
                            </b-button>
                        </div>
                    </div>
                </ValidationObserver>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import ApiService from "@/services/index.js";
import axios from 'axios'
var mammoth = require("mammoth");
import {
    mapMutations
} from 'vuex';
import {
    ValidationProvider,
    ValidationObserver,
    extend
} from "vee-validate";
import {
    required,
} from "vee-validate/dist/rules";
extend("required", {
    ...required,
    message: "This field is required",
});
extend('max200', {
    validate: value => {
        return value.length <= 200;
    },
    message: 'Less than 200 characters'
});
export default {
    components: {
        editor: Editor,
        ValidationProvider,
        ValidationObserver,
        extend
    },
    data() {
        return {
            // title: '',
            // detail: '',
            btnText: 'Save Draft',
            btnDisabled: false,
            config: {
                height: 400,
                menubar: false,
                // image_upload_url:  {process.env.baseUrl}/user/upload,
                automatic_uploads: true,
                plugins: [
                    "advlist autolink lists link image imagetools charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table code help wordcount",
                ],
                table_toolbar: "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                toolbar: "undo redo | formatselect | bold italic backcolor | \alignleft aligncenter alignright alignjustify | \bullist numlist outdent indent | removeformat | help | table | image | imagetools | fullscreen",
                file_picker_types: "image",
                file_picker_callback: function (cb, value, meta) {
                    // Provide file and text for the link dialog
                    var input = document.createElement("input");
                    input.setAttribute("type", "file");
                    input.setAttribute("accept", "image/*");

                    input.onchange = function () {
                        var file = this.files[0];
                        ApiService.uploadImage(file).then((res) => {
                            cb(res.data.url, {
                                title: file.name,
                            });
                        });
                    };

                    input.click();
                }
            }
        }
    },
    computed:{
        title:{
            get(){
                return this.$store.state.lawyer.title
            },
            set(value){
                this.$store.commit('lawyer/setTitle',value)
            }
        },
        detail:{
            get(){
                return this.$store.state.lawyer.detail
            },
            set(value){
                this.$store.commit('lawyer/setDetail',value)
            }
        }
    },
    methods: {
        next() {
            this.$refs.contractForm.validate().then((success) => {
                if (!success) {
                    return;
                }
                this.$store.commit('lawyer/nextStep')
            })

        },
        onClick() {
            this.$refs.docUpload.click()
        },

        onDocSelect(ev) {
            const file = ev.target.files[0];
            var reader = new FileReader();
            reader.onloadend = () => {
                var arrayBuffer = reader.result;
                mammoth.convertToHtml({
                    arrayBuffer: arrayBuffer
                }).then(res => this.detail = res.value)
            }
            reader.readAsArrayBuffer(file);
        },
        saveDraft() {
            this.$refs.contractForm.validate().then((success) => {
                if (!success) {
                    return;
                }
                this.btnText = 'Saving...'
                this.btnDisabled = true
                this.$store.dispatch('lawyer/saveSecondDraft')
            })

        }

    }
}
</script>

<style lang="scss">
.tox.tox-tinymce {
    border-radius: 12px;
}
</style>
