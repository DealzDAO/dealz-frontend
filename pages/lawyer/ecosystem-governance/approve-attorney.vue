<template>
<div>
    <div class="container px-5">
        <div class="row">
            <div class="admin-chip bg-light-light mt-3 mb-3" v-for="(item,i) in type" :key="i">
                <p class="text-primary-light">{{item.title}}</p>
            </div>
        </div>
        <div class="row mb-4" v-for="(item,i) in attorneys" :key="i">
            <div class="col pa-0">
                <p class="subtitle-text4 mb-0">{{item.name}}</p>
                <p v-if="item.bio" class="helper-text3">{{item.bio}}</p>

                <div v-if="!item.downVote.includes(dealzUser.id)" class="admin-chip link" :class="getBg(item)" @click="upVote(item)">
                    <p :class="getTextColor(item)">
                        <b-icon icon="hand-thumbs-up"></b-icon>
                        {{getText(item)}}
                    </p>
                </div>

                <div v-if="!item.upVote.includes(dealzUser.id)" class="admin-chip link" :class="getBg2(item)" @click="downVote(item)">
                    <p :class="getTextColor2(item)">
                        <b-icon icon="hand-thumbs-down"></b-icon>
                        {{getText2(item)}}
                    </p>
                </div>

                <div v-if="item.bundles" class="admin-chip bg-light-light">
                    <p class="table-data">{{item.bundles}}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            noText: '',
            type: [{
                    title: 'Music'
                },
                {
                    title: 'Startups'
                },
                {
                    title: 'Art & Design'
                },
            ],
            attorneys: []
        }
    },
    computed: {
        dealzUser() {
            return this.$store.state.auth.dealzUser
        }
    },
    mounted() {
        this.getAttorneys()
    },
    methods: {
        getAttorneys() {
            axios.get('https://dealzlegal.herokuapp.com/api/lawyer/accepted-lawyer', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
                    }
                })
                .then(res => {
                    this.attorneys = res.data
                    if (res.data.length == 0) {
                        this.noText = 'No attorney found'
                    }
                    console.log('attorney:', res.data)
                })
                .catch(err => console.log(err.response))
        },
        getBg(item) {
            if (item.upVote.includes(this.dealzUser.id)) {
                return 'bg-success-light'
            } else {
                return 'bg-success-soft'
            }
        },
        getTextColor(item) {
            if (item.upVote.includes(this.dealzUser.id)) {
                return 'text-white'
            } else {
                return 'text-success-light'
            }
        },
        getText(item) {
            if (item.upVote.includes(this.dealzUser.id)) {
                return 'Upvoted'
            } else {
                return 'Upvote'
            }
        },
        getBg2(item) {
            if (item.downVote.includes(this.dealzUser.id)) {
                return 'bg-danger-light'
            } else {
                return 'bg-danger-soft'
            }
        },
        getTextColor2(item) {
            if (item.downVote.includes(this.dealzUser.id)) {
                return 'text-white'
            } else {
                return 'text-danger-light'
            }
        },
        getText2(item) {
            if (item.downVote.includes(this.dealzUser.id)) {
                return 'DownVoted'
            } else {
                return 'Downvote'
            }
        },
        upVote(item) {
            if (!item.upVote.includes(this.dealzUser.id)) {
                const params = {
                    id: item._id
                }
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
                    }
                }
                axios.post('https://dealzlegal.herokuapp.com/api/lawyer/upvote-accepted-lawyer', params, config)
                    .then(res => {
                        const index = this.attorneys.indexOf(item)
                        this.attorneys[index].upVote.push(this.dealzUser.id)
                    })
                    .catch(err => console.log(err.response))
            }

        },
        downVote(item) {
            if (!item.downVote.includes(this.dealzUser.id)) {
                const params = {
                    id: item._id
                }
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
                    }
                }
                axios.post('https://dealzlegal.herokuapp.com/api/lawyer/downvote-accepted-lawyer', params, config)
                    .then(res => {
                        const index = this.attorneys.indexOf(item)
                        this.attorneys[index].downVote.push(this.dealzUser.id)
                    })
                    .catch(err => console.log(err.response))
            }

        }
    }
}
</script>
