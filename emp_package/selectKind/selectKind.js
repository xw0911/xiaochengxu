// emp_package/selectKind/selectKind.js

const netWork = require('../../utils/netWork')
Page({

  data: {
    searchInfo: '',
    tree: [],
    selectProject: [],
    ListLength: 0,
    showList:false
  },
  goKind(){
    var that =this
    var listKind =this.data.selectProject
    for(let i =0;i<listKind.length;i++){
      delete listKind[i].pcName
      that.setData({
        selectProject:listKind
      })
    }
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

    let prevPage = pages[pages.length - 2];

    prevPage.setData({
      listKind: that.data.selectProject,
        
    })
    wx.navigateBack()
  },
  getDatail(e){
      this.setData({
        searchInfo:e.detail.value
      })
      this.getData()
  },
  clear(){
    var that =this
    this.setData({
      selectProject: []
    })
    this.setData({
      ListLength: that.data.selectProject.length
    })
   var tree =  this.delete(this.data.tree);
   that.setData({
    tree:tree
   })
  },
  deleteList(e){
    console.log(e)
    var that = this
    var index = e.currentTarget.dataset.index;
    var selectProject = that.data.selectProject;
    selectProject.splice(index,1)
    that.setData({
      selectProject:selectProject
    })
    this.setData({
      ListLength: that.data.selectProject.length
    })
   var tree =  this.delete(this.data.tree);
   that.setData({
    tree:tree
   })
    console.log(this.data.tree)
  },

  delete(arr){
    var that = this
    for(let i=0;i <arr.length;i++){
      arr[i].isCheck =false;
      for(let j =0;j< that.data.selectProject.length;j++){
        if(arr[i].productPcID == that.data.selectProject[j].productID){
            arr[i].isCheck =true
        }
      }
      if (arr[i].childrenList && arr[i].childrenList.length > 0) {
        that.delete(arr[i].childrenList);
      }
    }
    return arr;
  },

  openDialog(){
    var that =this
    if(that.data.showList == false){
      this.setData({
        showList:true
      })
    }else {
      this.setData({
        showList:false
      })
    }
 
  },
  hideBackground(){
		var that = this
		that.setData({
			showList:false
		})
	},
  getData() {
    var that = this
    var params = {
      searchInfo: this.data.searchInfo
    }
    netWork.Htpapi.post('appointment/searchPXAndCategory', params).then(res => {
      if (res.data.stateCode == 100) {
        const tree = this.isFolder(res.data.data);
        that.setData({
          tree: tree
        })
      }


    })
  },
  onLoad: function (options) {
    this.getData()

  },
  isFolder: function (arr) {
    const that = this;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].childrenList && arr[i].childrenList.length > 0) {
        arr[i].isFolder = true;
        arr[i].isCheck = true;
        that.isFolder(arr[i].childrenList);
      } else {
        arr[i].isFolder = false;
        arr[i].isCheck = true;
      }
      arr[i].isOpen = true;
      arr[i].isCheck = false;
    }
    return arr;
  },

  // 项目是否选中
  pageEventListener1: function (e) {
    var that = this
    var ID = e.detail.id
    that.setData({
      selectProject: []
    })
    that.checkedData(ID, this.data.tree)

  },
  checkedData: function (id, arr) {
    var that = this;
    for (let i = 0; i < arr.length; i++) {
      if (id == arr[i].productPcID) {
        arr[i].isCheck = !arr[i].isCheck;
        that.geeList(that.data.tree)
        break;
      }
      if (arr[i].childrenList && arr[i].childrenList.length > 0) {
        that.checkedData(id, arr[i].childrenList);
      }
    }
    return arr;
  },
  geeList(arr) {
    var that = this;
    var selectProject = that.data.selectProject;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].isCheck) {
        selectProject.push({
          pcName: arr[i].pcName,
          productID: arr[i].productPcID,
          index: arr[i].index
        })
      }
      if (arr[i].childrenList && arr[i].childrenList.length > 0) {
        that.geeList(arr[i].childrenList);
      }
    }
    that.setData({
      selectProject: selectProject
    })
    this.setData({
      ListLength: that.data.selectProject.length
    })

  },
  onReady: function () {

  },


  onShow: function () {

  },

})