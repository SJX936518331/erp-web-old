<template>
  <div class="container">
    <h3>供应商</h3>
    <div class="margin-left-10 margin-top-20" style="text-align:left;">
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
      <Button style="margin:0px 10px 20px 20px;" @click="test" type="primary">添加供应商</Button>
      <Button style="margin:0px 10px 20px 20px;" type="primary" size="large" @click="exportExcel">导出表格数据</Button>
      <!-- <Button style="margin:0px 10px 20px 20px;" type="primary" size="large" @click="getDepartment">调用接口</Button> -->
    </div>
    <Modal v-model="modal" title="添加商品" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validateForm">
        <FormItem label="单位编号" prop="id">
          <Input v-model="editForm.id" placeholder="请输入商品编号"></Input>
        </FormItem>
        <FormItem label="单位名称" prop="name">
          <Input v-model="editForm.name" placeholder="请输入商品名称"></Input>
        </FormItem>
        <FormItem label="联系人姓名" prop="p_name">
          <Input v-model="editForm.p_name" placeholder="请输入数量"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phoneNumber">
          <Input v-model="editForm.phoneNumber" placeholder="请输入单价"></Input>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm.beizhu" type="textarea" placeholder="请输入备注"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- <can-edit-table refs="table" v-model="data1" :editIncell="true" :columns-list="col"></can-edit-table> -->
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
// import canEditTable from "./components/canEditTable.vue";
import axios from "axios";
export default {
  // components: {
  //   canEditTable
  // },
  data() {
    return {
      modal: false,
      excelFileName: "123",
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
      editForm: {
        id: "",
        name: "",
        p_name: "",
        phoneNumber: "",
        beizhu: ""
      },
      validateForm: {
        id: [
          {
            required: true,
            message: "单位编号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "单位名称不能为空",
            trigger: "blur"
          }
        ],
        p_name: [
          {
            required: true,
            message: "联系人姓名不能为空",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: "手机号不能为空",
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
      col: [
        {
          title: "单位编号",
          key: "id"
        },
        {
          title: "单位名称",
          key: "name"
        },
        {
          title: "联系人姓名",
          key: "p_name"
        },
        {
          title: "手机号",
          key: "phoneNumber"
        },
        {
          title: "备注",
          key: "beizhu"
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
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editForm.id = this.data1[params.index].id;
                      this.editForm.name = this.data1[params.index].name;
                      this.editForm.p_name = this.data1[params.index].p_name;
                      this.editForm.phoneNumber = this.data1[
                        params.index
                      ].phoneNumber;
                      this.editForm.beizhu = this.data1[params.index].beizhu;
                      this.show();
                      Cookies.set("index", params.index);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      if (this.data1.length >= 2) {
                        this.data1.splice(params.index, 1);
                        this.$Modal.info({
                          title: "提示信息",
                          content: "删除成功"
                        });
                      } else {
                        this.$Modal.info({
                          title: "提示信息",
                          content: "还剩一条数据了,你确定还要删除吗？"
                        });
                      }
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
          id: "A1",
          name: "红木供应商",
          p_name: "张三",
          phoneNumber: "15602221234",
          beizhu: ""
        },
        {
          id: "A2",
          name: "其它供应商",
          p_name: "李四",
          phoneNumber: "15602221235",
          beizhu: ""
        }
      ]
    };
  },
  methods: {
    test() {
      this.$router.push({
        name: "supplierEdit"
      });
    },
    show() {
      this.modal = true;
    },
    ok() {
      var index = Cookies.get("index");
      if (
        this.editForm.id == "" ||
        this.editForm.name == "" ||
        this.editForm.p_name == "" ||
        this.editForm.phoneNumber == "" ||
        this.editForm.beizhu == ""
      ) {
        this.$Modal.info({
          title: "提示信息",
          content: "请把信息补充完整"
        });
      } else {
        this.data1[index].id = this.editForm.id;
        this.data1[index].name = this.editForm.name;
        this.data1[index].p_name = this.editForm.p_name;
        this.data1[index].phoneNumber = this.editForm.phoneNumber;
        this.data1[index].beizhu = this.editForm.beizhu;
        this.$Modal.info({
          title: "提示信息",
          content: "编辑成功"
        });
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    },
    // getDepartment() {
    //   this.$http.get("/department/all").then(
    //     response => {
    //       let data = response.data;
    //       this.data1 = data.data;
    //       // for (var i = 0; i < this.data1.length; i++) {
    //       //   console.log(this.data1[i].name);
    //       // }
    //       console.log(this.data1);
    //     },
    //     response => {
    //       console.log(response);
    //     }
    //   );
    // },
    exportExcel() {
      table2excel.transform(
        this.$refs.table,
        "hrefToExportTable",
        this.excelFileName
      );
    }
  }
};
</script>
