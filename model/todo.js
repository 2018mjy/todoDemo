const fs = require('fs')


const todoFilePath = 'db/todo.json'

// 这是一个用来存储 todo 数据的对象
class ModelTodo {
    constructor(form) {
        // || 是一种新的写法，在 js 圈子里太过流行，所以记住即可
        // a = b || c 意思是如果 b 会转成 false（比如 undefined, null），就把 c 赋值给 a
        this.title = form.title || ''
        this.content = form.content || ''
        this.todoStatus = form.todoStatus || 'fasle'
        // 生成一个 unix 时间，unix 时间是什么，上课会说
        this.created_time = Math.floor(new Date() / 1000)
    }
}
const loadTodos = () => {
    // 确保文件有内容，这里就不用处理文件不存在或者内容错误的情况了
    var content = fs.readFileSync(todoFilePath, 'utf8')
    var todos = JSON.parse(content)//转成json格式对象
    console.log('loadTodos',todos)
    return todos
}
var t = {
    data: loadTodos(),
}

t.all = function() {
    var todos = this.data
    return todos
}

t.new = function(form) {
    var m = new ModelTodo(form)
    console.log('newtodo', form, m,this.data)

    var d = this.data[this.data.length - 1]
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    // 把数据加入 this.data 数组
    this.data.push(m)
    // 把最新数据保存到文件中
    this.save()
    // 返回新建的数据
    return m
}
t.getTodoById = function(id) {
    var todos = this.data
    var found = false
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        if (todo.id == id) {
            found = true
            console.log('modelgettodo', todo)
            return todo
        }
    }
}
t.update = function(id, form) {
    var todos = this.data
    var found = false
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        if (todo.id == id) {
            found = true
            todo.title = form.title
            todo.content = form.content
            return todo
        }
    }
}

t.delete = function(id) {
    var todos = this.data
    var found = false
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        if (todo.id == id) {
            found = true
            break
        }
    }
    todos.splice(i, 1)
    return found
}

t.save = function() {
    var s = JSON.stringify(this.data, null, 2)
    fs.writeFile(todoFilePath, s, (error) => {
        if (error != null) {
            console.log('error', error)
        } else {
            console.log('保存成功')
        }
    })
}
module.exports = t
