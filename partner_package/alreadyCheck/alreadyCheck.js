  // partner_package/selectstore/selectstore.js
  const netWork = require("../../utils/netWork")
  var app = getApp();
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      type:1,
      searchInfo: "",
      startTime: "",
      endTime: "",
      pStartTime:'',
      pendTime:'',
      // status:[
      //   {
      //   name:"全部"
      // },
      // {
      //   name:"已拒绝"
      // },
      // {
      //   name:"已同意"
      // },
      // ],
      // selectId:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onUnload: function () {
      
    }, 
    onClickSubmit() {
     var that = this;
     var current = getCurrentPages();
     var currentApp = current[current.length - 2];
     currentApp.data.searchInfo = that.data.searchInfo; 
     currentApp.data.startTime = that.data.startTime; 
     currentApp.data.endTime = that.data.endTime;
     currentApp.data.type=that.data.type
     currentApp.data.pStartTime=that.data.pStartTime
     currentApp.data.pEndTime=that.data.pendTime
     currentApp.getCheck();
     wx.navigateBack();
    },
    bindKeyPas(e) {
      this.setData({
        searchInfo: e.detail.value
      })
    },
    bindDateStart: function (e) {
      this.setData({
        pStartTime: e.detail.value,
      })
     
    },
    bindDateEnd: function (e) {
      this.setData({
        pendTime: e.detail.value
      })
    },
    pStartTime:function(e){
      this.setData({
        startTime:e.detail.value 
      })
    },
    pendTime:function(e){
      this.setData({
        endTime:e.detail.value
      })
    },

    // get(e){
    //   let index=e.currentTarget.dataset.index
    //   this.setData({
    //     selectId:index
    //   })
    //   if(index==0){
    //     this.setData({
    //       type:''
    //     })
    //   }else if(index==1){
    //     this.setData({
    //       type:0
    //     })
    //   }else{
    //     this.setData({
    //       type:1
    //     })
    //   }
        
    // },
    clearContent(){
      var that =this
      that.setData({
        searchInfo: "",
        startTime: "",
        endTime: "",
        pStartTime:'',
        pendTime:'',
      })
    }
  })