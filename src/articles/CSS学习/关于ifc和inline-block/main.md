## inline-block

通过display:inline-block可以将一个元素变成行内元素，同时保持块级元素的某些特性，比如：可以设置他的宽高、可以设置他的margin。

但是在实际的使用中，在一行出现多个inline-block时，它们的对齐总是产生意想不到的结果，看下面的例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <style>
        .iblock {
            width: 100px;
            height: 100px;
            border: 10px solid green;
            padding: 10px;
            background: red;
            margin: 30px;
            display: inline-block;
        }
        .hid {
            overflow: hidden;
        }
        .inside{
            width: 70px;
            height: 30px;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div>
        <div class="iblock">asdasasdd</div>
        <div class="iblock hid"> 2222asdasdasdasd22222</div>
        <div class="iblock"></div>
        <div class="iblock">
            <div class="iblock inside">333asdasdasd333333</div>
        </div>
    </div>
</body>
</html>
```

效果图如下：

![1](E:\sxq_projs\bolgReact_mobx\src\articles\CSS学习\关于ifc和inline-block\imgs\1.png)



可以看到，多个inline-block并没有对齐，它们的对齐应该受其他因素影响。

在研究影响inline-block对齐的因素前，有必要了解一下ifc。

# IFC

ifc叫做行内格式化上下文，在ifc 中，行内元素一个接着一个的排列。每一行的行内元素处于一个line-box中，line-box的高度由其包含的line-height最高的元素来确定。

vertical-align控制着行盒(line-box)中元素的垂直对齐，默认为baseline对齐。一个line-box的baseline以它的子元素最下面的baseline为基准