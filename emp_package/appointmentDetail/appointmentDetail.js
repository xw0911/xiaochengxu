// emp_package/appointmentDetail/appointmentDetail.js
const netWork =require('../../utils/netWork')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    appointmentID:'',
    content:'',
    productList:[],
    aptShow:false,
    Color:'',
    Code:'',
    status:'',
    statusContent:'',
    statusCode:''
  },


  makeSure(){
    var that =this
    var params={
      appointmentID:this.data.appointmentID,
      status:this.data.statusCode
    }
    netWork.Htpapi.post('appointment/editAppointmentInfo',params).then(res=>{
      if(res.data.stateCode == 100){
        wx.showToast({
          title: res.data.message,
          duration:2000
        })
        that.setData({
          istrue: false,
          makesure: false,
          aptShow:false
      })
        that.getDetail()
      if(this.data.Code == 0){
        that.setData({
          statusContent:'已取消',
          Color:'#C9C9C9'
        })
      }else if(this.data.Code == 2){
        that.setData({
          statusContent:'已到院',
          Color:'#FD5B81'
        })
      }
      }
    })

  },
  getDetail(){
    var that =this
    var params={
      appointmentID:this.data.appointmentID
    }
    netWork.Htpapi.post('appointment/getAppointmentByID',params).then(res=>{
      if(res.data.stateCode == 100){ 
        that.setData({
          Code:res.data.data.status
        })   
        res.data.data.productList.forEach(function(item){
          if(item.index == 1){
            item.tab = '一级分类'
          }else if(item.index == 2){
            item.tab = '二级分类'
          }else {
            item.tab = '品项'
          }
    
          that.setData({
            productList:res.data.data.productList
          })
        })

        if(res.data.data.status == 1){
          that.setData({
            aptShow:true
          })
        }
        if(res.data.data.status == 0){
          that.setData({
            statusContent: '已取消',
            Color:'#C9C9C9'
          })
        }else if(res.data.data.status == 1){
          that.setData({
            statusContent: '已预约',
            Color:'#FF7B00'
          })
        }else {
          that.setData({
            statusContent: '已到院',
            Color:'#FD5B81'
          })
        }
        that.setData({
          content:res.data.data,
          // productList:res.data.data.productList
          })
          console.log(res.data.data.RepairTypeName)  
        console.log(res.data.data.productList)

      }
    })
  },


openDialog: function () {
  this.setData({
      istrue: true,
      statusCode: 0
  })
},
makesure: function () {
  this.setData({
      makesure: true,
      statusCode:2
  })
  this.getDetail()

},
closeDialog: function () {
  this.setData({
      istrue: false
  })
  this.setData({
    makesure: false
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      appointmentID:options.ID
    })
    this.getDetail()
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
})