<template>
<div>
    <dashboard></dashboard>
</div>
</template>

<script>
import Dashboard from './dashboard/index';
export default {
    layout:'user',
    middleware:'isUser',
    components:{Dashboard},
    
}
</script>
