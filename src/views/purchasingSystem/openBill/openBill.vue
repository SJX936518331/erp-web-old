<template>
    <my-quick-table
            modelName="purchase_bill"
            modelNameZh="采购开单"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "编号",
                        key: "code"
                    },
                    {
                        title: "日期",
                        key: "make_time"
                    },
                    {
                        title: "供应商编号",
                        key: "supplierId"
                    },
                    {
                        title: "金额",
                        key: "money"
                    },
                    {
                        title: "已付金额",
                        key: "moneyPay"
                    },
                    {
                        title: "备注",
                        key: "note"
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
                        buttons: [
                            'BUTTON_VIEW',
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
