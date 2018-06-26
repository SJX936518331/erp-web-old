<template>
    <my-quick-table
            modelName="customer_visit"
            modelNameZh="回访记录"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '客户姓名',
                        key: 'user_name'
                    },
                    {
                        title: '回访日期',
                        key: 'time'
                    },
                    {
                        title: '回访内容',
                        key: 'content'
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
    }
</script>
