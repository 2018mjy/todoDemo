const todo = require('../model/todo')

const sendHtml = (path, response) => {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, (error, data) => {
        // console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}
var index = {
    path: '/',
    method: 'get',
    func: (request, response) => {
        var path = 'todo-index.html'
        sendHtml(path, response)
    }
}

const all = {
    path: '/api/todo/all',
    method: 'get',
    func: (request, response) => {
        var todos = todo.all()
        var r = JSON.stringify(todos)
        response.send(r)
    }
}

const add = {
    path: '/api/todo/add',
    method: 'post',
    func: (request, response) => {
        // 浏览器发过来的数据我们一般称之为 form（表单）
        var form = request.body
        console.log(form,'routetodoadd+form')
        // 插入新数据并返回
        var t = todo.new(form)
        var r = JSON.stringify(t)
        response.send(r)
    }
}
const getTodoById = {
    path: '/api/todo/:id',
    method: 'get',
    func: (request, response) => {
        // 浏览器发过来的数据我们一般称之为 form（表单）
        var id = request.params.id
        console.log('getTodoById' + id)
        var t = todo.getTodoById(id)
        var r = JSON.stringify(t)
        response.send(r)
    }
}
const update = {
    path: '/api/todo/update:id',
    method: 'post',
    func: (request, response) => {
        // 浏览器发过来的数据我们一般称之为 form（表单）
        var form = request.body
        var id = request.params.id
        // 插入新数据并返回
        var t = todo.update(id, form)
        var r = JSON.stringify(t)
        response.send(r)
    }
}

var deleteTodo = {
    path: '/api/todo/delete:id',
    method: 'post',
    func: (request, response) => {
        // 浏览器发过来的数据我们一般称之为 form（表单）
        var id = request.params.id
        // 删除数据并返回结果
        var success = todo.delete(id)
        var result = {
            success: success,
        }
        var r = JSON.stringify(result)
        response.send(r)
    }
}

var routes = [
    index,
    all,
    add,
    update,
    getTodoById,
    deleteTodo,
]
module.exports.routes = routes
