<template>
    <my-quick-table
            modelName="work_log"
            modelNameZh="日志"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '发布时间',
                        key: 'create_time'
                    },
                    {
                        title: '发布人',
                        key: 'user_name'
                    },
                    {
                        title: '内容',
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
    };
</script>
