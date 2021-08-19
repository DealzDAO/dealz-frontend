<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col">
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
        </div>
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
