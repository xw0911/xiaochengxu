
const constKey = require('../../utils/constKey')
const netWork = require('../../utils/netWork')
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		empID: "",
		password: "",
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.clearStorageSync()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		  
	},

	
	/**点击成为合伙人 */
	onPartnerClick() {

		wx.navigateTo({
			url: '../../partner_package/partnerApply/partnerApply',
		})


		// wx.navigateTo({
		// 	url: '../../partner_package/partnerLogin/partnerLogin',
		// })

	},
	// 获取用户名
	bindKeyAccount(e) {
		var that = this
		var empid = e.detail.value;
		that.setData({
			empID: empid
		})
	},
	// 获取密码
	bindKeyPas(e) {
		var that = this
		var password = e.detail.value;
		that.setData({
			password: password
		})
	},
	// 请求登陆
	loginClick() {
		var that = this
		var params = {
			empID: that.data.empID,
			password: that.data.password,
		}
		netWork.Htpapi.post("/account/businessLogin", params).then(res => {
			if (res.data.stateCode == 100) { 
				wx.setStorageSync(constKey.empTokenKey, res.data.data.authToken)
					that.getMenu()					
			} else if (res.data.stateCode == 110 || 120 || 130) {
				wx.showToast({
					title: res.data.message,
					icon: "none",
					duration: 2000
				})
			}
		})
	},
	getMenu(){
		netWork.Htpapi.get("menu/list").then(res=>{
			if(res.data.stateCode ==100){
				app.globalData.authority=res.data.data;
				wx.switchTab({
					url: '../../pages/aft_login/aft_login',
				})	
			}else{
				wx.showToast({
					title: '请求失败',
					duration:2000
				})
			}
				
		})
	},
	goDeform(){
		wx.navigateTo({
			url: '../../emp_package/selectKind/selectKind',
		})
	}
})