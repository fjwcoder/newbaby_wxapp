// pages/user/myBabyList.js
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBabyList()
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
    this.getUserDetail()
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
   * 获取当前用户信息
   */
  getUserDetail: function () {

    if (App.isLogin() === false) { // create by fjw in 19.3.22: 如果用户没有登录，就重新登录
      wx.hideNavigationBarLoading();
      App.doLogin();
      return false;
    }

    let _this = this;

    // App._get('User/getUserDetail', {}, function (result) {
    //   this.setData(result.data);
    // });
  },
  /**
   * 跳转添加
   */
  jumpAddBaby: function () {
    wx.navigateTo({
      url: 'index',

    });
  },
  /**
   * 获取baby列表
   */
  getBabyList() {
    let _this = this
    App._post_form('baby/getbabylist', {user_token:App.getGlobalData('user_token')}, function (result) {
      console.log(result)
      _this.setData({
        baby_list:result.data
      })
    })
  },

})