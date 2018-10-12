// pages/dictation/dictation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arry: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(options)
    var that = this
    wx.request({
      url: 'http://lvyq.free.idcfengye.com/business/businessText/api/list', 
      data: {
        // textId: 0,
        semester: options.semester+1,
        subject: options.subject,
        grade: options.gradetext+1,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        wx.hideLoading()
        console.log(res.data)
        var list = res.data.data
        for(var i =0;i<list.length;i++){
          var words = list[i].words.split(',')
          list[i].words = words
        }
        console.log("听默列表", list)
        that.setData({
          arry: list
        })
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