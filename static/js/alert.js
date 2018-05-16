var log = console.log.bind(console)

var e = selector => document.querySelector(selector)

var templateDiv = () => {
    var t = `
    <div class="div-container center">
        <div class="msgdiv">
            <div class="msgtitlediv"><input type="text" class="msgtitle" placeholder="请输入标题"></input></div>
            <div class="contentdiv"><textarea  class="content" placeholder="请输入内容"></textarea ></div>
        </div>
        <div class="btdiv">
            <div class="cancel"><p class="cancelBt">取消</p></div>
            <div class="ok"><p class="okBt">完成</p></div>
        </div>
    </div>
    `
    return t
}

var templateDivUpdate = (form) => {
    var id = form.id
    var title = form.title
    var content = form.content
    var t = `
    <div class="div-container center" data-id="${id}">
        <div class="msgdiv">
            <div class="msgtitlediv"><input type="text" class="msgtitle" placeholder="请输入标题" value="${title}"></input></div>
            <div class="contentdiv"><textarea  class="content" placeholder="请输入内容">${content}</textarea ></div>
        </div>
        <div class="btdiv">
            <div class="cancel"><p class="cancelBt">取消</p></div>
            <div class="update"><p class="updateBt">完成</p></div>
        </div>
    </div>
    `
    return t
}


var insertDiv = (element) => {
    var html = templateDiv()
    element.insertAdjacentHTML('beforeend', html)
}


var insertDivUpdate = (element, form) => {
    var html = templateDivUpdate(form)
    element.insertAdjacentHTML('beforeend', html)
}
var addFadeCss = () => {
    var maindiv = e('.phone-bottom')
    insertDiv(maindiv)
    var divcontainer = e('.div-container')
    log(divcontainer.classList+'addfade')
    divcontainer.classList.add('fadeInLeft')
    log(divcontainer.classList+'addfade')
}
var addUpdatediv = (form) => {
    var maindiv = e('.phone-bottom')
    insertDivUpdate(maindiv, form)
    var divcontainer = e('.div-container')
    divcontainer.classList.add('fadeInLeft')
}
var deleteDiv = (element) => {
    element.remove()
}

var deleteFadediv = () => {
    var divcontainer = e('.div-container')
    divcontainer.classList.remove('fadeInLeft')
    deleteDiv(divcontainer)
}


var todoData = () => {
    var title = e('.msgtitle').value
    var content = e('.content').value
    var form = {
        title: title,
        content: content,
    }
    return form
}
