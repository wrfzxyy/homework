//先去获取数据
let ary=[];
function getData(){
    // 使用ajax去获取数据

    // 创造ajax的一个实例
    let xhr=new XMLHttpRequest();
    // 告诉这个实例以什么方式(get)，去哪里(路径)获取数据
    xhr.open('get','./data.json');
    
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            let data=JSON.parse(xhr.response);
            console.log(data);
            ary=data;
            render(data)
        }
    }
    xhr.send();
}
getData()

// 渲染数据
function render(data=[]){
    // 负责把给到的数据渲染到页面上
    // 把数据中的每一条转成带结构的li，然后再放到对应的ul中
    let str='';//用来存储拼接的结构(li)
    data.forEach(item=>{
       
        str+=`<li>
        <div class="img_box">
            <img src="${item.img}"
                alt="">
        </div>
        <h2>${item.title}</h2>
        <div class="price_box">
            <span class="price">￥${item.price.toFixed(2)}</span>
            <span class="silect_icon">多款可选</span>
        </div>
        <ul class="feature_box">
            <li>好使</li>
            <li>不好使</li>
        </ul>
        <div class="comment_box">
            <span>${item.num}</span>
            <span>99%好评</span>
        </div>
    </li>`
    })
    let n=data.length%5
    if(n){
        for(let i=0;i<5-n;i++){
            str+='<li></li>';
        }
    }
    let ul=document.querySelector('.phone_list_box');
    ul.innerHTML =str;
    
}




let timeBtn=document.getElementsByClassName('sort_btn')[1];
timeBtn.flag=1;
timeBtn.onclick=function(){
    // 把数据按照时间进行排序
    
    this.flag*=(-1)
    let temp =ary.sort((a,b)=>{
        return (a.time-b.time)*this.flag;
    })
    render(temp);
}

let timeBtn2=document.getElementsByClassName('sort_btn')[2];
timeBtn2.flag=1;
timeBtn2.onclick=function(){
    // 把数据按照时间进行排序
    this.flag*=(-1)
    let temp =ary.sort((a,b)=>{
        return (a.num-b.num)*this.flag;
    })
    render(temp);
}

let timeBtn3=document.getElementsByClassName('sort_btn')[3];
timeBtn3.flag=1;
timeBtn3.onclick=function(){
    // 把数据按照时间进行排序
    this.flag*=(-1)
    let temp =ary.sort((a,b)=>{
        return (a.price-b.price)*this.flag;
    })
    render(temp);
}


