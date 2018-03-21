<template>
  <div id="page" class="page">
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside id="aside" :width='width' >
            <div class="page-menubar" ref="menubar">
                <!-- 显示隐藏按钮 -->
                <div style="text-align:center">
                    <el-button v-if="!isCollapse"   icon="el-icon-arrow-left" @click="isDisplay(true)">隐藏</el-button>
                    <el-button v-if="isCollapse"   icon="el-icon-view" @click="isDisplay(false)"></el-button> <!-- 显示 -->
                </div>
                <!-- 左边结构树 -->
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
                                <el-menu-item :index="menu3.id" v-for="menu3 in menu2.children" :key="menu3.id" @click.native="selectHandle(menu3,$event)">{{menu3.name}}</el-menu-item>
                            </el-submenu>
                        </template>
                    </el-submenu>
                </el-menu>
            </div>
          <!-- </div> -->
        </el-aside>
        <!-- 右边主体内容 -->
        <el-main class="main">
            <el-tabs  v-model="activeTabName" type="border-card" @tab-remove="closeTab">
            <el-tab-pane
                v-for="item in tabList"
                :key="item.name"
                :label="item.label"
                :name="item.name"
                :closable="item.closable">
                <component :is="item.component" ></component>
            </el-tab-pane>
        </el-tabs>
        </el-main>
    </el-container>
  </div>
</template>
<script>
//   const home = resolve => require(['@/components/home'], resolve);
  import {mapState, mapMutations} from 'vuex'; // 引入状态管理
  export default {
    name:'index',
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
                        { id: '1-1', name: '访销管理', path:'home'  },
                        { id: '1-2', name: '访销计划', path:'pre'  },
                    ],
                },
            ],
            width: '200px',
        }
    }, 
    mounted(){
        var that = this;
        $('.main').click(function(){
            that.isDisplay(true);
        });
    },
    computed: {
        activeTabName: {
            get() {
                return this.$store.state.navTabs.activeTabName;
            },
            set(value) {
                this.$store.commit('navTabs/setActiveTabName', value);
            }
        },
        ...mapState('navTabs', ['tabList']),
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
        // 是否显示结构树
        isDisplay(val){
            if(val){
                this.isCollapse = true;
                this.width = '65px'
            }else{
                this.isCollapse = false;
                this.width = '200px'
            }
        },
    }
  }
</script>

<style lang="stylus" scoped>
.page{
    height: 100%;
    width: 100%;
    .left{
        position: relative;
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
        padding: 0;
        border: 1px solid #cdecfd;
        overflow auto
        .tabs-content{
            flex: 1;
        }
    }


}

</style>


