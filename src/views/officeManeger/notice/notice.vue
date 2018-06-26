<template>
    <div class="container">
        <div class="margin-left-10 margin-top-20" style="text-align:left;">
            <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
            <Button @click="add" type="primary">添加公告</Button>
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
          title: "发布时间",
          key: "create_time"
        },
        {
          title: "标题",
          key: "title"
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
                  style: {
                    marginRight: "25px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        "/notices/" + this.data[params.index].id + "/edit"
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
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get("/notice/all").then(
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
          this.$http.post("/notice/remove?id=" + item.id).then(
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
      this.$router.push("/notice/add");
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