<template>
<div>
    <dashboard></dashboard>
</div>
</template>

<script>
import Dashboard from './dashboard/index';
export default {
    layout:'lawyer',
    middleware:'isLawyer',
    components:{Dashboard}
}
</script>
