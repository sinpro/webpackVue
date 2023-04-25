<template>
	<div>
		<h1>webpack@4.0+vue框架</h1>
	</div>
</template>
<script>
export default {
	data(){
		return {
			
		}
	},
	mounted(){
		if(process.env.NODE_ENV==='development'){
			window.app=this;
		}
		console.log(process.env.NODE_ENV)
		console.log(ENV_CONFIG)
	},
}	
</script>
<style lang="scss" scoped>
	
</style>
