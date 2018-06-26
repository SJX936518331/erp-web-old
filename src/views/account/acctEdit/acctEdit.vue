<template>
  <div class="container">
    <h3>添加账户</h3>
    <p style="text-align:left;padding-left:30px;color:gray" @click="returnIndex">返回</p>
    <div style="width:380px;text-align:left;margin-left:30px;">
      <div style="width:60px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>账户名称</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;">
        <Input style="margin:10px;" v-model="name" placeholder="请输入帐户名称"></Input>
      </div>
      <div style="width:60px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>账号</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;">
        <Input style="margin:10px;" v-model="account" placeholder="请输入账号"></Input>
      </div>
      <div style="width:60px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>开户人</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;">
        <Input style="margin:10px;" v-model="people" placeholder="请输入开户人"></Input>
      </div>
      <div style="width:60px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>所属门店</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;">
        <Select style="margin:10px;text-align:left" v-model="dian" placeholder="请选择所属门店">
          <Option value="收入">收入</Option>
          <Option value="支出">支出</Option>
        </Select>
      </div>
      <div style="width:60px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>账户类型</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;">
        <Select style="margin:10px;text-align:left" v-model="type" placeholder="请选择账户类型">
          <Option value="现金">现金</Option>
          <Option value="微信支付">微信支付</Option>
          <Option value="银行卡支付">银行卡支付</Option>
        </Select>
      </div>
      <div style="width:60px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>备注</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;">
        <Input style="margin:10px;" v-model="beizhu" type="textarea" placeholder="请输入备注"></Input>
      </div>
    </div>
    <div style="text-align:right;padding-left:10px;margin:20px 0px;width:160px;">
      <Button type="primary" @click="save">确定</Button>
    </div>
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
export default {
  data() {
    return {
      name: "",
      account: "",
      people: "",
      dian: "",
      type: "",
      beizhu: "",
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
    save() {
      if (
        this.name == "" ||
        this.account == "" ||
        this.people == "" ||
        this.dian == "" ||
        this.type == "" ||
        this.beizhu == ""
      ) {
        alert("请把信息补充完整");
      } else {
        // var name = this.name;
        // var type = this.type;
        this.$router.push({
          name: "acct",
          params: {
            name: this.name,
            type: this.type
          }
        });
        alert("保存成功");
        this.name == "";
        this.type == "";
      }
    },
    returnIndex() {
      this.$router.push({
        name: "acct"
      });
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
    cancel() {
      this.$Message.info("你点击了取消");
    }
  }
};
</script>
