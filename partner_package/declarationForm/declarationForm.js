// partner_package/declarationForm/declarationForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statrTime:'',
    endTime:''
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

  bindDateStart(e){
    this.setData({
      statrTime:e.detail.value
    })

    console.log(e.detail.value)
  },
  bindDateEnd(e){
    this.setData({
      endTime:e.detail.value
    })
  },
  goFromDetail(){
    wx.navigateTo({
      url: '../../partner_package/FromDetail/FromDetail',
    })
  }
})