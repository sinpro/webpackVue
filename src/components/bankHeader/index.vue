<template>
	<div class="bank-header">
		<div class="logo clearfix">
			<div class="bank-header-logo">
				logo
			</div>
			<div class="bank-header-search">
				<el-input v-model="input" placeholder="请输入内容"></el-input>
				<el-button disabled>安全中心</el-button>
				<el-button disabled>安全退出</el-button>
				<button v-for="(item,i) in [{name:'中文',key:'sc'},{name:'繁体',key:'tc'},{name:'英文',key:'en'}]" :key="i" @click="sitchLang(item.key)">{{item.name}}</button>
				<p class="cont">{{$t('person.name')}}--{{$t('person.age')}}</p>
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
			
		}
	},
	mounted(){
		
	},
	methods:{
		sitchLang(lang){
			this.$i18n.locale = lang; // 设置当前语言
			window.localStorage.setItem('lang', lang);
		}
	}
}	
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>