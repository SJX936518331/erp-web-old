<template>
    <my-quick-table
            modelName="package"
            modelNameZh="套餐"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                columns: [
                    {
                        title: "套餐编号",
                        key: "code"
                    },
                    {
                        title: "套餐名称",
                        key: "name"
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
        }
    };
</script>
