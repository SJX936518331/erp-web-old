<template>
    <div>
        <Card>
            <p slot="title">
                客户编辑
            </p>
            <div>
                <p slot="title">联系人信息</p>
                <Form ref="form" :model="people" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="名称" prop="name">
                        <Input v-model="people.name" placeholder="请输入联系人名称"></Input>
                    </FormItem>
                    <FormItem label="编号" prop="code">
                        <Input v-model="people.code" type="textarea" placeholder="请输入编号"></Input>
                    </FormItem>
                    <FormItem label="性别" prop="gender">
                        <Select v-model="people.gender" placeholder="请选择你的性别">
                            <Option value="">请选择</Option>
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="手机号" prop="phone">
                        <Input v-model="people.phone" placeholder="请输入手机号"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="people.email" placeholder="请输入邮箱"></Input>
                    </FormItem>
                    <FormItem label="地址" prop="address">
                        <Input v-model="people.address" placeholder="请输入地址"></Input>
                    </FormItem>
                    <FormItem label="备注" prop="note">
                        <Input v-model="people.note" type="textarea" placeholder="请输入备注"></Input>
                    </FormItem>
                </Form>
                <p slot="title">银行账户信息</p>
                <Form ref="form1" :model="people" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="银行账户" prop="account">
                        <Input v-model="people.account" placeholder="请输入银行账户"></Input>
                    </FormItem>
                    <FormItem label="开户行" prop="bank_name">
                        <div>{{ people.bank_name }}</div>
                        <Button @click="selectName">选择开户行</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
        <Modal v-model="bankModalVisible" title="选择员工" :width="800" okText="212" @on-ok="userModalOk" @on-cancel="userModalCancel">
            <Table :columns="bankColumn" :data="banks"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      people: {},
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
            message: "联系人名称不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "编号不能为空",
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
        bank_name: [
          {
            required: true,
            message: "开户行不能为空",
            trigger: "blur"
          }
        ]
      },
      // 用户选择
      banks: [],
      bankModalVisible: false,
      bankColumn: [
        {
          title: "编号",
          key: "code"
        },
        {
          title: "开户行",
          key: "name"
        },
        {
          title: "银行账户",
          key: "account"
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
                      this.selectBankItem(this.banks[params.index]);
                    }
                  }
                },
                "选择"
              )
            ]);
          }
        }
      ]
    };
  },
  mounted() {
    this.getData();
    //            this.selectUser()
  },
  methods: {
    getData() {
      this.peopleId = this.$route.params.id;
      if (!this.peopleId) {
        return;
      }
      this.$http.get("/department/detail?id=" + this.peopleId).then(
        response => {
          let data = response.data;
          this.people = data.data;
          console.log(this.department);
        },
        response => {
          console.log(response);
        }
      );
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          this.$Message.error("请完善表单");
          return;
        }
        let url = this.departmentId ? "/department/update" : "/department/add";
        this.$http.post(url, this.department).then(
          response => {
            this.$Message.success("保存成功");
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      });
      this.$refs["form1"].validate(valid => {
        if (!valid) {
          return;
        }
      });
    },
    selectName() {
      this.bankModalVisible = true;
      this.$http.get("/bank/all").then(
        response => {
          let data = response.data;
          this.banks = data.data;
          console.log(this.banks);
        },
        response => {
          console.log(response);
        }
      );
    },
    selectBankItem(bank) {
      console.log("选择了", bank);
      this.people.bank_name = bank.name;
      this.bankModalVisible = false;
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
    userModalCancel() {}
  }
};
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