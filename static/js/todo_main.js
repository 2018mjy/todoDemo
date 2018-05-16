var ajax = function(request) {
    /*
    request 是一个 object，有如下属性
        method，请求的方法，string
        url，请求的路径，string
        data，请求发送的数据，如果是 GET 方法则没有这个值，string
        callback，响应回调，function
    */
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType != undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    if (request.method == 'GET') {
        r.send()
    } else {
        r.send(request.data)
        console.log('r.send' + request.data + typeof request.data )
    }
}
var ajaxSync = function(request) {
    /*
    request 是一个 object，有如下属性
        method，请求的方法，string
        url，请求的路径，string
        data，请求发送的数据，如果是 GET 方法则没有这个值，string
        callback，响应回调，function
    */
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, false)
    if (request.contentType != undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    if (request.method == 'GET') {
        r.send()
    } else {
        r.send(request.data)
        console.log('r.send' + request.data + typeof request.data )
    }
}

var log = console.log.bind(console)
var e = function(selector) {
    var element = document.querySelector(selector)
    if (element == null) {
        var s = `元素没有找到, 选择器 ${selector} 没有找到或者 js 没有放在 body 前面`
        alert(s)
    } else {
        return element
    }
}

var templateTodo = (todo) => {
    var time = new Date(todo.created_time * 1000)
    var year = time.getFullYear()
    var month = time.getMonth()
    var day = time.getDate()
    var createtime = `${year}/${month}/${day}`
    var id = todo.id
    var title = todo.title
    var t = `
    <div class="todocell" data-id="${id}">
        <div class="todotime"><span class="timespan">${createtime}</span></div>
        <div class="todocontent">
            <div class="minusdiv"><img class="minusimg" src="/images/minus.png" /></div>
            <div class="spandiv"><span class="span">${title}</span></div>
            <div class="checkdiv"><img class="checkimg" src="/images/check.png" /></div>
        </div>
    </div>
    `
    return t
}

var insertTodo = (todo) => {
    var todocontainer = e('.todo-container')
    var html = templateTodo(todo)
    todocontainer.insertAdjacentHTML('beforeend', html)
}

var insertTodos = (todos) => {
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        var html = insertTodo(todo)
    }
}

var todoAll = () => {
    var request = {
        method: 'GET',
        url: '/api/todo/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var todos = JSON.parse(response)

            insertTodos(todos)
        }
    }
    ajax(request)
}

var todoNew = function(form) {

    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/todo/add',
        contentType: 'application/json',
        data: data,
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var res = JSON.parse(response)
        }
    }
    ajax(request)
}

var todoDelete = (id) => {
    var request = {
        method: 'POST',
        url: '/api/todo/delete' + id,
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var res = JSON.parse(response)
        }
    }
    ajax(request)
}
var actinAdd = () => {
    var form = todoData()
    var datastr = JSON.stringify(form)
    log('form-actionAdd', datastr , typeof datastr)
    var request = {
        method: 'POST',
        url: '/api/todo/add',
        contentType: 'application/json',
        data: datastr,
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var res = JSON.parse(response)
            console.log('响应', res)
            insertTodo(res)
        }
    }
    ajax(request)
}
var actionAll = () => {
    var request = {
        method: 'GET',
        url: '/api/todo/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var todos = JSON.parse(response)
            insertTodos(todos)
        }
    }
    ajax(request)
}
var actionDelete = (e) => {
    var self = e.target
    log('self',self)
    var todocell = self.closest('.todocell')
    var id  = todocell.dataset.id
    var request = {
        method: 'POST',
        url: '/api/todo/delete' + id,
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var res = JSON.parse(response)
            todocell.remove()
        }
    }
    ajax(request)
}
var actionGetTodo =(e) => {
    var self = e.target
    var todocell = self.closest('.todocell')
    var id  = todocell.dataset.id
    var request = {
        method: 'GET',
        url: '/api/todo/' + id,
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var res = JSON.parse(response)
            addUpdatediv(res)
        }
    }
    ajaxSync(request)
}
var updateTodo = () => {
    var todocontainer = e('.todo-container')
    log('删除所有todo'+todocontainer)
    todocontainer.innerHTML = ''
    actionAll()
}
var actionUpdate = (e) => {
    var self = e.target
    var divcontainer = self.closest('.div-container ')
    var id  = divcontainer.dataset.id
    var form = todoData()
    var dataStr = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/todo/update' + id,
        contentType: 'application/json',
        data: dataStr,
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var res = JSON.parse(response)
            deleteFadediv()
            updateTodo()
        }
    }
    ajax(request)
}

var actionList = () => {
    log('进去List事件')
    var todocontainer = e('.todo-container')
    todocontainer.classList.toggle('hidden')
}

var actionCheck = (e) => {
    var self = e.target
    var todocell = self.closest('.todocell')
    todocell.classList.toggle('check')
}


// 打开遮罩
function maskIt(obj){
    var hoverdiv = '<div class="divMask" style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: #EEEEEE;opacity: 0.5; filter: alpha(opacity=40);z-index:5;"></div>';
    $(obj).wrap('<div class="position:relative;"></div>');
    $(obj).before(hoverdiv);
    $(obj).data("mask",true);
}
var addmask = () => {
    var divmain = e('.phone-bottom')
    maskIt(divmain)
}

// 取消遮罩
function unMaskIt(obj){
    if($(obj).data("mask")==true){
        $(obj).parent().find(".divMask").remove();
        $(obj).unwrap();
        $(obj).data("mask",false);
    }
    $(obj).data("mask",false);
}
var removemask = () => {
    var divmain = e('.phone-bottom')
    unMaskIt(divmain)
}

var bindEventAlert = () => {
    log('进入alert')
    var divcontainer = e('.div-container')
    log('divcontainer',divcontainer)
    divcontainer.addEventListener('click', (event) => {
        var self = event.target
        if (self.classList.contains('cancel') || self.classList.contains('cancelBt')) {
            deleteFadediv()
            removemask()
        } else if (self.classList.contains('ok') || self.classList.contains('okBt')) {
            log('添加事件')
            actinAdd()
            deleteFadediv()
            removemask()
        } else if (self.classList.contains('updateBt') || self.classList.contains('update')) {
            actionUpdate(event)
            removemask()
        }
    })
}

var bindEvent = () => {
    var divmain = e('.phone-bottom')
    divmain.addEventListener('click', (event) => {
        var self = event.target
        if (self.classList.contains('plusimg')) {
            log('点击了+')
            addFadeCss()
            addmask()
            bindEventAlert()
        } else if (self.classList.contains('minusimg')) {
            actionDelete(event)
        } else if (self.classList.contains('span')) {
            addmask()
            actionGetTodo(event)
            bindEventAlert()
        } else if (self.classList.contains('listimg')) {
            actionList()
        } else if (self.classList.contains('checkimg')) {
            actionCheck(event)
        }
    })
}


var __main = () => {
    actionAll()
    bindEvent()
}
__main()
