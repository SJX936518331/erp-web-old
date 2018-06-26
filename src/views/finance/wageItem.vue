<template>
    <my-quick-table
            modelName="wage_item"
            modelNameZh="工资单"
            :addAble="false"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '工号',
                        key: 'code'
                    },
                    {
                        title: '员工姓名',
                        key: 'user_name'
                    },
                    {
                        title: '部门',
                        key: 'department_name'
                    },
                    {
                        title: '基本工资',
                        key: 'basic_wage'
                    },
                    {
                        title: '奖金',
                        key: 'bonus'
                    },
                    {
                        title: '补贴',
                        key: 'subsidy'
                    },
                    {
                        title: '计件工资',
                        key: 'commission'
                    },
                    {
                        title: '应发合计',
                        key: 'basic_wage'
                    },
                    {
                        title: '个人所得税',
                        key: 'tax'
                    },
                    {
                        title: '罚金',
                        key: 'fine'
                    },
                    {
                        title: '应扣合计',
                        key: 'fine'
                    },
                    {
                        title: '实发合计',
                        key: 'total'
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
