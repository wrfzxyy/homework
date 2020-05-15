let $header=$('.header'),
$headerHide=$('.header_hide',$header);

$header.on('mouseenter',function(){
    $headerHide.stop().slideDown();
})

$header.on('mouseleave',function(){
    $headerHide.stop().slideUp();
})


// //轮播图
let $container=$('.banner_box>.container'),
    $wrapper=$('.wrapper',$container),
    $slider=$('.slider',$wrapper),
    $pagerition=$('.pageition',$container),
    $liList=$('li',$pagerition);

    let step=0,
    interval=3000,
    len=$slider.length,
    timer=null;

    function move(){
        if(step===len){
            step=0;
            $wrapper[0].style.transitionDuration='0s';
            $wrapper[0].style.left=`-${step*603}px`;

            $wrapper.offset().top;
        }
        step++;
        $wrapper[0].style.transitionDuration='0.3s';
        $wrapper[0].style.left=`-${step*603}px`;
        focus()
    }

    function focus(){
        $liList.each((index,item)=>{
            let  mystep=step;
            mystep===len?mystep=0:null;
            if(index===mystep){
                item.className='active'
                return
            }
            item.className='';
        })
    }
     
    timer=setInterval(move,interval);

    $liList.on('mouseenter',function(){
        let index=$(this).index();
        if(index===step||(index===0&&step===len)) return;
        step=index;
        $wrapper[0].style.transitionDuration='0.3s';
        $wrapper[0].style.left=`-${step*603}px`;
        focus();
    })


    // 选项卡
    let $tabs=$('.banner_box .tabs'),
        $tabsLi=$('ul>li',$tabs),
        $tabsDiv=$('div',$tabs);

        $tabsLi.on('mouseenter',function(){
             let index=$(this).index(),
             $this=$(this);
             $this.addClass('active').siblings('li').removeClass('active');
             $tabsDiv.eq(index).addClass('active').siblings('div').removeClass('active')
        });

    //图片放大

    let $bannerBottom=$('.banner .banner_bottom'),
        $aBox=$bannerBottom.children('a'),
        $aBoxImg=$bannerBottom.find('img');

        $aBox.on('mouseenter',function(){
            let index=$(this).index();
            $aBoxImg.eq(index).css('transform','scale(1.15)')
        })

        $aBox.on('mouseleave',function(){
            let index=$(this).index();
            $aBoxImg.eq(index).css('transform','none')
        });

        //内容中心选项卡(右)
        let $columnRight=$('.column_right_tabs'),
            $columnUl=$('ul',$columnRight),
            $columnOl=$('ol',$columnRight),
            $ulLiList=$columnUl.children('li');
          $ulLiList.on('mousemove',function(){ 
                let index=$(this).index(),
                $this=$(this);
                $columnOl.css('left',`-${index*330}px`);
                $this.addClass('active').siblings('li').removeClass('active');
          })

          //内容中心选项卡(左)
          let $columnLeft=$('.column_left_tabs'),
          $columnLeftUl=$columnLeft.children('ul'),
          $columnLeftOl=$columnLeft.children('ol'),
          $columnLeftulLiList=$columnLeftUl.children('li'),
          $columnLeftolLiList=$columnLeftOl.children('li');
          $columnLeftulLiList.on('mouseenter',function(){
              let index=$(this).index(),
              $this=$(this);

              $this.addClass('active').siblings().removeClass('active');

              $columnLeftolLiList.eq(index).addClass('active').siblings().removeClass('active');
          });
          

          //内容中心选项卡(左侧里面)
          let $category01=$('.category01'),
              $category01LiList=$category01.children('li'),
              $downVideoBox01=$('.down_video_box01'),
              $downVideoBox01LiList=$downVideoBox01.children('li');
            
              $category01LiList.on('mouseenter',function(){
                let index=$(this).index(),
                $this=$(this);
                $this.addClass('active').siblings('li').removeClass('active');

                $downVideoBox01LiList.eq(index).addClass('active').siblings('li').removeClass('active');
              });


              let $category02=$('.category02'),
              $category02LiList02=$category02.children('li'),
              $downVideoBox02=$('.down_video_box02'),
              $downVideoBox02LiList02=$downVideoBox02.children('li');
              $category02LiList02.on('mouseenter',function(){
                let index=$(this).index(),
                $this=$(this);
                $this.addClass('active').siblings('li').removeClass('active');

                $downVideoBox02LiList02.eq(index).addClass('active').siblings('li').removeClass('active');
              })

              //左侧小选项卡中的英雄栏
             let $heroMyBox=$('.hero_list_box'),
                 $heroTabsBox=$('.hero_tabs_top')
             $heroMyBoxP= $heroTabsBox.children('p'),
             $heroMyBoxSection=$heroMyBox.children('section'),
             $allHeroBox=$('.all_hero_box'),
             $heroList=$('.hero_list');
             $allHeroBox.on('mouseenter',function(){
                $heroList.css('display','block')
             });
             $allHeroBox.on('mouseleave',function(){
                $heroList.css('display','none')
             })

             $heroMyBoxP.on('mouseenter',function(){
                 let index=$(this).index();
                
                 $heroMyBoxSection.eq(index).addClass('active').siblings('section').removeClass('active')
             })

        //赛事中心选项卡
        let $competitionTabs=$('.competition_left_tabs'),
            $competitionTabsLi=$('ul>li',$competitionTabs),
            $competitionTabsDiv=$competitionTabs.children('div');
            
            $competitionTabsLi.on('mouseenter',function(){
                let index=$(this).index(),
                   $this=$(this);
                   $this.addClass('active').siblings('li').removeClass('active');
                   $competitionTabsDiv.eq(index).addClass('active').siblings('div').removeClass('active'); 
            })

   // 游戏榜单内内容控制显示隐藏
   let $rankHideDl=$('.rank_hide>dl'),
       $rankHideDd=$rankHideDl.children('dd');
       $rankHideDd.on('mouseenter',function(){
           let $this=$(this);
           $this.addClass('active').siblings('dd').removeClass('active');
       });

       //排行榜前三红色图片，其他灰色图标
    let $linkStrong=$rankHideDd.find('strong');
    $linkStrong.each((index,item)=>{
        if(item.innerHTML>3){
            item.style.background='#999'
        }
    })

       
                  
                  