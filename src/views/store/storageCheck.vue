<template>
    <my-quick-table
            modelName="storage_check"
            modelNameZh="盘点单"
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
                        key: "make_time"
                    },
                    {
                        title: "盘点仓库",
                        key: "store_name"
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
