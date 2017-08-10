<template>
    <div id="app">
        <x-address @change="selectAddress"></x-address>
        <div id="address" v-text="selectedAddress"></div>
        <button @click="showpop">showpop</button>
        <div class="mask" v-show="popstatus">
            <div class="popup">
                <h2>hell popup</h2>
                <x-address @change="selectAddress"></x-address>
                <div class="btns"><button @click="hidepop">cancel</button><button @click="hidepop">ensure</button></div>
            </div>
        </div>
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
                selectedAddress: '',
                popstatus: false
            }
        },
        methods: {
            selectAddress (address) {
                this.selectedAddress = address
            },
            showpop () {
                this.popstatus = true
            },
            hidepop () {
                this.popstatus = false
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }
    #address {
        margin-top: 15px;
    }
    .mask {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .popup {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        min-width: 200px;
        min-height: 200px;
        background-color: #fff;
        border-radius: 10px;
        padding: 15px;
    }
    @media screen and (max-width: 768px) {
        .popup {
            padding: 5px;
            min-width: 90%;
            min-height: 200px;
        }
    }
    .popup h2 {
        margin-top: 50px;
    }
    .popup .btns {
        margin-top: 50px;
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        justify-content: space-around;
    }
    button {
        border: 0;
        outline: none;
        padding: 8px 10px;
        border-radius: 5px;
        background-color: #ff9967;
        color: #fff;
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
