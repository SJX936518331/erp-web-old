<template>
    <my-quick-table
            modelName="wage"
            modelNameZh="工资单"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '单号',
                        key: 'code'
                    },
                    {
                        title: '日期',
                        key: 'time'
                    },
                    {
                        title: '金额',
                        key: 'totals'
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
//                            'BUTTON_VIEW',
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
