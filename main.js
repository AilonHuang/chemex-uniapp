import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'

Vue.use(uView)

Vue.config.productionTip = false
Vue.prototype.server = '';

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
