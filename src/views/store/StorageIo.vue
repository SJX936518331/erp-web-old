<template>
    <my-quick-table
            modelName="storage_io"
            modelNameZh="出入库单"
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
                        title: "仓库",
                        key: "store_name"
                    },
                    {
                        title: "摘要",
                        key: "note"
                    },
                    {
                        title: "状态",
                        key: "check_state",
                        render: (h, params)=>{
                            return h('div', {}, params.row.check_state === '1' ? '已审核' : '未审核')
                        }
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
        }
    };
</script>
