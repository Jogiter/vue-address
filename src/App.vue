<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// use locale component for build
import Address from './components/Address.vue'
// use dist component for test
// import { Address } from '../dist/vite-vue-component.es'

function selectAddress(address: any) {
  // todo: here is bug for component, debug infos are undefined
    console.log(`${address.province}${address.city}${address.detail}`)
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Address @change="selectAddress" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
