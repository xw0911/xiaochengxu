// partner_package/applyDetail/applyDetail.js
const netWork = require("../../utils/netWork")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // applyName: '',
    // phone: '',
    // openingBank: '',
    // bankAccount: '',
    // remark:'',
    type:1,
    id: "",
    toBeType: "",
    introducerDetail:'',
    applyDetail: '',
    applyWelcome: '',
    tab:'',
    bkColor:''
  },
  introducerDetail(){
    var that = this;
    var params = {
      id: that.data.id,
      toBeType: that.data.toBeType
    } 
    netWork.Htpapi.post("wxProgram/getWxApplyInfoDetail", params).then(res => {
      if (res.data.stateCode == 100) {
        that.setData({
          introducerDetail:res.data.data,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var applyDetail = "";
    var applyWelcome = "";
    if (options.statusName == "已提交") {
      applyDetail= "申请已提交";
      that.setData({
        bkColor: '#F9B640'
      })
  } else if (options.statusName == "已同意") {
      applyDetail= "申请已同意";
      applyWelcome= '谢谢您的关注，欢迎成为名媛的介绍人';
      that.setData({
        bkColor:'#38CE90'
      })
  } else {
      applyDetail= "申请已拒绝";
      applyWelcome= '谢谢您的关注，您的信息暂时不符合我们店家的要求';
      that.setData({
        bkColor:'#E15F60'
      })
  }
    that.setData({
      id: options.id,
      toBeType: options.toBeType,
      applyDetail:applyDetail,
      applyWelcome:applyWelcome,
      tab:options.tab
    })
    that.introducerDetail();
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
  refuse(){
    wx.navigateTo({
      url: '../approveRefuse/approveRefuse?ID='+this.data.id+ '&toBeType=' + '1',
    })
  },
  agree(){
    wx.navigateTo({
      url: '../approveAgree/approveAgree?ID='+this.data.id+ '&toBeType=' + '1',
    })
  }


})