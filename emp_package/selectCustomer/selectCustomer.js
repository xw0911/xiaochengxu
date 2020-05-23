//index.js
var pinyin = require("../../utils/pinyin.js")
const netWork = require('../../utils/netWork')
Page({
    data: {
        list: [],
        personList: [],
        searchName: ''
    },
    onLoad: function () {
        // 调用数据处理函数
        this.getData()

    },
    getDatail(e) {
        this.setData({
            searchName: e.detail.value,
            personList: []
        })
        this.getData()
    },
    // 数据处理函数
    getData() {
        var that = this
        var params = {
            "pageNum": 1,
            'searchName': this.data.searchName
        }
        netWork.Htpapi.post('appointment/customerList', params).then(res => {
            if (res.data.stateCode == 100) {
                that.setData({
                    list: res.data.data
                })
                that.list()
            }
        })
    },
    list() {
        var that = this
        let personList = this.data.personList
        let i = 0
        /**
         * 1、调用外部js的方法ChineseToPinYin对数据进行分组
         * 2、分组的结果存在排序有误的情况,例如I组,V组等没有汉字的分组
        //  */
        this.data.list.forEach((item, index) => {
            let bool = personList.some(ite => {
                return ite.sign == pinyin.ChineseToPinYin(item.CustName).substr(0, 1)
            })
            if (personList.length == 0 || !bool) {
                personList.push({
                    id: i,
                    sign: pinyin.ChineseToPinYin(item.CustName).substr(0, 1),
                    name: [item]
                })
                i++
            } else if (bool) {
                let a = pinyin.ChineseToPinYin(item.CustName).substr(0, 1)
                for (let s in personList) {
                    if (a == personList[s].sign) {
                        personList[s].name.push(item)
                    }
                }
            }
        })
        this.setData({
            personList,
        })
        /**
         * 3、对分组好的数据进行排序
         * 4、根据标志sign的ASCII码进行初次排序筛选
         * 5、如果标志sign不在A到Z之间,则添加到#分组中
         */
        this.data.personList.forEach((item, index) => {
            if ((item.sign.charCodeAt() < 65 || item.sign.charCodeAt() > 90) && item.sign.charCodeAt() != 35) {
                this.data.personList.splice(index, 1, "")
                // 注:此处为防止splice分割后,数组索引index发生变化,故将需要剔除的元素替换为“”,后再将其剔除
                let i = this.data.personList.findIndex(item => {
                    return item.sign == '#'
                })
                if (i != -1) {
                    item.name.forEach(it => {
                        this.data.personList[i].name.push(it)
                    })

                } else {
                    this.data.personList.push({
                        id: 99,
                        sign: '#',
                        name: item.name
                    })
                }
            }
        })
        // 利用filter方法,剔除之前存在的空元素
        personList = this.data.personList.filter(function (s) {
            return s != ''; // 注：IE9(不包含IE9)以下的版本没有trim()方法
        });
        this.setData({
            personList
        })
        console.log(personList)
    },
    // 排序
    listSort(prop) {
        return function (a, b) {
            var value1 = a[prop].charCodeAt();
            var value2 = b[prop].charCodeAt();
            return value1 - value2
        }
    },
    // 点击列表中的人员
    choose(e) {
        console.log(e.currentTarget.dataset.item.CustID)
        let name = e.currentTarget.dataset.item.CustName
        let CustID=e.currentTarget.dataset.item.CustID
        let consultant=e.currentTarget.dataset.item.Consultant
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

        let prevPage = pages[pages.length - 2];

        prevPage.setData({
            CustID:CustID,
            selectCustomer:name,
            consultant:consultant
        })
        wx.navigateBack()

    }
})