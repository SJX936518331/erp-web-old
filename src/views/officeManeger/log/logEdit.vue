<template>
  <div>
    <Card>
      <p slot="title">
        日志编辑
      </p>
      <div>
        <Form ref="form" :model="log" :label-width="100" label-position="right" :rules="validate">
          <FormItem label="日期" prop="time">
            <Input v-model="log.time" placeholder="请输入日期"></Input>
          </FormItem>
          <FormItem label="员工姓名" prop="user_name">
            <div>{{ log.user_name }}</div>
            <Button @click="selectUserName">选择员工姓名</Button>
          </FormItem>
          <FormItem label="日志内容" prop="content">
            <Input v-model="log.content" type="textarea" placeholder="请输入日志内容"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="save">保存</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
    <Modal v-model="userModalVisible" title="选择员工姓名" :width="800" okText="212" @on-ok="userModalOk" @on-cancel="userModalCancel">
      <Table :columns="userColumn" :data="users"></Table>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_name: "",
      log: {},
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
        time: [
          {
            required: true,
            message: "日期不能为空",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "日志内容不能为空",
            trigger: "blur"
          }
        ]
      },
      // 分支机构选择
      users: [],
      userModalVisible: false,
      userColumn: [
        {
          title: "标题",
          key: "title"
        },
        {
          title: "用户名称",
          key: "user_name"
        },
        {
          title: "日期",
          key: "create_time"
        },
        {
          title: "内容",
          key: "content"
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
                      this.selectUserItem(this.users[params.index]);
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
      this.logId = this.$route.params.id;
      if (!this.logId) {
        return;
      }
      this.$http.get("/work_log/detail?id=" + this.logId).then(
        response => {
          let data = response.data;
          this.log = data.data;
          console.log(this.log);
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
        let url = this.logId ? "/work_log/update" : "/work_log/add";
        this.$http.post(url, this.log).then(
          response => {
            this.$Message.success("保存成功");
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      });
    },
    selectUserName() {
      this.userModalVisible = true;
      this.$http.get("/notice/all").then(
        response => {
          let data = response.data;
          this.users = data.data;
          console.log(this.users);
        },
        response => {
          console.log(response);
        }
      );
    },
    selectUserItem(user) {
      console.log("选择了", user);
      this.log.user_id = user.user_id;
      this.log.id = user.id;
      this.log.user_name = user.user_name;
      this.log.create_time = user.create_time;

      this.userModalVisible = false;
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