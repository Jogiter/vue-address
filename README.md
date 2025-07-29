vue-address
===========

> 多级联动地址选择器

install
-------

> npm install vue-address --save

import
------

```js
import vueAddress from 'vue-address'
...

// 注册全局组件
Vue.component('vue-address', vueAddress)

// .vue 中使用
export default {
  components: {
    vueAddress
  }
}
```

usage
-----

```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <x-address @on-change="selectAddress"></x-address>
    <div id="address" v-text="selectedAddress"></div>
  </div>
</template>

<script>
import xAddress from 'vue-address'

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
    selectAddress(address) {
        this.selectedAddress = `${address.province}${address.city}${address.detail}`
    }
  }
}
</script>

<style>
</style>
```

特别感谢
--------

+   [Administrative-divisions-of-China](https://github.com/modood/Administrative-divisions-of-China) 中国行政区划数据：省份、城市、区县、乡镇，省市区镇三级四级联动。
+   [vue-address](https://github.com/WebCodeFarmer/vue-address) 多级联动地址选择器
