<template>
    <div>
        <Card v-if="curObject">
            <div>
                <!--<div>单号：{{ curObjec.code }}</div>-->
                <!--<div>制单人：{{ curObjec.make_user_name }}</div>-->
            </div>
            <Form ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="标题" prop="title">
                    <Input v-model="curObject.title" placeholder=""></Input>
                </FormItem>
                <FormItem label="公告内容" prop="content">
                    <Input v-model="curObject.content" placeholder=""></Input>
                </FormItem>
                <Table :columns="columns" :data="items" ref="table" :height="500"></Table>

                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <Button type="ghost" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'wage',
                curObject: null,
                validate: {
                    title: [
                        {
                            required: true,
                            message: "标题不能为空",
                            trigger: "title"
                        }
                    ],
                    content: [
                        {
                            required: true,
                            message: "公告内容不能为空",
                            trigger: "content"
                        }
                    ]
                },

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
                items: []
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                this.curObjectId = this.$route.params.id
                if (!this.curObjectId) {
                    return
                }
                this.$http.get(`/${this.modelName}/detail?id=` + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.curObject = data.data
                        this.items = this.curObject.items
                        console.log(this.curObject)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            save() {
                this.$refs['form'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('请完善表单')
                        return
                    }
                    let url = this.curObjectId ? `/${this.modelName}/update` : `/${this.modelName}/add`
                    this.$http.post(url, this.curObject).then(
                        response => {
                            this.$Message.success('保存成功')
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                })
            }
        }
    }
</script>
