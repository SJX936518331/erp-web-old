<template>
  <div class="container">
    <h3>账户</h3>
    <P style="text-align:left;">
      <Button style="margin:10px 20px;" @click="test2" type="primary">添加账户</Button>
      <Button style="margin:10px 20px;" type="primary" @click="exportExcel">导出表格数据</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </P>

    <Modal v-model="modal1" title="修改信息" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="账户名称" prop="name" :error="nameError">
          <Input v-model="editForm.name" placeholder="请输入账户名称"></Input>
        </FormItem>
        <FormItem label="类型" prop="type">
          <Select v-model="editForm.type" placeholder="请选择类型">
            <Option value="支出">支出</Option>
            <Option value="收入">收入</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal2" title="添加账户" @on-ok="ok1" @on-cancel="cancel">
      <Form ref="editForm1" :model="editForm1" :label-width="100" label-position="right" :rules="validate1">
        <FormItem label="账户名称" prop="name">
          <Input v-model="editForm1.name" placeholder="请输入账户名称"></Input>
        </FormItem>
        <FormItem label="账号" prop="account">
          <Input v-model="editForm1.account" placeholder="请输入账号"></Input>
        </FormItem>
        <FormItem label="开户人" prop="people">
          <Input v-model="editForm1.people" placeholder="请输入开户人"></Input>
        </FormItem>
        <FormItem label="所属门店" prop="shop">
          <Select v-model="editForm1.shop" placeholder="请选择所属门店">
            <Option value="门店1">门店1</Option>
            <Option value="门店2">门店2</Option>
          </Select>
        </FormItem>
        <FormItem label="账户类型" prop="type">
          <Select v-model="editForm1.type" placeholder="请选择账户类型">
            <Option value="支出">支出</Option>
            <Option value="收入">收入</Option>
          </Select>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm1.beizhu" type="textarea" placeholder="请输入备注"></Input>
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
  /* float: right;
  bottom: 0px; */
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
        name: "",
        type: ""
      },
      editForm1: {
        name: "",
        account: "",
        people: "",
        shop: "",
        type: "",
        beizhu: ""
      },
      validate: {
        name: [
          {
            required: true,
            message: "账户名称不能为空",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "类型不能为空",
            trigger: "blur"
          }
        ]
      },
      validate1: {
        name: [
          {
            required: true,
            message: "账户名称不能为空",
            trigger: "blur"
          }
        ],
        account: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        people: [
          {
            required: true,
            message: "开户人不能为空",
            trigger: "blur"
          }
        ],
        shop: [
          {
            required: true,
            message: "所属门店不能为空",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "账户类型不能为空",
            trigger: "blur"
          }
        ],
        beizhu: [
          {
            required: true,
            message: "备注不能为空",
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
          title: "账户名称",
          key: "name"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
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
                      var data_index = params.index;
                      this.editForm.name = this.data1[data_index].name;
                      this.editForm.type = this.data1[data_index].type;
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
                  on: {
                    click: () => {
                      var deleteIndex = params.index;
                      Cookies.set("deleteIndex", deleteIndex);
                      this.deleteIndex();
                      if (this.data1.length >= 2) {
                        this.data1.splice(params.index, 1);
                      } else {
                        this.$Modal.info({
                          title: "提示信息",
                          content: "你确定要删除吗？就只剩一条数据了。"
                        });
                      }
                      Cookies.set("name", "");
                      Cookies.set("type", "");
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          index: 1,
          name: "工资支出",
          type: "支出"
        },
        {
          index: 2,
          name: "销售收入",
          type: "收入"
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
    test2() {
      this.modal2 = true;
    },
    ok() {
      if (this.editForm.name == "" || this.editForm.type == "") {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        Cookies.set("dataIndex1", dataIndex);
        this.data1[dataIndex].name = this.editForm.name;
        this.data1[dataIndex].type = this.editForm.type;
        this.$Message.info("修改成功");
      }
    },
    ok1() {
      if (
        this.editForm1.name == "" ||
        this.editForm1.account == "" ||
        this.editForm1.people == "" ||
        this.editForm1.shop == "" ||
        this.editForm1.type == "" ||
        this.editForm1.beizhu == ""
      ) {
        this.$Message.info("请把信息补充完整");
      } else {
        this.data1.push({
          index: this.data1.length + 1,
          name: this.editForm1.name,
          type: this.editForm1.type
        });
        this.$Message.info("添加账户成功");
        this.editForm1.name = "";
        this.editForm1.account = "";
        this.editForm1.people = "";
        this.editForm1.shop = "";
        this.editForm1.type = "";
        this.editForm1.beizhu = "";
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  }
  // mounted: function() {
  //   this.data1.push({
  //     index: this.data1.length + 1,
  //     name: this.$route.params.name,
  //     type: this.$route.params.type
  //   });
  // }
};
</script>
