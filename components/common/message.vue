<template>
<div>
    <div class="sidebar-2">
        <div style="overflow:auto;max-height:700px">
            <b-list-group v-if="chats.length>0" flush class="pt-0 mx-0">
                <b-list-group-item v-for="(item,i) in chats" :key="i" class="link" :class="checkActive(item)" @click="selectContract(item)">
                    <div class="row" style="overflow-x:hidden">
                        <div class="col-2 mr-3">
                            <b-img src="https://picsum.photos/125/125/?image=58" alt="circle" width="58" height="58" rounded="circle"></b-img>
                        </div>
                        <div class="col-9">
                            <p class="user-name text-left mb-1">{{item.name}}</p>
                            <p class="comment-text ml-n2">
                                <b-icon class="mb-n1 mr-n2" icon="dot" font-scale="2"></b-icon>
                                <span>New messages</span>
                            </p>
                        </div>
                    </div>
                </b-list-group-item>
            </b-list-group>
            <!-- <div v-else class="d-flex justify-content-center">
                <p class="helper-text3">{{noText}}</p>
            </div> -->

            <div class="d-flex justify-content-center mb-3">
                <p v-if="dataEnd" class="helper-text3">End of chats</p>
                <b-spinner v-else variant="primary" v-b-visible="loadOnScroll"></b-spinner>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment';
export default {
    data() {
        return {
            moment: moment,
            page: 0,
            limit: 5,
            dataEnd: true,
            noText: '',
            chats: [{
                    profile: 'avatar1.png',
                    name: 'Jane Doe'
                },
                {
                    profile: 'avatar2.png',
                    name: 'Jannet Doe'
                },
            ]
        }
    },
    computed: {
        selectedContract() {
            return this.$store.state.admin.selectedContract
        },
    },
    methods: {
        checkActive(item) {
            if (this.selectedContract == item) {
                return 'active-contract'
            }
        },
        selectContract(item) {
            this.checkActive(item)
            // this.$store.commit('admin/selectContract', item)
            // this.$store.dispatch('admin/getDetail')
        },
        loadOnScroll() {
            this.page += 1
            // this.getchats()
        },
    }
}
</script>

<style lang="scss">
.sidebar-2 {
    min-width: 350px;
    padding: 0px 0px;
    background-color: white;
    border-right: 1px solid rgba(17, 17, 17, 0.1);
}

.adjusted {
    margin: 0px 15px;
}

.active-contract {
    background-color: #f5f7f9;
    border-right: 3px solid #04A5F6 !important;
}

.link:hover {
    background-color: #f5f7f9;
}

.data-component {
    height: 200px;
    overflow: auto;
}
</style>
