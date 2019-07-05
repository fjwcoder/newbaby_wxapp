// pages/remind/vaccine.js

let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    days_style: [],
    // remind_days: 需要接种疫苗的日期数组，注意格式
    remind_days: [
      '2019-07-01', '2019-07-22', '2019-08-03', '2019-08-24', '2019-09-05'
    ],
    // vaccine_days: 对应remind_days里的日期，所需要接种的疫苗的id， 注意格式
    vaccine_days: [
      '1,2,3', '4,5', '6', '7,8,9', '10,11'
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



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
    // 默认显示当前年月
    this.dealDateShow(App.year, App.month);


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
   * add by fjw in 19.7.4
   * 点击日期事件
   */
  dayClick: function (event) {
    console.log(event)
    wx.showLoading({
      title: '加载中',
    })
    var _year = String(event.detail.year);
    var _month = String(event.detail.month);
    var _day = String(event.detail.day);
    _month = (_month.length < 2) ? '0' + _month : _month;
    _day = (_day.length < 2) ? '0' + _day : _day;
    var _this_date = _year + '-' + _month + '-' + _day;
    var remind_vaccine_str = '';
    for (var index in this.data.remind_days) {
      // console.log(index);
      if (_this_date == this.data.remind_days[index]) {
        remind_vaccine_str = this.data.vaccine_days[index];
        // console.log(remind_vaccine_str);
        break;

      }

    }
    // 后台获取疫苗信息数据数据


    wx.hideLoading(); // 这个需要放到异步里边
  },
  /**
   * add by fjw in 19.7.4
   * 处理月份日期显示
   */
  dealDateShow: function (year, month) {
    wx.showLoading({
      title: '加载中',
    })
    var remind_days = this.data.remind_days; // 检查日期
    var days_style = [];
    var current_year_month = App.year + '-' + App.month; // 当前的年月
    var this_year_month = year + '-' + month; // 显示的年月
    // 如果显示的年月=当前的年月，则显示今日
    if (this_year_month == current_year_month) {
      days_style.push({
        month: 'current',
        day: App.day,
        color: 'white',
        background: '#AAD4F5'
      });
    }

    for (var index in remind_days) {
      var year_month = remind_days[index].substr(0, 7);
      if (year_month == this_year_month) { // 找到当前年月
        days_style.push({
          month: 'current',
          day: remind_days[index].substr(-2, 2),
          color: 'white',
          background: '#FF0000'
        });
      }
    }
    this.setData({
      days_style: days_style
    });
    wx.hideLoading();
  },
  /**
   * add by fjw in 19.7.4
   * 下个月
   */
  nextMonth: function (event) {
    this.changeYearMonth(event);
  },
  /**
   * add by fjw in 19.7.4
   * 上个月
   */
  prevMonth: function (event) {
    this.changeYearMonth(event);
  },

  /**
   * add by fjw in 19.7.4
   * 选择日期
   */
  dateChange: function (event) {
    console.log(event)
    this.changeYearMonth(event);
  },
  /**
   * add by fjw in 19.7.4 
   * 改变年月
   */
  changeYearMonth: function (event) {
    var _year = String(event.detail.currentYear);
    var _month = String(event.detail.currentMonth);
    _month = (_month.length < 2) ? '0' + _month : _month;
    this.dealDateShow(_year, _month);
  }
})