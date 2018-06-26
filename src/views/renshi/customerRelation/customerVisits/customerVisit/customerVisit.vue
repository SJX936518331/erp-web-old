<template>
  <div class="container">
    <div class="margin-left-10 margin-top-20" style="text-align:left;">
      <Button class="add" @click="add" type="primary">添加回访记录</Button>
      <div class="find">
        <label>客户</label>
        <Input class="input" v-model="customer_id" placeholder="请输入客户编号" @on-change="change"></Input>
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
      customer_id: "",
      col: [
        {
          title: "客户姓名",
          key: "customer_name"
        },
        {
          title: "回访日期",
          key: "time"
        },
        {
          title: "回访类型",
          key: "visit_type_name"
        },
        {
          title: "回访内容",
          key: "content"
        },
        {
          title: "备注",
          key: "note"
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
                    marginRight: "25px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        "/customerReturn/" + this.data[params.index].id + "/edit"
                      );
                    }
                  }
                },
                "查看"
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
      this.$http.get("/customer_visit/all").then(
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
          this.$http.post("/customer_visit/remove?id=" + item.id).then(
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
      this.$router.push("/customerReturn/add");
    },
    find() {
      if (this.customer_id == "") {
        this.$Message.error("请输入客户编号");
      } else {
        this.$http.get("customer_visit/all?customer_id=" + this.customer_id).then(
          response => {
            console.log(response);
            this.data = response.data.data;
            this.$Message.success("查询成功");
          },
          response => {
            console.log(response);
            this.$Message.error("查询失败");
          }
        );
      }
    },
    change() {
      this.getData();
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

.container p {
  font-size: 18px;
  color: rgb(92, 153, 133);
  margin-top: 5px;
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