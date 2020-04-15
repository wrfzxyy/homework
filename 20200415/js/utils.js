let utils=(function(){
//   获取任意元素距离BODY的上偏移
let offsetAll=function offsetAll(element){
    let parent=element.offsetParent,
    top=element.offsetTop,
    left=element.offsetLetf;
    while(parent){
        top+=parent.clientTop;
        left+=parent.clientLeft;
        top+=parent.offsetTop;
        left+=parent.offsetLetf;
        parent=parent.offsetParent;
    }
    return{
        top,
        left
    }
}

// 获取任意元素的样式
let getCss=function getCss(element,attr){
    let value=element.getComputedStyle(element)[attr],
    reg=/^\d+(px|rem|em)?$/i;
    if(reg.test(value)){
        value=parseFloat(value);
    }
    return value
}

// 设置任意元素样式
let setCss=function setCss(element,attr,value){
    let reg=/^(margin|padding|height|width)?(top|right|bottom|left)?$/i;
    if(reg.test(attr)){
        if(!isNaN(value)){
            value+='px'
        }
    }
    element['style'][attr]=value;
}

// 批量设置任意元素样式
let setMore=function setMore(element,obj){
    for(let key in obj){
        if(!obj.hasOwnProperty(key)) break;
        setCss(element,key,obj[key])
    }
}

// 结合三种方法
let css =function css(){
    let len=arguments.length;
    if(len>=3){
        setCss(arguments[0],arguments[1],arguments[2]);
        return
    }
    if(arguments[1]!==null&&typeof arguments[1]==='object'){
        setMore(arguments[0],arguments[1]);
        return
    }
    return getCss(arguments[0],arguments[1])
}
    return{
       css,
       offsetAll
    }
})();