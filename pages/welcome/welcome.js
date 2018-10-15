// pages/userAuth/userAuth.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          // app.checkAuth()
        }
      }
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
    // 查看是否授权

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
  bindGetUserInfo(e) {
    console.log()
    if (e.detail.userInfo) {
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          var encryptedData = res.encryptedData
          var iv = res.iv
          //login
          wx.login({
            success: res => {
              console.log(res)
              if (res.code) {
                wx.request({
                  url: 'http://lvyq.free.idcfengye.com/wxmp/mpFans/api/login', //仅为示例，并非真实的接口地址
                  method: 'POST',
                  data: {
                    code: res.code,
                    encryptedData: encryptedData,
                    iv: iv
                  },
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded' // 默认值
                  },
                  success(res) {
                    if (res.data.code == 200) {
                      app.globalData.openId = res.data.data.openId
                      wx.navigateBack({
                        delta: 1
                      })
                    } else {
                      wx.showToast({
                        icon: 'none',
                        title: res.data.msg,
                      })
                    }

                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
      })

    }

  }
})