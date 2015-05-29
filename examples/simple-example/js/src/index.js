var CarouselImage = React.createClass({
  render: function(){
    var imageStyle = {
      backgroundImage: 'url(' + this.props.imageurl + ')',
    };
    return (
      <div className="slideImage" style={imageStyle}>
      </div>
    );
  } 
});

var Carousel = React.createClass({
  propTypes: {
    maxIndex: React.PropTypes.number
  },
  slideIndexChanged: function(index,slideWrap){
    console.debug(index,slideWrap,this.refs);
    this.refs.carouselIndicator.setState({active:index});
  },
  render: function(){
    var maxIndex = this.props.maxIndex;
    return (
      <div id="carouselDiv" style={{position:'relative'}}>
      <ReactSwipe continuous={true} auto={5000} speed={500} callback={this.slideIndexChanged}>
        {
          this.props.item.images.map(function(image,m){
            if(m<maxIndex){
              return <div><CarouselImage imageurl={image}></CarouselImage></div>;
            }
          })
        }
      </ReactSwipe>
      <CarouselMask name={this.props.item.name} price={this.props.item.price}></CarouselMask>
      <CarouselIndicator count={Math.min(this.props.item.images.length,maxIndex-1)} ref="carouselIndicator"/>
      </div>
    );
  }
});

var CarouselIndicator = React.createClass({
  getInitialState: function(){
    return {active:0};
  },
  render: function(){
    var lis = [];
    var count = this.props.count;
    for(var i=0;i<count;i++){
      if(i==this.state.active){
        lis.push(<li className="active"></li>);
      }else{ 
        lis.push(<li></li>);
      }
    }
    return (
      <ol className="indicator">
        {lis}
      </ol>
    );
  }
});

var CarouselMask = React.createClass({
  render: function(){
    return (
      <div className="mask" >
        <h3>{this.props.name}</h3>
        <p>&#165;{this.props.price}起</p>
      </div>
    );
  }
});

//TODO:set global object and error callback for ajax
var imagesData = ["http://ac-vnm5nd89.clouddn.com/o6bJGpWXaL1iV10cdGSAehxDhsHKaaiVHjcLPbXK.None?imageView2/1/w/960/h/825/q/85/format/jpeg","http://ac-vnm5nd89.clouddn.com/CNGQGKdobfadMsQYXRqVDiSXHjfMhOixQPvK0mJU.None?imageView2/1/w/960/h/825/q/85/format/jpeg"];

var item = {
  "description": [{
    "type": "text",
    "data": "缩略地图"
  }, {
    "type": "image",
    "data": "http://ac-vnm5nd89.clouddn.com/zdp7kxDORkCMP8uBrsQnAPwbfVnIwip4qVSBfBAE.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
  }, {
    "type": "text",
    "data": "古巴坐落在中南美洲的佛罗里达海峡以南，这个尚未被旅游业过度开发过的风情异国正在成为旅行者们趋之若鹜的度假目的地：原汁原味的民俗文化、举世闻名的雪茄和朗姆酒，还有不输给天堂巴哈马的绝美沙滩。\n这样一个伫立在地球上另一个角落的海岛，正适合您带着您的爱人逃离城市中的烦扰和喧嚣，享受一次私密的二人世界。在此次的旅程中，您将和爱人乘着专车穿梭在被列为世界文化遗产的哈瓦那旧城，探索古巴最为特色的点点滴滴；乘坐游艇在“古巴明珠”巴拉德罗地区拥抱阳光、碧海，与可爱的海豚嬉戏；在顶级的度假村中彻底放松身心，尽享悠闲与甜蜜的度假时光……\n在人文味道醇厚的哈瓦那旧城的大街小巷之中感受纯正的古巴风情"
  }, {
    "type": "image",
    "data": "http://ac-vnm5nd89.clouddn.com/jUAqJGXhf0SbuDOGEPfGL0oTicQ4YCVGhFMdeXLy.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
  }, {
    "type": "text",
    "data": "探秘享誉世界的哈瓦那国宝，雪茄和朗姆酒，在醉人的烟酒中体味当地人独特的生活方式"
  }, {
    "type": "image",
    "data": "http://ac-vnm5nd89.clouddn.com/7luKDW0VojLL4Uj6EmuM9RlOiHKWgyH8CWk12AfL.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
  }, {
    "type": "text",
    "data": "在Cayo Blanco 梦幻的美景中，乘坐游艇与阳光、碧海和奇妙的水下世界亲密接触，拥抱大自然。"
  }, {
    "type": "image",
    "data": "http://ac-vnm5nd89.clouddn.com/rv2legaSUQ6tv4qzjlKQjTKLudpYCGgkBPDf1d96.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
  }, {
    "type": "text",
    "data": "在Royal Hicacos 五星度假村，坐拥古巴最美丽的巴拉德罗海滩的黄金地带，与爱人共享私密的悠闲时光。"
  }, {
    "type": "image",
    "data": "http://ac-vnm5nd89.clouddn.com/o6bJGpWXaL1iV10cdGSAehxDhsHKaaiVHjcLPbXK.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
  }],
  "routes": [{
    "content": [{
      "type": "text",
      "data": "自行安排交通工具前往哈瓦那，不管您何时到达哈瓦那机场，当地的工作人员会在机场热情的迎接您并用专车接您和您的爱人前往酒店。稍作休息，享受属于您的私人时间。\n\n【一日三餐请自理、入住哈瓦那萨拉托加酒店（Saratoga hotel）5星】"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/ld4FGrjANByoFUk53Jnwci4TW8YDJN4qOkq0wUC1.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }],
    "title": "第1天 中国-哈瓦那"
  }, {
    "content": [{
      "type": "text",
      "data": "第二天，用最特色的方式玩转哈瓦那。\n早餐之后，我们将带您步行游历哈瓦那旧城的主要街道和中心广场，参观古巴最著名艺术家们包括Carmen Montilla, Nelson Dominguez, Ernesto Rancaño, Flora Fong, Angel Ramirez等的画廊，随后乘坐传统的四轮马车在哈瓦那旧城的城郊的绿荫之中观赏沿途的自然美景与小村庄。\n中午，将在当地的特色餐馆Doña Eutimia用午餐。\n下午，乘着美式的老爷车在哈瓦那的现代化新城区兜风，顺道参观克里斯托弗•哥伦布的纪念碑。\n晚间在哈瓦那著名的餐馆La Guarida享用美食！（三道菜肴+2杯饮料）\n\n• 哈瓦那旧城\n• 马车游览\n• 特色午餐和晚餐\n• 老爷车游览\n【包含一日三餐、入住哈瓦那萨拉托加酒店（Saratoga hotel）5星】"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/YNBuLH5UmsKyAhnzMUEXFfbihmFvduBFAR5Cj1yU.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/Br37Qc0FCAT8zk7ad8h1UOtmWV7run65cvbt8fT7.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }],
    "title": "第2天 哈瓦那"
  }, {
    "content": [{
      "type": "text",
      "data": "古巴是当年欧洲人发现烟草的地方，至今仍出产着世界上最好的烟叶和最著名的雪茄，同时朗姆酒也是古巴引以为豪的特产之一。\n第3天的早晨将开启“雪茄&朗姆之旅”，行程中包含：\n•参观古巴历史最为悠久的百得佳士雪茄工厂\n•乘坐哈瓦那独有的“椰子计程车”前往哈瓦那朗姆俱乐部朗姆酒博物馆参观品尝\n•造访‘Conde de Villanueva’雪茄酒店，观看当地手艺人亲手制作雪茄并品尝\n下午是属于您的自由时间，和您的爱人一起漫步在哈瓦那的海滨大道上、在大街小巷里寻找当地的特色小吃，或是带上相机，在异国美景中留下你们最甜蜜的瞬间。\n晚间我们将带您前往观看闻名世界的歌舞秀Tropicana！（将有专车接送，小吃，饮料以及纪念品）\n\n• 雪茄工厂\n• 朗姆酒博物馆\n• 充足的私人时间\n【包含早餐、午餐和晚餐请自理、入住哈瓦那萨拉托加酒店（Saratoga hotel）5星】"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/soMg6Icj3I23TisTSgM9vxhxcHi597IGhYJhe1hD.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/WoYegIJhda1VcHSeb5qbSF2a0KlNKGaA8sWdUAQF.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }],
    "title": "第3天 哈瓦那"
  }, {
    "content": [{
      "type": "text",
      "data": "第4天早晨我们将安排专车接您和爱人前往巴拉德罗（Varadero）。巴拉德罗世界上最著名的度假胜地之一，她拥有着湛蓝到不真实的蓝天、泛着绿松石般光芒的清澈海水、绵延几十公里的细腻白沙滩和顶级的度假村，用当地人的话来说，“不到巴拉德罗就不算真正了解古巴的美”。\n从第4天起，您将在巴拉德罗5星级的Hicacos皇家SPA度假村（Hotel Sandals Royal Hicacos Resort & Spa）入住，全身心地享受这个中南美天堂给您带来的至臻度假体验！\n仅对情侣开放的皇家Hicacos SPA度假村占据了巴拉德罗海滩上的黄金位置，距离繁华的哈瓦那也仅有90分钟的车程。整个度假村中拥有404间套房，典雅与高格调是这里所有套房的设计基调，您一定会在踏进房间的瞬间就爱上这里：温馨的布置、齐全的娱乐设备和舒适的大床为您和您的爱人创造了绝对完美的度假氛围，并且所有的套房中都带有大面积的露台或是阳台，能让您将巴拉德罗的梦幻美景净收眼底。\n对于在度假村中度过蜜月的游客们，我们将会为您安排房间的免费升级（在可能的情况下），在房间中为您准备一瓶红酒，水果盘，两件纪念T恤，私人的鸡尾酒晚餐并为您拍照留念\n\n• 沙滩、碧海\n• 顶级度假胜地\n【包含早餐和晚餐、午餐请自理、入住Hicacos SPA度假村（5星）】\n"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/KbsTzNgq70jc2H8alfvIutTs2dw2DgvnedbaoRtC.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/WFWPWkC7iTy0gSL0qTNV3kLEbmLGNsADXQ1IdSQo.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }],
    "title": "第4天 哈瓦那-巴拉德罗（Varadero）"
  }, {
    "content": [{
      "type": "text",
      "data": "第5天将是独家的全天游艇海洋之旅！这次的航行将围绕着古巴大西洋上风景迤逦的Cayo Blanco地区进行。在碧海蓝天和远处绵密的沙滩包围下，和您的爱人在游艇甲板上的露天吧台一边享用朗姆酒一边陶醉在清新的海风之中；在如水晶般清澈的海水之中浮潜，探索色彩斑斓、造型各异的珊瑚礁；或是与温顺友好的海豚们一起在水中嬉戏。\n中午十分，您将在享有盛誉的Cayo Blanco的沙滩上享受我们为您精心准备的海鲜大餐，并在如粉末般细腻的白沙滩上漫步，或是体验各种沙滩运动来带的乐趣。（您将来自世界各地的游客共同登上游艇，享受蓝天碧海）\n\n• 全天游艇旅行\n• 浮潜、沙滩活动\n【包括：一日三餐/专车接送到巴拉德罗码头/带露天酒吧的游艇/在珊瑚礁中浮潜/沙滩上的海鲜午餐/沙滩活动/与海豚共浴、入住Hicacos度假村（5星）】"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/HCrHN3wgrGekNaU4CXSDyKTgpCyjiQG1o032NIO9.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/CNGQGKdobfadMsQYXRqVDiSXHjfMhOixQPvK0mJU.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/qiLe6SrpSl3cPMyUEMGWAIvkRyFfzee6voTTeUK0.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }],
    "title": "第5天 全天游艇海洋之旅"
  }, {
    "content": [{
      "type": "text",
      "data": "第6将是您和您的爱人在豪华度假村Hicacos的完全私人时间，自由地安排两天的黄金度假生活。您可以在早晨享用完丰盛的早餐之后体验度假村中各种各样的运动项目中：网球、沙滩排球、有氧运动或是游泳；下午在巴拉德罗最美丽的一段沙滩上与阳光、海浪、鸡尾酒作伴，与爱人一起度过悠闲的甜蜜时光；傍晚加入到度假村组织的沙滩歌舞活动中来，与来自世界各地的朋友们一起对酒当歌欣赏绝美的落日；晚间您一定要试试Hicacos度假村最为特色的SPA或是桑拿，彻底地放松一下身心。总之，在“古巴的明珠”巴拉德罗的土地上，您能一定能感悟到度假二字的真正意义。\n\n• 全天自由活动\n【包括指定餐厅的一日三餐、入住Hicacos度假村（5星）】\n"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/5QYto14APl8KRXzuLSQptVVc2uFNp5pD36q1yrYt.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/qfVhkNjyqoVne6U7XadXRqwBWzc2hanPKIsQTvOM.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }, {
      "type": "image",
      "data": "http://ac-vnm5nd89.clouddn.com/x5zMSkfgvWkJpGiYrcnhI9he394TvK9CtDAzw7Jj.None?imageView2/1/w/675/h/450/q/85/format/jpeg"
    }],
    "title": "第6天 巴拉德罗（Varadero）"
  }, {
    "content": [{
      "type": "text",
      "data": "继续享受在豪华度假村Hicacos的完全私人时间\n\n• 全天自由活动\n【包括指定餐厅的一日三餐、入住Hicacos度假村（5星）】"
    }],
    "title": "第7天 巴拉德罗（Varadero）"
  }, {
    "content": [{
      "type": "text",
      "data": "第8天，您的古巴之旅将暂时告一段落，为您准备的专车将接送您和爱人返回哈瓦那的机场。热情好客的古巴随时欢迎您的再次到来！\n\n【包括早餐、午餐和晚餐请自理，不含酒店】"
    }],
    "title": "第8天 巴拉德罗（Varadero）-哈瓦那-中国"
  }, {
    "content": [{
      "type": "text",
      "data": "• 行程中包含的酒店标准房\n• 行程中包含的餐饮\n• 行程中包含的景点门票\n• 当地导游和用车服务\n• 行程中包含的游艇使用费用 \n• 保险"
    }],
    "title": "费用包含"
  }, {
    "content": [{
      "type": "text",
      "data": "• 中国与哈瓦那的往返交通工具\n• 签证费用\n• 个人当地消费"
    }],
    "title": "费用不包含"
  }, {
    "content": [{
      "type": "text",
      "data": "• 本产品2人起订\n• 客人自备签证，如因为签证问题无法出入境，损失由客人自行承担\n• 如因天气原因，无法出海，我们将会调整行程，敬请谅解\n• 出海活动有一定风险，根据身体情况量力而行\n• 根据中国海关总署颁布的2010年54号令，进境公民旅客携带在境外获取的个人自用进境物品总值在5000元以内（含5000元）的，海关予以免税放行。烟草制品、酒精制品、照相机、摄像机等20种商品不在免税范围内，敬请知晓"
    }],
    "title": "注意事项"
  }],
  "hotelsAndYachts": [{
    "type": "text",
    "data": "Saratoga Hotel\n建造于1930年间的萨拉托加酒店位于Capitolio大厦的对面，在绝佳的视角下眺望到历史悠久的Partagas雪茄工厂和壮观的哈瓦那大剧院。融合了新古典主义和摩登元素的萨拉托加酒店是哈瓦那最具格调的场所之一，是众多古巴作家、音乐家、艺术家和名流人士的青睐之所。雕刻精致的开阔中央天庭，红木框架的法式观景窗，以大理石为主体的宽敞天台赋予了酒店充满历史气息的外观；游泳池，酒吧，高品质的餐厅以及高科技设施齐全的房间则能够为您提供现代化的舒适",
    "title": "酒店"
  }, {
    "type": "image",
    "data": "http://ac-vnm5nd89.clouddn.com/0mknUNqDjk81VmSydncBkPcDqk6rLf9Tq90zI9A8.None?imageView2/1/w/675/h/450/q/85/format/jpeg",
    "title": ""
  }, {
    "type": "image",
    "data": "http://ac-vnm5nd89.clouddn.com/8hxw9NfsHxfyEuvf35NC8BJAdRWW5wFdI7k55Mov.None?imageView2/1/w/675/h/450/q/85/format/jpeg",
    "title": ""
  }, {
    "type": "image",
    "data": "http://ac-vnm5nd89.clouddn.com/kYcOJrXWxqYyHc6H4D8yDONkz7Ywqjx296gT5TY9.None?imageView2/1/w/675/h/450/q/85/format/jpeg",
    "title": ""
  }, {
    "type": "text",
    "data": "游艇",
    "title": "游艇"
  }, {
    "type": "image",
    "data": "http://ac-vnm5nd89.clouddn.com/WjSNOhXxFmTg6cFhG4rKRTbpGjkcvRXtzgVfsCcq.None?imageView2/1/w/675/h/450/q/85/format/jpeg",
    "title": ""
  }],
  "tabs":[{name:"产品简介",key:"description"},{name:"行程安排",key:"routes"},{name:"酒店及游艇",key:"hotelsAndYachts"}]//每个页面自己实现的tabs对象
};
var carouselInstance = React.render(<Carousel item={{images:imagesData,name:"哈瓦纳套餐",price:40000}} maxIndex={6}></Carousel>,document.getElementById('header'));

var DetailTitle = React.createClass({
  render: function(){
    return <div className="content-title">{this.props.name}</div>;
  }
});

var DetailContent = React.createClass({
  render: function(){
    if(this.props.type === "image"){
      var url = this.props.data;
      return <div className="content-img"><img src={url}/></div>;
    }
    else if(this.props.type === "text"){
      var text = this.props.data;
      return <div className="content-text"><p>{text}</p></div>;
    }
  }
});

var DetailImageText = React.createClass({
  processTitle: function(title){
    if(title){
      return <DetailTitle name={title}/>;
    }
  },
  processContent: function(type,data){
    if(type && data){
      return <DetailContent type={type} data={data} />;
    }
  },
  render: function(){
    var _this = this;
    var detailItems = []; 
    this.props.data.map(function(detail,i){
      //detail = {title:'',content:[{type:'',data:''}...]} or {type:'',data:''}
      if(detail.title){
        detailItems.push(_this.processTitle(detail.title));
        if(detail.content){
          //array
          detail.content.map(function(detail,i){
            detailItems.push(_this.processContent(detail.type,detail.data));
          });
        }
        else{
          detailItems.push(_this.processContent(detail.type,detail.data));
        }
      }
      else{
        detailItems.push(_this.processContent(detail.type,detail.data));
      }
    });
    return <div className="col-xs-12 content">{detailItems}</div>;
  }
});

var Content = React.createClass({
  contentDidUpdate: function(){
    //SwipeViews在切换Tabs时，维护滚动条的值，不可见的Tabs滚动值设置为顶部，当前可见的Tab滚动值设置为top=1触发onScroll事件，实现Tabs切换时，收起顶部的图片轮播
    $(".SwipeViewPage-next").scrollTop(0);
    $(".SwipeViewPage-active").scrollTop(1);
  },
  contentOnScroll: function(event,swipeViews){
    //内容滚动时，修改容器的top值，以增加容器的可用高度，方便用户浏览
    var _this = swipeViews;
    if (event.currentTarget.scrollTop === 0){
      $("#main").removeClass("hide-header").addClass("show-header");
      _this.state.scrollTop = true;
    }
    else if(_this.state.scrollTop){
      $("#main").removeClass("show-header").addClass("hide-header");
      _this.state.scrollTop = false;
    }
    else{
      if($("#main").hasClass("hide-header")){
        //NOTE:#main的top发生变化时，元素正在滚动，使用下面这段代码去修补多滚的高度
        //获取实际需要的滚动高度
        var maxScrollTop = event.currentTarget.scrollHeight-$("#main").height()+$('.SwipeViewsHeaderContainer').height();
        var scrollTop = event.currentTarget.scrollTop;
        if(scrollTop > maxScrollTop){
          event.currentTarget.scrollTop = maxScrollTop;
        }
      }
    } 
  },
  render: function(){
    var item = this.props.item;
    return(
      <SwipeViews id="content" viewsOnScroll={this.contentOnScroll} componentDidUpdate={this.contentDidUpdate}>
        {
         this.props.item.tabs.map(function(tab,i){
           return (
             <div key={"tab"+i} title={tab.name}>
               <div className="container">
                 <div className="row">
                   <DetailImageText data={item[tab.key]} tabkey={tab.key}/>
                 </div>
              </div> 
             </div>
           );
         })
        } 
      </SwipeViews>
    );  
  }
});
React.initializeTouchEvents(true);
var contentInstance = React.render(
  <Content item={item}></Content>,document.getElementById("main"));
