// pages/information/information.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "初中", "高中"],
    index: 0,
    phone: '',
    name: '',
    school: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      array: app.globalData.njList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  showTopTips: function() {
    if (this.data.name == '') {
      wx.showToast({
        icon: 'none',
        title: '姓名不能为空',
      })
    } else if (this.data.school == '') {
      wx.showToast({
        icon: 'none',
        title: '学校不能为空',
      })
    } else if (this.data.phone == '') {
      wx.showToast({
        icon: 'none',
        title: '手机号不能为空',
      })
    } else {
      var that = this
      wx.request({
        url: 'https://www.wdxfedu.com/apiMan/wxmp/mpFans/api/update',
        data: {
          grade: that.data.index,
          name: that.data.name,
          currentSchool: that.data.school,
          mobile: that.data.phone,
          id: app.globalData.rellInfo.id,
          openid: app.globalData.openId
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res)
          if (res.data.msg == "操作成功") {
            wx.showToast({
              // icon: "none",
              title: res.data.msg,
            })
            setTimeout(function() {
              wx.switchTab({
                url: '/pages/mine/mine',
              })
            }, 2000)
          } else {
            wx.showToast({
              icon: "none",
              title: res.data.msg,
            })
          }
        }
      })
    }
  },
  name: function(e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  phone: function(e) {
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  school: function(e) {
    console.log(e.detail.value)
    this.setData({
      school: e.detail.value
    })
  }
})