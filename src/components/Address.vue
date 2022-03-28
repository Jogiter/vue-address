<template>
  <div v-bind="$attrs">
    <select v-model="province" @change="select('province')">
      <option v-for="(item, index) in provinces" :key="index" :value="item">
        <span>{{ item }}</span>
      </option>
    </select>
    <select v-model="city" v-show="showCity" @change="select('city')">
      <option v-for="(item, index) in citys" :key="index" :value="item">
        <span>{{ item }}</span>
      </option>
    </select>
    <select v-model="area" v-show="showArea" @change="select('area')">
      <option v-for="(item, index) of areas" :key="index" :value="item">
        <span>{{ item }}</span>
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue-demi'
import addressData from 'china-division'

const specAddress = ['台湾省', '香港特别行政区', '澳门特别行政区']

export type JsonType =
  | 'provinces'
  | 'cities'
  | 'areas'
  | 'streets'
  | 'villages'
  | 'pc'
  | 'pcC'
  | 'pca'
  | 'pcaC'
  | 'pcas'
  | 'pcasC'

export default defineComponent({
  props: {
    province: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    area: {
      type: String,
      default: '',
    },
    /**
     * tag of select, you can replace it with your custom-select
     */
    tag: {
      type: String,
      default: 'select',
    },
    json: {
      type: String as PropType<JsonType>,
      default: 'pca',
    },
  },
  emits: ['on-change'],
  setup(props, { emit }) {
    // show select or not
    const showCity = ref(true)
    // show select or not
    const showArea = ref(true)
    const provinces = Object.keys(addressData)
    let province: any = ref()
    let _citys: any[]
    const city = ref()
    const area = ref()
    let citys = ref([] as any[])
    const areas = ref([] as any[])

    function select(type: 'province' | 'city' | 'area') {
      if (type === 'province') {
        province =
          provinces.indexOf(props.province) > -1 ? props.province : provinces[0]
        _citys = addressData[province]
        citys.value = Object.keys(_citys)
        city.value =
          citys.value.indexOf(props.city) > -1 ? props.city : citys.value[0]
        if (specAddress.indexOf(province) > -1) {
          showCity.value = false
          showArea.value = false
          emit('on-change', {
            province: province,
            city: '',
            area: '',
          })
        } else {
          showCity.value = true
          showArea.value = true
          select('city')
        }
      }
      if (type === 'city') {
        areas.value = _citys[city.value]
        area.value =
          areas.value.indexOf(props.area) > -1 ? props.area : areas.value[0]
        select('area')
      }
      if (type === 'area') {
        emit('on-change', {
          province,
          city,
          area,
        })
      }
    }

    return {
      select,
      province,
      provinces,
      city,
      showCity,
      citys,
      area,
      showArea,
      areas,
    }
  },
})
</script>
