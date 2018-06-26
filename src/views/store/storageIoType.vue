<template>
    <my-quick-table
            modelName="storage_io_type"
            modelNameZh="出入库类型"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "名称",
                        key: "name"
                    },
                    {
                        title: "类型",
                        key: "type",
                        sortable: true,
                        render: (h, params)=>{
                            return h('div', {}, params.row.type === '1' ? '入库类型' : '出库类型')
                        }
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
