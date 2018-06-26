<template>
    <div class="container">
        <div class="margin-left-10 margin-top-20" style="text-align:left;">
            <Button class="add" @click="add" type="primary">添加分支机构</Button>
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
      col: [
        {
          title: "机构编号",
          key: "code"
        },
        {
          title: "机构名称",
          key: "name",
          editable: true
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
                  style: {
                    marginRight: "25px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        "/branchs/" + this.data[params.index].id + "/edit"
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
              )
            ]);
          }
        }
      ],
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
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get("/branch/all").then(
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
          this.$http.post("/branch/remove?id=" + item.id).then(
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
      this.$router.push("/branch/add");
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