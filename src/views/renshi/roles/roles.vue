<template>
    <div class="container">
        <div class="title">
            <h3>角色</h3>
        </div>
        <p style="text-align:left;">
            <Button style="margin:10px 20px;" @click="test" type="primary">添加角色</Button>
            <Button style="margin:10px 20px;" @click="test3" type="primary">角色编辑</Button>
            <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
        </p>
        <Modal v-model="modal1" title="添加角色" @on-ok="ok1" @on-cancel="cancel">
            <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="角色名称" prop="name">
                    <Input v-model="editForm.name" placeholder="请输入你的角色名称"></Input>
                </FormItem>
                <FormItem label="备注" prop="beizhu">
                    <Input v-model="editForm.beizhu" type="textarea" placeholder="请输入你的备注"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="modal2" title="修改信息" @on-ok="ok" @on-cancel="cancel">
            <Form ref="editForm1" :model="editForm1" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="角色名称" prop="name">
                    <Input v-model="editForm1.name" placeholder="请输入你的角色名称"></Input>
                </FormItem>
                <FormItem label="备注" prop="beizhu">
                    <Input v-model="editForm1.beizhu" type="textarea" placeholder="请输入你的备注"></Input>
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="modal3" title="角色编辑" @on-ok="click" @on-cancel="cancel" :styles="{top: '20px'}">
            <Form ref="rolesEditForm" :model="rolesEditForm" :label-width="100" label-position="right"
                  :rules="rolesValidate">
                <h4>角色信息</h4>
                <FormItem label="角色名称" prop="name">
                    <Input v-model="rolesEditForm.name" placeholder="请输入你的角色名称"></Input>
                </FormItem>
                <FormItem label="备注" prop="beizhu">
                    <Input v-model="rolesEditForm.beizhu" type="textarea" placeholder="请输入你的备注"></Input>
                </FormItem>
                <h4>权限</h4>
                <FormItem label="一级" prop="one">
                    <Checkbox lable="系统" v-model="rolesEditForm.one">系统</Checkbox>
                </FormItem>
                <FormItem label="二级" prop="two">
                    <CheckboxGroup v-model="rolesEditForm.two">
                        <Checkbox label="员工管理"></Checkbox>
                        <Checkbox label="角色管理"></Checkbox>
                        <Checkbox label="公司信息管理"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="三级" prop="three">
                    <CheckboxGroup v-model="rolesEditForm.three">
                        <Checkbox label="查看"></Checkbox>
                        <Checkbox label="编辑"></Checkbox>
                        <Checkbox label="删除"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Form>
        </Modal>

        <Table style="margin:5px;" :columns="col" :data="data1" ref="table"></Table>
        <p style="float:right;">
            <a title="1">
                <span style="padding:5px 10px;background-color:white;color:black;margin:30px 5px;border-radius: 5px;display:inline-block;">1</span>
            </a>
            <a title="2">
                <span style="padding:5px 10px;background-color:white;color:black;margin:30px 5px;border-radius: 5px;display:inline-block;">2</span>
            </a>
            <a title="3">
                <span style="padding:5px 10px;background-color:white;color:black;margin:30px 5px;border-radius: 5px;display:inline-block;">3</span>
            </a>
        </p>
        <div class="foot">
            <p>粤Icp备:14276767号 @个人版权所有，侵权必定追究</p>
        </div>
    </div>
</template>

<style>
    .container {
        width: 100%;
        height: 100%;
    }

    .title {
        width: 100%;
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

<script>
    import Cookies from "js-cookie";
    import table2excel from "@/libs/table2excel.js";

    export default {
        data() {
            let i
            return {
                editForm: {
                    name: "",
                    beizhu: ""
                },
                editForm1: {
                    name: "",
                    beizhu: ""
                },
                rolesEditForm: {
                    name: "",
                    beizhu: "",
                    one: false,
                    two: false,
                    three: false
                },
                validate: {
                    name: [
                        {
                            required: true,
                            message: "角色名称不能为空",
                            trigger: "blur"
                        }
                    ],
                    beizhu: [
                        {
                            required: true,
                            message: "备注不能为空",
                            trigger: "blur"
                        }
                    ]
                },
                rolesValidate: {
                    name: [
                        {
                            required: true,
                            message: "角色名称不能为空",
                            trigger: "blur"
                        }
                    ],
                    beizhu: [
                        {
                            message: "备注不能为空",
                            trigger: "blur"
                        }
                    ],
                    one: [
                        {
                            required: true,
                            message: "权限不能为空",
                            trigger: "blur"
                        }
                    ],
                    two: [
                        {
                            required: true,
                            message: "权限不能为空",
                            trigger: "blur"
                        }
                    ],
                    three: [
                        {
                            required: true,
                            message: "权限不能为空",
                            trigger: "blur"
                        }
                    ]
                },
                modal1: false,
                modal2: false,
                modal3: false,
                excelFileName: "",
                deleteIndex: function () {
                    var dataIndex = Cookies.get("deleteIndex");
                    for (var i = 0; i < this.data1.length; i++) {
                        if (i >= this.data1[dataIndex].index - 1) {
                            if (this.data1.length != 1) {
                                this.data1[i].index = this.data1[i].index - 1;
                            }
                        }
                    }
                },
                col: [
                    {
                        title: "角色名称",
                        key: "name"
                    },
                    {
                        title: "备注",
                        key: "note"
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
                                                var data_index = params.index;
                                                Cookies.set("dataIndex", data_index);
                                                var first_index = Cookies.get("first_index");
                                                if (data_index == first_index) {
                                                    this.editForm1.name = this.data1[first_index].name;
                                                    this.editForm1.beizhu = this.data1[first_index].beizhu;
                                                } else {
                                                    this.editForm1.name = this.data1[data_index].name;
                                                    this.editForm1.beizhu = this.data1[data_index].beizhu;
                                                }
                                                this.test2();
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
                                                var deleteIndex = params.index;
                                                Cookies.set("deleteIndex", deleteIndex);
                                                this.deleteIndex();
                                                if (this.data1.length >= 2) {
                                                    this.data1.splice(params.index, 1);
                                                } else {
                                                    this.$Modal.info({
                                                        title: "提示信息",
                                                        content: "你确定要删除吗？就只剩一条数据了。"
                                                    });
                                                }
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    }
                ],
                data1: []
            };
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                this.$http.get("/role/all").then(
                    response => {
                        let data = response.data;
                        this.data1 = data.data;
                        // for (var i = 0; i < this.data1.length; i++) {
                        //   console.log(this.data1[i].name);
                        // }
                        console.log(this.data1);
                    },
                    response => {
                        console.log(response);
                    }
                );
            },
            test() {
                this.modal1 = true;
            },
            test2() {
                this.modal2 = true;
            },
            test3() {
                this.modal3 = true;
            },
            ok() {
                if (this.editForm1.name == "" || this.editForm1.beizhu == "") {
                    this.$Message.info("请把信息补充完整");
                } else {
                    var dataIndex = Cookies.get("dataIndex");
                    Cookies.set("first_index", dataIndex);
                    this.data1[dataIndex].name = this.editForm1.name;
                    this.data1[dataIndex].beizhu = this.editForm1.beizhu;
                    this.$Message.info("修改成功");
                }
            },
            ok1() {
                if (this.editForm.name == "" || this.editForm.beizhu == "") {
                    this.$Message.info("请把信息补充完整");
                } else {
                    this.data1.push({
                        index: this.data1.length + 1,
                        name: this.editForm.name,
                        beizhu: this.editForm.beizhu
                    });
                    this.$Message.info("添加角色成功");
                    this.editForm.name = "";
                    this.editForm.beizhu = "";
                }
            },
            click() {
                if (
                    this.rolesEditForm.name == "" ||
                    this.rolesEditForm.beizhu == "" ||
                    this.rolesEditForm.one == false ||
                    this.rolesEditForm.two == false ||
                    this.rolesEditForm.three == false
                ) {
                    this.$Message.info("请把信息补充完整");
                } else {
                    this.$Message.info("角色编辑成功");
                }
            },
            cancel() {
                this.$Message.info("你点击了取消");
            }
        }
    };
</script>
