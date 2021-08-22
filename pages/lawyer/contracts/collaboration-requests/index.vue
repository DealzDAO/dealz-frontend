<template>
<div class="bg-white w-100">
    <div class="container-fluid">
        <div class="row justify-content-center py-2">
            <div class="col">
                <div class="admin-chip mx-2 bg-primary-soft" v-for="(item,i) in objects" :key="i">
                    <p class="text-primary-light helper-text4">{{item.title}}</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div v-for="(item,i) in items" :key="i" class="m-3">
                    <p class="mb-1 subtitle-text4 link" @click="seeDetail">{{item.title}}</p>
                    <!-- status -->
                    <div class="admin-chip" :class="getBg(item)">
                        <p :class="getText(item)">
                            <b-icon v-if="item.status=='Work in Progress'" :icon="getIcon(item)"></b-icon>
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
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
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
    methods: {
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
        seeDetail(){
            this.$router.push('/lawyer/contracts/collaboration-requests/detail')
        }
    }
}
</script>
