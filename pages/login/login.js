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

  },

  /**
   * create by fjw in 19.7.3
   * 重写授权登录
   */
  authorLogin: function(){
    let _this = this;
    wx.login({
      success: function(res){
        console.log(res);
        if (res.errMsg !== 'login:ok'){
          return false;
        }
        wx.showLoading({ title: "正在登录", mask: true });
        wx.getUserInfo({
          success: function(e){
            // console.log(e);
            if (e.errMsg !== 'getUserInfo:ok'){
              return false;
            }
            // 数据发送到后台
            App._post_form('Common/wxappLogin'
            , {
                code: res.code,
                user_info: e.rawData,
                encrypted_data: e.encryptedData,
                iv: e.iv,
                signature: e.signature
            }
            , function (result) { // 成功
                console.log(result);
                // 记录token user_id

                App.globalData.user_id = result.data.user_id;
                wx.setStorageSync('user_id', result.data.user_id);

                App.globalData.user_token = result.data.user_token;
                wx.setStorageSync('user_token', result.data.user_token);

                // 跳转回原页面
                _this.navigateBack();
            }
            , false
            , function () {
              wx.hideLoading();
            });

          }
        })
      }
    })
  },

  /**
   * 授权成功 跳转回原页面
   */
  navigateBack: function () {
    // console.log('授权成功 跳转回原页面');
    wx.navigateBack();
    // let currentPage = wx.getStorageSync('currentPage');
    // wx.redirectTo({
    //   url: '/' + currentPage.route + '?' + App.urlEncode(currentPage.options)
    // });
  },

})