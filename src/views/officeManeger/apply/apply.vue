<template>
  <div class="container">
    <div class="margin-left-10 margin-top-20" style="text-align:left;">
      <Button class="add" @click="add" type="primary">添加申请</Button>
      <div class="find">
        <label>员工</label>
        <Input class="input" v-model="apply_user_id" placeholder="请输入员工编号" @on-change="change"></Input>
        <Button type="primary" @click="find">查询</Button>
      </div>
    </div>
    <Table style="margin:5px;" :columns="col" :data="data" ref="table"></Table>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      apply_user_id: "",
      col: [
        {
          title: "类型",
          key: "type"
        },
        {
          title: "员工姓名",
          key: "apply_user_name"
        },
        {
          title: "分支机构",
          key: "branch_name"
        },
        {
          title: "职位",
          key: "position"
        },
        {
          title: "申请内容",
          key: "content"
        },
        {
          title: "状态",
          key: "check_state"
        },
        {
          title: "审批人",
          key: "check_user_name"
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
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        "/applys/" + this.data[params.index].id + "/edit"
                      );
                    }
                  }
                },
                "编辑"
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
                      this.removeItem(this.data[params.index], params.index);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.applyCheck(this.data[params.index]);
                    }
                  }
                },
                "批准"
              )
            ]);
          }
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get("/apply/all").then(
        response => {
          this.data = response.data.data;
          console.log(this.data);
        },
        response => {
          console.log(response);
        }
      );
    },
    removeItem(item, index) {
      this.$Modal.confirm({
        title: "提示信息",
        content: "确定删除数据？",
        onOk: () => {
          this.$http.post("/apply/remove?id=" + item.id).then(
            response => {
              this.getData();
            },
            response => {
              console.log(response);
            }
          );
        }
      });
    },
    add() {
      this.$router.push("/apply/add");
    },
    find() {
      if (this.apply_user_id == "") {
        this.$Message.error("请输入员工编号");
      } else {
        this.$http.get("apply/all?user_id=" + this.apply_user_id).then(
          response => {
            this.data = response.data.data;
          },
          response => {
            console.log(response);
          }
        );
      }
    },
    change() {
      this.getData();
    },
    applyCheck(item) {
      this.$http.get("apply/check?id=" + item.id).then(
        response => {
          console.log(response);
          this.$Message.success("审核申请成功,请耐心等候。");
        },
        response => {
          console.log(response);
          this.$Message.error("审核申请失败,请重新申请。");
        }
      );
    }
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

.add {
  margin: 10px 0px 0px 20px;
}
.find {
  margin: 10px 0px 10px 30px;
}
.find .input {
  width: 200px;
  margin-right: 10px;
  margin-left: 10px;
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
}

.foot p {
  display: inline-block;
  color: white;
  height: 50px;
  line-height: 50px;
}
</style>