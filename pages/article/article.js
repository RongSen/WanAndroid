// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    articleList: {
      page: 0,
      list: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBannerList();
    this.getArticleList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); //标题栏中显示加载图标

    var $this = this;
    var currentPage = 0;

    this.getArticleList({
      page: currentPage,
      success: function(res){

      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
        })
      },
      complete: function () {
        wx.hideNavigationBarLoading();  //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = this.data.articleList.page + 1;
    
    this.getArticleList(page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * banner点击事件
   */
  onSwiperTap: function(event){
    var target = event.target;
    var dataset = target.dataset;
    var postId = dataset.postId;
    var postUrl = dataset.postUrl;

    console.log(dataset);
  },

  onArticleTap: function(event){
    var dataset = event.currentTarget.dataset;
    var articleTitle = dataset.articleTitle;
    var artileUrl = dataset.articleUrl;

    wx.navigateTo({
      url: '/pages/article/article-detail/article-detail?articleTitle=' + articleTitle + '&articleUrl=' + artileUrl,
    })
  },

  getBannerList: function(){
    var $this = this;
    wx.request({
      url: 'http://www.wanandroid.com/banner/json',
      success: function (res) {
        $this.setData({
          bannerList: res.data.data
        });
      },
      fail: function (res) {

      }
    })
  },

  getArticleList: function(options){
    var opt = options || {};
    var $this = this;

    var page = opt.page==undefined ? 0 : opt.page;
    var url = 'http://www.wanandroid.com/article/list/'+page+'/json';
    wx.request({
      url: url,
      success: function (res) {
        var list = $this.data.articleList.list.concat(res.data.data.datas);
        $this.setData({
          articleList: {
            page: res.data.data.curPage,
            list: list
          }
        });
        if (typeof (opt.success) =='function'){
          opt.success(res);
        }
      },
      fail: function (res){
        if (typeof (opt.fail)=='function'){
          opt.fail(res);
        }
      },
      complete: function(){
        if (typeof (opt.complete)=='function'){
          opt.complete();
        }
      }
    })
  }
})