<template>
  <div class="container">
    <h3>供应商编辑</h3>
    <div>
      <p style="text-align:left;color:black;padding:10px;">联系人信息</p>
      <div style="text-align:left;margin:10px 0px 0px 55px;">
        <label>名称:</label>
        <Form style="display:inline-block;width:400px;" ref="editForm" :model="editForm" :rules="validateForm">
          <FormItem prop="name">
            <Input v-model="editForm.name" placeholder="请输入名称"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:0px 0px 0px 55px;">
        <label>编号:</label>
        <Form style="display:inline-block;width:400px;" ref="editForm" :model="editForm" :rules="validateForm">
          <FormItem prop="id">
            <Input v-model="editForm.id" placeholder="请输入编写"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:0px 0px 0px 20px;">
        <label>联系人姓名:</label>
        <Form style="display:inline-block;width:400px;" ref="editForm" :model="editForm" :rules="validateForm">
          <FormItem prop="p_name">
            <Input v-model="editForm.p_name" placeholder="请输入联系人姓名"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:0px 0px 0px 42px;">
        <label>手机号:</label>
        <Form style="display:inline-block;width:400px;" ref="editForm" :model="editForm" :rules="validateForm">
          <FormItem prop="phoneNumber">
            <Input v-model="editForm.phoneNumber" placeholder="请输入手机号"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:0px 0px 0px 30px;">
        <label>证件类型:</label>
        <Form style="display:inline-block;width:400px;" ref="editForm" :model="editForm" :rules="validateForm">
          <FormItem prop="type">
            <Select style="text-align:left" v-model="editForm.type" placeholder="请选择证件类型">
              <Option value="">请选择</Option>
              <Option value="身份证">身份证</Option>
              <Option value="军人证">军人证</Option>
              <Option value="学生证">学生证</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:0px 0px 0px 30px;">
        <label>证件号码:</label>
        <Form style="display:inline-block;width:400px;" ref="editForm" :model="editForm" :rules="validateForm">
          <FormItem prop="certificatesNumber">
            <Input v-model="editForm.certificatesNumber" placeholder="请输入证件号码"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:0px 0px 0px 53px;">
        <label>邮箱:</label>
        <Form style="display:inline-block;width:400px;" ref="editForm" :model="editForm" :rules="validateForm">
          <FormItem prop="email">
            <Input v-model="editForm.email" placeholder="请输入邮箱"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:0px 0px 0px 53px;">
        <label>地址:</label>
        <Form style="display:inline-block;width:400px;" ref="editForm" :model="editForm" :rules="validateForm">
          <FormItem prop="address">
            <Input v-model="editForm.address" placeholder="请输入地址"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:0px 0px 0px 50px;">
        <label>备注:</label>
        <Form style="display:inline-block;width:400px;" ref="editForm" :model="editForm" :rules="validateForm">
          <FormItem prop="beizhu">Receipt list
            <Input v-model="editForm.beizhu" type="textarea" placeholder="请输入备注"></Input>
          </FormItem>
        </Form>
      </div>
      <p style="text-align:left;color:black;padding:10px;">银行账户信息</p>
      <div style="text-align:left;margin:10px 0px 0px 25px;">
        <label>银行账户:</label>
        <Form style="display:inline-block;width:400px;" ref="editForm" :model="editForm" :rules="validateForm">
          <FormItem prop="account">
            <Input v-model="editForm.account" placeholder="请输入银行账户"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:0px 0px 0px 25px;">
        <label>银行账号:</label>
        <Form style="display:inline-block;width:400px;" ref="editForm" :model="editForm" :rules="validateForm">
          <FormItem prop="account_n">
            <Input v-model="editForm.account_n" placeholder="请输入银行账号"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:0px 0px 0px 35px;">
        <label>开户行:</label>
        <Form style="display:inline-block;width:400px;" ref="editForm" :model="editForm" :rules="validateForm">
          <FormItem prop="bank">
            <Input v-model="editForm.bank" placeholder="请输入开户行"></Input>
          </FormItem>
        </Form>
      </div>
    </div>
    <p style="text-align:left;padding-left:30px;">
      <Button style="margin:10px 0px;" type="primary" @click="save">保存</Button>
      <Button style="margin:10px 0px;" type="primary" @click="cancel">取消</Button>
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
  /* position: absolute;
  bottom: 0px;
  left: 0px; */
  float: right;
  bottom: 0px;
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
      editForm: {
        name: "",
        id: "",
        p_name: null,
        phoneNumber: null,
        type: null,
        certificatesNumber: "",
        email: "",
        address: "",
        beizhu: "",
        account: "",
        account_n: "",
        bank: ""
      },
      validateForm: {
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur"
          }
        ],
        id: [
          {
            required: true,
            message: "编号不能为空",
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
            message: "电话号码不能为空",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "证件类型不能为空",
            trigger: "blur"
          }
        ],
        certificatesNumber: [
          {
            required: true,
            message: "证件号码不能为空",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur"
          }
        ],
        beizhu: [
          {
            required: true,
            message: "备注不能为空",
            trigger: "blur"
          }
        ],
        account: [
          {
            required: true,
            message: "账户不能为空",
            trigger: "blur"
          }
        ],
        account_n: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        bank: [
          {
            required: true,
            message: "开户行不能为空",
            trigger: "blur"
          }
        ]
      },
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
      }
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
    save() {
      if (
        this.editForm.name == "" ||
        this.editForm.id == "" ||
        this.editForm.p_name == "" ||
        this.editForm.phoneNumber == "" ||
        this.editForm.type == "" ||
        this.editForm.certificatesNumber == "" ||
        this.editForm.email == "" ||
        this.editForm.address == ""||
        this.editForm.beizhu==""||
        this.editForm.account==""||
        this.editForm.account_n==""||
        this.editForm.bank==""
      ) {
        this.$Modal.info({
          title: "提示信息",
          content: "请把信息补充完整后，再次点击此按钮"
        });
      } else {
        this.$Modal.info({
          title: "提示信息",
          content: "保存成功"
        });
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  },
  // mounted: function() {
  //   this.moneyCount();
  // }
};
</script>
