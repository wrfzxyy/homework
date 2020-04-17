let shopModule=(function(){
    // 获取要操作的元素
    let $chooseBox=$('#choose'),
    $typeBox=$('#type'),
    $links=null,
    _chooseData=[],
    _typeData=[];
    // ajax请求数据
    let getData=function getData(){
        $.ajax({
            url:'json/data.json',
            method:'get',
            dataType:'json',
            async:false,
            success:function(data){
                _chooseData=data;
                console.log(data)
            }     
        })

        $.ajax({
            url:'json/data1.json',
            method:'get',
            dataType:'json',
            async:false,
            success:function(result){
                _typeData=result;
                console.log(result)
            }     
        })
    }  

    // 渲染数据
    let bindHTML=function bindHTML(){
        let str=`你的选择`;
        _chooseData.sort((a,b)=>a.typeId-b.typeId).forEach(item=>{
            str+=`<mark>
            ${item.name}
            <a href="javascript:;" data-id='${item.typeId}'>x</a>
        </mark>`
        })
        $chooseBox.html(str);
        handleClose()
    }

    let typeRender=function typeRender(){
        let str=``;
        _typeData.forEach(item=>{
            let {
				id, 
				name,
				content
			} = item;
			str += `<li>`;
			str += `${name}：`;
			content.forEach(cur => {
				str += `<a href="javascript:;" data-id='${id}'>
					${cur}
				</a>`;
			});
			str += `</li>`;
        })
        $typeBox.html(str);
        $links=$('#type a');
    }
    
    // 分类中的a的点击事件
    let handleLinks=function handleLinks(){
        $links.on('click',function(){
            let $this=$(this),
            obj={
                typeId:parseFloat($this.attr('data-id')),
                name:$.trim($this.text())
            };
            _chooseData=_chooseData.filter(item=>{
                return item.typeId!==obj.typeId;
            });
            _chooseData.push(obj);
            bindHTML();
        })
    }

    // 关闭按钮的点击事件
    let handleClose=function handleClose(){
        let $closeBtn=$('a',$chooseBox);
        $closeBtn.on('click',function(){
            let $this=$(this),
            typeId=parseInt($this.attr('data-id'));
            _chooseData=_chooseData.filter(item=>{
                return item.typeId!==typeId;
            })
            bindHTML();
        })
    }  
      
    return{
        init(){
            getData();
            bindHTML();
            typeRender();
            handleLinks()
        }
    }
})();
shopModule.init();