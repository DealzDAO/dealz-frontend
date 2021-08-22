<template>
<div>
    <div class="container">
        <div class="row px-4 pt-3">
            <p class="subtitle-text4 link">
                <b-icon icon="arrow-left" class="link mr-lg-3" @click="goBack"></b-icon>
                Brain Trust New Sound Exhange Procedures For LOD Terms and Agreement
            </p>
        </div>
        <div class="row px-5">
            <div class="col">
                <!-- contract -->
                <div class="contract-box mt-2">
                    
                </div>
                <div class="mt-2">
                    <b-button class="my-btn bg-primary-light">
                        <p>Approve</p>
                    </b-button>
                    <b-button class="my-btn bg-primary-light">
                        <p>Counter</p>
                    </b-button>
                    <p class="float-right text-danger-light link">Reject</p>
                </div>
                <!-- end contract -->
            </div>
            <div class="col">
                <!-- comments -->
                <div class="admin-chip link" :class="setBg()" @click="select(1)">
                    <p :class="setText()">Comments & Questions</p>
                </div>
                <!-- end comments -->

                <!-- contract terms -->
                <div class="admin-chip link" :class="setBg()" @click="select(2)">
                    <p :class="setText()">Contract Terms</p>
                </div>
                <!-- terms -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            contract: '',
            selected:1
        }
    },
    mounted(){
        this.select(1)
    },
    methods: {
        select(n){
            this.selected=n
            this.setBg()
            this.setText()
        },
        setBg(){
            if(this.selected==1){
                return 'bg-primary-light'
            }else{
                return 'bg-secondary-soft'
            }
        },
        setText(){
            if(this.selected==1){
                return 'text-white'
            }
        },
        goBack() {
            this.$router.push('/user/negotiation/action-required')
        }

    }
}
</script>

<style scoped>

</style>
