<template>
  <div id="page" class="page">
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside id="aside" :width='width' >
            <div class="page-menubar" ref="menubar">
                <div style="text-align:center">
                    <el-button v-if="!isCollapse"   icon="el-icon-arrow-left" @click="isDisplay(true)">隐藏</el-button>
                    <el-button v-if="isCollapse"   icon="el-icon-view" @click="isDisplay(false)"></el-button> <!-- 显示 -->
                </div>
                <el-menu default-active="1-1" class="el-menu-vertical" :collapse="isCollapse"
                          :unique-opened="true"    active-text-color="#666">
                    <el-submenu :index="menu1.id" v-for="menu1 in menuList" :key="menu1.id" >
                        <template slot="title">
                            <i :class="menu1.icon"></i>
                            <span slot="title">{{menu1.name}}</span>
                        </template>
                        <template v-for="menu2 in menu1.children" >
                            <el-menu-item v-if="!menu2.children" :index="menu2.id" :key="menu2.id" @click.native="selectHandle(menu2,$event)">
                                {{menu2.name}}
                            </el-menu-item>
                            <el-submenu v-else :key="menu2.id" >
                                <span slot="title">{{menu2.name}}</span>
                                <el-menu-item :index="menu3.id" v-for="     menu3 in menu2.children" :key="menu3.id" @click.native="selectHandle(menu3,$event)">{{menu3.name}}</el-menu-item>
                            </el-submenu>
                        </template>
                    </el-submenu>
                </el-menu>
            </div>
          <!-- </div> -->
        </el-aside>

        <el-main>
          <!-- <el-container class="right"> -->
              <el-main class="main">
                  <el-tabs v-model="activeTabName" type="border-card">
                    <el-tab-pane
                        v-for="(item, index) in tabList"
                        :key="item.name"
                        :label="item.label"
                        :name="item.name"
                        :closable="item.closable"
                    >
                        <component :is="item.component"></component>
                    </el-tab-pane>
                </el-tabs>
              </el-main>
          <!-- </el-container> -->
      </el-main>
    </el-container>
  </div>
</template>
<script>
  // import fxgl from './Promotions/PromotionSaleManage' // 访销计划管理
  // import fygl from './Promotions/CostManage' // 陈列费用管理
  // import fysq from './Promotions/CostRequest' // 陈列费用申请
  // import fydf from './Promotions/CostPay' // 生成陈列兑付
  // import jdgl from './Promotions/StoreOpration' // 进店操作管理
  // import kqwh from './Promotions/CustomerHold' // 客情维护
  // import qdgl from './Promotions/SignInManage' // 签到管理
  import {mapState, mapMutations} from 'vuex'; // 引入状态管理
  export default {
    components:{ //
      // 'fxgl': fxgl, //访销计划管理 
      // 'fygl': fygl, //陈列费用管理 
      // 'fysq': fysq, //陈列费用申请 
      // 'fydf': fydf, //生成陈列兑付 
      // 'jdgl': jdgl, //进店操作管理 
      // 'kqwh': kqwh, //客情维护 
      // 'qdgl': qdgl, //签到管理 
    },
    data() {
        return {
            isCollapse: false,
            index: 1,
            menuList: [
                {
                    id: '1',
                    icon: 'el-icon-tickets',
                    name: '访销计划',
                    children: [
                        { id: '1-1', name: '访销管理',path:'/home'  },
                    ],
                },
                // {
                //     id: '2',
                //     icon: 'el-icon-document',
                //     name: '陈列费用',
                //     children: [
                //         { id: '2-1', name: '陈列费用管理', },
                //         { id: '2-2', name: '陈列费用申请',  },
                //         { id: '2-3', name: '生成陈列费用兑付',},
                //     ],
                // },
                // {
                //     id: '3',
                //     icon: 'el-icon-setting',
                //     name: '进店操作',
                //     children: [
                //         { id: '3-1',  name: '进店操作管理',  },
                //         { id: '3-2',  name: '客情维护',},
                //     ],
                // },
                // {
                //     id: '4',
                //     icon: 'el-icon-edit-outline',
                //     name: '签到',
                //     children: [
                //         { id: '4-1', name: '签到管理', },
                //     ],
                // },
            ],
          component:'fxgl',//组件
        //   activeTabName:'',
          width: '200px',
          label:'访销管理',
        }
    }, 
    mounted(){
    var that = this;
     $('.main').click(function(){
         that.isDisplay(true);
     });
     console.log(that);
    },
    computed: {
        activeTabName: {
            get() {
                return this.$store.state.navTabs.activeTabName;
            },
            set(value) {
                console.log(125,value);
                this.$store.commit('navTabs/setActiveTabName', value);
            }
        },
        ...mapState('navTabs', ['tabList'])
    },
    methods:{
    // 展开方法
    ...mapMutations('navTabs', ['closeTab', 'addTab']),
    // 新增标签
    selectHandle(tab) {
        this.addTab({
            label: tab.name,
            name: tab.path,
            src: tab.path
        });
    },
    isDisplay(val){
        console.log(this);
        if(val){
            this.isCollapse = true;
            // $('#aside').css('background','red');
            this.width = '65px'
        }else{
            this.isCollapse = false;
            // $('#aside').css('width','50px');
            this.width = '200px'
        }
    },
    //   selectHandle(val) {
    //     console.log(val);
    //     if(val.name == "访销管理"){
    //         // this.component = 'fxgl'; //访销计划管理 
    //     } else if(val.name == '陈列费用管理'){
    //         this.component = 'fygl'; //陈列费用管理 
    //     } else if(val.name == '陈列费用申请'){
    //         this.component = 'fysq'; //陈列费用申请 
    //     } else if(val.name == '生成陈列费用兑付'){
    //         this.component = 'fydf'; //生成陈列兑付 
    //     } else if(val.name == '进店操作管理'){
    //         this.component = 'jdgl'; //进店操作管理 
    //     } else if(val.name == '客情维护'){
    //         this.component = 'kqwh'; //客情维护 
    //     } else if(val.name == '签到管理'){
    //         this.component = 'qdgl'; //签到管理 
    //     } 
    //     this.label = val.name
    //     console.log('comp',this.component)
    //   },
    }
  }
</script>
<style lang="stylus" scoped>
.page{
    height: 100%;
    width: 100%;
    .left{
        position: relative;
        // max-width: 200px;
        .active{
            border-bottom: 2px solid rgba(0,0,0,.15);
            i{
                right: 20px;
            }
        }
        .page-menubar{
            overflow hidden
            overflow-y auto
            .el-menu{
                border-right none
                .el-menu-item{
                    height: 40px;
                    line-height: 40px;
                }
                .el-menu-item, .el-submenu{
                    .iconfont{
                        margin-right: 5px;
                        width: 24px;
                        text-align: center;
                        font-size: 18px;
                        vertical-align: middle;
                    }
                }
            }
        }


    }
    .el-aside {
      flex-shrink: 0;    
    }
    .el-main{
        // display: flex;
        // flex-direction: column;
        padding: 0;
        border: 1px solid #cdecfd;
        overflow auto

        >div{
        }

        .tabs-content{
            flex: 1;
        }
    }


}

</style>


