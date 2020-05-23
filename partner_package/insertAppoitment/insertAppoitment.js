// partner_package/insertAppoitment/insertAppoitment.js
const netWork = require('../../utils/netWork')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        value: '0',
        name: '本院修复',
        checked: 'true'
      },
      {
        value: '1',
        name: '外院修复'
      },
    ],
    array: [15, 30, 45, 60, 75],
    index: 0,
    ariveData: '',
    ariveTime: '',
    selectCustomer: '请选择顾客',
    selectHospital: '请选择医院',
    selectDoctor: '请选择',
    CustID: '',
    repairType: 0,
    ID: '',
    doctorID: '',
    duration: 15,
    listKind: [],
    consultant:''
  },
  deterMine(){
      var that =this
    if(that.data.selectCustomer == '请选择顾客'){
			wx.showToast({
				title: '请选择顾客',
				icon:'none'
			})
			return false
    }
    if(that.data.selectDoctor == '请选择'){
			wx.showToast({
				title: '请选择医生',
				icon:'none'
			})
			return false
    }
    if(!that.data.ariveData && !that.data.ariveTime){
			wx.showToast({
				title: '预约时间不能为空',
				icon:'none'
			})
			return false
    }
    if(!that.data.ariveTime){
			wx.showToast({
				title: '预约时间不能为空',
				icon:'none'
			})
			return false
    }
    if(that.data.listKind.length == 0){
			wx.showToast({
				title: '请选择品项',
				icon:'none'
			})
			return false
    }
    that.saveAppointment()
  },
  saveAppointment() {

    var params = {
      custID: this.data.CustID,
      consultant: this.data.consultant,
      repairType: this.data.repairType,
      entityID: this.data.ID,
      doctorID: this.data.doctorID,
      appointmentTime: this.data.ariveData+" "+this.data.ariveTime+':00',
      duration: this.data.duration,
      productList: this.data.listKind
    }
      netWork.Htpapi.post('appointment/save',params).then(res=>{
        if(res.data.stateCode == 100 ){
          wx.showToast({
            title: res.data.message,
            duration:2000
          })
          wx.navigateBack()
        }
      })

  },
  getInput(e){
    this.setData({
      consultant:e.detail.value
    })
  },

  goSelectKind() {
    wx.navigateTo({
      url: '../../emp_package/selectKind/selectKind',
    })
  },
  goCustomer() {
    wx.navigateTo({
      url: '../../emp_package/selectCustomer/selectCustomer',
    })
  },
  goSelectHospital() {
    wx.navigateTo({
      url: '../../emp_package/selectHospital/selectHospital',
    })
  },
  goSelectDoctor() {
    wx.navigateTo({
      url: '../../emp_package/selectDoctor/selectDoctor?entityID='+this.data.ID,
    })
  },
  bindDateStart(e) {
    this.setData({
      ariveData: e.detail.value
    })
  },
  bindTimeChange(e) {
    this.setData({
      ariveTime: e.detail.value
    })
  },
  timeData: function () {
    var that = this;
    var array = [];
    var time = 0
    for (var i = 0; i < 100; i++) {
      time += 15;
      array.push(time)
    }
    that.setData({
      array: array
    })
  },
  
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.array[e.detail.value])
    this.setData({
      duration: this.data.array[e.detail.value]
    })
    this.setData({
      index: e.detail.value
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
    if(e.detail.value == 1){
      this.setData({
        repairType:1
      })
    } 

  },
  plus() {
    var that = this;
    let oldTime = this.data.array[this.data.index];
    let time = oldTime + 15;
    let index = that.data.array.indexOf(time);
    that.setData({
      index: index
    })
    this.setData({
      duration: this.data.array[this.data.index]
    })
    // this.data.array[this.data.index]=this.data.array[this.data.index]+=15
    console.log(this.data.array[this.data.index])
  },
  delete() {
    var that = this;
    let oldTime = this.data.array[this.data.index];
    let time = oldTime - 15;
    let index = that.data.array.indexOf(time);
    if (time < 15) {
      wx.showToast({
        title: '不能少于15分钟',
        icon: 'none',
        duration: 2000,
      })
    } else {
      that.setData({
        index: index
      })
    }
    this.setData({
      duration: this.data.array[this.data.index]
    })
    console.log(this.data.array[this.data.index])
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.timeData();
    console.log(options.Name)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
  },
})