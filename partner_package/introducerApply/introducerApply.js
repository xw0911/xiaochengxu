// partner_package/introducerApply/introducerApply.js
const constKey = require('../../utils/constKey')
const netWork = require('../../utils/netWork')
var introducerName = "" //介绍人名称
var phone = "" // 手机号
var openingBank = "" //开户行
var bankAccount = "" // 银行账号
var remark = "" // 备注信息


Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		introducerName:"",
		authToken:''

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			authToken:wx.getStorageSync(constKey.partnerTokenKey)
		})
		if(this.data.authToken == ''){
			wx.showToast({
				title: "您还未登录",
				icon:"none",
				duration:2000
			})
		}
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

	
	/**
	 * 提交申请的网络请求
	 */
	submitIntroducerInfoNetwor(){
		var that = this
		// 请求参数  除了备注 都必须填写
		if(this.data.authToken == ''){
			wx.showToast({
				title: "您还未登录",
				icon:"none",
				duration:2000
			})
		}else{
			var params = {
				introducerName:introducerName,
				phone:phone,
				openingBank:openingBank,
				bankAccount:bankAccount,
				remark:remark
			}
			netWork.Htpapi.postPartner('wxProgram/createIntroducerApply',params).then(res => {
				if(res.data.StateCode == 100){
					// 提交成功返回上一届面刷新申请数据
					wx.showToast({
						title: res.data.message,
						icon:"none",
						duration:2000
					})
					wx.navigateBack({
						data: 2
					})
	
				}else{
					wx.showToast({
						title: res.data.message,
						icon:"none",
						duration:2000
					})
				}
	
			}).catch(fail =>{
	
			})
	
		}
	
	},

	/**
	 * 
	 * @param {*绑定的值
	 * event.detail.detail.value 为用户输入的值
	 * event.currentTarget.dataset.index 输入框的下标 从0开始计算 
	 * 介绍人 下标为 0
	 * 手机号 下标1
	 * 依次类推
	 * } event 
	 */
	inValueChange(event){
		var value = event.detail.detail.value
		var expindex = event.currentTarget.dataset.index
		// 判断为变量赋值
		console.log(expindex)
		switch( expindex ) {
			case "0" :
				introducerName = value
				break;
			case "1" :
				phone = value
				break;
			case "2":
				openingBank = value
				break;
			case "3":
				bankAccount = value
				break;
			case "4":
				remark = value
				break;
			default:
				remark = value
		}
	},

	/**
	 * 点击提交申请
	 */
	onClickSubmit(){
		var that = this
		// console.log(introducerName)
		// console.log(phone)
		if(!introducerName){
			wx.showToast({
				title: '请输入介绍人名称',
				icon:'none'
			})
			return false
		}

		if(!phone){
			wx.showToast({
				title: '请输入手机号码',
				icon:'none'
			})
			return false
		}

		if(!openingBank){
			wx.showToast({
				title: '请输入开户行信息',
				icon:'none'
			})
			return false
		}

		if(!bankAccount){
			wx.showToast({
				title: '请输入银行账号',
				icon:'none'
			})
			return false
		}

		 that.submitIntroducerInfoNetwor()
	}


})