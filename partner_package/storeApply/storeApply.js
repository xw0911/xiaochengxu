// partner_package/storeApply/storeApply.js

const constKey = require('../../utils/constKey')
const netWork = require('../../utils/netWork')

var storeName = "" // 代理商名称
var contact = ""// 联系人
var phone = ""// 手机号码
var email = ""// 邮箱
var location = ""// 所在地区
var locationDetail = ""// 详细地址
var storeSource = ""// 代理商来源 “1”:介绍人  “2”：开发人员
var sourceName = ""// 代理商来源名称
var openingBank = ""// 开户行
var bankAccount = ""// 开户行账号
var corporation = ""// 业务代表
var consultant = "" // 运营专员
var remark = ""// 备注

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		menuShow:false,
		menus:[
			{
				title: "请选择",
				status: 0
			},
			{
				title: "介绍人",
				status: 1
			},
			{
				title: "代理商",
				status: 2
			},
			{
				title: "开发人员",
				status: 3
			}
		],
		menuSelectIndex:0,
		menuItemTitle:'请选择',
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
	submitAgentInfoNetwork(){
		var that = this
		// 请求参数  除了备注 都必须填写
		if(this.data.authToken == ''){
			wx.showToast({
				title: "你还未登录",
				icon:"none",
				duration:2000
			})
		}else{
			var params = {
				storeName: storeName,
				contact: contact,
				phone: phone,
				email: email,
				location: location,
				locationDetail: locationDetail,
				storeSource: storeSource,
				sourceName: sourceName,
				openingBank: openingBank,
				bankAccount: bankAccount,
				corporation: corporation,
				consultant:consultant,
				remark: remark
			}
			netWork.Htpapi.postPartner('wxProgram/createStoreApply',params).then(res => {
				// console.log(res)
				if(res.data.stateCode == 100){
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
		var index = event.currentTarget.dataset.index
		// 判断为变量赋值
		switch(Number(index)){
			case 0:
				storeName = value
				break;
			case 1:
				contact = value
				break;
			case 2:
				phone = value
				break;
			case 3:
				email = value
				break;
			case 4:
				location = value
				break;
			case 5:
				locationDetail = value
				break;
			case 6:
				storeSource = value
				break;
			case 7:
				sourceName = value
				break;
			case 8:
				openingBank = value
				break;
			case 9:
				bankAccount = value
				break;
			case 10:
				corporation = value
				break;
			case 11:
				consultant = value
				break;
			case 12:
				remark = value
			default:
				remark = value
		}
	},

	/**
	 * 点击提交申请
	 */
	onClickSubmit(){
		var that = this
		if(!storeName){
			wx.showToast({
				title: '请输入店家名称',
				icon:'none'
			})
			return false
		}

		if(!contact){
			wx.showToast({
				title: '请输入联系人信息',
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

		// if(!email){
		// 	wx.showToast({
		// 		title: '请输入邮箱',
		// 		icon:'none'
		// 	})
		// 	return false
		// }
		
		if(!location){
			wx.showToast({
				title: '请输选择地址',
				icon:'none'
			})
			return false
		}

		if(!locationDetail){
			wx.showToast({
				title: '请输入详细地址',
				icon:'none'
			})
			return false
		}

		if(!storeSource){
			wx.showToast({
				title: '请选择来源',
				icon:'none'
			})
			return false
		}

		if(!sourceName){
			wx.showToast({
				title: '请输入代理商来源名称',
				icon:'none'
			})
			return false
		}

		if(!openingBank){
			wx.showToast({
				title: '请输入开户行',
				icon:'none'
			})
			return false
		}

		if(!bankAccount){
			wx.showToast({
				title: '请输入开户行账号',
				icon:'none'
			})
			return false
		}


		if(!corporation){
			wx.showToast({
				title: '请输入业务代表名称',
				icon:'none'
			})
			return false
		}

		if(!consultant){
			wx.showToast({
				title: '请输入运营专员名称',
				icon:'none'
			})
			return false
		}
		
		 that.submitAgentInfoNetwork()
	},

	onClickSelect(){
		var that = this
		that.setData({
			menuShow:!that.data.menuShow
		})
	},
	// 
	hideBackground(){
		var that = this
		that.setData({
			menuShow:false
		})
	},

	menuClick(e){
		var that = this;
		var index = e.currentTarget.dataset.index;
		var item = that.data.menus[index];
		storeSource = index
		// console.log(item.title)
		that.setData({
			menuSelectIndex:index,
			menuItemTitle:item.title,
			menuShow:false
		})

	}


})