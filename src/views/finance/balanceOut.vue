<template>
    <my-quick-table
            modelName="balance_out"
            modelNameZh="费用单"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '单据编号',
                        key: 'code'
                    },
                    {
                        title: '日期',
                        key: 'make_time'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '备注',
                        key: 'note'
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
        mounted() {
        },
        methods: {
        },
    };
</script>
