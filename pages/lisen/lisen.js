var msg, token, IMEI, filePath

Page({

     
    /** 

  * 页面的初始数据 

  */

    data: {
        msg :[
            { id: 0, words: ["你好", "再见"] },
            { id: 1, words: ["你好", "再见", "不好"] }
        ]
    },



     
    /** 

  * 生命周期函数--监听页面加载 

  */

    onLoad: function(options) {
        // this.audioCtx = wx.createAudioContext('myAudio')
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                console.log("getSystemInfo", res)
                IMEI = res.SDKVersion
            }
        })
        that.tts()
        // that.sendMessage()
    },

    sendMessage: function(event) {
        let index = event.currentTarget.dataset.index;
        let _this = this;
        let wordIndex = 0;
        let interVal = setInterval(function () {
            _this.cancel(_this.data.msg[index].words[wordIndex]);
            wordIndex ++;
            if (wordIndex >= _this.data.msg[index].words.length){
                clearInterval(interVal);
            }
        }, 5000)
        
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
    test(event){
        console.log(event.currentTarget.dataset.readyId)
    }

})