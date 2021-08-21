//js回调学习
//https://zhuanlan.zhihu.com/p/113069353
//这是一个耗时操作 类似于宏替换
function doSomething(msg,callback)
{
    alert(msg)
    callback()
}
doSomething("回调函数",function()
{
    alert("匿名函数回调")
})
var a=function(a,b)
{

}