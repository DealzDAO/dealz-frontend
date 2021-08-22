<template>
<div>
    <div class="container-fluid">
        <div class="row py-3 line-border mild-back">
            <p class="title-text2 center-push">
                <a href="/dashboard">
                    <b-icon icon="arrow-left" class="mr-2 icon-helper2"></b-icon>
                </a>
                <b>Fill Up Contract</b>
            </p>
        </div>
        <div class="row center-push">
            <div class="col">
                <p>Brain Trust New Sound Exchange Procedures For LOD</p>
                <div class="admin-chip bg-primary-light">
                    <p class="text-white">Questions view</p>
                </div>
                <div class="admin-chip bg-secondary-soft">
                    <p>Contract View</p>
                </div>
                <ol class="data2 mt-5">
                    <li>
                        Enter the name of your company.
                        <b-form-input placeholder="Write here..." class="text-box" style="border-radius:10px" />
                    </li>
                    <li>
                        Your email address.
                        <b-form-input placeholder="Write here..." class="text-box" style="border-radius:10px" />
                    </li>
                    <li>
                        Business Months.
                        <b-form-input placeholder="Write here..." class="text-box" style="border-radius:10px" />
                    </li>
                    <li>
                        Enter amount of money.
                        <b-form-input placeholder="Write here..." class="text-box" style="border-radius:10px" />
                    </li>
                    <li>
                        When is the date starting from?
                        <b-form-input placeholder="Write here..." class="text-box" style="border-radius:10px" />
                    </li>
                </ol>
            </div>

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

<style lang="scss">
@import "~/assets/styles/Dashboard.scss";
@import "~/assets/styles/typography.scss";
li::marker{
    font-weight:500;
    font-size: 14px;
}
li{
    margin-top:15px
}
</style>
