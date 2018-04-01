# inline-block

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

vertical-align控制着行盒(line-box)中元素的垂直对齐，默认为baseline对齐。一个line-box的baseline以它的子元素最下面的baseline为基准。

下面我们看一下这几个inline-block为什么会这样对齐。

![2](E:\sxq_projs\bolgReact_mobx\src\articles\CSS学习\关于ifc和inline-block\imgs\2.png)

可以看到，整个line-box的baseline被第二个元素和第三个元素挤到下面去了。第一个和第四个元素的文字正好和第二个元素和第三个元素的margin-box的底边对齐。

由此可见，如果一个inline-block，它的内部没有内容，那么它的baseline为它的marginBox的底边。如果inline-block的overflow不为visible，那么它的baseline也为它的marginBox的底边。

我们看最后一个元素，它没有直接的文本元素，但是它的子元素拥有文本。我们简单修改一下代码（将第四个元素的子元素文本去掉）：

```html
        <div class="iblock">
            <div class="iblock inside"></div>
        </div>
```

![3](E:\sxq_projs\bolgReact_mobx\src\articles\CSS学习\关于ifc和inline-block\imgs\3.png)

我们可以看到，第四个元素的子元素变成了一个没有内容的inline-block，此时，它的baseline变成了子元素的margin-box的底边。

如果一个inline-block拥有子元素，那么它的baseline为子元素的baseline。

引入CSS2规范中的一段话：

> The baseline of an ‘inline-block’ is the baseline of its last line box in the normal flow, unless it has either no in-flow line boxes or if its ‘overflow’ property has a computed value other than ‘visible’, in which case the baseline is the bottom margin edge.

翻译：一个inline-block的beseline是它的标准文档流子元素中，最后一个line-box的baseline。如果它的overflow不为visible或者它没有标准文档流的子元素，这种情况下它的baseline为它的margin-box底边。

对于上文的例子，如何让它们对齐呢？给他们加上同样的对齐方式，破坏掉默认的baseline就可以了。