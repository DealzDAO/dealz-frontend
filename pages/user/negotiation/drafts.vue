<template>
<div>
    <div class="container">
        <div class="row px-3" v-if="items.length>0">
            <div class="col">
                <div v-for="(item,i) in items" :key="i" class="mt-4">
                    <p class="subtitle-text4 mb-2 clickable" @click="editDraft(item)">{{item.contract_id.title}}</p>
                    <p class="helper-text"><b>Last Edited:</b> {{moment.utc(item.last_edited).fromNow()}}</p>
                </div>

            </div>

        </div>
        <div class="row justify-content-center mt-5" v-else>
            <div v-if="noText==''">
                <b-spinner variant="primary"></b-spinner>
            </div>
            <p v-else class="helper-text3">{{noText}}</p>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
    layout: 'user',
    data() {
        return {
            moment: moment,
            items: [],
            noText: ''
        }
    },
    mounted() {
        this.getDrafts()
    },
    methods: {
        getDrafts() {
            const config = {
                headers: {
                    Authorization: this.$auth.strategy.token.get()
                }
            }
            axios.get(this.$axios.defaults.baseURL + '/user/all-drafts/', config)
                .then(res => {
                    this.items = res.data.draftContracts
                    console.log(res.data)
                    if (res.data.docCount == 0) {
                        this.noText = 'No Drafts'
                    }
                })
                .catch(err => console.log(err))
        },
        editDraft(item) {
            this.$router.push({
                name: "user-negotiation-all-contracts-id-fill",
                params: {
                    id: item._id
                }
            });
        }
    }
}
</script>
