<template>
    <div id="app">
        <x-address @on-change="selectAddress" :p="province" :c="city" :a="area"></x-address>
        <div id="address" v-text="selectedAddress"></div>
        <button @click="showpop">showpop</button>
        <div class="mask" v-show="popstatus">
            <div class="popup">
                <h2>hell popup</h2>
                <x-address @on-change="selectAddress"></x-address>
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
                province: '广东省',
                city: '深圳市',
                area: '南山区',
                selectedAddress: '',
                popstatus: false
            }
        },
        methods: {
            selectAddress (address) {
                console.log(`${address.province}${address.city}${address.area}`)
                this.selectedAddress = `${address.province}${address.city}${address.area}`
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
    /*demo 样式*/
    [name="select-address"] {
      display: block;
    }
    [name="select-address"] select {
      width: 100px;
      display: inline-block;
      height: 30px;
      line-height: 30;
      border-radius: 3px;
    }
    [name="select-address"] select option {
        font-size: 15px;
    }
</style>
