<template>
<div>
    <div class="container">
        <div class="row px-3">
            <div class="col">
                <div v-for="(item,i) in items" :key="i" class="mt-4">
                    <p class="subtitle-text4 mb-2">{{item.title}}</p>
                    <p class="helper-text"><b>Last Edited:</b> {{item.date}} days ago</p>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    layout: 'user',
    data() {
        return {
            items: [{
                    title: 'Brain Trust New Sound Exchange Procedures for LOD',
                    date: '2',
                },
                {
                    title: 'Founder advisor standard template',
                    date: '1',
                },

            ]
        }
    }
}
</script>
