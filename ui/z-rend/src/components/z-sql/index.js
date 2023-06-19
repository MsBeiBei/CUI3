import ZSql from './src/index.vue'

ZSql.install = (Vue) => {
    Vue.component(ZSql.name, ZSql)
}

export default ZSql
