let shopModule=(function(){
    // 获取要点击的元素和，需要插入数据的盒子，全局下变量_data来存储JSON数据
    let $navList=$('.navbar-nav .nav-item'),
        $productBxo=$('.productBxo'),
        _data=null;

        // 用ajax异步获取数据，赋值给全局变量_data
      let getData=function getData(){
          $.ajax({
              url:'json/product.json',
              method:'get',
              dataType:'json',
              async:false,
              success:function(data){
                  console.log(data);
                  _data=data;
              }
          })
      }

      //获取到数据后渲染数据
      let bindHTML=function bindHTML(){
          let str=``;
          _data.forEach(item=>{
            str+=`<div class="card" style="width: 18rem;">
              <img src="${item.img}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">价格:￥${item.price.toFixed(2)}</p>
                  <p class="card-text">销量:${item.hot}</p>
                  <p class="card-text">时间:${item.time}</p>
                  <a href="#" class="btn btn-primary">去购买</a>
              </div>
          </div>`;
          $productBxo.html(str);
          })
      }

      //给每个按钮绑定点击事件，并做升降序处理后重新渲染
      let handle=function handle(){
          let flag=-1;
          $navList.on('click',function(){
              let $this=$(this),
              index=$this.index(),
              mark=$this.attr('flag')*flag,
              char='price';
              $this.attr('flag',mark);
              $this.siblings().attr('flag',-1)
              index===1?char='time':null;
              index===2?char='hot':null;
              _data.sort((a,b)=>{
                  a=String(a[char]).replace(/-/g,"");
                  b=String(b[char]).replace(/-/g,"");
                  return (a-b)*mark
              })
              bindHTML();
          })
      }
        return{
            init(){
                   getData();
                   bindHTML();
                   handle();
            }
        }
})()
shopModule.init();