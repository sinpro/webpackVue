<template>
	<div class="wrap">
		<div class="wrap-cont">
			<el-select v-model="value" placeholder="请选择" @change="sitchLang">
					<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
				<p class="cont">{{$t('person.name')}}--{{$t('person.age')}}</p>
		</div>
	</div>
</template>
<script>
export default {
    name:'Home',
	data(){return {
			input:'',
			options:[{label:'中文',value:'sc'},{label:'繁体',value:'tc'},{label:'英文',value:'en'}],
			value:window.localStorage.getItem('lang')||'sc'
		}
	},
	mounted(){
		
	},
	methods:{
		sitchLang(lang){
			this.$i18n.locale = lang; // 设置当前语言
			window.localStorage.setItem('lang', lang);
			window.localStorage.setItem(this.value, lang);
		}
	}
}	
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>