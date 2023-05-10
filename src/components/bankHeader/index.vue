<template>
	<div class="bank-header">
		<div class="logo clearfix">
			<div class="bank-header-logo">
				<img src="../../images/image.png" alt="">
			</div>
			<div class="bank-header-search">
				<el-input v-model="input" placeholder="请输入关键字进行搜索" suffix-icon="el-icon-search"></el-input>
				<span class="hover-point">安全中心</span>
				<span class="hover-point">安全退出</span>
			</div>
		</div>
		<div class="nav">
			<navBar></navBar>
		</div>
	</div>
</template>
<script>
import navBar from './navBar';
export default {
  name:'BankHeader',
  components:{
	navBar
  },
	data(){
		return {
			input:'',
		}
	},
	mounted(){
		
	},
	methods:{
		
	}
}	
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>