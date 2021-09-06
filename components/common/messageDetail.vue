<template>
<div>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div v-for="(item,i) in messages" :key="i" class="my-2 mx-3">
                    <div class="row">
                        <div class="col-1">
                            <b-img src="https://picsum.photos/125/125/?image=58" alt="circle" width="46" height="46" rounded="circle"></b-img>
                        </div>

                        <div class="col-9">
                            <p class="user-name3 mr-2 ml-3">{{item.name}}<span class="helper-text ml-1">2 mins ago</span></p>
                            <p class="helper-text mt-n3 ml-3">{{item.msg}}</p>
                        </div>
                    </div>
                </div>
                <div class="row" style="position:fixed;bottom:10%">
                    <div class="col mr-2">
                        <b-form-textarea size="sm" class="comment-area" placeholder="Write message here..."></b-form-textarea>
                    </div>
                    <div class="col">
                        <b-button class="admin-btn bg-success-light">
                            <p class="text-helper2 text-white">Send Message</p>
                        </b-button>
                    </div>

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
            messages: [{
                    name: 'Admin',
                    msg: 'Hi'
                },
                {
                    name: 'Jane Doe',
                    msg: 'Hello'
                },
                {
                    name: 'Admin',
                    msg: 'How are you?'
                },
                {
                    name: 'Janet Doe',
                    msg: 'I am fine'
                },
                {
                    name: 'Admin',
                    msg: 'Aba kaam gar'
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.comment-area {
    border-radius: 10px;
    min-width: 400px;
}
</style>
