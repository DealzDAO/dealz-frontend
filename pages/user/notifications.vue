<template>
<div>
    <div class="container-fluid">
        <div class="row bg-light-light b-border">
            <p class="subtitle-text m-3">Notifications</p>
        </div>
        <div class="row">
            <div class="col">
                <CommonNotification />
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
.b-border {
    border-bottom: 1px solid rgba(17, 17, 17, 0.1);
}
</style>
