<template>
    <my-quick-table
            modelName="store"
            modelNameZh="仓库"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                columns: [
                    {
                        title: "仓库编号",
                        key: "code"
                    },
                    {
                        title: "仓库名称",
                        key: "name"
                    },
                    {
                        title: "分支机构",
                        key: "branch_name"
                    },
                    {
                        title: "地址",
                        key: "address"
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
