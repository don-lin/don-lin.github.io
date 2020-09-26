//存储html中的几个关键部分
var menu=document.querySelector(".menu")
var leftGroup=document.querySelector(".left-group")
var rightGroup=document.querySelector(".right-group")
var foot=document.querySelector(".foot")
var container=document.querySelector(".container")
var midGroup=document.querySelector(".mid-group")
//获得元素的x坐标
function getLeft(e){
    var offset=e.offsetLeft;
    if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
    return offset;
}
//展示与隐藏左边
function showHideLeft(){
    if(leftGroup.getAttribute("hidden")!="hidden"){
        leftGroup.classList.add("hide")
        setTimeout(function(){leftGroup.setAttribute("hidden","hidden")},1000)
        
    }else{
        leftGroup.classList.remove("hide")
        leftGroup.removeAttribute("hidden")
    }
}
//展示与隐藏右边
function showHideRight(){
    if(rightGroup.getAttribute("hidden")!="hidden"){
        rightGroup.classList.add("hide")
        setTimeout(function(){rightGroup.setAttribute("hidden","hidden")},1000)
    }else{
        rightGroup.classList.remove("hide")
        rightGroup.removeAttribute("hidden")
    }
}
//展示与隐藏底部
function showHideFoot(){
    if(foot.getAttribute("hidden")!="hidden"){
        foot.classList.add("hide")
        setTimeout(function(){foot.setAttribute("hidden","hidden")
        container.style.setProperty("bottom","0px")},1000)
    }else{
        foot.classList.remove("hide")
        foot.removeAttribute("hidden")
        container.style.setProperty("bottom","100px")
    }
}

var lastLeftPosition=0

function conditionShowMenu(leftPosition,buttonNames,clickEvents){
    if(lastLeftPosition!=leftPosition || menu.getAttribute("hidden")=="hidden"){
        showMenu(leftPosition,buttonNames,clickEvents)
        lastLeftPosition=leftPosition;
    }else{
        hideMenu()
    }
}

//显示菜单
function showMenu(leftPosition,buttonNames,clickEvents){
    menu.style.setProperty("left",leftPosition)
    
    menu.innerHTML=''//清除原本菜单中的内容
    for(var i=0;i<buttonNames.length;i++){
        button=document.createElement("button")
        button.textContent=buttonNames[i]

        if(clickEvents!=undefined)
            button.setAttribute("onclick",clickEvents[i])

        br=document.createElement("br")
        menu.appendChild(button)
        menu.appendChild(br)
    }
    menu.classList.remove("hide")
    menu.removeAttribute("hidden")
}

//重置所有窗口的状态
function resetWindow(){
    if(leftGroup.getAttribute("hidden")=="hidden")
        showHideLeft();
    if(foot.getAttribute("hidden")=="hidden")
        showHideFoot();
    if(rightGroup.getAttribute("hidden")=="hidden")
        showHideRight();
}
//点击了hide按钮
function hideMenu(){
    menu.classList.add("hide")
    setTimeout(function(){menu.setAttribute("hidden","hidden")},300)
}
//点击了game按钮
function gameClick(gameButton){
    buttonNames=["open","save","close"]
    conditionShowMenu(getLeft(gameButton)+"px",buttonNames)
}
//点击了edit按钮
function editClick(editButton){
    buttonNames=["undo","redo","check"]
    conditionShowMenu(getLeft(editButton)+"px",buttonNames)
}
//点击了window按钮
function windowClick(windowButton){
    buttonNames=["left","right","bottom","reset"]
    buttonClicks=["showHideLeft()","showHideRight()","showHideFoot()","resetWindow()"]
    conditionShowMenu(getLeft(windowButton)+"px",buttonNames,buttonClicks)
}
//点击了data按钮
function dataClick(dataButton){
    buttonNames=["upload","network"]
    conditionShowMenu(getLeft(dataButton)+"px",buttonNames)
}