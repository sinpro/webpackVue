<template>
    <div class="navBar">
      <ul class="clearfix">
        <li v-for="(item,i) in [1,2,3,4,5,6,7,8,9]" :key="i">{{`${'菜单'+item}`}}</li>
      </ul>
    </div>
</template>
<script>
export default {
  name: 'NavBar',
   components: {
    
  },
  data() {
    return{}
  },
  computed: {
    
  },
}
</script>
<style scoped lang="scss">
.navBar{
    // background-color:chartreuse;
    // width: 100%;
    height: 35px;
    ul{
        li{
            float: left;
            width: 60px;
            margin-right: 10px;
            line-height: 20px;
            cursor: pointer;
        }
        li:hover{
            color: red;
        }
    }
}
</style>
