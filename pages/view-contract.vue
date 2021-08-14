<template>
<div class="bg-white w-100">
    <div class="container-fluid">
        <div class="row py-3 line-border mild-back">
            <p class="center-push title-text2 text-helper2">
                <a href="/dashboard">
                    <b-icon icon="arrow-left" class="mr-2 icon-helper2"></b-icon>
                </a>
                <b>View Contract</b>
            </p>
        </div>
        <div class="row justify-content-center">
            <div class="col-10">
                <ul>
                    <li class="mt-2">
                        <a href="#" class=" list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <p class="mb-1 subtitle-text">
                                    Brain Trust New Sound Exchange Procedures For LOD Terms and Agreement
                                </p>
                            </div>
                        </a>
                        <!-- status -->
                        <div class="chip bg-secondary-light">
                            <b-icon icon="clock-history" class="my-icon"></b-icon>
                            <span>Pending review</span>
                        </div>
                        <!-- end status -->

                        <!-- comments -->
                        <div class="chip bg-warning-light">
                            <b-icon icon="chat" class="my-icon"></b-icon>
                            <span>3 comments</span>
                        </div>
                        <!-- end spots -->

                        <!-- accepted -->
                        <div class="chip bg-white">
                            <span>Sent 2 days ago</span>
                        </div>
                        <!-- end accepted -->

                    </li>
                </ul>
            </div>
        </div>
        <div class="row center-push">
            <!-- contract -->
            <div class="col">
                <p class="title-text3 mt-5">Your Contract</p>
                <div class="contract-box"></div>
                <p class="text-helper helper-text mt-3">
                    <b-icon icon="pencil"></b-icon>
                    <span>Edit Contract</span>
                </p>
            </div>
            <!-- end contract -->

            <!-- comments -->
            <div class="col">
                <p class="title-text3 mt-5">Comments</p>
                <div class="container-fluid">
                    <div class="row">
                        <div>
                            <div class="chat-tab bg-success-light">
                                <p>Could you send a clearer picture?</p>
                            </div>
                            <p class="icon-helper text-date">July 12 11:23 AM</p>
                        </div>
                    </div>
                    <div class="row justify-content-end">
                        <div class="component-right">
                            <div class="chat-tab bg-primary-light">
                                <p>Sure</p>
                            </div>
                            <p class="icon-helper text-date text-right">July 12 11:25 AM</p>
                        </div>
                    </div>
                    <div class="row justify-content-end">
                        <div class="component-right">
                            <div class="chat-tab bg-primary-light">
                                <p>Please have the files!</p>
                            </div>
                            <p class="icon-helper text-date">July 12 11:27 AM</p>
                        </div>
                    </div>
                    <div class="row">
                        <div>
                            <div class="chat-tab bg-success-light">
                                <p>Thank you. We'll get back to you soon. You will be notified through your email address.</p>
                            </div>
                            <p class="icon-helper text-date">July 12 11:23 AM</p>
                        </div>

                    </div>
                </div>
                <div class="row p-2 w-100" style="position:absolute;bottom:0;">
                    <b-form-input v-model="text" class="radius-input" placeholder="Write here"></b-form-input>
                    <b-button class="bg-primary-light btn-icon ml-3">
                        <b-icon class="text-white" icon="arrow-right"></b-icon>
                    </b-button>
                </div>
            </div>
            <!-- end comments -->
        </div>
        <!-- <dfooter></dfooter> -->
    </div>
    
</div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {

    }
}
</script>

<style lang="scss">
@import "~/assets/styles/Dashboard.scss";
</style>
