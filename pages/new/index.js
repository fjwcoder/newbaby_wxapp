// pages/new/index.js
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numList: [{
      name: '宝宝'
    }, {
      name: '父母'
    }, {
      name: '监护人'
    }],
    region:['北京市','北京市','东城区'],
    sex_arr: ["男", "女"],
    birth_place_arr: ['请选择','医院', '妇幼保健院', '家庭', '其它'],
    health_arr: ['请选择','良好', '一般', '差'],
    health_index: '',
    num: -1,
    scroll: 0,
    baby_sex: '',
    birth_place_index: '',
    date: '请选择',
    ceshi: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      babyId: parseInt(options.baby_id)
    })
    if (options.baby_id) {
      this.getBabyInfo(parseInt(options.baby_id))
    }
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
   * 拉取baby信息
   */
  getBabyInfo(baby_id) {
    let _this = this
    App._post_form('baby/getbabyinfo', {
      user_token: App.getGlobalData('user_token'),
      baby_id
    }, function (result) {
      console.log(result)
      _this.setData({
        birth_certificate_no: result.data.birth_certificate_no,
        vaccine_certificate_no: result.data.vaccine_certificate_no,
        full_name_of_baby: result.data.full_name_of_baby,
        babySex: result.data.baby_sex,
        date: result.data.date_of_birth,
        pregnant_week: result.data.pregnant_week,
        baby_height: result.data.baby_height,
        health_index: result.data.health_status,
        region: result.data.place_of_birth.split(','),
        birth_place_index: result.data.birth_place_type,
        name_of_facility: result.data.name_of_facility,
        baby_weight:result.data.baby_weight,
      })
    })
  },
  /**
   * 选择地区
   */
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 跳转到第二页
   */
  jumpToPage2(e) {
    wx.redirectTo({
      url: 'second',
    })
  },
  /**
   * 跳转到第三页
   */
  jumpToPage3(e) {
    wx.redirectTo({
      url: 'finish',
    })
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
   * 修改性别
   */
  // SexChange(e) {
  //   console.log(e);
  //   this.setData({
  //     baby_sex: e.detail.value
  //   })
  // },
  babySexChange(e) {
    this.setData({
      baby_sex: e.detail.value
    })
  },
  /**
   * 健康状况
   */
  choosingHealth(e) {
    this.setData({
      health_index: e.detail.value
    })
  },
  /**
   * 出生地点分类
   */
  birthPlaceClass(e) {
    this.setData({
      birth_place_index: e.detail.value
    })
  },
  /**
   * 点击下一步（提交）
   */
  nextStep(e) {
    let _this = this;
    console.log(e)
    var values = e.detail.value
    //处理字符串
    values.baby_sex = parseInt(values.baby_sex);
    values.birth_place_type = parseInt(values.birth_place_type);
    values.baby_weight = parseInt(values.baby_weight);
    values.baby_height = parseInt(values.baby_height);
    values.pregnant_week = parseInt(values.pregnant_week);
    values.user_token = App.getGlobalData("user_token");
    values.baby_id = _this.data.babyId,
    console.log(values)
    // 表单验证
    if (!_this.verification(values)) {
      App.showError(_this.data.error);
      return false;
    }
    App._post_form('baby/editbabyinfo', values, function (result) {
      console.log(result)
      if (result.code === 200) {
        App.setStorage('baby_id',result.data.babyInfo)
  
        wx.navigateTo({
          url: 'second?baby_id='+_this.data.babyId
        })
      }
    })

    console.log("提交")
  },
  /**
   * 表单验证
   */
  verification(e) {
    if (e.baby_sex === '') {
      this.data.error = '请选择宝宝性别';
      return false;
    }
    if (e.date_of_birth === '请选择') {
      this.data.error = '请选择宝宝出生日';
      return false;
    }
    if (e.pregnant_week === '') {
      this.data.error = '请输入出生孕周';
      return false;
    }
    if (e.baby_weight === '') {
      this.data.error = '请输入宝宝体重';
      return false;
    }
    if (e.baby_height === '') {
      this.data.error = '请输入宝宝身高';
      return false;
    }
    if (e.health_status === '') {
      this.data.error = '请输入宝宝健康状况';
      return false;
    }
    if (e.birth_place_type === '') {
      this.data.error = '请选择出生地点分类';
      return false;
    }
    if (e.name_of_facility === '') {
      this.data.error = '请输入接生机构名称';
      return false;
    }

    return true;
  },

})