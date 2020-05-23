// partner_package/approveRefuse/approveRefuse.js
const netWork = require("../../utils/netWork")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      type:'',
      id:"",
      status:0,
      approveRemark:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.ID,
      type:options.toBeType
    })
    // console.log(options.toBeType)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  bindTextAreaBlur(e){
      this.setData({
        approveRemark:e.detail.value
      })
  },
  onClickSubmit(){
    var params={
      type:this.data.type,
      id:this.data.id,
      status:this.data.status,
      approveRemark:this.data.approveRemark
    }
    netWork.Htpapi.post("wxProgram/approvePartnerApplyInfo",params).then(res=>{
      if(res.data.stateCode== 100){
        console.log(res.data)
        wx.navigateBack()
      }else {
        wx.showToast({
          title: res.data.message,
          duration:1000
        })
      }
    
    })
  }
})