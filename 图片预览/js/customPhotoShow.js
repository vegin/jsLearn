/*
 * 图片查看  
 * By vegin
*/

(function ($, win, doc) {
    //构造函数
    var customPhotoShow = function(ele){
        this.ele = doc.getElementById(ele);  
        this.img = this.ele.getElementsByTagName('img');
        this.length = this.img.length;
        this.init();
    };
    customPhotoShow.prototype = {
        constructor:customPhotoShow,
        init:function(){
            var _this = this;
            _this.clickPhoto();
        },
        //点击
        clickPhoto:function(){
            var _this = this;    
            for(var i = 0;i<_this.length;i++) {  
                _this.img[i].index = i;
                _this.img[i].onclick = function(){
                    var j = this.index;
                    _this.createPhotoShadow(j);
                };
            };
        },
        //创造结构
        createPhotoShadow:function(n){
            var _this = this;
            var _txt = '<div class="custom-photo-shadow">\
                            <div class="custom-photo-header">\
                                <ul class="cph-page">\
                                    <li id="current">'+(n+1)+'</li>\
                                    <li>/</li>\
                                    <li id="all">'+_this.length+'</li>\
                                </ul>\
                                <em id="cpsShut">×</em>\
                            </div>\
                            <div class="custom-photo-main" id="cpsPhoto">\
                                <img id="cpsPhotoCurrent" src="'+_this.img[n].src+'">\
                            </div>\
                            <div id="cpsLeft" class="cps-left" style="display:'+(_this.length==1?"none":"")+';"></div>\
                            <div id="cpsRight" class="cps-right"  style="display:'+(_this.length==1?"none":"")+';"></div>\
                        </div>';
            var _cps = doc.createElement('div');            
            _cps.setAttribute('id','cpsContainer');             
            _cps.innerHTML = _txt;
            doc.body.appendChild(_cps);
            /*图片垂直居中调整*/
            var _cps_h = $e('.custom-photo-shadow').height();
            $e('.custom-photo-main').css({'line-height':_cps_h+'px'});
            /*左滑*/
            $e('#cpsLeft').bind('click',function(){
                n--;                
                if(n<0){
                    n=_this.length-1;
                }
                _this.goLeft(n);                             
            });
            /*右滑*/
            $e('#cpsRight').bind('click',function(){                 
                n++;
                if(n==_this.length){
                    n=0;
                }         
                _this.goRight(n);                                    
            });
            //关闭
            $e('#cpsShut').bind('click',function(){
                $e('#cpsContainer').remove();      
            });
        },
        //左滑
        goLeft:function(n){
            var _this = this;
            $e('#cpsPhotoCurrent').attr('src',_this.img[n].src);
            $e('#current').text(n+1);
        },
        //右滑
        goRight:function(n){
            var _this = this;
            $e('#cpsPhotoCurrent').attr('src',_this.img[n].src);           
            $e('#current').text(n+1);
        }
    };
    win.customPhotoShow = customPhotoShow;

})(ECF, window, document);