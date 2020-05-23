// pages/aft_login/aft_login.js
const constKey = require('../../utils/constKey')
const netWork = require('../../utils/netWork')
var app=getApp()


Component({
  data:{
    aftLogin:[
      { 
        id:'300',
        "pagePath":  "/pages/appointment/appointment",
        "iconPath": "/images/gz_grzx@2x.png",
        "selectedIconPath": "/images/gz_grzx@2x.png",
        "text": "介绍人审核"
      },
      {
         id:"301",
        "pagePath":  "/pages/aft_login/aft_login",
        "iconPath": "/images/gk_sp@2x.png",
        "selectedIconPath": "/images/gz_1@2x.png",
        "text": "代理商审核"
      },
      {
        id:"302",
       "pagePath":  "/pages/aft_login/aft_login",
       "iconPath": "/images/gk_ymhf@2x.png",
       "selectedIconPath": "/images/gz_1@2x.png",
       "text": "店家审核"
     }
    ],
    aftPeople:[
      { 
        id:'307',
        "pagePath":  "/pages/appointment/appointment",
        "iconPath": "/images/gz_grzx@2x.png",
        "selectedIconPath": "/images/gz_grzx@2x.png",
        "text": "个人中心"
      },
      {
         id:"308",
        "pagePath":  "/pages/aft_login/aft_login",
        "iconPath": "/images/gk_sp@2x.png",
        "selectedIconPath": "/images/gz_1@2x.png",
        "text": "修改密码"
      },
      {
        id:"304",
       "pagePath":  "/pages/aft_login/aft_login",
       "iconPath": "/images/gk_ymhf@2x.png",
       "selectedIconPath": "/images/gz_1@2x.png",
       "text": "报单"
     }

    ]
  },
  attached() {
    var that=this;
    var tabList=[];
    var tabProple=[];
    app.globalData.authority.forEach(function(item){
      that.data.aftLogin.forEach(function(tab){
        if(item.id == tab.id){
          tabList.push({
          id:tab.id,
          "pagePath":tab.pagePath,
          "iconPath": tab.iconPath,
          "selectedIconPath": tab.selectedIconPath,
          "text": tab.text 
        })     
        }
      })
    })

    app.globalData.authority.forEach(function(item){
      that.data.aftPeople.forEach(function(tab){
        if(item.id == tab.id){
          tabProple.push({ 
          id:tab.id,
          "pagePath":tab.pagePath,
          "iconPath": tab.iconPath,
          "selectedIconPath": tab.selectedIconPath,
          "text": tab.text 
        })    
        }
      })
    })
    that.setData({
      aftLogin:tabList,
      aftPeople:tabProple
    })
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },
  methods:{
    goCheck(e){
      if(e.currentTarget.dataset.id == 300){
        wx.navigateTo({
          url: '../../partner_package/checkPeople/checkPeople',
        })
      }else if(e.currentTarget.dataset.id == 301){
        wx.navigateTo({
          url: '../../partner_package/agent/agent',
        })
      }else if(e.currentTarget.dataset.id == 302){
        wx.navigateTo({
          url: '../../partner_package/store/store',
        })
      }else if(e.currentTarget.dataset.id == 304){
        wx.navigateTo({
          url: '../../partner_package/declarationForm/declarationForm',
        })
      }else if(e.currentTarget.dataset.id == 307){
        wx.navigateTo({
          url: '../../partner_package/centerPeople/centerPeople',
        })
      }else if(e.currentTarget.dataset.id == 308){
        wx.navigateTo({
          url: '../../partner_package/changePassword/changePassword',
        })
      }
     
    } 
  }
})