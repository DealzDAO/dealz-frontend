<template>
<div>
    <div class="container-fluid">
        <div class="row bg-light-light b-border">
            <p class="subtitle-text m-3">Messages</p>
        </div>
        <div class="row">
            <div class="col-4 p-0 border-right">
                <CommonMessage />
            </div>
            <div class="col-8 p-0">
                <CommonMessageDetail />
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    layout: 'user',
    data() {
        return {

        }
    }
}
</script>

<style lang="scss">
.border-right {
    border-right: 1px solid rgba(17, 17, 17, 0.1);
}
.b-border {
    border-bottom: 1px solid rgba(17, 17, 17, 0.1);
}
</style>
