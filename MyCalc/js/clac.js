/*
 * 2017.11.11 by ZCAlbert
 */

window.onload = function(){

    /*顶部功能按钮事件 */
    //alert("test");
  
    /*底部键盘事件 */
    var keyBorders = document.querySelectorAll("#bottom span");
    var exp        = document.getElementById("exp");//计算表达式
    var res        = document.getElementById("res");   //输出结果
    var keyBorde   = null;        //键盘
    for(var k = 0;k < keyBorders.length;k++)
    {
        keyBorde = keyBorders[k];
        keyBorde.onclick = function(){
           var number = this.dataset["number"]; //获取点的数字
           ClickNumber(number);
        }
    }
    var preKey = "";            //上一次按的键盘
    var keySymbol =  {"+":"+","-":"-","×":"*","÷":"/","%":"%","=":"="};
    //点击键盘事件处理
    function ClickNumber(number){
        //获取表达式的值和结果的值
        var resValue  = res.innerHTML;
        var expValue  = exp.innerHTML;
        //获取表达式最后一个符号
        var expEndsymbol = expValue.substring(expValue.length-1,expValue.length);
        if(number === "←" || number === "C"){
            return false;
        }
        //判断输入的结果里是否有小数点
        var hasPoint = (resValue.indexOf('.') !== -1) ? true : false;
        if(hasPoint && number === '.'){
            return false;
        }
        //转换显示符号
        if(isNaN(number)){
            number = number.replace(/\*/g,"×").replace(/\//g,"÷");
        }
        //如果输入的是数字且 长度超出范围的话这里直接返回
        if(!keySymbol[number] && resValue.length > 8){
            return false;
        }
        //如果输入的是符号
        if(keySymbol[number]){
            if(preKey !=="=" && keySymbol[preKey]){  // + - X / %
                exp.innerHTML = expValue.slice(0,-1) + number;
            }else{
                if(expValue == ""){
                    exp.innerHTML = resValue + number;
                }else{
                    exp.innerHTML += resValue + number;
                }
                if(keySymbol[expEndsymbol]){
                    expValue = exp.innerHTML.replace(/×/g,"*").replace(/÷/,"/");
                    res.innerHTML = eval(expValue.slice(0,-1));
                }
            }

        }else{
            if(( keySymbol[number] ||resValue == "0" || keySymbol[preKey]) && number !== '.'){
                res.innerHTML = "";
            }
            res.innerHTML+=number;
        }  
        preKey = number; 
    };
   var equals = document.getElementById("equals");   //等于号
    //等号事件处理
    equals.onclick = function(){
        var expVal = exp.innerHTML, val = "";
        var resVal = res.innerHTML;
        //表达式最后一位的符号
        if(expVal){
            var expressEndSymbol = expVal.substring(expVal.length-1,expVal.length);
            try{
                var temp = "";
                if(keySymbol[expressEndSymbol] && resVal){
                    temp = expVal.replace(/×/g,"*").replace(/÷/,"/");
                    temp = eval(temp.slice(0,-1)) + keySymbol[expressEndSymbol] + resVal;
                }else{
                    temp = expVal.replace(/×/g,"*").replace(/÷/,"/");
                }
                val = eval(temp);
         
            }catch(error){
                val = "<span style='font-size:1em;color:red'>Erro：计算出错！</span>";
            }finally{
                exp.innerHTML = "";
                res.innerHTML = val;
                preKey = "=";
            }
        }
    };
    //CE 键盘处理
    var reset = document.getElementById("reset");  
    reset.onclick = function(){
        res.innerHTML = "0";
        exp.innerHTML = "";
    };
    //← 键盘处理
    var remove = document.getElementById("remove"); 
    remove.onclick =  function(){
        var resValue= res.innerHTML;
        if(resValue.length>1){
            resValue = resValue.slice(0,-1);  //去掉最后一个字符
            res.innerHTML = resValue;
        }else{
            res.innerHTML = 0;
        }
    };
    //关于

    var historyBox  = document.getElementById("historyBox");
    var about       = document.getElementById("about");


    about.onclick  = function(){
       if(historyBox.style.display == "none"){
        historyBox.style.webkitTransform = "none";
        historyBox.style.transform = "none";
 
        historyBox.style.display ="block";
        historyBox.children[0].children[0].innerHTML = "<div style='padding:5px;color:#000;'>"
            + "<p><i class='iconfont'>&#xe608;</i> 纯HTML、CSS、JS编写</p>"
            + "<p><i class='iconfont'>&#xe608;</i> 使用VS code开发</p>"
            + "<p><i class='iconfont'>&#xe601;</i> 作者：DoubleMI</p>"
            + "</div>";
       }else{
        historyBox.style.webkitTransform = "block";
        historyBox.style.transform = "block";
        historyBox.style.display ="none";
       }
    };
};



