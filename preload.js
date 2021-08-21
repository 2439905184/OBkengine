$(function()
{
    
    //获得数据 
    function get_data(callback)
    {
        var result_img=""
        $.ajax({url:"bke_src/home.bkscr",type:"GET",dataType:"text",success:function(result)
        {
           result_img=obk_parse_main(result)[2]
            //执行回调
           callback(result_img)
        }})
        return result_img
    }
    $.extend({get:get_data})
    /*//取出数据
    get(function(rs)
    {
        console.log("rs "+rs)
        window.img=rs
    })*/
   // console.log("执行完 "+get())
       //解析开始 入口main
       
        function obk_parse_main(main) 
        {
          //  console.log("main.bkscr>\n" + main)
            var main_array = main.split("\n")
            var line1 = main_array[0]
            var code = line1
            lines = 2
            return line_parse(line1)
        }
         //逐行解析
         function line_parse(code) {
            //去除空格
            var pre_do = code.split(" ")

            function c(e) {
                return e != " "
            }
            //去除数组空格 提取表达式
            var splited_code = pre_do.filter(c)
            console.log("关键字数组")
            console.log(splited_code)
            //获取参数
            var para_index
            var para_file
            for (var i = 0; i < splited_code.length - 1; i++) {
                if (splited_code[1].search("index=") > -1) {
                    para_index = splited_code[1].split("index=")[1]
                }
                if (splited_code[2].search("file") > -1) {
                    //双引号 单引号去除
                    var reg1 = new RegExp('\\"',"g")
                    var reg2 = new RegExp("\\'","g")
                    var next=splited_code[2].split("file=")[1]
                    //去除双引号
                    if(next.search('"')>-1)
                    {
                        para_file = next.replace(reg1,"")
                    }
                    //去除单引号
                    if(next.search("'")>-1)
                    {
                        para_file = next.replace(reg2,"")
                    }
                }
            }
            console.log("do>"+splited_code[0])
            console.log("index>" + para_index)
            console.log("file>" + para_file)
            var result=[]
            result.push(splited_code[0])
            result.push(para_index)
            result.push(para_file)
            return result
        }
})
