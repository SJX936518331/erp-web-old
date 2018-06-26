<template>
    <my-quick-table
            modelName="storage_move"
            modelNameZh="调拨单"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "日期",
                        key: "make_time"
                    },
                    {
                        title: "调入仓库",
                        key: "in_store_name"
                    },
                    {
                        title: "调出仓库",
                        key: "out_store_name"
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
    };
</script>
