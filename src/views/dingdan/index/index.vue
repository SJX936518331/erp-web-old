<template>
  <div class="container">
    <h3>订单</h3>
    <p style="text-align:left;">
      <Button style="margin:10px 20px;" type="primary" @click="exportExcel">导出表格数据</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </p>
    <Modal v-model="modal1" title="修改" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="订单编号" prop="id">
          <Input v-model="editForm.id" placeholder="请输入订单编号"></Input>
        </FormItem>
        <FormItem label="客户" prop="name">
          <Input v-model="editForm.name" type="textarea" placeholder="请输入客户"></Input>
        </FormItem>
        <FormItem label="进货价" prop="stockPrice">
          <Input v-model="editForm.stockPrice" placeholder="请输入进货价"></Input>
        </FormItem>
        <FormItem label="销售价" prop="salePrice">
          <Input v-model="editForm.salePrice" placeholder="请输入销售价"></Input>
        </FormItem>
        <FormItem label="加工费" prop="workPrice">
          <Input v-model="editForm.workPrice" placeholder="请输入加工费"></Input>
        </FormItem>
        <FormItem label="物流费" prop="logisticsPrice">
          <Input v-model="editForm.logisticsPrice" placeholder="请输入物流费"></Input>
        </FormItem>
        <FormItem label="其他费用" prop="otherPrice">
          <Input v-model="editForm.otherPrice" placeholder="请输入其他费用"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal2" title="收到付款" @on-ok="ok1" @on-cancel="cancel">
      <Form ref="editForm1" :model="editForm1" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="订单编号" prop="id">
          <Input v-model="editForm1.id" placeholder="请输入订单编号"></Input>
        </FormItem>
        <FormItem label="客户" prop="name">
          <Input v-model="editForm1.name" placeholder="请输入客户名称"></Input>
        </FormItem>
        <FormItem label="收款类型" prop="type">
          <Select v-model="editForm1.type" placeholder="请选择收款类型">
            <Option value="部分收款(已交订金)">部分收款(已交订金)</Option>
            <Option value="全额收款">全额收款</Option>
          </Select>
        </FormItem>
        <FormItem label="金额" prop="money">
          <Input v-model="editForm1.money" placeholder="请输入金额"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Table style="margin:5px;" :columns="col" :data="data1" ref="table"></Table>
    <div style="display:none;height:200px;font-size:18px;text-align:center" ref="content">
      <h4 style="inline-block;color:black;font-size:22px;">收款单</h4>
      <p style="text-align:left;;color:black;font-size:18px;margin:10px;">订单编号:{{id}}</p>
      <p style="text-align:left;;color:black;font-size:18px;margin:10px;">客户:{{name}}</p>
      <p style="text-align:left;;color:black;font-size:18px;margin:10px;">收款类型:{{type}}</p>
      <p style="text-align:left;;color:black;font-size:18px;margin:10px;">金额:{{money}}</p>
    </div>
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
      id: "",
      name: "",
      type: "",
      money: "",
      editForm: {
        id: "",
        name: "",
        status: "",
        stockPrice: "",
        salePrice: "",
        workPrice: "",
        logisticsPrice: "",
        otherPrice: ""
      },
      editForm1: {
        id: "",
        name: "",
        type: "",
        money: ""
      },
      validate: {
        id: [
          {
            required: true,
            message: "订单编号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "客户不能为空",
            trigger: "blur"
          }
        ],
        salePrice: [
          {
            required: true,
            message: "销售价不能为空",
            trigger: "blur"
          }
        ],
        stockPrice: [
          {
            required: true,
            message: "进货价不能为空",
            trigger: "blur"
          }
        ],
        workPrice: [
          {
            required: true,
            message: "加工费不能为空",
            trigger: "blur"
          }
        ],
        logisticsPrice: [
          {
            required: true,
            message: "物流费不能为空",
            trigger: "blur"
          }
        ],
        otherPrice: [
          {
            required: true,
            message: "其他费不能为空",
            trigger: "blur"
          }
        ]
      },
      validate1: {
        id: [
          {
            required: true,
            message: "订单编号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "客户不能为空",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "收款类型不能为空",
            trigger: "blur"
          }
        ],
        money: [
          {
            required: true,
            message: "金额不能为空",
            trigger: "blur"
          }
        ]
      },
      modal1: false,
      modal2: false,
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
          title: "订单编号",
          key: "id"
        },
        {
          title: "客户",
          key: "name"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "进货价",
          key: "stockPrice"
        },
        {
          title: "销售价",
          key: "salePrice"
        },
        {
          title: "加工费",
          key: "workPrice"
        },
        {
          title: "物流费",
          key: "logisticsPrice"
        },
        {
          title: "其他费用",
          key: "otherPrice"
        },
        {
          title: "总成本",
          key: "totalCost"
        },
        {
          title: "利润",
          key: "profit"
        },
        {
          title: "操作",
          key: "action",
          width: 300,
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
                      marginRight: "15px"
                    },
                    on: {
                      click: () => {
                        var data_index = params.index;
                        this.editForm.id = this.data1[data_index].id;
                        this.editForm.name = this.data1[data_index].name;
                        this.editForm.status = this.data1[data_index].status;
                        this.editForm.stockPrice = this.data1[
                          data_index
                        ].stockPrice;
                        this.editForm.salePrice = this.data1[
                          data_index
                        ].salePrice;
                        this.editForm.workPrice = this.data1[
                          data_index
                        ].workPrice;
                        this.editForm.logisticsPrice = this.data1[
                          data_index
                        ].logisticsPrice;
                        this.editForm.otherPrice = this.data1[
                          data_index
                        ].otherPrice;
                        Cookies.set("data_index", data_index);
                        this.test();
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "15px"
                    },
                    on: {
                      click: () => {
                        var data_index = params.index;
                        this.editForm1.id = this.data1[data_index].id;
                        this.editForm1.name = this.data1[data_index].name;
                        this.editForm1.type = this.data1[data_index].type;
                        this.editForm1.money = this.data1[data_index].money;
                        Cookies.set("data_index", data_index);
                        this.test1();
                      }
                    }
                  },
                  "收到付款"
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
                        var index = params.index;
                        if (this.data1[index].status == "待发货") {
                          this.data1[index].status = "代付款(已收定金)";
                        } else {
                          this.data1[index].status = "待发货";
                        }
                      }
                    }
                  },
                  "准备发货"
                )
              ]);
            }
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
                      Cookies.set("data_index", data_index);
                      var first_index = Cookies.get("dataIndex1");
                      if (data_index == first_index) {
                        // this.data1[data_index].name = this.editForm.name;
                        this.editForm1.name = this.data1[first_index].name;
                        this.editForm1.beizhu = this.data1[first_index].beizhu;
                        this.editForm1.id = this.data1[first_index].id;
                        this.editForm1.people = this.data1[first_index].people;
                      } else {
                        this.editForm1.name = this.data1[data_index].name;
                        this.editForm1.beizhu = this.data1[data_index].beizhu;
                        this.editForm1.id = this.data1[data_index].id;
                        this.editForm1.people = this.data1[data_index].people;
                      }

                      this.test();
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          index: 1,
          id: "1502993000",
          name: "张三",
          status: "待付款(已收订金)",
          stockPrice: 100,
          salePrice: 150,
          workPrice: 50,
          logisticsPrice: 10,
          otherPrice: 5,
          totalCost: 200,
          profit: 50
        },
        {
          index: 2,
          id: "1502993002",
          name: "张三",
          status: "已完成",
          stockPrice: 101,
          salePrice: 151,
          workPrice: 51,
          logisticsPrice: 11,
          otherPrice: 6,
          totalCost: 250,
          profit: 51
        }
      ]
    };
  },
  methods: {
    exportExcel() {
      table2excel.transform(
        this.$refs.table,
        "hrefToExportTable",
        this.excelFileName
      );
    },
    test() {
      this.modal1 = true;
    },
    test1() {
      this.modal2 = true;
    },
    ok() {
      if (
        this.editForm.id == "" ||
        this.editForm.name == "" ||
        this.editForm.stockPrice == "" ||
        this.editForm.salePrice == "" ||
        this.editForm.workPrice == "" ||
        this.editForm.logisticsPrice == "" ||
        this.editForm.otherPrice == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        this.data1[dataIndex].id = this.editForm.id;
        this.data1[dataIndex].name = this.editForm.name;
        this.data1[dataIndex].stockPrice = this.editForm.stockPrice;
        this.data1[dataIndex].salePrice = this.editForm.salePrice;
        this.data1[dataIndex].workPrice = this.editForm.workPrice;
        this.data1[dataIndex].logisticsPrice = this.editForm.logisticsPrice;
        this.data1[dataIndex].otherPrice = this.editForm.otherPrice;
        this.$Message.info("修改成功");
        this.editForm.id = "";
        this.editForm.name = "";
        this.editForm.stockPrice = "";
        this.editForm.salePrice = "";
        this.editForm.workPrice = "";
        this.editForm.logisticsPrice = "";
        this.editForm.otherPrice = "";
      }
    },
    ok1() {
      if (
        this.editForm1.id == "" ||
        this.editForm1.name == "" ||
        this.editForm1.type == "" ||
        this.editForm1.money == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        this.data1[dataIndex].id = this.editForm1.id;
        this.data1[dataIndex].name = this.editForm1.name;
        this.data1[dataIndex].type = this.editForm1.type;
        this.data1[dataIndex].money = this.editForm1.money;
        this.$refs.content.style.display = "block";
        this.id = this.editForm1.id;
        this.name = this.editForm1.name;
        this.type = this.editForm1.type;
        this.money = this.editForm1.money;
        this.$Message.info("收到付款成功");
        this.editForm1.id = "";
        this.editForm1.name = "";
        this.editForm1.type = "";
        this.editForm1.money = "";
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  }
};
</script>
