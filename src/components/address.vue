<template>
    <div id="select-address">
        <stf-select v-model="province" @input="onchange">
            <div slot="label">省份</div>
            <div slot="value">
                <div v-if="province">
                    <span>{{province}}</span>
                </div>
            </div>
            <section class="options">
                <stf-select-option v-for="(item, index) in provinces" :key="index" :value="item" :class="{'stf-select-option_selected': item == province}">
                    <span>{{item}}</span>
                </stf-select-option>
            </section>
        </stf-select>

        <stf-select v-model="city" v-show="showCity" @input="onchange">
            <div slot="label">城市</div>
            <div slot="value">
                <div v-if="city">
                    <span>{{city}}</span>
                </div>
            </div>
            <section class="options">
                <stf-select-option v-for="(item, index) in citys" :key="index" :value="item" :class="{'stf-select-option_selected': item == city}">
                    <span>{{item}}</span>
                </stf-select-option>
            </section>
        </stf-select>

        <stf-select v-model="detail" v-show="showDetail" @input="onchange">
            <div slot="label">区县</div>
            <div slot="value">
                <div v-if="detail">
                    <span>{{detail}}</span>
                </div>
            </div>
            <section class="options">
                <stf-select-option v-for="(item, index) in details" :key="index" :value="item" :class="{'stf-select-option_selected': item == detail}">
                    <span>{{item}}</span>
                </stf-select-option>
            </section>
        </stf-select>
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
                    this.city = citys[0]
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
                    this.showDetail = true
                    this.detail = details[0]
                }
                return details
            }
        }
    },
    data: () => {
        return {
            province: null,
            city: null,
            detail: null,
            showCity: true, // show select or not
            showDetail: true, // show select or not
            provinces: Object.keys(addressData)
        }
    },
    methods: {
        onchange () {
            this.$nextTick(() => {
                this.$emit('change', this.province, this.city, this.detail)
            })
        }
    }
}
</script>

<style scoped>
#select-address {
  display: block;
}
#select-address .stf-select {
  width: 200px;
  display: inline-block;
}
</style>
