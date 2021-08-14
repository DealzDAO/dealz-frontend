<template>
<div>
    <div class="container">
        <div class="row py-3 px-4 line-border mild-back">
            <p class="subtitle-text mb-0">
                <a href="/user/dashboard">
                    <b-icon icon="arrow-left" class="mr-2"></b-icon>
                </a>
                <span class="subtitle-text">Create a new contract</span>
            </p>
        </div>

        <div class="row p-3">
            <div class="col">
                <p class="data2">Enter the name of your contract</p>
                <b-form-input placeholder="Contract Name" class="text-box" style="border-radius:10px" />
                <div class="row justify-content-between px-3 mt-3">
                    <p class="data2">Write your contract here</p>
                    <p class="data2 text-primary-light">
                        <b-icon icon="upload"></b-icon>
                        Upload a Microsoft Word document
                    </p>
                </div>

                <b-form-textarea placeholder="Write here..." style="border-radius:10px" class="text-box"></b-form-textarea>
                <p class="data2 mt-4"><b>Step 2:</b> <span class="helper-text">Review Contract</span></p>
                <div class="row justify-content-between px-3">
                    <b-button class="my-btn px-5 bg-primary-light">
                        <p>Continue</p>
                    </b-button>
                    <div>
                        <b-button class="btn-outlined">
                            <p class="text-primary-light">Save Draft</p>
                        </b-button>
                        <b-button class="my-btn bg-white">
                            <p class="text-danger-light">Continue</p>
                        </b-button>
                    </div>

                </div>
            </div>
        </div>
        <!-- <editor
       api-key="u6uz6imfxze284v1oj8ahn7iiw763kggsw7mgwt11wl0jr81"
       :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
     /> -->
    </div>
    <!-- <div id="app">
        <editor api-key="pkxohxjqx221hbfb32rxh69byef3xule8djlfzgounf4euqm" :init="config" v-model="content" />
    </div> -->
</div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
    // components: {
    //     editor: Editor,
    // },
    data() {
        // return {
        //     content: "",
        //     config: {
        //         height: 500,
        //         menubar: false,
        //         image_upload_url: $ {
        //             process.env.baseUrl
        //         }
        //         /user/upload,
        //         automatic_uploads: true,
        //         plugins: [
        //             "advlist autolink lists link image imagetools charmap print preview anchor",
        //             "searchreplace visualblocks code fullscreen",
        //             "insertdatetime media table paste code help wordcount",
        //         ],
        //         table_toolbar: "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
        //         toolbar: "undo redo | formatselect | bold italic backcolor | \
        //    alignleft aligncenter alignright alignjustify | \
        //    bullist numlist outdent indent | removeformat | help | table | image | imagetools | fullscreen",
        //         file_picker_types: "image",
        //         file_picker_callback: function (cb, value, meta) {
        //             // Provide file and text for the link dialog
        //             var input = document.createElement("input");
        //             input.setAttribute("type", "file");
        //             input.setAttribute("accept", "image/*");

        //             input.onchange = function () {
        //                 var file = this.files[0];
        //                 ApiService.uploadImage(file).then((res) => {
        //                     cb(res.data.url, {
        //                         title: file.name,
        //                     });
        //                 });
        //             };

        //             input.click();
        //         },
        //     },
        // }
    },
    watch: {
        content(value) {
            this.$emit("input", value);
        },
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang="scss">
@import "~/assets/styles/Dashboard.scss";

::placeholder {
    opacity: 0.2;
    margin-left: -10px;
}

.modal-header {
    height: 0px;
    border-bottom: none;
}

.modal-dialog {
    padding: 0 30px;
}

.modal-dialog-centered.modal-dialog-scrollable .modal-content {
    padding: 0 15px;
    height: 595px;
}

b-card {
    box-shadow: none;
}
</style>
