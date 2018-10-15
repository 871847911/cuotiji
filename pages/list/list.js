// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.value)
    var that = this
    wx.request({
      url: 'http://lvyq.free.idcfengye.com/business/businessWrongbook/api/list', //
      data: {
        theReasonText: options.value
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("错题列表", res.data.data)
        if (res.data.msg == "操作成功") {
          var newArry = res.data.data
          for (var i = 0; i < newArry.length; i++) {
            var dataList = newArry[i].addtime.split(' ')
            var imgList = newArry[i].imgUrl.split(',')
            newArry[i].addtime = dataList[0]
            newArry[i].imgUrl = imgList
          }
          console.log("错题列表", newArry)
          that.setData({
            swiperData: newArry
          })
          wx.hideLoading()
        } else {
          wx.hideLoading()
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  goDetails: function(e) {
    // console.log(e.currentTarget.dataset.index)
    var bookid = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/details/details?bookid=' + bookid,
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

  }
})