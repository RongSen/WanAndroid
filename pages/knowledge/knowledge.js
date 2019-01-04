// pages/knowledge/knowledge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChapterList();
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

  getChapterList: function(){
    var $this = this;
    wx.request({
      url: 'http://www.wanandroid.com/tree/json',
      success: function(res){
        var chapterList = res.data.data;
        for (var i = 0; i < chapterList.length;i++){
          var chapter = chapterList[i];
          chapter.childrensName = $this.getChapterChildrensName(chapter.children);
        }
        $this.setData({
          chapterList: chapterList
        });
      },
      fail: function(res){

      },
      complete: function(){

      }
    })
  },

  getChapterChildrensName: function(childrenList){
    var result = "";
    for(var i=0;i<childrenList.length;i++){
      result = result + " " + childrenList[i].name;
    }
    return result;
  }
})