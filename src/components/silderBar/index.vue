<template>
  <div class="slider">
    <!-- <el-row class="tac">
      <el-col :span="24"> -->
        <el-menu
          :default-active="activeIndex"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu v-for="item in barData" :key="item.id" :index="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="items in item.child"
              :key="items.id"
              :index="items.id"
              >{{ items.title }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      <!-- </el-col>
    </el-row> -->
  </div>
</template>
<script>
export default {
  name: 'SilderBar',
  data() {
    return {
      activeIndex: '0-0',
      barData: [
        {
          id: '0',
          title: '外币兑换',
          icon: 'el-icon-s-ticket',
          child: [
            { id: '0-0', title: '外币兑换子级1' },
            { id: '0-1', title: '外币兑换子级2' },
            { id: '0-2', title: '外币兑换子级3' },
            { id: '0-3', title: '外币兑换子级4' },
            { id: '0-4', title: '外币兑换子级5' }
          ]
        },
        {
          id: '1',
          title: '外币牌价查询',
          icon: 'el-icon-search',
          child: [
            { id: '1-0', title: '外币牌价查询子级1' },
            { id: '1-1', title: '外币牌价查询子级2' }
          ]
        }
      ]
    };
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
