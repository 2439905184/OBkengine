//避免递归溢出的状态变量
var obk_state = "init"
var obk_bg = ""
var obk_url //用于请求bke脚本文件
var obk_clicks = 0 //内部计数器
    //去除字符串两端引号 
function str_utils(value) {
    var result
    var reg1 = new RegExp('\\"', "g")
    var reg2 = new RegExp("\\'", "g")
    if (value.search('"') > -1) {
        result = value.replace(reg1, "")
    }
    if (value.search("'") > -1) {
        para_file = value.replace(reg2, "")
    }
    return result
}
/**提取关键字,空格分词，对于每一行去掉了[ ] 的代码 **/
//code:传入的一行参数 如 @sprite index=0 或者 import file="extend.bkscr"
function array_extract(code) {
    var pre_do = code.split(" ")

    function c(e) {
        return e != " "
    }
    var result = pre_do.filter(c)
    return result
}
$(function() {
    //获得数据 回调参数，url参数
    function get_data(callback) {
        var _result = ""
            //备份{url:"bke_src/main.bkscr" //从这里请求脚本
        $.ajax({
                url: obk_url,
                type: "GET",
                dataType: "text",
                success: function(result) {
                    _result = obk_parse_main(result, obk_url)
                        //执行回调
                        //console.log("回调0")
                        //console.log(_result)
                    callback(_result)
                }
            })
            //return _result
    }
    //添加扩展方法
    $.extend({ _get_data: get_data })
        //解析开始 入口main
    function obk_parse_main(main, obk_url) {
        var result = []
        console.log(obk_url + ">\n" + main)
        var main_array = main.split("\n")
            // console.log("预处理换行数组>")
            //console.log(main_array)
        for (var i = 0; i < main_array.length; i++) {
            var line = main_array[i]
            var parse_result = line_parse(line)
                //结果组合
            result.push(parse_result)
        }
        //console.log("结果数组")
        //console.log(result)
        return result
    }
    //逐行解析
    function line_parse(code) {
        //去除空格
        var pre_do = code.split(" ")

        function c(e) {
            return e != " "
        }
        console.log("传入code\n" + code)
            //去除数组空格 提取表达式
        if (code.search("@") > -1 || code.search("\\*") > -1) {
            var splited_code = pre_do.filter(c)
                // console.log("关键字数组")
                //console.log(splited_code)
                //提取各种命令参数
            var para_cmd
            var para_index
            var p_file
            var para_label
                //每个if里执行 
            var p_final = []
                //在这里解析对应的命令
            for (var i = 0; i < splited_code.length; i++) {
                //存在标签
                if (splited_code[0].search("\\*") > -1) {
                    para_label = splited_code[0]
                    p_final.push(para_label)
                    return p_final
                }
                if (splited_code[0] == "@bgm") {
                    para_cmd = "@bgm"
                    if (splited_code[1].search("file=") > -1) {
                        var next = splited_code[1].split("file=")[1]
                            //重构 
                        p_file = str_utils(next)
                        console.log(p_file)
                        p_final.push(p_file)
                        return p_final
                    }
                }
                if (splited_code[0] == "@jump") {
                    para_cmd = "@jump"
                    if (splited_code[1].search("file=") > -1) {
                        var next = splited_code[1].split("file=")[1]
                        var next2 = splited_code[2].split("label=")[1]
                            //重构
                        p_file = str_utils(next)
                            //    para_label = str_utils(next2)
                        p_final.push(para_cmd)
                        p_final.push(p_file)
                        p_final.push(next2)
                        console.log("解析器检测到Jump")
                        console.log(p_final)
                        return p_final
                    }
                }
                //代码待重构
                if (splited_code[0] == "@sprite") {
                    para_cmd = "@sprite"
                    p_final.push(para_cmd)
                        //index在前
                    if (splited_code[1].search("index=") > -1) {
                        para_index = splited_code[1].split("index=")[1]
                        p_file = str_utils(splited_code[2].split("file=")[1])
                        p_final.push(para_index)
                        p_final.push(p_file)
                        return p_final
                    }

                }
            }
        } else {
            //按照文字处理
            var obk_text = code
            console.log("检测到无命令，使用内置文字处理>\n" + obk_text)
            obk_texts.push(obk_text)
        }
        // return p_final
    }
})