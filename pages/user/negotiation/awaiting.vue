<template>
<div>
    <div class="container">
        <div class="row px-4">
            <div class="col">
                <div v-for="(item,i) in items" :key="i" class="mt-4">
                    <p class="subtitle-text4 mb-2">{{item.title}}</p>
                    <div class="admin-chip bg-light-light ml-n1">
                        <p class="helper-text5">
                            <b-icon icon="chat"></b-icon>
                            {{item.comment}} Comments
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    layout:'user',
    data() {
        return {
            items: [{
                    title: 'Brain Trust New Sound Exchange Procedures for LOD',
                    comment: '3',
                },
                {
                    title: 'Founder advisor standard template',
                    comment: '4',
                },

            ]
        }
    }
}
</script>
