import Vue from 'vue';
import AV from 'leancloud-storage'

var APP_ID = 'Gdou7D09Em0cGH4U9WXQCKvT-gzGzoHsz';
var APP_KEY = 'XxRnz14QTeasIsPqwqJGjcmc';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: [],
    actionType: 'signUp',
    formData: {
      username: '',
      password: ''
    },
    currentUser: null
  },
  created: function () {
    var _this = this;
    window.onbeforeunload = function () {
      var dataString = JSON.stringify(_this.todoList);
      window.localStorage.setItem('myTodos', dataString);
      var dataInput = JSON.stringify(_this.newTodo);
      window.localStorage.setItem('newTodo', dataInput);
    }
    var oldDataString = window.localStorage.getItem('myTodos')
    var oldDataInput = window.localStorage.getItem('newTodo')
    var oldData = JSON.parse(oldDataString);
    var oldInput = JSON.parse(oldDataInput);
    this.todoList = oldData || [];
    this.newTodo = oldInput || '';
    this.currentUser = this.getCurrentUser();

    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
  },
  methods: {
    addTodo: function () {
      this.todoList.push({
        title: this.newTodo,
        createdAt: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        done: false
      })
      this.newTodo = '';
    },
    removeTodo: function (todo) {
      let index = this.todoList.indexOf(todo)
      this.todoList.splice(index, 1)
    },
    signUp: function () {
      // 新建 AVUser 对象实例
      var user = new AV.User();
      // 设置用户名
      user.setUsername(this.formData.username);
      // 设置密码
      user.setPassword(this.formData.password);
      user.signUp().then((loginedUser) => {
        this.currentUser = this.getCurrentUser()
      }, function (error) {
        alert('注册失败')
      });
    },
    login: function () {
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
        this.currentUser = this.getCurrentUser()
      }, function (error) {
        alert('登录失败')
      });
    },
    getCurrentUser: function () { // 👈
      let current = AV.User.current()
      if (current) {
        let { id, createdAt, attributes: { username } } = current
        return { id, username, createdAt }
      } else {
        return null
      }
    },
    logout: function () {
      AV.User.logOut()
      this.currentUser = null
      window.location.reload()
    }
  }
})  