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
                <p class="helper-text3">{{item.text}}</p>
                <v-row>
                    <div class="admin-chip bg-light-light">
                        <p class="text-success">
                            <b-icon icon="hand-thumbs-up"></b-icon>
                            Upvote
                        </p>
                    </div>
                    <div class="admin-chip bg-danger-soft">
                        <p class="text-danger mt-n1">
                            <b-icon icon="hand-thumbs-down"></b-icon>
                            Downvote
                        </p>
                    </div>
                    <div class="admin-chip bg-light-light">
                        <p class="table-data">{{item.type}}</p>
                    </div>
                </v-row>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
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
            attorneys: [{
                    text: 'Purus luctus tempus sed urna. Amet sed sed at pretium. Hac est etiam urna ultricies vitae. Quis nunc in dictum dui, id. Hac cursus scelerisque mauris eget nulla. Magna mattis neque volutpat sit molestie volutpat interdum auctor pellentesque. Turpis aenean potenti at metus.',
                    type: 'Startup'
                },
                {
                    text: 'In magna nunc faucibus commodo. Lectus elementum aliquet cras enim pretium ipsum. Cursus quis felis, orci aenean sem diam. Arcu urna, mi diam feugiat. Pellentesque et nulla egestas eget magnis tortor dui. Enim libero ultrices faucibus massa nullam fermentum quam. ',
                    type: 'Art'
                },
                {
                    text: 'Commodo nunc, ullamcorper ultrices viverra felis iaculis. Sit vel etiam sem pellentesque senectus arcu. Iaculis magna id pulvinar risus, ultrices sit sed enim. Commodo congue sit orci, sollicitudin fermentum dolor blandit. Suspendisse euismod volutpat ut fermentum vitae.',
                    type: 'Music'
                },
                {
                    text: 'Commodo nunc, ullamcorper ultrices viverra felis iaculis. Sit vel etiam sem pellentesque senectus arcu. Iaculis magna id pulvinar risus, ultrices sit sed enim. Commodo congue sit orci, sollicitudin fermentum dolor blandit. Suspendisse euismod volutpat ut fermentum vitae.',
                    type: 'Startup'
                },
            ]
        }
    }
}
</script>
