<template>
    <div name="select-address">
        <select v-model="province" @change="select('province')">
            <option v-for="(item, index) in provinces" :key="index" :value="item">
                <span>{{item}}</span>
            </option>
        </select>
        <select v-model="city" v-show="showCity" @change="select('city')">
            <option v-for="(item, index) in citys" :key="index" :value="item">
                <span>{{item}}</span>
            </option>
        </select>
        <select v-model="area" v-show="showArea" @change="select('area')">
            <option v-for="(item, index) of areas" :key="index" :value="item">
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
    props: {
        p: {
            type: String,
            default: ''
        },
        c: {
            type: String,
            default: ''
        },
        a: {
            type: String,
            default: ''
        }
    },
    data: () => {
        return {
            showCity: true, // show select or not
            showArea: true, // show select or not
            provinces: Object.keys(addressData),
            citys: [],
            areas: []
        }
    },
    methods: {
        select (type) {
            if (type === 'province') {
                this.province = this.provinces.indexOf(this.province) > -1 ? this.province : this.provinces[0]
                this._citys = addressData[this.province]
                this.citys = Object.keys(this._citys)
                this.city = this.citys.indexOf(this.city) > -1 ? this.city : this.citys[0]
                if (specAddress.indexOf(this.province) > -1) {
                    this.showCity = false
                    this.showArea = false

                    this.$emit('on-change', {
                        province: this.province,
                        city: '',
                        area: ''
                    })
                } else {
                    this.showCity = true
                    this.showArea = true
                    this.select('city')
                }
            }
            if (type === 'city') {
                this.areas = this._citys[this.city]
                this.area = this.areas.indexOf(this.area) > -1 ? this.area : this.areas[0]
                this.select('area')
            }
            if (type === 'area') {
                this.$emit('on-change', {
                    province: this.province,
                    city: this.city,
                    area: this.area
                })
            }
        }
    },
    created () {
        // set-default
        this.province = this.p
        this.city = this.c
        this.area = this.a
        this.select('province')
    }
}
</script>

<style scoped></style>
