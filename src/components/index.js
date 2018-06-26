import page from './page'
import footer from './footer'
import userSelector from './userSelector'
import departmentSelector from './departmentSelector'
import branchSelector from './branchSelector'
import productSelector from './productSelector'
import inStoreSelector from './inStoreSelector'
import outStoreSelector from './outStoreSelector'
import storeSelector from './storeSelector'
import billTypeSelector from './billTypeSelector'
import quickTable from './quick-table'
import canEditTable from "../views/tables/components/canEditTable.vue"

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('my-footer', footer)
        Vue.component('my-user-selector', userSelector)
        Vue.component('my-department-selector', departmentSelector)
        Vue.component('my-branch-selector', branchSelector)
        Vue.component('my-product-selector', productSelector)
        Vue.component('my-inStore-selector', inStoreSelector)
        Vue.component('my-outStore-selector', outStoreSelector)
        Vue.component('my-store-selector', storeSelector)
        Vue.component('my-billType-selector', billTypeSelector)
        Vue.component('my-quick-table', quickTable)
        Vue.component('my-table', canEditTable)
    }
}
