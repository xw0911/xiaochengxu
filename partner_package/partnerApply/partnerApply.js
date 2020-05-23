// partner_package/partnerApply/partnerApply.js
const constKey = require('../../utils/constKey')
const netWork = require('../../utils/netWork')
var authToken = "";
Page({

	/**
	 * 页面的初始数据
	 */
	data: {	
		currentTabKey:"tab1",
		currentList:true,
		applyList:[],
		authToken:"",

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
		var that = this
	  let authToken = wx.getStorageSync(constKey.partnerTokenKey)
		that.setData({
			authToken:authToken
		})

		if(authToken){
			that.getWxApplyInfoNetWork()
		}
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	onClickTabChange({detail}){
		var key = detail.key
		this.setData({
			currentTabKey:key
		})

		if(key == 'tab1'){
			this.setData({
				currentList:true
			})
		}
		else{
			this.setData({
				currentList:false
			})
		}
	},
	/**d点击请登录 */
	onClickLogin(){
		wx.navigateTo({
			url: '../../partner_package/partnerLogin/partnerLogin',
		})
	},

	// 合伙人申请信息
	getWxApplyInfoNetWork(){
		var that = this
		var params = {
		}
		netWork.Htpapi.postPartner('wxProgram/getWxApplyInfo',params).then(res =>{
			if(res.data.stateCode == 100){
				res.data.data.forEach((item,index,array)=>{
					//1已提交，，
					if(item.status == 1){
						item.statusColor = "#efa820"
					}
					// 2已同意
					if(item.status == 2){
						item.statusColor = "#46C77A"
					}
					// ，0已拒绝
					if(item.status == 0){
						item.statusColor = "#FF0000"
					}
					// -1已撤销
					if(item.status == -1){
						item.statusColor = "#eeeeee"
					}

					// console.log(item)
					//执行代码
			})
		
				that.setData({
					applyList:res.data.data,					
				})
			}
			else{
				wx.showToast({
					title: res.data.message,
					icon:"none",
					duration:2000
				})
			}

		}).catch(fail =>{
			// 请求错误
		})
	},
	goDetail(e){
		if(e.currentTarget.dataset.tobetype == 'a'){
			wx.navigateTo({
				url: '../applyDetail/applyDetail?id=' + e.currentTarget.dataset.id + '&toBeType=' + e.currentTarget.dataset.tobetype + '&statusName=' + e.currentTarget.dataset.statusname+ '&tab=' +'tab2',
			})
		}else if(e.currentTarget.dataset.tobetype == 'b'){
			wx.navigateTo({
				url: '../agentDetail/agentDetail?id=' + e.currentTarget.dataset.id + '&toBeType=' + e.currentTarget.dataset.tobetype + '&statusName=' + e.currentTarget.dataset.statusname+ '&tab=' + 'tab2',
			})
		}else {
			wx.navigateTo({
				url: '../storeDetail/storeDetail?id=' + e.currentTarget.dataset.id + '&toBeType=' + e.currentTarget.dataset.tobetype + '&statusName=' + e.currentTarget.dataset.statusname+ '&tab=' + 'tab2',
			})
		}
	
	}



})