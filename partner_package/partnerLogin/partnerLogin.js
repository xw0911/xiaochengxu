// partner_package/partnerLogin/partnerLogin.js
const constKey = require('../../utils/constKey.js')
const netWork = require('../../utils/netWork')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

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

	/**
	 * 
	 * @param {用户点击授权获取用的加密信息} e
	 */
	partnerCodeNemtWork(e){
		var that = this
		var encryptedData = e.detail.encryptedData
		var iv = e.detail.iv 
		wx.login({
			success:(res) =>{
				var params = {
					code:res.code
				}
				netWork.Htpapi.postPartner("account/putAuthorizeInfo",params).then(res=>{
					if(res.data.stateCode == 100){
						/**
						 * 根据信息请求后台数据 手机号、token
						 */
						that.getPartnerPhoneNumber(res.data.data.openId,res.data.data.sessionKey,iv,encryptedData)

					}
				}).catch(fail=>{
					console.debug("请求失败-===--"+fail)
				})

			},
			fail:(fail)=>{
					console.debug('授权失败')
			}
		
		})

	},

	/**
	 * 
	 * @param {登录的code} code 
	 * @param {encrypt加密-初始偏移量} iv 
	 * @param {*encrypt加密-密文} encryptedData 
	 */
	getPartnerPhoneNumber(openID,sessionKey,iv,encryptedData){
		var params = {
			openID:openID,
			sessionKey:sessionKey,
			iv:iv,
			encryptedData:encryptedData
		}
		netWork.Htpapi.postPartner('account/authorizeLogin',params).then(res=>{
			if(res.data.stateCode == 100){

				wx.setStorageSync(constKey.partnerTokenKey, res.data.data.authToken)
				wx.setStorageSync(constKey.partnerPhoneNumber, res.data.data.phone)
					/**获取手机号成功返回上一界面  */
				wx.navigateBack({
					delta: 1
				})
			}
			else{
				console.debug('输出错误信息')
			}


		}).catch(fail=>{

		})


	}




})