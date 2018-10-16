// pages/dictation/dictation.js
var msg, token, IMEI, filePath
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arry: [],
    lisen: true
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
    wx.getSystemInfo({
      success: function(res) {
        console.log("getSystemInfo", res)
        IMEI = res.SDKVersion
      }
    })
    that.tts()
    wx.request({
      url: 'http://lvyq.free.idcfengye.com/business/businessText/api/list',
      data: {
        // textId: 0,
        semester: options.semester + 1,
        subject: options.subject,
        grade: options.gradetext + 1,
        openid: app.globalData.openId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        wx.hideLoading()
        console.log(res.data)
        var list = res.data.data
        for (var i = 0; i < list.length; i++) {
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
  sendMessage: function(event) {
    if (this.data.lisen) {
      this.setData({
        lisen: false
      })
      wx.showLoading({
        title: '正在播放',
      })
      let index = event.currentTarget.dataset.index;
      console.log(index)
      let _this = this;
      let wordIndex = 0;
      console.log(this.data.arry[index].words)
      let interVal = setInterval(function() {
        _this.cancel(_this.data.arry[index].words[wordIndex]);
        wordIndex++;
        if (wordIndex >= _this.data.arry[index].words.length) {
          clearInterval(interVal);
          wx.hideLoading();
          _this.setData({
            lisen: true
          })
        }
      }, 5000)
    }
  },

  tts: function(e) {

    var grant_type = "client_credentials";

    var appKey = "ICQGd9959BdZFBpp8kEBYZMU";

    var appSecret = "B7xwRWzmpceOmw0wYat3V1vdNcib79x3";

    //  var url = "https://openapi.baidu.com/oauth/2.0/token" + "grant_type=" + grant_type + "&client_id=" + appKey + "&client_secret=" + appSecret

    var url = "https://openapi.baidu.com/oauth/2.0/token"

    wx.request({

      url: url,

      data: {

        grant_type: grant_type,

        client_id: appKey,

        client_secret: appSecret

      },

      method: "GET",

      header: {

        'content-type': 'application/json' // 默认值

      },

      success: function(res) {

        console.log(res.data)

        token = res.data.access_token

      }

    })

  },

  // 合成

  cancel: function(e) {
    console.log(e)
    var that = this
    var text = e

    var tex = encodeURI(text); //转换编码url_encode UTF8编码

    var tok = token;

    var cuid = IMEI;

    var ctp = 1;

    var lan = "zh";   // zh表示中文

    // 字符编码

    var spd = 4;  // 表示朗读的语速，9代表最快，1是最慢（撩妹请用2，绕口令请用9）

    var url = "https://tsn.baidu.com/text2audio?tex=" + tex + "&lan=" + lan + "&cuid=" + cuid + "&ctp=" + ctp + "&tok=" + tok + "&spd=" + spd

    wx.downloadFile({

      url: url,

      success: function(res) {

        console.log(res)

        filePath = res.tempFilePath;
        if (res.statusCode === 200) {
          that.play(filePath)
        }

      }

    })

  },
  play: function(e) {
    //播放
    const innerAudioContext = wx.createInnerAudioContext()

    innerAudioContext.autoplay = true

    innerAudioContext.src = e

    innerAudioContext.onPlay(() => {

      console.log('开始播放')

    })
    innerAudioContext.onEnded(() => {

      console.log('播放结束')

      // that.setData({ audioStatus: false })

    })

    innerAudioContext.onError((res) => {

      console.log(res.errMsg)

      console.log(res.errCode)

    })

  },
  test(event) {
    console.log(event.currentTarget.dataset.readyId)
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