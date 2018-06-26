<template>
    <my-quick-table
            modelName="product_category"
            modelNameZh="产品分类"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "分类名称",
                        key: "name"
                    },
                    {
                        title: "描述",
                        key: "description"
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 220,
                        buttons: [
                            'BUTTON_EDIT',
                            'BUTTON_REMOVE',
                            {
                                type: 'default',
                                text: '设置属性',
                                click: params => {
                                    console.log(this)
                                    console.log('审批', this.$refs.table)
                                    alert(params)
                                }
                            }
                        ]
                    }
                ],
            };
        },
        mounted() {
        },
        methods: {
        },
    };
</script>
