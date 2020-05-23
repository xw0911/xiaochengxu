// components/tree/tree.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tree: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    treeData: [],
  },

  
  onLoad: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toggle: function (e) {
      const id = e.currentTarget.dataset.id;
      const isFolder = e.currentTarget.dataset.isfolder;
      if (isFolder) {
        const treeData = this._findChild(id, this.data.tree);
        this.setData({
          tree: treeData
        })
      } 
    },
    _findChild: function (id, arr) {
      const that = this;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].productPcID == id) {
          arr[i].isOpen = !arr[i].isOpen;
          break;
        }
        if (arr[i].childrenList && arr[i].childrenList.length > 0) {
          that._findChild(id, arr[i].childrenList)
        }
      }
      return arr;
    },

    checkedData:function(id, arr){
      var that = this;
      for (let i = 0; i < arr.length; i++) {
        if(id == arr[i].productPcID){
          arr[i].isCheck = !arr[i].isCheck;
          arr[i].isOpen = true;
          break;
        }else{
          if(arr[i].childrenList && arr[i].childrenList.length > 0){
            arr[i].isOpen = true;
          }
        }
        if (arr[i].childrenList && arr[i].childrenList.length > 0) {
          that.checkedData(id,arr[i].childrenList);
        }       
      }
      return arr;
    },
    checkedChange(e){
      var that = this;
          var id = e.currentTarget.id;
          var treeList = this.checkedData(id, that.data.tree);
          that.setData({
            tree : treeList,
          })
          this.triggerEvent('customevent', {id:id})
    },
    pageEventListener:function(e){
      var that = this;
      var treeList = this.checkedData(e.detail.id, that.data.tree);
      that.setData({
        tree : treeList,
      })
      that.triggerEvent('customevent', {id:e.detail.id})
           
    },
  }
})
