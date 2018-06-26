<template>
    <my-quick-table
            modelName="stock"
            modelNameZh="仓库"
            :addAble="false"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                columns: [
                    {
                        title: "产品编号",
                        key: "product_code"
                    },
                    {
                        title: "产品名称",
                        key: "product_name"
                    },
                    {
                        title: "规格",
                        key: "attribute"
                    },
                    {
                        title: "单位",
                        key: "unit"
                    },
                    {
                        title: "仓库名称",
                        key: "store_name"
                    },
                    {
                        title: "库存数量",
                        key: "number"
                    },
                    {
                        title: "可用数量",
                        render: (h, params)=>{
                            return h('div', {}, params.row.number - params.row.lock_number)
                        }
                    },
                ],
            }
        },
        mounted() {
        },
        methods: {
        },
    }
</script>
