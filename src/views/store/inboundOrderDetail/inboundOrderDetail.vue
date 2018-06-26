<template>
  <div class="container">
    <h3>入库单详情</h3>
    <!-- <can-edit-table refs="table" v-model="data1" :editIncell="true" :columns-list="col"></can-edit-table> -->
    <div style="width:460px;text-align:left;margin-left:30px;">
      <div style="width:150px;text-align:left;display:inline-block;">
        <label>单号:&nbsp;{{this.$route.params.id}}</label>
      </div>
      <div style="width:150px;text-align:left;display:inline-block;height:60px;">
        <label>部门:&nbsp;技术部</label>
      </div>
      <div style="width:150px;text-align:left;display:inline-block;">
        <label>制单人:&nbsp;张三</label>
      </div>
      <div style="width:150px;text-align:left;display:inline-block;height:60px;">
        <label>业务员:&nbsp;张三</label>
      </div>
      <div style="width:150px;text-align:left;display:inline-block;">
        <label>制单日期:&nbsp;{{this.$route.params.date}}</label>
      </div>
      <div style="width:150px;text-align:left;display:inline-block;height:60px;">
        <label>摘要:&nbsp;{{this.$route.params.abstract}}</label>
      </div>
      <div style="width:150px;text-align:left;display:inline-block;">
        <label>入库仓库:&nbsp;{{this.$route.params.callInWarehouse}}</label>
      </div>
      <div style="width:150px;text-align:left;display:inline-block;height:60px;">
        <label>备注:&nbsp;1234</label>
      </div>
    </div>
    <Table style="margin:5px;" :columns="col" :data="data1" ref="table"></Table>
    <p style="float:right;margin-top:-10px;">
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
      col: [
        {
          title: "产品编号",
          key: "id"
        },
        {
          title: "产品名称",
          key: "name"
        },
        {
          title: "出库数量",
          key: "outWarehouseNumber"
        },
        {
          title: "剩余数量",
          key: "surplusNumber"
        },
        {
          title: "备注",
          key: "beizhu"
        }
      ],
      data1: [
        {
          id: "1001",
          name: "红木餐桌",
          outWarehouseNumber: 1,
          surplusNumber: 1,
          beizhu: "123"
        },
        {
          id: "1002",
          name: "普通餐桌",
          outWarehouseNumber: 1,
          surplusNumber:1,
          beizhu: "1234"
        }
      ]
    };
  },
  methods: {
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
