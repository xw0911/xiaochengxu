  // partner_package/selectstore/selectstore.js
  const netWork = require("../../utils/netWork")
  var app = getApp();
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      searchInfo: "",
      startTime: "",
      endTime: "",
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
    onShow: function () {

    },

    bindKeyPas(e) {
      this.setData({
        searchInfo: e.detail.value
      })
    },
    onClickSubmit() {
     var that = this;
     var current = getCurrentPages();
     var currentApp = current[current.length - 2];     
     currentApp.data.searchInfo = that.data.searchInfo; 
     currentApp.data.startTime = that.data.startTime; 
     currentApp.data.endTime = that.data.endTime; 
     currentApp.getCheck();
      wx.navigateBack();
    },


    bindDateStart: function (e) {
      this.setData({
        startTime: e.detail.value,
      })
    },

    bindDateEnd: function (e) {
      this.setData({
        endTime: e.detail.value
      })
    },
    clearContent(){
      var that =this
      that.setData({
        searchInfo: "",
        startTime: "",
        endTime: "",
      })
    }
    
  })