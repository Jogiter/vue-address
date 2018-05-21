<template>
    <div name="select-address">
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
import addressData from '../lib/address3.json'

const specAddress = ['台湾省', '香港特别行政区', '澳门特别行政区']

export default {
    name: 'vueAddress',
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
                this.$emit('change', {
                    province: this.province,
                    city: this.city,
                    detail: this.detail
                })
            })
        }
    },
    created () {
        this.province = '北京市'
        this.$nextTick(() => {
            this.city = '市辖区'
            this.detail = '东城区'
        })
    }
}
</script>

<style scoped>
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
