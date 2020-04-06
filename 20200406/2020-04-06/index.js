
let shopModule=(function(){
 let navList=document.querySelectorAll('li'),
 shopList=document.querySelector('.shopList'),
 data=null;

 let getData=function getData(){
     let xhr=new XMLHttpRequest();
     xhr.open('get','json/product.json',false);
     xhr.onreadystatechange=()=>{
         if(xhr.readyState===4&&xhr.status===200){
             data=JSON.parse(xhr.responseText)
         }
     }
     xhr.send();
 }
  
 let render=function render(){
     let str=``;
     data.forEach(item=>{
         str+=`<div class="shopcard">
         <img src=${item.img} alt="">
         <h2>${item.title}</h2>
         <p>价格:${item.price}</p>
         <p>销量:${item.hot}</p>
         <p>时间:${item.time}</p>
     </div>`;
     });
     shopList.innerHTML=str;
 }

 let clear=function clear(){
     [].forEach.call(navList,item=>{
        if(this!==item){
            item.flag=-1;
        }
     })
        
 }

 let handle=function handle(){
     [].forEach.call(navList,(item,index)=>{
         item.flag=-1;
         item.onclick=function(){
             this.flag*=-1;
             clear.call(this);
             let char="price";
             index===1?char="hot":null;
             index===2?char="time":null;
             data.sort((a,b)=>{
                 a=String(a[char]).replace(/-/g,"");
                 b=String(b[char]).replace(/-/g,"");
                 return (a-b)*this.flag;
             });
             render();
         }
     })

 }
return{
    init(){
        getData();
        render();
        handle();
    }
}
})();
shopModule.init();
