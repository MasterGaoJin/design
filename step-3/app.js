import Vue from 'vue';
var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
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
        createdAt:  new Date().Format("yyyy-MM-dd hh:mm:ss"),
        done: false
      })
      this.newTodo = '';
    },
    removeTodo: function (todo) {
      let index = this.todoList.indexOf(todo)
      this.todoList.splice(index, 1)
    }
}
})  