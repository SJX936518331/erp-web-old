<template>
  <div>
    <Card>
      <p slot="title">
        申请编辑
      </p>
      <div>
        <Form ref="form" :model="apply" :label-width="100" label-position="right" :rules="validate">
          <FormItem label="类型" prop="type">
            <div>{{ apply.type }}</div>
            <Button @click="selectType">选择类型</Button>
          </FormItem>
          <FormItem label="开始日期" prop="create_time">
            <Input v-model="apply.create_time" placeholder="请输入开始日期"></Input>
          </FormItem>
          <FormItem label="结束日期" prop="check_time">
            <Input v-model="apply.check_time" placeholder="请输入结束日期"></Input>
          </FormItem>
          <FormItem label="天数" prop="day">
            <Input v-model="day" placeholder="请输入天数"></Input>
          </FormItem>
          <FormItem label="内容" prop="content">
            <Input v-model="apply.content" type="textarea" placeholder="请输入内容"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="save">保存</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
    <Modal v-model="applyTypeModalVisible" title="选择类型" :width="800" okText="212" @on-ok="userModalOk" @on-cancel="userModalCancel">
      <Table :columns="applyTypeColumn" :data="type"></Table>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apply: {},
      day:'',
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
        type: [
          {
            required: true,
            message: "类型不能为空",
            trigger: "blur"
          }
        ],
        create_time: [
          {
            required: true,
            message: "开始日期不能为空",
            trigger: "blur"
          }
        ],
        check_time: [
          {
            required: true,
            message: "结束日期不能为空",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ]
      },
      // 分支机构选择
      type: [],
      applyTypeModalVisible: false,
      applyTypeColumn: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "名称",
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
                      this.selectTypeItem(this.type[params.index]);
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
      this.applyId = this.$route.params.id;
      if (!this.applyId) {
        return;
      }
      this.$http.get("/apply/detail?id=" + this.applyId).then(
        response => {
          let data = response.data;
          this.apply = data.data;
          console.log(this.apply);
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
        let url = this.applyId ? "/apply/update" : "/apply/add";
        this.$http.post(url, this.apply).then(
          response => {
            this.$Message.success("保存成功");
          },
          response => {
            this.$Message.error("系统出错");
            console.log(response);
          }
        );
      });
    },
    selectType() {
      this.applyTypeModalVisible = true;
      this.$http.get("/apply_type/all").then(
        response => {
          let data = response.data;
          this.type = data.data;
          console.log(this.type);
        },
        response => {
          console.log(response);
        }
      );
    },
    selectTypeItem(type) {
      console.log("选择了", type);
      this.apply.apply_user_id = type.id;
      this.apply.check_user_id = type.id;
      this.apply.check_state = type.id;
      this.apply.type = type.id;
      this.applyTypeModalVisible = false;
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