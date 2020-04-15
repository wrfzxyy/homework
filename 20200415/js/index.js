let cascadeFlow=(function(){
// 获取元素，设置防抖标识，设置接收JSON数据的全局变量
let column=Array.from(document.querySelectorAll('.column')),
data=null,
flag;

// AJAX获取数据
let getData=function getData(){
    // 创建AJAX的实例，用OPEN方法，同步获取数据，验证获取状态，接收成功，赋值给全局下的DATA
    let xhr=new XMLHttpRequest;
    xhr.open('GET','json/data.json',false)
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===4&&xhr.status===200){
            data=JSON.parse(xhr.responseText)
        }
    }
    xhr.send();
}

//  渲染数据
let render=function render(){
    // 把数据的尺寸按实际尺寸缩放
    data=data.map(item=>{
        item.height=item.height/(item.width/270);
        item.width=270;
        return item;
    })
    //  共3列，数据三个一组循环
    for(let i=0;i<data.length;i+=3){
        // 获取每组数据
        let groups=data.slice(i,i+3);
        // 升序重拍数据，而后降序重排每列column
        groups.sort((a,b)=>a.height-b.height);
        column.sort((a,b)=>b.offsetHeight-a.offsetHeight);
        // 循环每一组数据，动态创建元素，插入排序后的column盒子
        groups.forEach((item,index)=>{
            let card=document.createElement('div');
            card.className='card';
            card.innerHTML=` <a href="${item.link}">
            <div class="lazy" style="height:${item.height}px">
                <img src="" alt="" data-img="${item.pic}">
            </div>
            <p>${item.title}</p>
        </a>`;
        column[index].appendChild(card);
        })
    }
}

// 图片懒加载，当图片底部全部出现在可视窗口内，开始加载图片

let lazyFunc=function lazyFunc(){
    //获取已写入的lazy盒子
    let lazyBox=document.querySelectorAll('.lazy');
    // 循环每个盒子，判定盒子出现在可视窗口内再给图片src属性赋值
    Array.from(lazyBox).forEach(item=>{
        let load=item.getAttribute('load');
        if(load==='my') return;
        let HTML=document.documentElement,
        A=utils.offsetAll(item).top+item.offsetHeight,
        B=HTML.clientHeight+HTML.scrollTop;
        if(A<B){
            // 当进入条件，执行方法给图片src赋值,传入实参，已便获取盒子内的img标签
            lazyload(item);
        }
    })
}

let lazyload=function lazyload(item){
    // 获取img标签，获取img标签的data-img属性上真实的地址，创建一个图片实例，用onload方法验证地址的正确性，进入条件给图片src赋值，修改图片透明度，触发动画，释放IMAGE实例，移除data-img属性，给lazyBox中的每一个lazy盒子设置，验证标识，以便判断当前图片盒子是否处理过；
    let img=item.querySelector('img'),
    imgUrl=img.getAttribute('data-img'),
    newImg=new Image;
    newImg.src=imgUrl;
    newImg.onload=function(){
        img.src=imgUrl;
        utils.css(img,'opacity',1)
    }
    newImg=null;
    img.removeAttribute('data-img')
    item.setAttribute('load','my')
}

//  当滚动条触底时，加载更多数据,并做函数的方都处理
let loadMore=function loadMore(){
    let HTML=document.documentElement;
    if(HTML.clientHeight*1.5+HTML.scrollTop>HTML.scrollHeight){
        // 验证标识
        if(flag) return;
        flag=true;
        // 重新执行获取数据，渲染，加载图片
        getData();
        render();
        lazyFunc();
        flag=false;
    }
}


    return{
        init(){
            getData();
            render();
            lazyFunc();
            // window绑定onscroll事件
            window.onscroll=function(){
                // 触发事件，1执行加载图片，2加载更多
                lazyFunc();
                loadMore();
            }
        }
    }
})();
cascadeFlow.init()