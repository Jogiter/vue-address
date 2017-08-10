<template>
    <div id="select-address">
        <select v-model="province" @change="onchange">
            <option v-for="(item, index) in provinces" :key="index" :value="item">
                <span>{{item}}</span>
            </option>
        </select>
        <select v-model="city" v-show="showCity" @change="onchange">
            <option v-for="(item, index) in citys" :key="index" :value="item">
                <span>{{item}}</span>
            </option>
        </select>
        <select v-model="detail" v-show="showDetail" @change="onchange">
            <option v-for="(item, index) in details" :key="index" :value="item">
                <span>{{item}}</span>
            </option>
        </select>
    </div>
</template>

<script>
import 'stf-vue-select/dist/lib/stf-vue-select.min.css'
import {StfSelect, StfSelectOption} from 'stf-vue-select'
import addressData from '../lib/address3.json'

const specAddress = ['台湾省', '香港特别行政区', '澳门特别行政区']

export default {
    name: 'vueAddress',
    components: {
        StfSelect,
        StfSelectOption
    },
    watch: {
        province () {
            if (specAddress.indexOf(this.province) > -1) {
                this.showCity = false
                this.showDetail = false
            }
            this.city = this.citys ? this.citys[0] : null
            this.detail = this.details ? this.details[0] : null
        }
    },
    computed: {
        citys () {
            if (this.province) {
                let citys = Object.keys(addressData[this.province])
                if (!citys.length) {
                    this.showCity = false
                    this.city = null

                    this.showDetail = false
                    this.detail = null
                } else {
                    this.showCity = true
                    this.$nextTick(() => {
                        this.city = citys[0]
                    })
                }
                return citys
            }
        },
        details () {
            if (this.city) {
                let details = addressData[this.province][this.city]
                if (!details.length) {
                    this.showDetail = false
                    this.detail = null
                } else {
                    this.$nextTick(() => {
                        this.showDetail = true
                        this.detail = details[0]
                    })
                }
                return details
            }
        }
    },
    data: () => {
        return {
            province: '',
            city: '',
            detail: '',
            showCity: true, // show select or not
            showDetail: true, // show select or not
            provinces: Object.keys(addressData)
        }
    },
    methods: {
        onchange () {
            this.$nextTick(() => {
                if (specAddress.indexOf(this.province) > -1) {
                    this.$emit('change', this.province)
                } else {
                    this.$emit('change', `${this.province}${this.city}${this.detail}`)
                }
            })
        }
    },
    created () {
    },
    mounted () {
        this.province = '北京市'
        this.$nextTick(() => {
            this.city = '市辖区'
            this.detail = '东城区'
        })
    }
}
</script>

<style scoped>
#select-address {
  display: block;
}
#select-address select {
  width: 100px;
  display: inline-block;
  height: 30px;
  line-height: 30;
  border-radius: 3px;
}
#select-address select option {
    font-size: 15px;
}
</style>
