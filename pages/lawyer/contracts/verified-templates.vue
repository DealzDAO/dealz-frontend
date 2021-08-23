<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-9" v-if="items.length>0">
                <div v-for="(item,i) in items" :key="i" class="m-3">
                    <p class="mb-1 subtitle-text4">{{item.title}}</p>
                    <!-- status -->
                    <div class="admin-chip bg-success-soft">
                       <p class="text-success-light"> <b-icon icon="check2"></b-icon>
                        Verified
                        </p>
                    </div>
                    <!-- end status -->

                    <!-- comments -->
                    <div class="admin-chip bg-secondary-soft">
                        <p class="text-secondary-light">
                            <b-icon icon="chat"></b-icon>
                            <span>{{item.comments}} comments</span>
                        </p>
                    </div>
                    <!-- end comments -->
                </div>
            </div>
            <p v-else class="text-muted text-center">{{noText}}</p> 
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    layout: 'lawyer',
    data() {
        return {
            token: '',
            noText: '',
            contracts: [],
            items: [{
                    title: 'Brain Trust New Sound Exchange Procedures For LOD',
                    status: 'Verified',
                    comments: 5,
                },
                {
                    title: 'Founder advisor standard template',
                    status: 'Verified',
                    comments: 3,
                },

                {
                    title: 'Music Contract',
                    status: 'Verified',
                    comments: 6,
                },

            ],
        }
    },
}
</script>
