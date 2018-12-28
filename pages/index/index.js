//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputShowed: false,
    inputVal: "",
    list: ["数学", "语文", "英语", "科学", "奥数"],
    swiperData: [],
    listSwiper: [],
    currentTab: 0,
    Swiper0: ["数学", "语文", "英语"],
    Swiper2: ["语文", "英语", "体育"],
    Swiper3: [
      ["美术", "英语", "体育"]
    ],
    arrID: []
  },
  onLoad: function() {

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  //事件处理函数

  bindconfirm: function(e) {
    console.log(e.detail.value)
    wx.navigateTo({
      url: '/pages/list/list?value=' + e.detail.value,
    })
  },

  switchTab: function(e) {
    var cur = e.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      currentTab: e.detail.current,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
    this.checkCor();
    var that = this
    wx.request({
      url: 'https://www.wdxfedu.com/apiMan/business/businessWrongbook/api/list', //
      data: {
        subject: that.data.arrID[e.detail.current],
        openid: app.globalData.openId
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
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var cur = e.target.dataset.current;
    var singleNavWidth = this.data.windowWidth / 5;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        navScrollLeft: (cur - 2) * singleNavWidth,
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
    // if (this.data.currentTab > 4) {
    //   this.setData({
    //     scrollLeft: (cur - 2) * singleNavWidth
    //   })
    // } else {
    //   this.setData({
    //     scrollLeft: 0
    //   })
    // }
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
    this.setData({
      currentTab: 0,
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.wdxfedu.com/apiMan/common/sysDict/api/list/subject', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var arr = []
        var arrID = []
        for (var i = 0; i < res.data.length; i++) {
          arr.push(res.data[i].name); //属性
          arrID.push(res.data[i].value)
        }
        console.log('科目列表', arr)
        console.log('科目ID列表', arrID)
        app.globalData.kcList = arr
        app.globalData.kcListID = arrID
        that.setData({
          list: arr,
          arrID: arrID
        })
      }
    })
    wx.request({
      url: 'https://www.wdxfedu.com/apiMan/common/sysDict/api/list/grade ', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var gra = []
        var graID = []
        for (var i = 0; i < res.data.length; i++) {
          gra.push(res.data[i].name); //属性
          graID.push(res.data[i].value); //属性
        }
        console.log('年级列表', gra)
        console.log('年级列表id', graID)
        app.globalData.njList = gra
        app.globalData.njListID = graID
      }
    })
    wx.request({
      url: 'https://www.wdxfedu.com/apiMan/common/sysDict/api/list/semester ', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var xueqi = []
        var xueqiID = []
        for (var i = 0; i < res.data.length; i++) {
          xueqi.push(res.data[i].name); //属性
          xueqiID.push(res.data[i].value); //属性
        }
        console.log('学期列表', xueqi)
        console.log('学期列表id', xueqiID)
        app.globalData.xueqi = xueqi
        app.globalData.xueqiID = xueqiID
      }
    })
    wx.request({
      url: 'https://www.wdxfedu.com/apiMan/common/sysDict/api/list/questiontype ', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var questionType = []
        var questionTypeID = []
        for (var i = 0; i < res.data.length; i++) {
          questionType.push(res.data[i].name); //属性
          questionTypeID.push(res.data[i].value); //属性
        }
        console.log('题型列表', questionType)
        console.log('题型列表ID', questionTypeID)
        app.globalData.questionType = questionType
        app.globalData.questionTypeID = questionTypeID
      }
    })
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              var encryptedData = res.encryptedData
              var iv = res.iv
              //login
              wx.login({
                success: res => {
                  if (res.code) {
                    wx.request({
                      url: 'https://www.wdxfedu.com/apiMan/wxmp/mpFans/api/login',
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
                        console.log("登录", res)
                        app.globalData.rellInfo = res.data.data
                        if (res.data.code == 200) {
                          app.globalData.openId = res.data.data.openid
                          wx.request({
                            url: 'https://www.wdxfedu.com/apiMan/business/businessWrongbook/api/list', //
                            data: {
                              subject: 0,
                              openid: res.data.data.openid
                            },
                            header: {
                              'Content-Type': 'application/x-www-form-urlencoded' // 默认值
                            },
                            success(res) {
                              // console.log("错题列表", res.data.data)
                              if (res.data.msg == "操作成功") {
                                var newArry = res.data.data
                                for (var i = 0; i < newArry.length; i++) {
                                  var dataList = newArry[i].addtime.split(' ')
                                  var imgList = newArry[i].imgUrl.split(',')
                                  newArry[i].addtime = dataList[0]
                                  newArry[i].imgUrl = imgList
                                }
                                // console.log("错题列表", newArry)
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
        } else {
          //未授权=> 去授权页
          wx.navigateTo({
            url: '/pages/welcome/welcome',
          })
        }
      },
      fail: res => {
        console.log(res)
      }
    })

    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          windowWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          windowWidth: windowWidth,
          winHeight: calc,
          listSwiper: new Array(that.data.list.length)
        });
      }
    });
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
  goDetails: function(e) {
    // console.log(e.currentTarget.dataset.index)
    var bookid = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/details/details?bookid=' + bookid,
    })
  }
})