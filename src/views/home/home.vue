<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <div style="text-align:center;">
            <h3 style="display:inline-block;font-size:22px;">伍氏大观园</h3>
            <p style="padding:10px 0px 10px 20px;text-align:left;color:black;font-size:18px;">当前用户:
                <span style="color:gray;font-size:20px;">{{userName}}</span>
            </p>
            <p style="padding:10px 0px 10px 20px;text-align:left;color:black;font-size:18px;">登录权限:
                <span style="color:gray;font-size:20px;">{{type}}</span>
            </p>
            <p style="padding:10px 0px 10px 20px;text-align:left;color:black;font-size:18px;">登录时间:
                <span style="color:gray;font-size:20px;">{{time}}</span>
            </p>
        </div>
        <div>
            <p style="text-align:left;font-size:22px;color:black;padding:10px 0px 10px 20px;font-weight: bold;">门店管理</p>
            <div>
                <ul style="list-style:none;">
                    <li style="display:inline-block; background-color:rgb(228, 117, 102);height:80px;width:80px;margin-left:10px;border-radius:5px;" @click="renshi">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="person"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">客户管理</span>
                        </p>
                    </li>
                    <li style="display:inline-block;background-color:rgb(228, 117, 102);height:80px;width:80px;border-radius:5px;" @click="dingdan">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="navicon-round"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">订单列表</span>
                        </p>
                    </li>
                    <li style="display:inline-block; background-color:rgb(228, 117, 102);height:80px;width:80px;border-radius:5px;" @click="repair">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="wrench"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">维修</span>
                        </p>
                    </li>
                    <li style="display:inline-block; background-color:rgb(228, 117, 102);height:80px;width:80px;border-radius:5px;" @click="returnGoods">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="wrench"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">退货</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <p style="text-align:left;font-size:22px;color:black;padding:10px 0px 10px 20px;font-weight: bold;">商品</p>
            <div>
                <ul style="list-style:none;">
                    <li style="display:inline-block; background-color: rgb(224, 130, 87);height:80px;width:80px;margin-left:10px;border-radius:5px;" @click="shop">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="navicon-round"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">商品列表</span>
                        </p>
                    </li>
                    <li style="display:inline-block;background-color: rgb(224, 130, 87);height:80px;width:80px;border-radius:5px;" @click="shop">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="ios-cart"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">购物清单</span>
                        </p>
                    </li>
                    <li style="display:inline-block;background-color: rgb(224, 130, 87);height:80px;width:80px;border-radius:5px;" @click="statistics">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="stats-bars"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">销售统计</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <p style="text-align:left;font-size:22px;color:black;padding:10px 0px 10px 20px;width:200px;font-weight: bold;">库存管理</p>
            <div>
                <ul style="list-style:none;">
                    <li style="display:inline-block; background-color: rgb(103, 187, 255);height:80px;width:80px;margin-left:10px;border-radius:5px;" @click="wh">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="clipboard"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">入库</span>
                        </p>
                    </li>
                    <li style="display:inline-block;background-color: rgb(103, 187, 255);height:80px;width:80px;border-radius:5px;" @click="ob">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="paper-airplane"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">出库</span>
                        </p>
                    </li>
                    <li style="display:inline-block; background-color: rgb(103, 187, 255);height:80px;width:80px;border-radius:5px;" @click="al">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="arrow-swap"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">调拨</span>
                        </p>
                    </li>
                    <li style="display:inline-block; background-color: rgb(103, 187, 255);height:80px;width:80px;border-radius:5px;" @click="search">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="android-search"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">库存查询</span>
                        </p>
                    </li>
                    <li style="display:inline-block; background-color: rgb(103, 187, 255);height:80px;width:80px;border-radius:5px;" @click="warehouse">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="clock"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">入库单</span>
                        </p>
                    </li>
                    <li style="display:inline-block; background-color: rgb(103, 187, 255);height:80px;width:80px;border-radius:5px;" @click="outbound">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="clock"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">出库单</span>
                        </p>
                    </li>
                    <li style="display:inline-block; background-color: rgb(103, 187, 255);height:80px;width:80px;border-radius:5px;" @click="allocation">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="clock"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">调拨单</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <p style="text-align:left;font-size:22px;color:black;padding:10px 0px 10px 20px;width:200px;font-weight: bold;">跟单管理</p>
            <div>
                <ul style="list-style:none;">
                    <li style="display:inline-block; background-color:#cd85f7;height:80px;width:80px;margin-left:10px;border-radius:5px;" @click="dingdan">
                        <p style="text-align:center;padding-top:10px;">
                            <span slot="prepend">
                                <Icon style="color:white;" :size="30" type="navicon-round"></Icon>
                            </span>
                        </p>
                        <p style="text-align:center;">
                            <span style="color:white;font-size:18px;">订单列表</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style>
/* div{background-color: #cd85f7} */
</style>

<script>
import Cookies from "js-cookie";

export default {
  name: "home",
  data() {
    return {
      userName: Cookies.get("user"),
      type: Cookies.get("type"),
      time:
        new Date().getFullYear() +
        "年" +
        (new Date().getMonth() + 1) +
        "月" +
        new Date().getDate() +
        "日" +
        new Date().getHours() +
        "时" +
        new Date().getMinutes() +
        "分" +
        new Date().getSeconds() +
        "秒"
    };
  },
  methods: {
    renshi() {
      this.$router.push({
        name: "renshi"
      });
    },
    dingdan() {
      this.$router.push({
        name: "dingdan"
      });
    },
    repair() {
      this.$router.push({
        name: "repair"
      });
    },
    returnGoods() {
      this.$router.push({
        name: "return"
      });
    },
    shop() {
      this.$router.push({
        name: "shop"
      });
    },
    statistics() {
      this.$router.push({
        name: "statistics"
      });
    },
    wh() {
      this.$router.push({
        name: "wh"
      });
    },
    warehouse() {
      this.$router.push({
        name: "warehouse"
      });
    },
    ob() {
      this.$router.push({
        name: "ob"
      });
    },
    outbound() {
      this.$router.push({
        name: "outbound"
      });
    },
    al() {
      this.$router.push({
        name: "al"
      });
    },
    allocation() {
      this.$router.push({
        name: "allocation"
      });
    },
    search() {
      this.$Modal.info({
        title: "提示信息",
        content: "该功能正在开发中...."
      });
    }
  }
};
</script>
