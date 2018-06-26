<template>
    <my-quick-table
            modelName="purchase_apply"
            modelNameZh="请购单"
            :columns="columns"></my-quick-table>
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
                        title: "摘要",
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
