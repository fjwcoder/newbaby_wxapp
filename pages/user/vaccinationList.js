// pages/user/vaccinationList.js
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArr: [
      "green", "blue", "cyan", "olive", "green", "blue", "cyan", "olive", "green", "blue", "cyan", "olive", "green",
      "blue", "cyan", "olive", "green", "blue", "cyan", "olive", "green", "blue", "cyan", "olive", "green", "blue", "cyan", "olive", "green",
      "blue", "cyan", "olive", "green", "blue", "cyan", "olive", "green", "blue", "cyan", "olive", "green", "blue", "cyan", "olive",
    ],
    days_style: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(parseInt(options.baby_id)),
    this.getBabyInjectList(parseInt(options.baby_id))
    this.setData({
      babyId: options.baby_id
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
    this.dealDateShow(App.year, App.month)
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
    App._post_form('inject/getBabyInjectList', {
      baby_id,
      user_token: App.getGlobalData('user_token')
    }, function (result) {
      console.log(result)
      _this.setData({
        inject_list: result.data.inject_list,
        baby_name: result.data.baby_info.full_name_of_baby ? result.data.baby_info.full_name_of_baby : '(未填写)',
        baby_birth: result.data.baby_info.date_of_birth,
        remind_days: result.data.remind_days,
        vaccine_days: result.data.vaccine_days
      })

    })

  },
  /**
   * 月份显示
   */
  dealDateShow(year, month) {
    wx.showLoading({
      title: '加载中'
    })
    var remind_days = this.data.remind_days
    var days_style = []
    var current_year_month = App.year + '-' + App.month
    var this_year_month = year + '-' + month
    //显示年月 = 当前年月，显示今日
    if (this_year_month == current_year_month) {
      days_style.push({
        month: 'current',
        day: App.day,
        color: 'white',
        background: '#AAD4F5'
      })
    }
    for (var index in remind_days) {
      console.log(index)
      var year_month = remind_days[index].substr(0, 7)
      if (year_month == this_year_month) {
        days_style.push({
          month: 'current',
          day: remind_days[index].substr(-2, 2),
          color: 'white',
          background: '#FF0000'
        })
      }
    }
    this.setData({
      days_style: days_style
    })
    wx.hideLoading();
  },
  /**
   * 点击日期
   */
  dayClick(e) {
    console.log(e)
    wx.showLoading({
      title: '加载中',
    })
    var _year = String(e.detail.year)
    var _month = String(e.detail.month)
    var _day = String(e.detail.day)
    _month = (_month.length < 2) ? '0' + _month : _month
    _day = (_day.length < 2) ? '0' + _day : _day
    var _this_date = _year + '-' + _month + '-' + _day
    var remind_vaccine_str = ''
    for (var index in this.data.remind_days) {

      if (_this_date == this.data.remind_days[index]) {
        remind_vaccine_str = this.data.vaccine_days[index]
        // console.log(remind_vaccine_str);
        break;

      }

    }
    // 后台获取疫苗信息数据数据


    wx.hideLoading(); // 这个需要放到异步里边
  },
  /**
   * 上个月
   */
  prevMonth(e) {
    this.changeYearMonth(e);
  },
  /**
   * 下个月
   */
  nextMonth(e) {
    this.changeYearMonth(e);
  },
  /**
   * 改变年月
   */
  changeYearMonth(e) {
    var _year = String(e.detail.currentYear)
    var _month = String(e.detail.currentMonth)
    _month = (_month.length < 2) ? '0' + _month : _month
    this.dealDateShow(_year, _month)
  },
  /**
   * 选择日期
   */
  dateChange: function (e) {
    console.log(e)
    this.changeYearMonth(e);
  },
  /**
   * 
   */
  jumpAddInoculate() {
    wx.navigateTo({
      url: 'addInoculate?type=0&baby_id=' + this.data.babyId,
    });
  },
  jumpEditInoculate(e) {
    var inject_id = e.currentTarget.dataset.injectid
    wx.navigateTo({
      url: 'addInoculate?type=1&inject_id=' + inject_id + '&baby_id=' + this.data.babyId,
    });
  }
})