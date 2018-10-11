var msg, token, IMEI, filePath

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
    // this.audioCtx = wx.createAudioContext('myAudio')
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log("getSystemInfo",res)
        IMEI = res.SDKVersion
      }
    })
    that.tts()
    that.sendMessage()
  },

  sendMessage: function() {
    msg = "good good";
    this.cancel()
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

        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容

        if (res.statusCode === 200) {

          // wx.playVoice({

          //   filePath: res.tempFilePath

          // })
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

        innerAudioContext.onError((res) => {

      console.log(res.errMsg)

      console.log(res.errCode)

    })

  }

})