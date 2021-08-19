<template>
<div>
    <div class="container-fluid mild-back">
        <div class="row px-4 line-border">
            <div class="col-6">
                <b-tabs pills active-nav-item-class="font-weight-bold text-primary" active-tab-class="bg-primary-light" v-model="tabIndex">
                    <b-tab title="New Attorney Vote" @click="setTab(0,'attorney-vote')" class="menu-text" :title-link-class="linkClass(0)"></b-tab>
                    <b-tab title="Platform Changes" @click="setTab(0,'platform-change')" class="menu-text" :title-link-class="linkClass(1)"></b-tab>
                </b-tabs>
            </div>
            <div class="col-6">
                <b-button class="my-btn px-3 bg-primary-light mt-1" @click="platformDialog=true">
                    <p>Suggest a platform change</p>
                </b-button>
            </div>
        </div>
    </div>
    <nuxt-child />

    <b-modal size="lg" scrollable centered v-model="platformDialog" hide-footer>
        <div class="col">
            <p class="title-text2 text-center">Suggest a platform change</p>
            <p class="helper-text3 text-center">Write about the change you wish to see implemented in Dealz. Our attorneys will vote on these and the most voted have higher chances of implementation.</p>

            <!-- image -->
            <div>
                <div class="row justify-content-between px-3">
                    <p class="table-data">Upload an image(Optional)</p>
                    <p class="text-date text-primary-light">PDF, PNG, JPG</p>
                </div>
                <b-input-group class="text-box2 mt-n2">
                    <template #append>
                        <b-input-group-text class="bg-white input-append">
                            <b-icon icon="paperclip" class="form-icon"></b-icon>
                        </b-input-group-text>
                    </template>
                    <b-form-input style="border-right:0px" placeholder="Click to upload"></b-form-input>
                </b-input-group>
                <input ref="imageUploader" class="d-none" type="file" accept="image/png,image/jpg">

            </div>
            <!-- end image -->

            <!-- title -->
            <b-form-input placeholder="Write a title" class="radius10 mt-3 mt-md-4" />
            <!-- end title -->

            <!-- description -->
            <b-form-textarea placeholder="Describe your proposal" rows="3" class="radius10 mt-4"></b-form-textarea>
            <!-- end description -->

            <p class="text-center mt-3">
                <b-button class="my-btn px-5 bg-primary-light">
                    <p>Suggest platform change</p>
                </b-button>
            </p>

        </div>
    </b-modal>
</div>
</template>

<script>
export default {
    data() {
        return {
            tabIndex: 0,
            tab: 0,
            platformDialog: false
        }
    },
    methods: {
        linkClass(idx) {
            this.tabIndex == idx
            if (this.tabIndex === idx) {
                return ['border-bottom']
            } else {
                return ['text-secondary']
            }
        },
        setTab(n1, n2) {
            this.tab = n1,
                this.$router.push('/lawyer/contracts/verified-templates/' + n2)
        }
    }
};
</script>
