// pages/user/addInoculate.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择',
    partsArr:[
      {id:1,name:"左上臂"},
      {id:2,name:"右上臂"},
      {id:3,name:"口服"},
      {id:4,name:"左臀部"},
      {id:5,name:"右臀部"},
      {id:6,name:"左大腿"},
      {id:7,name:"右大腿"},
    ]
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
      type:parseInt(options.type)
    });
    console.log(options)
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
  choosingPart(e){
    console.log(e)
    this.setData({
      part_index:e.detail.value
    })
  },
  /**
   * 提交数据
   */
  saveData(e){
    console.log(e)
  }
})