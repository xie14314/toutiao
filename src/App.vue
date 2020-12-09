import router from './router';
<template>
  <div id="app">
    <h1>toutiao</h1>
    <van-button type="primary">主要按钮</van-button>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style lang="less"></style>
