<template>
<div>
    <div class="container">
        <div class="row px-4">
            <div class="col-8 pt-2">
                <div class="row link" v-for="(item,i) in data" :key="i" @click="viewDialog=true">
                    <div class="col-1 p-0">
                        <b-avatar size="lg" rounded="lg"></b-avatar>
                    </div>
                    <div class="col-11">
                        <p class="subtitle-text3 mb-0">{{item.title}}</p>
                        <p class="helper-text3">{{item.text}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- dialog -->
    <b-modal v-model="viewDialog" size="lg" scrollable centered hide-footer>
        <div>
            <div class="col">
                <div class="contract-box"></div>
                <p class="subtitle-text3 mt-3">{{data[0].title}}</p>
                <p class="data-head">{{data[0].text}}</p>
                <div class="row justify-content-between px-3">
                    <b-button class="my-btn px-3 bg-primary-light">
                        <p>Upvote proposal</p>
                    </b-button>
                    <b-button class="my-btn px-3 bg-primary-light">
                        <p>Downvote proposal</p>
                    </b-button>
                </div>
            </div>
        </div>

    </b-modal>
    <!-- end dialog -->
</div>
</template>

<script>
export default {
    data() {
        return {
            viewDialog: false,
            data: [{
                    title: 'Vitae purus proin urna, senectus montes, sollicitudin vitae aliquet.',
                    text: 'Habitasse nisl faucibus enim interdum varius. Venenatis viverra consectetur egestas amet, egestas ac amet ullamcorper faucibus. Molestie duis augue velit felis id ut at ac.'
                },
                {
                    title: 'Nibh mattis amet posuere nisl, nibh.',
                    text: 'Habitasse nisl faucibus enim interdum varius. Venenatis viverra consectetur egestas amet, egestas ac amet ullamcorper faucibus. Molestie duis augue velit felis id ut at ac.'
                },
                {
                    title: 'Suscipit imperdiet morbi urna, facilisi adipiscing enim, magnis.',
                    text: 'Habitasse nisl faucibus enim interdum varius. Venenatis viverra consectetur egestas amet, egestas ac amet ullamcorper faucibus. Molestie duis augue velit felis id ut at ac.'
                },
                {
                    title: 'Vestibulum commodo arcu, diam, eget amet, mus augue mauris.',
                    text: 'Habitasse nisl faucibus enim interdum varius. Venenatis viverra consectetur egestas amet, egestas ac amet ullamcorper faucibus. Molestie duis augue velit felis id ut at ac.'
                },
                {
                    title: 'Lacus mauris suspendisse adipiscing ultricies platea purus imperdiet vitae.',
                    text: 'Habitasse nisl faucibus enim interdum varius. Venenatis viverra consectetur egestas amet, egestas ac amet ullamcorper faucibus. Molestie duis augue velit felis id ut at ac.'
                },
            ]
        }
    }
}
</script>
