// pages/user/addInoculate.js
let App = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择',
    partsArr: ['请选择', '左上臂', '右上臂', '口服', '左臀部', '右臀部', '左大腿', '右大腿'],
    part_index: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      date: time,
      type: parseInt(options.type),
      baby_id: parseInt(options.baby_id),
      inject_id: parseInt(options.inject_id),
      today:App.year + '-' + App.month + '-' + App.day
    });
    if (this.data.type) {
      this.getBabyInjectInfo(parseInt(options.baby_id), parseInt(options.inject_id))
    }

    console.log(options)
    console.log(this.data.baby_id)
    console.log(parseInt(this.data.inject_id))
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
   * 修改出生日期
   */
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 选择接种部位
   */
  choosingPart(e) {
    console.log(e)
    this.setData({
      part_index: e.detail.value
    })
  },
  /**
   * 提交数据
   */
  saveData(e) {
    let _this = this;

    console.log(e)

    var values = e.detail.value
    values.baby_id = _this.data.baby_id
    if (this.data.type){
      values.inject_id = _this.data.inject_id
    } 
      values.user_token = App.getGlobalData('user_token')
      console.log(values)
         // 表单验证
    if (!_this.verification(values)) {
      App.showError(_this.data.error);
      return false;
    }
    App._post_form('inject/editBabyInjectInfo', values, function (result) {
      console.log(result)
    })
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 获取baby接种详情
   */
  getBabyInjectInfo(baby_id, inject_id) {
    let _this = this;
    App._post_form('inject/getBabyInjectInfo', {
      baby_id: baby_id,
      inject_id: inject_id,
      user_token: App.getGlobalData('user_token')
    }, function (result) {
      console.log(result)
      _this.setData({
        vaccine_name: result.data.vaccine_name,
        vaccine_factory: result.data.vaccine_factory,
        vaccine_branch_no: result.data.vaccine_branch_no,
        part_index: parseInt(result.data.inject_body_part),
        date: result.data.inject_date,
        reaction: result.data.reaction,
      })

    })
  },
  /**
   * 表单验证
   */
  verification(e) {
    console.log(e);
    if (e.vaccine_name === '') {
      this.data.error = '请输入疫苗名称';
      return false;
    }
    if (e.inject_body_part === '0' || e.inject_body_part === 0) {
      this.data.error = '请选择接种部位';
      return false;
    }
    if (e.inject_date > this.data.today) {
      this.data.error = '接种时间不可晚于今日';
      return false;
    }
    if (e.reaction === '') {
      this.data.error = '请输入接种后的反应';
      return false;
    }
    return true;
  },
})