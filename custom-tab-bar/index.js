const netWork =require('../utils/netWork')
const constKey = require('../utils/constKey')
var app = getApp();
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#1059E8",
    "list": [
      { 
        id:'303',
        "pagePath":  "/pages/appointment/appointment",
        "iconPath": "/images/yy@2x.png",
        "selectedIconPath": "/images/yy_1@2x.png",
        "text": "预约"
      },
      {
         id:"305",
        "pagePath":  "/pages/aft_login/aft_login",
        "iconPath": "/images/gz@2x.png",
        "selectedIconPath": "/images/gz_1@2x.png",
        "text": "工作"
      }
    ],
  },
  attached() {
   
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    },
    onShow(){
      var that = this;
      var tabList=[];
          app.globalData.authority.forEach(function(item){
            that.data.list.forEach(function(tab){
              if(item.id == tab.id){
                tabList.push({ 
                "pagePath":tab.pagePath,
                "iconPath": tab.iconPath,
                "selectedIconPath": tab.selectedIconPath,
                "text": tab.text 
              })      
              }
            })
          })
          that.setData({
            list:tabList
          })
  
    }
  }
})