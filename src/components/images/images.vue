<template>
    <van-button type="default" size="large" draggable="true" v-on:drag.native="drag"><van-icon name="photo-o" size="2em" style="margin-top: 8px"/></van-button>
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