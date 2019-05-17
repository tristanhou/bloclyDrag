<template>
    <van-button type="info" size="large" draggable="true" v-on:drag.native="drag">按钮2</van-button>
</template>

<script>
export default {
    name: 'buttons',
    methods: {
        drag (e) {
            console.log('1111')
        }
    }
}
</script>
