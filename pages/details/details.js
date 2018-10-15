// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: ["http://static.lanxiang56.com/beijing.png", "http://static.lanxiang56.com/xian.png"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this
    wx.request({
      url: 'http://lvyq.free.idcfengye.com/business/businessWrongbook/api/query', //
      data: {
        bookid: options.bookid,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("错题详情", res)

        var imgList = res.data.imgUrl.split(',')
        that.setData({
          title: res.data.subjectText,
          addtime: res.data.addtime,
          imgUrl: imgList,
          isCapture: res.data.isCapture==1?"已攻克":'未攻克',
          testCenter: res.data.testCenter == 1 ? "知识考点" : '非知识考点',
          isFocus: res.data.isFocus == 1 ? "重点" : '非重点',
          theReason:res.data.theReason
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

  },
  previewImage: function(e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
})