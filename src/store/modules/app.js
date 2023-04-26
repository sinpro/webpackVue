

export default {
  // namespaced: true, // 模块化局部命名
  state: {
    loading: true,//是否需要loading
    maskLayer: true,//是否需要遮罩层
    
  },
  mutations: {
    setLoading(state, boolean) {
      state.loading = boolean;
    },
    setMaskLayer(state, boolean) {
      state.maskLayer = boolean;
    }
  },
  actions: {
    // getUserMenus(ctx, Vue) {
    //   Vue.$api.getMenus().then((res) => {
    //     const { menuList } = res.data;
    //     ctx.commit('setUserMenus', Object.freeze(menuList)); // 数据太大，需要freeze一下，否则耗性能
    //   });
    // }
  },
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getMaskLayer(state) {
      return state.maskLayer;
    }
  }
};
