<template>
    <div>
        <Card>
            <Form ref="form" :model="user" :label-width="100" label-position="right" :rules="validate">
                <h2>个人信息</h2>
                <FormItem label="姓名" prop="name">
                    <Input v-model="user.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="user.password" placeholder=""></Input>
                </FormItem>
                <FormItem label="性别" prop="phone">
                    <Select v-model="user.sex">
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                    </Select>
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input v-model="user.phone" placeholder=""></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input v-model="user.email" placeholder=""></Input>
                </FormItem>
                <FormItem label="住址" prop="address">
                    <Input v-model="user.address" placeholder=""></Input>
                </FormItem>
                <FormItem label="身份证号" prop="idcard_number">
                    <Input v-model="user.idcard_number" placeholder=""></Input>
                </FormItem>
                <h2>公司信息</h2>
                <FormItem label="工号" prop="code">
                    <Input v-model="user.code" placeholder=""></Input>
                </FormItem>
                <FormItem label="分支机构" prop="branch_id">
                    <div>{{ user.branch_name }}</div>
                </FormItem>
                <FormItem label="部门" prop="department_id">
                    <div>{{ user.department_name }}</div>
                    <Button @click="selectDepartment">选择部门</Button>
                </FormItem>
                <FormItem label="职位" prop="position">
                    <Input v-model="user.position" placeholder=""></Input>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <Button type="ghost" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Card>
        <Modal v-model="departmentModalVisible" title="选择部门" :width="800">
            <Table :columns="departmentColumn" :data="departments"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>

</template>

<script>
    import Cookies from "js-cookie";

    export default {
        data() {
            return {
                user: {
                    branch_id: 1
                },
                validate: {
                    name: [
                        {
                            required: true,
                            message: "员工姓名不能为空",
                            trigger: "blur"
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "密码不能为空",
                            trigger: "blur"
                        }
                    ],
                    department: [
                        {
                            required: true,
                            message: "部门不能为空",
                            trigger: "blur"
                        }
                    ],
                    shop: [
                        {
                            required: true,
                            message: "门店不能为空",
                            trigger: "blur"
                        }
                    ],
                    position: [
                        {
                            required: true,
                            message: "职位不能为空",
                            trigger: "blur"
                        }
                    ],
                    phone: [
                        {
                            required: true,
                            message: "手机号不能为空",
                            trigger: "blur"
                        }
                    ],
                    code: [
                        {
                            required: true,
                            message: "手机号不能为空",
                            trigger: "blur"
                        }
                    ]
                },
                // 部门选择
                departments: [],
                departmentModalVisible: false,
                departmentColumn: [
                    {
                        title: "部门编号",
                        key: "code"
                    },
                    {
                        title: "部门名称",
                        key: 'name'
                    },
                    {
                        title: '分支机构',
                        key: 'branch_name',
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
                                                this.selectDepartmentItem(this.departments[params.index])
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
        },
        methods: {
            getData() {
                this.userId = this.$route.params.id
                if (!this.userId) {
                    return
                }
                this.$http.get('/user/detail?id=' + this.userId).then(
                    response => {
                        let data = response.data
                        this.user = data.data
                        console.log(this.user)
                    },
                    response => {
                        console.log(response)
                    }
                )
                
                this.$http.get('/user/all').then(
                    response => {
                        this.data = response.data.data
                        console.log(this.data)
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
                    let url = this.userId ? '/user/update' : '/user/add'
                    this.$http.post(url, this.user).then(
                        response => {
                            this.$Message.success('保存成功')
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                })
            },
            selectDepartment() {
                this.departmentModalVisible = true
                this.$http.get('/department/all').then(
                    response => {
                        let data = response.data
                        this.departments = data.data
                        console.log(this.departments)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            selectDepartmentItem(department) {
                console.log('选择了', department)
                this.user.department_id = department.id
                this.user.department_name = department.name
                this.departmentModalVisible = false
            },
        }
    };
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
    }

    .title {
        width: 100%;
        text-align: center;
    }

    .container .title h3 {
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