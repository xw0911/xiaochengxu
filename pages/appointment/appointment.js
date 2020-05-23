const netWork =require('../../utils/netWork')
Component({
  data: {
    array: ['全部状态', '未到院', '已取消', '已到院'],
    arraykind:['全部类型', '预约', '到访'],
    arrayKind: [{
        id:0,
        name: '全部'
      },
      {
        id:1,
        name: '预约'
      },
      {
        id:2,
        name: '到访'
      }],
    index: 0,
    indexKind:0,
    showDialog: false,
    repairType: [
      {
        id:0,
        name: '全部'
      },
      {
        id:1,
        name: '本院修复'
      },
      {
        id:2,
        name: '外院修复'
      }],
      selectIndex:0,
      appointmentType:[
        {
          id:0,
          name: '全部'
        },
        {
          id:1,
          name: '未到院'
        },
        {
          id:2,
          name: '已取消'
        },
        {
          id:3,
          name: '已到院'
        },
      ],
      appointmentIndex:0,
      startTime:'',
      endTime:'',
      typeIndex:0,
      status:'',
      type:'',
      appointmentList:[],
      custCode:'',

  },
  methods: {
    inputContent(e){
        this.setData({
          custCode:e.detail.value
        })
    },
    onShow() {
      this.getData()
    },
    onLoad(){
      // this.getData()
    },
    goAppointmentDetail(e){
      var id =e.currentTarget.dataset.aptid
      wx.navigateTo({
        url: '../../emp_package/appointmentDetail/appointmentDetail?ID='+id
      })
    },
    getData(){
      var params={
        pageNum:1,
        custCode:this.data.custCode,
        start:this.data.startTime,
        end:this.data.endTime,
        status:this.data.status,
        type:this.data.type
      }
        netWork.Htpapi.post(' appointment/list',params).then(res=>{
          var that=this
          if(res.data.stateCode == 100){
            res.data.data.forEach(function(item){
              if(item.status == 0){
                item.color = '#C9C9C9'
              }
              if(item.status ==1){
                item.color= '#FF7B00'
              }
              if(item.status == 2){
                item.color ='#FD5B81'
              }
            })
            that.setData({
              appointmentList:res.data.data
            })
          }
          })
       
    },

    bindPickerChange: function (e) {
      var that =this
      if(e.detail.value ==2){
        that.setData({
          status:0
        })
      }else if(e.detail.value == 3){
        that.setData({
          status:2
        })
      }else if(e.detail.value ==1 ){
        that.setData({
          status:1
        })
      }else if (e.detail.value ==0){
        that.setData({
          status:''
        }
          )
      }
      this.setData({
        index: e.detail.value
      })
      this.getData()
    },
    bindPickerChangeKind(e){
      var that = this
     if(e.detail.value == 1){
      that.setData({
        type:1
      })
     }else if (e.detail.value ==2 ){
      that.setData({
        type:0
      })
     }else if(e.detail.value == 0){
      that.setData({
        type:''
      })
     }
      this.setData({
        indexKind: e.detail.value
      })
      this.getData()
    },
    openDialog: function () {
      this.setData({
        istrue: true
      })
    },
    closeDialog: function () {
      this.setData({
        istrue: false
      })
    },
    checkStaus(e){
      this.setData({
        selectIndex:e.currentTarget.dataset.id
      })
    },
    checkStatic(e){   
      var that = this
      if(e.currentTarget.dataset.id == 1){
       that.setData({
         type:1
       })
      }else if (e.currentTarget.dataset.id ==2 ){
       that.setData({
         type:0
       })
      }else if(e.currentTarget.dataset.id == 0){
       that.setData({
         type:''
       })
      }   
      this.setData({
        typeIndex:e.currentTarget.dataset.id
      })
    },
    appointmentStaus(e){
      var that =this
      if(e.currentTarget.dataset.id ==2){
        that.setData({
          status:0
        })
      }else if(e.currentTarget.dataset.id == 3){
        that.setData({
          status:2
        })
      }else if(e.currentTarget.dataset.id ==1 ){
        that.setData({
          status:1
        })
      }else if (e.currentTarget.dataset.id ==0){
        that.setData({
          status:''
        }
          )
      }
      this.setData({
        appointmentIndex:e.currentTarget.dataset.id
      })
    },
    bindDateStart: function (e) {
      this.setData({
        startTime: e.detail.value,
      })
    },
    bindDateEnd: function (e) {
      this.setData({
        endTime: e.detail.value
      })
    },
    insertAppointment(){
      wx.navigateTo({
        url: '../../partner_package/insertAppoitment/insertAppoitment',
      })
    },
    onClickSubmit(){
      this.getData()
      this.setData({
        istrue: false
      })
    },
    clearContent(){
      this.setData({
        custCode:'',
        appointmentIndex:0,
        typeIndex:0,
        startTime:'',
        endTime:'' ,
        status:''     
      })
    }
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          typeIndex: 0,
        })
      }
    }
  },

})