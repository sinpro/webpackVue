<template>
	<div class="wrap">
		<div class="wrap-cont">
			<button v-for="(item,i) in [{name:'中文',key:'sc'},{name:'繁体',key:'tc'},{name:'英文',key:'en'}]" :key="i" @click="sitchLang(item.key)">{{item.name}}</button>
			<p class="cont">{{$t('person.name')}}--{{$t('person.age')}}</p>
		</div>
	</div>
</template>
<script>
export default {
  name:'BankHeader',
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