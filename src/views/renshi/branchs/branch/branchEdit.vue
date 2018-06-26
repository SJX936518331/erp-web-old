<template>
    <div>
        <Card>
            <p slot="title">
                分支机构编辑
            </p>
            <div>
                <Form ref="form" :model="branch" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="机构名称" prop="name">
                        <Input v-model="branch.name" placeholder="请输入机构名称"></Input>
                    </FormItem>
                    <FormItem label="机构编号" prop="code">
                        <Input v-model="branch.code" type="textarea" placeholder="请输入机构编号"></Input>
                    </FormItem>
                    <FormItem label="负责人" prop="userName">
                        <div>{{ this.userName }}</div>
                        <Button @click="selectUser">选择负责人</Button>
                    </FormItem>
                    <FormItem label="地址" prop="address">
                        <Input v-model="branch.address" placeholder="请输入地址"></Input>
                    </FormItem>
                    <FormItem label="备注" prop="note">
                        <Input v-model="branch.note" type="textarea" placeholder="请输入备注"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
        <Modal v-model="departmentModalVisible" title="选择负责人" :width="800" okText="212" @on-ok="userModalOk" @on-cancel="userModalCancel">
            <Table :columns="departmentColumn" :data="departments"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      branch: {},
      userName: "",
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
            message: "机构名称不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "机构编号不能为空",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur"
          }
        ]
      },
      // 用户选择
      departments: [],
      departmentModalVisible: false,
      departmentColumn: [
        {
          title: "部门编号",
          key: "code"
        },
        {
          title: "部门名称",
          key: "name"
        },
        {
          title: "负责人姓名",
          key: "manager_name"
        },
        {
          title: "机构名称",
          key: "branch_name"
        },
        {
          title: "机构编号",
          key: "branch_id"
        },
        {
          title: "操作",
          key: "action",
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
                      this.selectUserItem(this.departments[params.index]);
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
      this.branchId = this.$route.params.id;
      if (!this.branchId) {
        return;
      }
      this.$http.get("/branch/detail?id=" + this.branchId).then(
        response => {
          let data = response.data;
          this.branch = data.data;
          console.log(this.branch);
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
        let url = this.branchId ? "/branch/update" : "/branch/add";
        this.$http.post(url, this.branch).then(
          response => {
            this.$Message.success("保存成功");
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      });
    },
    selectUser() {
      this.departmentModalVisible = true;
      this.$http.get("/department/all").then(
        response => {
          let data = response.data;
          this.departments = data.data;
          console.log(this.departments);
        },
        response => {
          console.log(response);
        }
      );
    },
    selectUserItem(department) {
      console.log("选择了", department);
      this.userName = department.manager_name;
      this.branch.note = department.note;
      this.branch.manager_id = department.manager_id;
      this.departmentModalVisible = false;
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