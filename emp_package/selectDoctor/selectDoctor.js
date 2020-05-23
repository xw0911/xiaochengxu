// emp_package/selectDoctor/selectDoctor.js
var util = require('../../utils/util');
const netWork = require('../../utils/netWork')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    entity: "",
    time: "",
    searchInfo: "",
    content:[]
  },
  getDatail(e){
      this.setData({
        searchInfo:e.detail.value
      })
      this.getData();
  },
  getData() {
    var that =this
    var params = {
      pageNum:this.data.pageNum,
      entity:this.data.entity,
      time:this.data.time,
      searchInfo:this.data.searchInfo
    }
    netWork.Htpapi.post('appointment/getDoctors', params).then(res => {
      if (res.data.stateCode == 100) {
        that.setData({
          content:res.data.data
        })
        console.log(res.data.data)
      }
    })
  },
  getDoctor(e){
    let doctor = e.currentTarget.dataset.doctor
    let doctorid =e.currentTarget.dataset.doctorid
    console.log(e)
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

    let prevPage = pages[pages.length - 2];

    prevPage.setData({
      selectDoctor: doctor,
      doctorID:doctorid,
    })
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      entity:options.entityID
    })
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    });
    this.getData()
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


})