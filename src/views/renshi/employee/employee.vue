<template>
    <div class="admin-page-container">
        <div class="admin-tool-bar">
            <div class="tool-left">
                <span style="color:black;margin-left:20px;">部门：</span>
                <Input style="width:200px;" v-model="searchDepartment" @on-change="init" placeholder="请输入你要查找的部门"></Input>
                <Button style="margin:10px 20px;" type="primary" icon="search" @click="find">查找</Button>
            </div>
            <div class="tool-right">
                <Button @click="add">添加员工</Button>
            </div>
        </div>

        <Table :columns="columns" :data="data" ref="table"></Table>

        <p style="float:right;">
            <span style="padding:5px 10px;background-color:white;color:black;margin:30px 5px;border-radius: 5px;display:inline-block;">1</span>
            <span style="padding:5px 10px;background-color:white;color:black;margin:30px 5px;border-radius: 5px;display:inline-block;">2</span>
            <span style="padding:5px 10px;background-color:white;color:black;margin:30px 5px;border-radius: 5px;display:inline-block;">3</span>
        </p>

        <my-footer />
    </div>

</template>

<script>
    export default {
        data() {
            return {
                data: [],
                columns: [
                    {
                        title: "员工编号",
                        key: "code"
                    },
                    {
                        title: "姓名",
                        key: "name"
                    },
                    {
                        title: "性别",
                        key: "sex",
                        render:(h, params)=>{
                            console.log('渲染', params)
                            return h('div', {style: {
                                height: '23px'
                            }}, params.row.sex === '1' ? '男' : '女')
                        }
                    },
                    {
                        title: "分支机构",
                        key: "branch_name"
                    },
                    {
                        title: "部门",
                        key: "department_name"
                    },
                    {
                        title: "职位",
                        key: "position"
                    },
                    {
                        title: "手机号",
                        key: "phone"
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 150,
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "25px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push('/employees/' + this.data[params.index].id + '/edit')
                                            }
                                        }
                                    },
                                    "修改"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.removeItem(this.data[params.index], params.index)
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    }
                ],

                excelFileName: "",
                searchDepartment: "",
                initTable1: [
                    {
                        index: 1,
                        name: "张三",
                        department: "销售部",
                        shop: "广州天河分店",
                        position: "销售总监",
                        phone: "13640671843"
                    },
                    {
                        index: 2,
                        name: "李四",
                        department: "财务部",
                        shop: "广州天河分店",
                        position: "会计",
                        phone: "13640671842"
                    }
                ],
                editForm: {
                    name: "",
                    department: "",
                    shop: "",
                    position: "",
                    phone: ""
                },
                editForm1: {
                    name: "",
                    department: "",
                    shop: "",
                    position: "",
                    phone: ""
                },
                employeeEditForm: {
                    account: "",
                    password: "",
                    name: "",
                    sex: "",
                    phone: "",
                    email: "",
                    address: "",
                    type: "",
                    number: "",
                    beizhu: "",
                    id: "",
                    theShop: "",
                    theDepartment: "",
                    job: "",
                    date: "",
                    wages: "",
                    work: "",
                    roles: false
                },
                validate: {
                    name: [
                        {
                            required: true,
                            message: "员工姓名不能为空",
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
                    ]
                },
                employeeValidate: {
                    account: [
                        {
                            required: true,
                            message: "账号不能为空",
                            trigger: "blur"
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: "密码不能为空",
                            trigger: "blur"
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "姓名不能为空",
                            trigger: "blur"
                        }
                    ],
                    sex: [
                        {
                            required: true,
                            message: "性别不能为空",
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
                    email: [
                        {
                            required: true,
                            message: "邮箱不能为空",
                            trigger: "blur"
                        }
                    ],
                    address: [
                        {
                            required: true,
                            message: "地址不能为空",
                            trigger: "blur"
                        }
                    ],
                    type: [
                        {
                            required: true,
                            message: "证件类型不能为空",
                            trigger: "blur"
                        }
                    ],
                    number: [
                        {
                            required: true,
                            message: "证件号码不能为空",
                            trigger: "blur"
                        }
                    ],
                    beizhu: [
                        {
                            required: true,
                            message: "备注不能为空",
                            trigger: "blur"
                        }
                    ],
                    id: [
                        {
                            required: true,
                            message: "工号不能为空",
                            trigger: "blur"
                        }
                    ],
                    theShop: [
                        {
                            required: true,
                            message: "所属门店不能为空",
                            trigger: "blur"
                        }
                    ],
                    theDepartment: [
                        {
                            required: true,
                            message: "所属部门不能为空",
                            trigger: "blur"
                        }
                    ],
                    job: [
                        {
                            required: true,
                            message: "职位不能为空",
                            trigger: "blur"
                        }
                    ],
                    date: [
                        {
                            required: true,
                            message: "入职日期不能为空",
                            trigger: "blur"
                        }
                    ],
                    wages: [
                        {
                            required: true,
                            message: "基本工资不能为空",
                            trigger: "blur"
                        }
                    ],
                    work: [
                        {
                            required: true,
                            message: "就职状态不能为空",
                            trigger: "blur"
                        }
                    ],
                    roles: [
                        {
                            required: true,
                            message: "角色不能为空不能为空",
                            trigger: "blur"
                        }
                    ]
                },
                searchArray: [],
                pop: null,
            };
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
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
            add() {
                this.$router.push('/employee/add')
            },
            removeItem(item, index) {
                this.$Modal.confirm({
                    title: '提示信息',
                    content: '确定删除数据？',
                    onOk: () => {
                        this.$http.post('/user/remove?id=' + item.id).then(
                            response => {
                                this.getData()
                            },
                            response => {
                                console.log(response)
                            }
                        )
                    }
                })
            },
            init() {
                this.initTable1 = this.data;
                this.searchArray = [];
            },
            search(data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },
            handleSearch1() {
                this.initTable1 = this.data;
                this.initTable1 = this.search(this.initTable1, {
                    department: this.searchDepartment
                });

                this.searchArray = this.initTable1;
            },
            find() {
                if (this.searchDepartment == "") {
                    alert("请输入你要搜索的部门");
                } else {
                    this.handleSearch1();
                }
            }
        }
    };
</script>
