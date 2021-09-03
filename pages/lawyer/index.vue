<template>
<div>
    <dashboard></dashboard>
</div>
</template>

<script>
import Dashboard from './dashboard/index';
export default {
    middleware:'isLawyer',
    components:{Dashboard}
}
</script>
