// emp_package/selectHospital/selectHospital.js
const netWork =require('../../utils/netWork')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    entityID:'',
    content:[]
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
    this.getData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getDatail(e){
      this.setData({
        entityID:e.detail.value,
        content:[]
      })
      this.getData()
  },
    getData(){
      var that =this
      var params={
        entityID:this.data.entityID
      }
      netWork.Htpapi.post('appointment/entity/searchPower',params).then(res=>{      
        if(res.data.stateCode == 100) {
            that.setData({
              content:res.data.data
            })
            console.log(res.data)
        }
      })
    },
    getText(e){
      let text = e.currentTarget.dataset.text
      let id =e.currentTarget.dataset.id
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

      let prevPage = pages[pages.length - 2];

      prevPage.setData({
        selectHospital: text,
        ID:id,
      })
      wx.navigateBack()
    }
})