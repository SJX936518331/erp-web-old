<template>
    <div>
        <Card>
            <p slot="title">
                部门编辑
            </p>
            <div>
                <Form ref="form" :model="department" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="部门名称" prop="name">
                        <Input v-model="department.name" placeholder="请输入部门名称"></Input>
                    </FormItem>
                    <FormItem label="备注" prop="beizhu">
                        <Input v-model="department.note" type="textarea" placeholder="请输入你的备注"></Input>
                    </FormItem>
                    <FormItem label="部门编号" prop="id">
                        <Input v-model="department.code" placeholder="请输入你的部门编号"></Input>
                    </FormItem>
                    <FormItem label="部门负责人" prop="manager_id">
                        <div>{{ department.manager_name }}</div>
                        <Button @click="selectUser">选择员工</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
        <Modal v-model="userModalVisible" title="选择员工" :width="800" okText="212" @on-ok="userModalOk" @on-cancel="userModalCancel">
            <Table :columns="userColumn" :data="users"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                department: {},
                editData: [],
                editForm: {
                    name: "",
                    beizhu: "",
                    id: "",
                    people: ""
                },
                editForm1: {
                    name: "",
                    beizhu: "",
                    id: "",
                    people: ""
                },
                validate: {
                    name: [
                        {
                            required: true,
                            message: "部门名称不能为空",
                            trigger: "blur"
                        }
                    ],
                    note: [
                        {
                            required: true,
                            message: "备注不能为空",
                            trigger: "blur"
                        }
                    ],
                    code: [
                        {
                            required: true,
                            message: "部门编号不能为空",
                            trigger: "blur"
                        }
                    ],
                    manager_id: [
                        {
                            required: true,
                            message: "部门负责任人不能为空",
                            trigger: "blur"
                        }
                    ]
                },
                // 用户选择
                users: [],
                userModalVisible: false,
                userColumn: [
                    {
                        title: "员工编号",
                        key: "code"
                    },
                    {
                        title: "姓名",
                        key: 'name'
                    },
                    {
                        title: '分支机构',
                        key: 'branch_name',
                    },
                    {
                        title: "部门",
                        key: "department_name",
                        width: 240,
                    },
                    {
                        title: '职位',
                        key: 'position',
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 240,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.selectUserItem(this.users[params.index])
                                            }
                                        }
                                    },
                                    "选择"
                                )
                            ]);
                        }
                    }
                ],
            }
        },
        mounted() {
            this.getData()
//            this.selectUser()
        },
        methods: {
            getData() {
                this.departmentId = this.$route.params.id
                if (!this.departmentId) {
                    return
                }
                this.$http.get('/department/detail?id=' + this.departmentId).then(
                    response => {
                        let data = response.data
                        this.department = data.data
                        console.log(this.department)
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
                    let url = this.departmentId ? '/department/update' : '/department/add'
                    this.$http.post(url, this.department).then(
                        response => {
                            this.$Message.success('保存成功')
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                })
            },
            selectUser() {
                this.userModalVisible = true
                this.$http.get('/user/all').then(
                    response => {
                        let data = response.data
                        this.users = data.data
                        console.log(this.users)
                    },
                    response => {
                        console.log(response);
                    }
                )
            },
            selectUserItem(user) {
                console.log('选择了', user)
                this.department.manager_id = user.id
                this.department.manager_name = user.name
                this.userModalVisible = false
            },
            userModalOk() {
                if (
                    this.editForm.name == "" ||
                    this.editForm.beizhu == "" ||
                    this.editForm.id == "" ||
                    this.editForm.people == ""
                ) {
                    this.$Message.info("请把信息填完整");
                } else {
                    this.data1.push({
                        index: this.data1.length + 1,
                        name: this.editForm.name,
                        beizhu: this.editForm.beizhu,
                        id: this.editForm.id,
                        people: this.editForm.people
                    });
                    this.$Message.info("添加部门成功");
                    this.editForm.name = "";
                    this.editForm.beizhu = "";
                    this.editForm.id = "";
                    this.editForm.people = "";
                }
            },
            userModalCancel() {
            }
        }
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .container h3 {
        font-size: 24px;
        margin-bottom: 5px;
        display: inline-block;
    }

    .container p {
        font-size: 18px;
        color: rgb(92, 153, 133);
        margin-top: 5px;
    }

    .foot {
        width: 100%;
        position: fixed;
        bottom: 0px;
        left: 0px;
        text-align: center;
        background-color: gray;
        /* 固定在底部的三种方式 */
        /* 方法1：使用CSS绝对定位
           position:absolute;
           bottom:0px;
           left:0px; */
        /* 方法2：使用CSS固定定位
           position:fixed;
           bottom:0px;
           left:0px;  */
        /* 方法3：使用Float浮动定位(适用于div是body元素的子元素)
           float:right;
           bottom:0px; */
        /* 固定在顶部的三种方式跟这三种没区别，类似 */
    }

    .foot p {
        display: inline-block;
        color: white;
        height: 50px;
        line-height: 50px;
    }
</style>