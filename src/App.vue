<template>
    <div id="app">
        <x-address @change="selectAddress"></x-address>
        <div id="address" v-text="selectedAddress"></div>
    </div>
</template>

<script>
import xAddress from './components/address.vue'

export default {
    name: 'app',
    components: {
        xAddress
    },
    data: () => {
        return {
            selectedAddress: ''
        }
    },
    methods: {
        selectAddress (province, city, detail) {
            this.selectedAddress = `${province}, ${city}, ${detail}`
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
#address {
    margin-top: 15px;
}
/*覆盖样式*/
.stf-select {
    display: inline-block;
    min-width: 120px;
    text-align: left;
    padding-left: 10px;
}
.stf-select,
.stf-select__inner-wrapper {
    background-color: #ff9967;
    color: #fff;
}
</style>
