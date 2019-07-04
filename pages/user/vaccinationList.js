// pages/user/vaccinationList.js
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArr: [
      "green", "blue", "cyan", "olive", "green", "blue", "cyan", "olive","green", "blue", "cyan", "olive","green", 
      "blue", "cyan", "olive","green", "blue", "cyan", "olive","green", "blue", "cyan", "olive","green", "blue", "cyan", "olive","green",
      "blue", "cyan", "olive","green", "blue", "cyan", "olive","green", "blue", "cyan", "olive","green", "blue", "cyan", "olive",
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(parseInt(options.baby_id)),
    this.getBabyInjectList(parseInt(options.baby_id))
    this.setData({
      babyId:options.baby_id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取baby接种列表
   */
  getBabyInjectList(baby_id) {
    let _this = this
    App._post_form('inject/getBabyInjectList', {baby_id,user_token:App.getGlobalData('user_token')}, function (result) {
      console.log(result)
      _this.setData({
        inject_list:result.data.inject_list
      })
    })
  },
  /**
   * 
   */
  jumpAddInoculate() {
    wx.navigateTo({
      url: 'addInoculate?type=0',
    });
  },
  jumpEditInoculate(e) {
    var inject_id = e.currentTarget.dataset.injectid
    wx.navigateTo({
      url: 'addInoculate?type=1&inject_id=' + inject_id+'&baby_id='+this.data.babyId,
    });
  }
})