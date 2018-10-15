// pages/uploadImg/uploadImg.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    array: ["语文", "数学", "英语"],
    array2: ["语文", "数学", "英语"],
    index: 0,
    index2: 0,
    disable: true,
    items: [{
        name: '1',
        value: '是知识考点',
        checked: true
      },
      {
        name: '0',
        value: '不是知识考点',

      }
    ],
    items2: [{
        name: '1',
        value: '已攻克',
        checked: true
      },
      {
        name: '0',
        value: '未攻克',

      }
    ],
    items3: [{
        name: '1',
        value: '是重点',
        checked: true
      },
      {
        name: '0',
        value: '不是重点',

      }
    ],
    seleted: 1,
    seleted2: 1,
    seleted3: 1,
    title: '',
    yuanyin: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      array: app.globalData.kcList,
      array2: app.globalData.questionType,
    })
  },
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      count: 4 - that.data.files.length,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        // that.setData({
        //   files: that.data.files.concat(tempFilePaths)
        // });
        var myDate = new Date()
        // var ossPath = 'seekings/' + myDate.getFullYear()
        for (var i = 0; i < tempFilePaths.length; i++) { // 获取文件后缀

          that.uploadImg(tempFilePaths, i)

        }

      }
    })
  },
  uploadImg(tempFilePaths, i) {
    var that = this
    var pathArr = tempFilePaths[i].split('.') //  随机生成文件名称
    var fileRandName = Date.now() + "" + parseInt(Math.random() * 1000)
    var fileName = fileRandName + '.' + pathArr[pathArr.length - 1] // 要提交的key    
    var fileKey = fileName
    var imgPath = 'http://wdxfedu.oss-cn-hangzhou.aliyuncs.com/' + fileKey
    wx.uploadFile({
      url: 'http://wdxfedu.oss-cn-hangzhou.aliyuncs.com/',
      filePath: tempFilePaths[i],
      name: 'file',
      formData: {
        name: tempFilePaths[i],
        key: fileKey,
        policy: 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
        OSSAccessKeyId: 'LTAI40OGe4s7zlyS',
        signature: 'ewnOTkgIo8+f7q1JuMgk6A3sB7k=',
        success_action_status: "200"
      },
      success: function(res) {
        console.log("上传图片结果", res)
        if (res.statusCode == 200) {
          that.setData({
            files: that.data.files.concat(imgPath)
          });
        } else {
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          })
        }
      }
    })
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let value = e.detail.value;
    this.setData({
      seleted: value
    })
  },
  radioChange2: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let value = e.detail.value;
    this.setData({
      seleted2: value
    })
  },
  radioChange3: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let value = e.detail.value;
    this.setData({
      seleted3: value
    })
  },
  previewImage: function(e) {
    console.log(this.data.files)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  bindPickerChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      index2: e.detail.value
    })
  },
  title: function(e) {
    // console.log(e.detail.value)
    this.setData({
      title: e.detail.value
    })
  },
  yuanyin: function(e) {
    this.setData({
      yuanyin: e.detail.value
    })
  },
  showTopTips: function() {
    if (this.data.disable) {

      if (this.data.yuanyin == '') {
        wx.showToast({
          icon: 'none',
          title: '请输入错题原因',
        })
      } else {
        if (this.data.files == '') {
          wx.showToast({
            icon: 'none',
            title: '请选择图片',
          })
        } else {
          this.setData({
            disable: false
          })
          // console.log(app.globalData.openId)
          var that = this
          wx.request({
            url: 'http://lvyq.free.idcfengye.com/business/businessWrongbook/api/save',
            method: 'post',
            data: {
              openid: app.globalData.openId,
              subject: app.globalData.kcListID[this.data.index],
              questionType: app.globalData.questionTypeID[this.data.index2],
              testCenter: this.data.seleted,
              isCapture: this.data.seleted2,
              isFocus: this.data.seleted3,
              theReason: this.data.yuanyin,
              imgUrl: this.data.files
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded' // 默认值
            },
            success(res) {
              if (res.data.msg == "操作成功") {
                wx.showToast({
                  // icon: 'none',
                  title: '操作成功'
                })

                setTimeout(function() {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }, 2000)
              } else {
                that.setData({
                  disable: true
                })
                wx.showToast({
                  icon: 'none',
                  title: res.data.msg,
                })
              }
            }
          })
        }
      }

      console.log(this.data.yuanyin)
      console.log(this.data.seleted)
      console.log(this.data.seleted2)
      console.log(this.data.seleted3)
      console.log(this.data.files)
      console.log(this.data.array[this.data.index])
    }


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