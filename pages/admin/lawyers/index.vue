<template>
<div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-4 p-0">
                <AdminLawyerSidebar/>
            </div>
            <div class="col-8 p-0">
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