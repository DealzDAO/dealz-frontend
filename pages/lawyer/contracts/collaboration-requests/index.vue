<template>
<div>
    <div class="container">
        <div class="row justify-content-center py-2">
            <div class="col">
                <div class="admin-chip mx-2 bg-primary-soft" v-for="(item,i) in objects" :key="i">
                    <p class="text-primary-light helper-text4">{{item.title}}</p>
                </div>
            </div>
        </div>
        <div class="row" v-if="collabs.length>0">
            <div class="col">
                <div v-for="(item,i) in collabs" :key="i" class="m-3">
                    <p class="mb-1 subtitle-text4 link" @click="seeDetail(item)">{{item.title}}</p>
                    <!-- status -->
                    <div class="admin-chip" :class="getBg(item)">
                        <p :class="getText(item)">
                            <b-icon v-if="item.status=='Working in Progress'" :icon="getIcon(item)"></b-icon>
                            {{item.status}}
                        </p>
                    </div>
                    <!-- end status -->

                    <!-- comments -->
                    <div class="admin-chip bg-secondary-soft" v-if="item.comments>0">
                        <p class="text-secondary-light">
                            <b-icon icon="chat"></b-icon>
                            {{item.comments}} comments
                        </p>
                    </div>
                    <!-- end comments -->

                </div>
            </div>
        </div>
        <div v-else-if="collabs.length==0 && noText==''" class="d-flex justify-content-center mt-5">
                <b-spinner variant="primary"></b-spinner>
            </div>
        <div v-else class="row justify-content-center">
            <p class="helper-text3">{{noText}}</p>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            collabs: [],
            noText: '',
            items: [{
                    title: 'Founder advisor standard template',
                    status: 'Overdue',
                    comments: 15,
                },
                {
                    title: 'Brain Trust New Sound Exchange Procedures For LOD',
                    status: 'Work in Progress',
                    comments: 3,
                },
                {
                    title: 'Brain Trust Net Profits Producer Form',
                    status: 'Available',
                    comments: 0,
                },

            ],
            objects: [{
                    title: 'Claim Collaborator Seats'
                },
                {
                    title: 'Works in Progress'
                },
                {
                    title: 'Approve New Agreements'
                },
                {
                    title: 'Overdue'
                },
            ]
        }
    },
    mounted() {
        this.getCollabs()
    },
    methods: {
        getCollabs() {
            axios.get('https://dealzlegal.herokuapp.com/api/lawyer/all-collab-requests', {
                    headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
                })
                .then(res => {
                    this.collabs = res.data
                    if (res.data.length == 0) {
                        this.noText = 'No requests found'
                    }
                })
                .catch(err => console.log(err.response))
        },
        getBg(item) {
            if (item.status == 'Overdue') {
                return 'bg-danger-soft'
            } else if (item.status == 'Work in Progress') {
                return 'bg-warning-soft'
            } else if (item.status == 'Available') {
                return 'bg-secondary-soft'
            }
        },
        getText(item) {
            if (item.status == 'Overdue') {
                return 'text-danger-light'
            } else if (item.status == 'Work in Progress') {
                return 'text-warning-light'
            } else if (item.status == 'Available') {
                return 'visible1'
            }
        },
        getIcon(item) {
            if (item.status == 'Work in Progress') {
                return 'clock-history'
            }
        },
        seeDetail(item) {
            if (item.status == 'Available') {
                this.$router.push({
                    name: 'lawyer-contracts-collaboration-requests-id-accept',
                    params: {
                        id: item._id
                    }
                })
            } else if (item.status == 'Work in Progress') {
                this.$router.push({
                    name: 'lawyer-contracts-collaboration-requests-id-approve',
                    params: {
                        id: item._id
                    }
                })
            } else if (item.status == 'Overdue') {
                this.$router.push({
                    name: 'lawyer-contracts-collaboration-requests-id-overdue',
                    params: {
                        id: item._id
                    }
                })
            }

        }
    }
}
</script>
<style lang="scss">
    .link:hover{
        background: none;
    }
</style>
