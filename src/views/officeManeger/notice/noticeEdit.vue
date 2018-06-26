<template>
    <div>
        <Card>
            <p slot="title">
                部门编辑
            </p>
            <div>
                <Form ref="form" :model="notice" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="标题" prop="title">
                        <Input v-model="notice.title" placeholder="请输入标题"></Input>
                    </FormItem>
                    <FormItem label="分支机构" prop="branch_name">
                        <div>{{ notice.branch_name }}</div>
                        <Button @click="selectBranch">选择分支机构</Button>
                    </FormItem>
                    <FormItem label="公告内容" prop="content">
                        <Input v-model="notice.content" type="textarea" placeholder="请输入公告内容"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
        <Modal v-model="branchModalVisible" title="选择分支机构" :width="800" okText="212" @on-ok="userModalOk" @on-cancel="userModalCancel">
            <Table :columns="branchColumn" :data="branch"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      notice: {},
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
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "公告内容不能为空",
            trigger: "blur"
          }
        ],
      },
      // 分支机构选择
      branch: [],
      branchModalVisible: false,
      branchColumn: [
        {
          title: "机构编号",
          key: "code"
        },
        {
          title: "机构名称",
          key: "name"
        },
        {
          title: "地址",
          key: "address"
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
                      this.selectBranchItem(this.branch[params.index]);
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
      this.noticeId = this.$route.params.id;
      if (!this.noticeId) {
        return;
      }
      this.$http.get("/notice/detail?id=" + this.noticeId).then(
        response => {
          let data = response.data;
          this.notice = data.data;
          console.log(this.notice);
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
        let url = this.noticeId ? "/notice/update" : "/notice/add";
        this.$http.post(url, this.notice).then(
          response => {
            this.$Message.success("保存成功");
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      });
    },
    selectBranch() {
      this.branchModalVisible = true;
      this.$http.get("/branch/all").then(
        response => {
          let data = response.data;
          this.branch = data.data;
          console.log(this.users);
        },
        response => {
          console.log(response);
        }
      );
    },
    selectBranchItem(branch) {
      console.log("选择了", branch);
      this.notice.branch_name = branch.name;
      this.branchModalVisible = false;
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