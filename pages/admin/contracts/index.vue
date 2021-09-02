<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-4 bg-white" style="border-right:1px solid rgba(17, 17, 17, 0.1);">
                <AdminContractSidebar/>
            </div>
            <div class="col">
                <detail></detail>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Detail from './detail';
export default {
    components:{Detail},
    layout: 'admin',
    data() {
        return {
            
        }
    }
}
</script>