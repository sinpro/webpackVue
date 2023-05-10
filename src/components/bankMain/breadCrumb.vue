<template>
	<div class="breadCrumb">
        <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">外币兑换</el-breadcrumb-item>
			<!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
			<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			<el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
			</el-breadcrumb>
	</div>
</template>
<script>
export default {
  name:'BreadCrumb',
  components: {
	
  },
	data(){
		return {
			
		}
	},
	mounted(){
		
	},
}	
</script>
<style lang="scss" scoped>
.breadCrumb{
    // background: #d9c0c0;
    padding: 8px 10px;
}
</style>