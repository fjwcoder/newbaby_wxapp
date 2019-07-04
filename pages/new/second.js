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
    num: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var babyInfo = wx.getStorageSync('baby_id');
    console.log(babyInfo)
    this.setData({
      babyId: babyInfo.id,
      father_name: babyInfo.father_name,
      father_age: babyInfo.father_age,
      father_nation: babyInfo.father_nation,
      father_id_no: babyInfo.father_id_no,
      mother_name: babyInfo.mother_name,
      mother_age: babyInfo.mother_age,
      mother_nation: babyInfo.mother_nation,
      mother_id_no: babyInfo.mother_id_no,

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
   * 跳转到第1页
   */
  jumpToPage1(e) {
    wx.redirectTo({
      url: 'index',
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
   * 点击下一步（提交）
   */
  nextStep(e) {
    let _this = this;
    console.log(e)
    var values = e.detail.value
    values.user_token = App.getGlobalData('user_token'),
      values.baby_id = _this.data.babyId
    // 表单验证
    if (!_this.verification(values)) {
      App.showError(_this.data.error);
      return false;
    }
    App._post_form('baby/editParentsInfo', values, function (result) {
      console.log(result)
      if (result.code === 200) {
        App.setStorage('babyid', result.data.babyInfo)
      }
    })

    wx.navigateTo({
      url: 'finish'
    })
    console.log("提交")
  },
  /**
   * 表单验证
   */
  verification(e) {
    console.log(e);
    if (e.father_name === '') {
      this.data.error = '请输入父亲姓名';
      return false;
    }
    if (e.father_age === '') {
      this.data.error = '请输入父亲年龄';
      return false;
    }
    if (e.father_nation === '') {
      this.data.error = '请输入父亲民族';
      return false;
    }
    if (e.father_id_no === '' || e.father_id_no.length < 18) {
      this.data.error = '请正确输入父亲身份证号';
      return false;
    }
    if (e.mother_name === '') {
      this.data.error = '请输入母亲姓名';
      return false;
    }
    if (e.mother_age === '') {
      this.data.error = '请输入母亲年龄';
      return false;
    }
    if (e.mother_nation === '') {
      this.data.error = '请输入母亲民族';
      return false;
    }
    var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (!idcardReg.test(e.mother_id_no)) {
      this.data.error = '请正确输入母亲身份证号';
      return false;
    }


    return true;
  },
})