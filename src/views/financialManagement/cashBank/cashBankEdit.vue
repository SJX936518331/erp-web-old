<template>
    <div>
        <Card>
            <p slot="title">
                现金银行编辑
            </p>
            <div>
                <Form ref="form" :model="bank" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="银行名称" prop="name">
                        <Input v-model="bank.name" placeholder="请输入银行名称"></Input>
                    </FormItem>
                    <FormItem label="账户编号" prop="account_id">
                        <Input v-model="bank.account_id" type="textarea" placeholder="请输入账户编号"></Input>
                    </FormItem>
                    <FormItem label="账户名称" prop="account">
                        <Input v-model="bank.account" placeholder="请输入账户"></Input>
                    </FormItem>
                    <FormItem label="期初金额" prop="opening_balance">
                        <Input v-model="bank.opening_balance" placeholder="请输入期初金额"></Input>
                    </FormItem>
                    <FormItem label="期末金额" prop="ending_balance">
                        <Input v-model="bank.ending_balance" placeholder="请输入期末金额"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      bank: {},
      validate: {
        name: [
          {
            required: true,
            message: "银行名称不能为空",
            trigger: "blur"
          }
        ],
        account_id: [
          {
            required: true,
            message: "账户编号不能为空",
            trigger: "blur"
          }
        ],
        account: [
          {
            required: true,
            message: "账户名称不能为空",
            trigger: "blur"
          }
        ],
        opening_balance: [
          {
            required: true,
            message: "期初金额不能为空",
            trigger: "blur"
          }
        ],
        ending_balance: [
          {
            required: true,
            message: "期末金额不能为空",
            trigger: "blur"
          }
        ]
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.bankId = this.$route.params.id;
      if (!this.bankId) {
        return;
      }
      this.$http.get("/bank/detail?id=" + this.bankId).then(
        response => {
          let data = response.data;
          this.bank = data.data;
          console.log(this.bank);
        },
        response => {
          console.log(response);
        }
      );
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          this.$Message.error("请完善表单");
          return;
        }
        let url = this.bankId ? "/bank/update" : "/bank/add";
        this.$http.post(url, this.bank).then(
          response => {
            this.$Message.success("保存成功");
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      });
    },
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