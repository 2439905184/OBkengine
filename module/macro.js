//解析宏的注册关系 macro.bkscr
function obk_parse_macro_main(code) {
    //要注册的命令 
    var result_import = []
    var lines = code.split("\n")
    console.log(code)
    console.log(lines)
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i]
        if (line == "*register") {
            var mark_reg_begin = true
        }
        if (line.search("//") > -1) {
            //注释代码，不处理
        }
        //处理[ ]中的命令
        if (line.search("\\[") > -1) {
            //预处理 去掉中括号 取词
            var pre_code1 = line.replace(/\[|]/g, "")
            console.log(pre_code1)
                //提取关键字
            if (pre_code1 != "return") {
                var pre_key_word = array_extract(pre_code1)
                console.log("提取后的关键字")
                console.log(pre_key_word)
                var f = str_utils(pre_key_word[1].split("file=")[1])
                result_import.push(f)

            }
        }
    }
    console.log("要注册的脚本数据")
    console.log(result_import)
        //返回需要注册的脚本文件名数组 
    return result_import
}

//解析每自定义宏
function obk_parse_macro(code) {
    console.log("开始解析自定义宏")
    console.log(code)
}
//首先获取宏的注册关系 程序入口
function get_data(callback) {
    var _result
    $.ajax({
        url: "src/macro.bkscr",
        type: "GET",
        dataType: "text",
        success: function(result) {
            _result = result
            callback(_result)
        }
    })
}

function next(data) {
    //所有要解析的宏
    var macros = obk_parse_macro_main(data)
    get_macro_codes(macros)
        //obk_parse_macro(macros)
}
get_data(next)
    //得到宏定义和数据
function get_macro_codes(files) {
    var _result
    for (var i = 0; i < files.length; i++) {
        $.ajax({
            url: "src/macro.bkscr",
            type: "GET",
            dataType: "text",
            success: function(result) {
                _result = result
                console.log("每个宏的数据\n" + _result)
                    // callback(_result)
            }
        })
    }
}
//得到宏定义和数据
function next2(result) {

}

//get_macro_codes(next2)