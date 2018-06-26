<template>
  <div class="container">
    <h3>调拨单</h3>
    <p style="text-align:left;">
      <Button style="margin:10px 20px;" type="primary" @click="exportData(1)">导出表格数据</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </p>
    <Modal v-model="modal1" title="修改成本" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="成本" prop="cost">
          <Input v-model="editForm.cost" placeholder="请输入成本"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Table style="margin:5px;" :columns="col" :data="data1" ref="table"></Table>
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
    <div class="foot">
      <p>粤Icp备:14276767号 @个人版权所有，侵权必定追究</p>
    </div>
  </div>

</template>
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
<script>
import Cookies from "js-cookie";
import table2excel from "@/libs/table2excel.js";
export default {
  data() {
    return {
      excelFileName: "123",
      editForm: {
        cost: ""
      },
      validate: {
        cost: [
          {
            required: true,
            message: "成本不能为空",
            trigger: "blur"
          }
        ]
      },
      modal1: false,
      deleteIndex: function() {
        var dataIndex = Cookies.get("deleteIndex");
        for (var i = 0; i < this.data1.length; i++) {
          if (i >= this.data1[dataIndex].index - 1) {
            if (this.data1.length != 1) {
              this.data1[i].index = this.data1[i].index - 1;
            }
          }
        }
      },
      col: [
        {
          title: "序号",
          key: "index"
        },
        {
          title: "日期",
          key: "date"
        },
        {
          title: "调入仓库",
          key: "warehouse"
        },
        {
          title: "调出仓库",
          key: "outbound"
        },
        {
          title: "供应商",
          key: "supplier"
        },
        {
          title: "数量",
          key: "number"
        },
        {
          title: "成本",
          key: "cost"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (this.data1[params.index].index == 1) {
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
                        var data_index = params.index;
                        this.editForm.cost = this.data1[data_index].cost;
                        this.test();
                        Cookies.set("data_index", data_index);
                      }
                    }
                  },
                  "修改成本"
                )
              ]);
            }
          }
        }
      ],
      data1: [
        {
          index: 1,
          date: "2018-3-20",
          warehouse: "海珠仓库",
          outbound: "天河仓库",
          supplier: "A2",
          number: 100,
          cost: 200
        },
        {
          index: 2,
          date: "2018-4-20",
          warehouse: "天河仓库",
          outbound: "海珠仓库",
          supplier: "A3",
          number: 100,
          cost: 300
        }
      ]
    };
  },
  methods: {
    exportData(type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: "原始数据"
        });
      }
    },
    returnIndex() {
      this.$router.push({
        name: "finance_index"
      });
    },
    test() {
      this.modal1 = true;
    },
    ok() {
      if (this.editForm.cost == "") {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        this.data1[dataIndex].cost = this.editForm.cost;
        this.$Message.info("修改成本成功");
        this.editForm.cost = "";
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  }
};
</script>
