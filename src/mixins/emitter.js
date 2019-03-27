function broadcast(compName, evtName, param) {
  let children = this.$children || [];
  children.forEach(child => {
    if (child.$options.name === compName) {
      child.$emit(evtName, param);
    } else {
      broadcast.call(child, compName, evtName, param);
    }
  });
}

export default {
  methods: {
    // 子组件 =>通知 => 最近一个父组件
    dispatch(compName, evtName, param) {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parent && (!parentName || parentName !== compName)) {
        parent = parent.$parent;
        if (parent) parentName = parent.$options.name;
      }
      parent && parent.$emit(evtName, param);
    },

    // 父组件 =>通知 => 子组件
    broadcast(compName, evtName, param) {
      broadcast.call(this, compName, evtName, param);
    }
  }
};
