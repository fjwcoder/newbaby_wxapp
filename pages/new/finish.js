let App = getApp();
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
    region: ['北京市', '北京市', '东城区'],
    relationshipArr:['请选择','父子','母子','父女','母女'],
    num: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var babyInfo = wx.getStorageSync('baby_id');
    console.log(babyInfo)
    this.setData({
      babyId: babyInfo.id,
      guardian_name: babyInfo.guardian_name,
      guardian_mobile: babyInfo.guardian_mobile,
      backup_mobile: babyInfo.backup_mobile,
      relationship_to_baby: babyInfo.relationship_to_baby,
      address: babyInfo.address,
      area: babyInfo.area.split(','),
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
   * 跳转到第二页
   */
  jumpToPage2(e) {
    wx.redirectTo({
      url: 'second',
    })
  },
   /**
   * 监护人与baby的关系
   */
  choosingRelationship(e) {
    this.setData({
      relationshipIndex: e.detail.value
    })
  },
  /**
   * 跳转到第1页
   */
  jumpToPage1(e) {
    console.log("fnejinf")
    wx.redirectTo({
      url: 'index',
    })
  },
  /**
   * 选择地区
   */
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 点击提交
   */
  submitData(e) {
    let _this = this;
    console.log(e)
    var values = e.detail.value
    values.user_token = App.getGlobalData('user_token'),
    values.baby_id = _this.data.babyId;
    values.province = _this.data.region[0];
    values.city = _this.data.region[1];
    values.area = _this.data.region[2];
    // 表单验证
    if (!_this.verification(values)) {
      App.showError(_this.data.error);
      return false;
    }
    App._post_form('baby/editGuardianInfo', values, function (result) {
      console.log(result)
      if(result.code === 200){
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1500,
          mask: false,
        });
        wx.reLaunch({
          url: '../user/myBabyList',
        });
          
      }
    })

    console.log("提交")
  },
  /**
   * 表单验证
   */
  verification(e) {
    console.log(e);
    if (e.guardian_name === '') {
      this.data.error = '请输入监护人姓名';
      return false;
    }
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!reg.test(e.guardian_mobile)) {
      this.data.error = '请正确输入监护人手机号';
      return false;
    }
    if (!reg.test(e.backup_mobile)) {
      this.data.error = '请正确输入监护人备用手机号';
      return false;
    }
    if (e.relationship_to_baby === '') {
      this.data.error = '请输入监护人与宝宝的关系';
      return false;
    }
    if (e.address === '' || e.address.length < 10) {
      this.data.error = '请正确输入监护人家庭住址';
      return false;
    }

    return true;
  },
})