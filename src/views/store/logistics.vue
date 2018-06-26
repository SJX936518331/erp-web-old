<template>
    <my-quick-table
            modelName="logistics"
            modelNameZh="物流"
            :columns="columns"
            ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                columns: [
                    {
                        title: "物流名称",
                        key: "name"
                    },
                    {
                        title: "快递公司",
                        key: "company"
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
            }
        },
        mounted() {
        },
        methods: {
        },
    }
</script>
