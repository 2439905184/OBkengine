    /*//取出数据
    get(function(rs)
    {
        console.log("rs "+rs)
        window.img=rs
    })*/
//去除字符串两端引号 
function str_utils(value)
{
    var result
    var reg1 = new RegExp('\\"',"g")
    var reg2 = new RegExp("\\'","g")
    if(value.search('"')>-1)
    {
        result = value.replace(reg1,"")
    }
    if(value.search("'")>-1)
    {
        para_file = value.replace(reg2,"")
    }
    return result
}
$(function()
{
    //获得数据 
    function get_data(callback)
    {
        var _result=""
        $.ajax({url:"bke_src/home.bkscr",type:"GET",dataType:"text",success:function(result)
        {
           _result=obk_parse_main(result)
            //执行回调
            console.log("回调0")
            console.log(_result)
           callback(_result)
        }})
        return _result
    }
    //添加扩展方法
    $.extend({get:get_data})
       //解析开始 入口main
        function obk_parse_main(main) 
        {
            var result=[]
            console.log("main.bkscr>\n" + main)
            var main_array = main.split("\n")
            console.log("预处理换行数组>")
            console.log(main_array)
            for(var i=0;i<main_array.length;i++)
            {
                var line = main_array[i]
                var parse_result=line_parse(line)
                //结果组合
                result.push(parse_result)
            }
            console.log("结果数组")
            console.log(result)
            return result
        }
         //逐行解析
         function line_parse(code)
        {
            //去除空格
            var pre_do = code.split(" ")
            function c(e) 
            {
                return e != " "
            }
            //去除数组空格 提取表达式
            var splited_code = pre_do.filter(c)
            console.log("关键字数组")
            console.log(splited_code)
            //获取参数
            var para_cmd
            var para_index
            var para_file
            for (var i = 0; i < splited_code.length ; i++) 
            {
                if(splited_code[0]=="@bgm")
                {
                    para_cmd="@bgm"
                    if(splited_code[1].search("file=")>-1)
                    {
                        var next=splited_code[1].split("file=")[1]
                        para_file = str_utils(next)
                    }
                }
                //代码待重构
                if(splited_code[0]=="@sprite")
                {
                    para_cmd="@sprite"
                    if (splited_code[1].search("index=") > -1) 
                    {
                        para_index = splited_code[1].split("index=")[1]
                    }
                    if (splited_code[2].search("file") > -1) 
                    {
                        var next=splited_code[2].split("file=")[1]
                        //去除引号
                        para_file = str_utils(next)
                    }
                }
            }
            var result=[]
            result.push(para_cmd)
            //result.push(para_index)
            result.push(para_file)
            console.log("单行解析结果>")
            console.log(result)
            return result
        }
})