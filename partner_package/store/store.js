// partner_package/checkPeople/checkPeople.js
const netWork =require("../../utils/netWork")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    currentTab2:'',
    currentList:true,
    currentTabKey:"tab1",
    type: 0,
    searchInfo: "",
    startTime: "",
    endTime: "",
    pStartTime: "",
    pEndTime: "",
    checkList: []
},

  onClickTabChange({detail}){
		var key = detail.key
		this.setData({
			currentTabKey:key
		})

		if(key == 'tab1'){
			this.setData({
        currentList:true,
        type:0,
        checkList: [],
        currentTab2:''
			})
		}
		else{
			this.setData({
        currentList:false,
        type:1,
        checkList: [],
        currentTab2:'tab2'
			})
		}
  },
  getCheck(){
    var params = {
      type: this.data.type,
      searchInfo: this.data.searchInfo,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      pStartTime: this.data.pStartTime,
      pEndTime: this.data.pEndTime,
    }
    netWork.Htpapi.post("/wxProgram/findStoreApplyList", params).then(res=>{
      if(res.data.stateCode == 100){
        this.setData({
          checkList: res.data.data
        })
      } else {
        wx.showToast({
          title: '数据错误',
          duration: 1000
        })
      }
  
      this.data.searchInfo=''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCheck();	
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  
  goselect(){
    if (this.data.currentList == true) {
      wx.navigateTo({
        url: '../selectstore/selectstore',
      })
    } else if (this.data.currentList == false) {
      wx.navigateTo({
        url: '../alreadyCheck/alreadyCheck'
      })
    }
  },
  goDetail(e){
    wx.navigateTo({
      url: '../staffStoreDetail/staffStoreDetail?id='+ e.currentTarget.dataset.id+ '&toBeType=' + 'c' + '&statusName=' + e.currentTarget.dataset.statusname+ '&tab=' + this.data.currentTab2,
    })
  }
})