<template>
    <div>
        <div class="row p-3">
            <div class="col">
                <p class="data2">Enter the name of your contract</p>
                <b-form-input placeholder="Contract Name" class="text-box" style="border-radius:10px" />
                <div class="row justify-content-between px-3 mt-3">
                    <p class="data2">Write your contract here</p>
                    <p class="data2 text-primary-light link" @click="onClick">
                        <b-icon icon="upload"></b-icon>
                        Upload a Microsoft Word document
                    </p>
                </div>
                <input ref="docUpload" class="d-none" type="file" @change="onDocSelect" accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document">

                <editor api-key="u6uz6imfxze284v1oj8ahn7iiw763kggsw7mgwt11wl0jr81" :init="config" v-model="content" />
                <p class="data2 mt-4"><b>Step 2:</b> <span class="helper-text">Review Contract</span></p>
                <div class="row justify-content-between px-3">
                    <b-button class="my-btn px-5 bg-primary-light" @click="next">
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
    </div>
</template>