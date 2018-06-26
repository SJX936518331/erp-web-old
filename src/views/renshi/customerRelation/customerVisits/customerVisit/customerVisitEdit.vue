<template>
  <div>
    <Card>
      <p slot="title">
        客户回访编辑
      </p>
      <div>
        <Form ref="form" :model="customer_visit" :label-width="100" label-position="right" :rules="validate">
          <FormItem label="客户" prop="user_name">
            <div>{{ customer_visit.user_name }}</div>
            <Button @click="selectCustomer">选择客户</Button>
          </FormItem>
          <FormItem label="回访方式" prop="visit_type_name">
            <div>{{ customer_visit.visit_type_name }}</div>
            <Button @click="selectVisitType">选择回访方式</Button>
          </FormItem>
          <FormItem label="日期" prop="time">
            <Input v-model="customer_visit.time" type="textarea" placeholder="请输入日期"></Input>
          </FormItem>
          <FormItem label="备注" prop="note">
            <Input v-model="customer_visit.note" type="textarea" placeholder="请输入备注"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="save">保存</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
    <Modal v-model="customerModalVisible" title="选择客户" :width="800" okText="212" @on-ok="userModalOk" @on-cancel="userModalCancel">
      <Table :columns="customerColumn" :data="customer"></Table>
      <div slot="footer"></div>
    </Modal>
    <Modal v-model="visitTypeModalVisible" title="选择回访方式" :width="800" okText="212" @on-ok="userModalOk" @on-cancel="userModalCancel">
      <Table :columns="visitTypeColumn" :data="visitType"></Table>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer_visit: {},
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
        user_name: [
          {
            required: true,
            message: "客户不能为空",
            trigger: "blur"
          }
        ],
        visit_type_name: [
          {
            required: true,
            message: "回访方式不能为空",
            trigger: "blur"
          }
        ],
        time: [
          {
            required: true,
            message: "日期不能为空",
            trigger: "blur"
          }
        ]
      },
      // 客户选择
      customer: [],
      customerModalVisible: false,
      customerColumn: [
        {
          title: "客户姓名",
          key: "name"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "电话号码",
          key: "phone"
        },
        {
          title: "性别",
          key: "gender"
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
                      this.selectCustomerItem(this.customer[params.index]);
                    }
                  }
                },
                "选择"
              )
            ]);
          }
        }
      ],
      // 回访方式选择
      visitType: [],
      visitTypeModalVisible: false,
      visitTypeColumn: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "回访方式",
          key: "name"
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
                      this.selectVisitTypeItem(this.visitType[params.index]);
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
      this.customer_visit_id = this.$route.params.id;
      if (!this.customer_visit_id) {
        return;
      }
      this.$http
        .get("/customer_visit/detail?id=" + this.customer_visit_id)
        .then(
          response => {
            let data = response.data;
            this.customer_visit = data.data;
            console.log(this.customer_visit);
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
        this.customer_visit.content = this.customer_visit.note;
        this.customer_visit.result = this.customer_visit.note;
        let url = this.customer_visit_id
          ? "/customer_visit/update"
          : "/customer_visit/add";
        this.$http.post(url, this.customer_visit).then(
          response => {
            this.$Message.success("保存成功");
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      });
    },
    selectCustomer() {
      this.customerModalVisible = true;
      this.$http.get("/customer/all").then(
        response => {
          let data = response.data;
          this.customer = data.data;
          console.log(this.customer);
        },
        response => {
          console.log(response);
        }
      );
    },
    selectCustomerItem(customer) {
      console.log("选择了", customer);
      this.customer_visit.customer_name = customer.name;
      this.customer_visit.user_name = customer.name;
      this.customer_visit.user_id = customer.id;
      this.customer_visit.branch_id = customer.id;
      this.customer_visit.customer_id = customer.id;
      this.customerModalVisible = false;
    },
    selectVisitType() {
      this.visitTypeModalVisible = true;
      this.$http.get("/visit_type/all").then(
        response => {
          let data = response.data;
          this.visitType = data.data;
          console.log(this.visitType);
        },
        response => {
          console.log(response);
        }
      );
    },
    selectVisitTypeItem(visitType) {
      console.log("选择了", visitType);
      this.customer_visit.visit_type_id = visitType.id;
      this.customer_visit.visit_type_name = visitType.name;
      this.visitTypeModalVisible = false;
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