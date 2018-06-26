
<template>
  <div class="container">
    <h3 style="display:inline-block;font-size:22px;color:black;">公司信息</h3>
    <div style="width:380px;text-align:left;margin-left:30px;">
      <div style="width:70px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>公司名称</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;height:60px;">
        <Form ref="companyForm" :model="companyForm" :rules="validate">
          <FormItem prop="name">
            <Input style="margin:10px;" v-model="companyForm.name" placeholder="请输入公司名称"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="width:50px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>Logo</label>
      </div>
      <div style="width:300px;text-align:left;display:inline-block;padding-left:30px;">
        <img style="width:100px;height:100px;margin-top:10px;" src="https://i.loli.net/2017/08/21/599a521472424.jpg">
      </div>
      <div style="width:70px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>联系人</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;height:60px;">
        <Form ref="companyForm" :model="companyForm" :rules="validate" style="margin:0px;padding:0px;">
          <FormItem prop="people">
            <Input style="margin:10px;" v-model="companyForm.people" placeholder="请输入公司名称"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="width:70px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>联系人邮箱</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;height:60px;">
        <Form ref="companyForm" :model="companyForm" :rules="validate" style="margin:0px;padding:0px;">
          <FormItem prop="email">
            <Input style="margin:10px;" v-model="companyForm.email" placeholder="请输入公司名称"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="width:70px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>办公地址</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;height:60px;">
        <Form ref="companyForm" :model="companyForm" :rules="validate" style="margin:0px;padding:0px;">
          <FormItem prop="address">
            <Input style="margin:10px;" v-model="companyForm.address" placeholder="请输入公司名称"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="width:50px;text-align:left;display:inline-block;">
      </div>
      <div style="width:300px;text-align:left;display:inline-block;padding-left:30px;padding-top:10px;">
        <Button @click="save" type="primary">保存</Button>
        <div style="display:none;margin-left:10px;" ref="export">
          <Button type="primary" size="large" @click="exportExcel">导出表格数据</Button>
          <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
        </div>
      </div>
    </div>
    <Modal v-model="modal" title="修改信息" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="公司名称" prop="name">
          <Input v-model="editForm.name" placeholder="请输入公司名称"></Input>
        </FormItem>
        <FormItem label="联系人" prop="people">
          <Input v-model="editForm.people" placeholder="请输入联系人"></Input>
        </FormItem>
        <FormItem label="联系人邮箱" prop="email">
          <Input v-model="editForm.email" placeholder="请输入联系人邮箱"></Input>
        </FormItem>
        <FormItem label="办公地址" prop="address">
          <Input v-model="editForm.address" placeholder="请输入办公地址"></Input>
        </FormItem>
      </Form>
    </Modal>
    <div ref="a" style="display:none;margin-top:10px;">
      <Table style="margin:5px;" ref="tb" :columns="col" :data="data1"></Table>
    </div>
    <div class="foot">
      <p>粤Icp备:14276767号 @个人版权所有，侵权必定追究</p>
    </div>
  </div>
</template>
<style>
.container {
  width: 100%;
  text-align: center;
}
.content {
  margin-left: -80px;
  width: 500px;
  text-align: right;
  color: rgb(105, 101, 101);
}
.content Form label {
  font-size: 18px;
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;
}
.content Form input {
  width: 300px;
  border: 1px solid rgb(214, 214, 214);
  margin-top: 15px;
  border-radius: 5px;
  height: 30px;
  text-indent: 5px;
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
      modal: false,
      excelFileName: "",
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
        name: "",
        people: "",
        email: "",
        address: ""
      },
      companyForm: {
        name: "",
        people: "",
        email: "",
        address: ""
      },
      validate: {
        name: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "blur"
          }
        ],
        people: [
          {
            required: true,
            message: "联系人不能为空",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "联系人邮箱不能为空",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "办公地址不能为空",
            trigger: "blur"
          }
        ]
      },
      col: [
        {
          title: "序号",
          key: "index"
        },
        {
          title: "公司名称",
          key: "name"
        },
        {
          title: "联系人",
          key: "people"
        },
        {
          title: "联系人邮箱",
          key: "email"
        },
        {
          title: "办公地址",
          key: "address"
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
                      this.editForm.people = this.data1[data_index].people;
                      this.editForm.email = this.data1[data_index].email;
                      this.editForm.address = this.data1[data_index].address;
                      this.test();
                      Cookies.set("dataIndex", data_index);
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
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: []
    };
  },
  methods: {
    test() {
      this.modal = true;
    },
    exportExcel() {
      table2excel.transform(
        this.$refs.tb,
        "hrefToExportTable",
        this.excelFileName
      );
    },
    save() {
      if (
        this.companyForm.name == "" ||
        this.companyForm.people == "" ||
        this.companyForm.email == "" ||
        this.companyForm.address == ""
      ) {
        this.$Modal.info({
          title: "提示信息",
          content: "请把数据补充完整。"
        });
      } else {
        this.$Modal.info({
          title: "提示信息",
          content: "保存成功。"
        });
        this.$refs.a.style.display = "block";
        this.$refs.export.style.display = "inline-block";
        this.data1.push({
          index: this.data1.length + 1,
          name: this.companyForm.name,
          people: this.companyForm.people,
          email: this.companyForm.email,
          address: this.companyForm.address
        });
      }
    },
    ok() {
      if (
        this.editForm.name == "" ||
        this.editForm.people == "" ||
        this.editForm.email == "" ||
        this.editForm.address == ""
      ) {
        this.$Message.info("请把信息补充完整");
      } else {
        var dataIndex = Cookies.get("dataIndex");
        this.data1[dataIndex].name = this.editForm.name;
        this.data1[dataIndex].people = this.editForm.people;
        this.data1[dataIndex].email = this.editForm.email;
        this.data1[dataIndex].address = this.editForm.address;
        this.$Message.info("修改成功");
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  }
};
</script>
