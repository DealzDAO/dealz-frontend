<template>
    <div>
        <dashboard></dashboard>
    </div>
</template>
<script>
import Dashboard from './dashboard/index';
export default {
    middleware:'isAdmin',
    layout:'admin',
    components:{Dashboard}
}
</script>