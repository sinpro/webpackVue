<template>
	<div class="bank-main">
		<!-- 侧边栏 -->
		<div class="bank-main-silder">
			<silderBar></silderBar>
		</div>
		<div class="bank-main-content">
			<!-- 面包屑 -->
			<div class="breadCrumb">
				<breadCrumb></breadCrumb>
			</div>
			<!-- 内容区 -->
			<div class="cont">
				<router-view></router-view>
			</div>
		</div>
		
	</div>
</template>
<script>
import silderBar from '../silderBar';
import breadCrumb from './breadCrumb';
export default {
  name:'BankMain',
  components: {
	silderBar,
	breadCrumb
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
@import './index.scss';
</style>