<template>
    <my-quick-table
            modelName="purchase_receive"
            modelNameZh="采购收获单"
            :addAble="false"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "单号",
                        key: "code"
                    },
                    {
                        title: "日期",
                        key: "date"
                    },
                    {
                        title: "收货仓库",
                        key: "warehouse"
                    },
                    {
                        title: "摘要",
                        key: "note"
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
                        buttons: [
                            'BUTTON_EDIT',
                            'BUTTON_REMOVE'
                        ]
                    }
                ],
            };
        },
        methods: {
        }
    };
</script>

