function addAttrC(ele,val){//定义一个专门为元素添加class属性，并且设置其值的方法
		if(ele.setAttribute){//其他浏览器
			ele.setAttribute("class",val);
		}else{//兼容ie浏览器
			ele.attributes["class"]=val;
		}
}
function chooseColor(i){//定义一个方法，获得轮播广告时article的背景颜色
	var color="";
	switch(i){
			case 0:color="#9401ff";break;
			case 1:color="#dbdbdb";break;
			case 2:color="#e0e0e0";break;
			case 3:color="#e2482e";break;
			case 4:color="#e93263";break;
		}
	return color;
}
//轮播广告：
	var articleAd=document.getElementById("article-ad");
	var divs=articleAd.getElementsByTagName("div");
	var ol=articleAd.getElementsByTagName("ol")[0];//获得articleAd下面的ol元素
	var lis=ol.getElementsByTagName("li");
	var article=document.getElementsByTagName("article")[0];//获得页面中的article元素，当轮播到相应广告时改变其背景颜色
	var i=0;//默然第一张图片显示
	var color="";
	function step(){//定时器的方法
		divs[i].removeAttribute("class");//轮播之前，移除第一张默认的图片
		lis[i].removeAttribute("class");//当轮播到相应的广告时，改变对应ol下面的li的样式------移除class属性
		i++;
		i==5&&(i=0);
		addAttrC(divs[i],"show");//轮播广告
		addAttrC(lis[i],"current");//当轮播到相应的广告时，改变对应ol下面的li的样式------添加class属性值为current的样式
		article.style.background=chooseColor(i);//当轮播到相应广告时改变article的背景颜色
	}
	var timer=setInterval(step,2000);
	article.onmouseover=function(){//当鼠标hover到article上时清除定时器
		clearInterval(timer);
		timer=null;
	}
	article.onmouseout=function(){//离开时，注册定时器
		timer=setInterval(step,2000);
	}
	for(var j=0,len=lis.length;j<len;j++){//为每个li绑定mouseover和mouseout事件监听器
		lis[j].addEventListener("mouseover",change,false);
		lis[j].addEventListener("mouseout",moveout,false);
	}
	function change(){//li的mouseover事件处理函数，当鼠标hover到对应的li时显示对应的图片
		for(var i=0,len=lis.length;i<len;i++){//检查每个li以及图片的div如果有current样式，则移除
			if(lis[i].hasAttribute("class")){
				lis[i].removeAttribute("class");
			}
			if(divs[i].hasAttribute("class")){
				divs[i].removeAttribute("class");
			}
		}
		addAttrC(this,"current");
		var n=this.innerHTML;//获得li中的值
		article.style.background=chooseColor(n-1);//当鼠标hover到每个li改变图像的同时，改变article的背景色
		addAttrC(divs[n-1],"show");//根据li中的值，确定应该显示哪张图片
	}
	function moveout(){//li的mouseout的事件处理函数，当鼠标离开当前li时，移除此li的class属性
		this.removeAttribute("class");
	}
//当用户滚动到section-container时，弹出搜索框：
	var seCon=document.getElementsByClassName("section-container")[0];
	var body=document.body;
	var seBox=document.getElementsByClassName("searchBox-container")[0];
	var seBoxF=seBox.cloneNode(true);//复制搜索框节点
	var ul=seBoxF.getElementsByTagName("ul")[0];
	ul.parentNode.removeChild(ul);//删除seBoxF下面的ul元素
	var img=seBoxF.getElementsByTagName("img")[0];
	img.src="images/search-logo.jpg";//修改img的图片
	img.style.position="absolute";
	img.style.top="15px";
	var seBoxFC=document.createElement("div");//创建搜索框的容器节点
	seBoxFC.appendChild(seBoxF);
	addAttrC(seBoxFC,"searchBoxFC");//为seBoxFC添加fixed样式
	body.onscroll=function(){
		var scrollHeight=document.documentElement.scrollTop||body.scrollTop;//document.documentElement为html元素
		if(scrollHeight>seCon.offsetTop){
			body.appendChild(seBoxFC);
		}else{
			if(seBoxFC.parentNode){
				body.removeChild(seBoxFC);
			}
		}
		var backtop=document.getElementById("backtop");
		if(scrollHeight>40){//当用户开始滚动时,弹出“返回顶部”
			console.log(scrollHeight);
			backtop.style.display="block";
		}else{
			backtop.style.display="none";
		}
	}

