// const util = require('utils/util.js');
const constKey = require('/constKey')





// 正式的
// const apiUrl = "https://paas.shiyum.com/shiyu_merchant/"
// 测试的
// const apiUrl = "http://47.111.176.144:8083/shiyu_merchant/"
//测试的
const apiUrl = "http://139.196.111.15:8082/miniProgram/"




//修改成你的appid及appsecret  
// var AppConf = {
//   'appid': 'wx3ad60034f8a56bd3',
//   'appsecret': 'baabb99c72e1205c65b25fd920c07b98'
// };
const Htpapi = {
  get: (url, data) => {
    if (data == null) data = {}
    return new Promise((resolve, reject) => {
      wx.request({
        url: apiUrl + url,
        data: data,
        method: "GET",
        dataType: "json",
        header: {
          'Authorization': 'Basic ' + wx.getStorageSync(constKey.clientTokenKey)
        },
        success: (res) => {

          if (res.statusCode == 500) {
            // wx.showModal({
            //   title: '友情提示',
            //   content: '网络连接失败，请稍后再试！',
            //   showCancel: false,
            // })
          }
          resolve(res);
          wx.hideLoading();
        },
        fail: (res) => {
          reject(res);
          wx.hideLoading();
        }
      })
    })
  },

  /** 员工网络请求  */
  post: (url, data) => {
    if (data == null) data = {}
    return new Promise((resolve, reject) => {
      wx.request({
        url: apiUrl + url,
        data: data,
        method: "POST",
        dataType: "json",
        header: {
          'Authorization': 'Basic ' + wx.getStorageSync(constKey.empTokenKey)
        },
        success: (res) => {
          // if (res.statusCode == 401) {
          //   wx.navigateTo({
          //     url:'../../client_package/Client_login/Client_login'
          //   })
          //   return false;
          // }
          resolve(res);
          wx.hideLoading();
        },
        fail: (res) => {
          reject(res);
          wx.hideLoading();
        }
      })
    })
  },

  get: (url, data) => {
    if (data == null) data = {}
    return new Promise((resolve, reject) => {
      wx.request({
        url: apiUrl + url,
        data: data,
        method: "get",
        dataType: "json",
        header: {
          'Authorization': 'Basic ' + wx.getStorageSync(constKey.empTokenKey)
        },
        success: (res) => {
          // if (res.statusCode == 401) {
          //   wx.navigateTo({
          //     url:'../../client_package/Client_login/Client_login'
          //   })
          //   return false;
          // }
          resolve(res);
          wx.hideLoading();
        },
        fail: (res) => {
          reject(res);
          wx.hideLoading();
        }
      })
    })
  },


/** 合伙人网络请求 */
  postPartner: (url, data) => {
    if (data == null) data = {}
    return new Promise((resolve, reject) => {
      wx.request({
        url: apiUrl + url,
        data: data,
        method: "POST",
        dataType: "json",
        header: {
          'Authorization': 'Basic ' + wx.getStorageSync(constKey.partnerTokenKey)
        },
        success: (res) => {

          resolve(res);
          wx.hideLoading();
        },
        fail: (res) => {
          reject(res);
          wx.hideLoading();
        }
      })
    })
  }

}


module.exports = {
  Htpapi: Htpapi,
  apiUrl: apiUrl,
}