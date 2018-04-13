# 深入理解z-index

一开始认为z-index是很简单的属性，但是在真正的项目中发现它不会按照我的预期工作。因此，我参考了css规范对z-index进行了总结。

CSS规范：https://www.w3.org/TR/CSS21/visuren.html#z-index

先看张来自MDN的图片：

![mdndemo](E:\sxq_projs\bolgReact_mobx\src\articles\CSS学习\深入理解z-index\imgs\mdndemo.png)

如果你知道图片中div这样排列的原因，后面的内容可能对你没有太多帮助。如果你不明白，看完本文后将会对z-index有一个详细的认识。

## 概述

引用规范中对z-index的描述：

> 对于已定位的盒子，z-index属性声明了：
>

> 1. 该盒子在当前“堆叠上下文（stacking context）“中的层级（stack level）。
> 2. 该盒子是否生成了堆叠上下文

> 注：翻译自css规范

从这段话中，可以知道**z-index只对已定位的盒子生效**。并且在z-index的计算过程中”堆叠上下文“非常重要。

## 可能的值

> 整数：
>
> 这个整数是盒子在当前堆叠上下文中的层级，该盒子也创建了新的堆叠上下文。
>
> auto：
>
> 该盒子在当前堆叠上下文中的层级的**计算值**为0。除非它是根元素，它不会创建新的堆叠上下文。
>
> 注：翻译自css规范

现在我们可以知道：**对已定位的盒子设置非”auto“的z-index会产生新的堆叠上下文，根元素会创建一个堆叠上下文。**

## 堆叠上下文（ stacking context）

前面多次提到了堆叠上下文，那么什么是堆叠上下文呢？

### 定义

> 浏览器根据堆叠上下文来确定渲染树中元素的渲染顺序（后渲染的遮挡先渲染的），堆叠上下文中可以包含其他堆叠上下文。
>
> **堆叠上下文是原子级的**，其他堆叠上下文中的盒子，不会影响该堆叠上下文。
>
> **任何盒子都归属于一个堆叠上下文**，每个已定位的盒子都有一个整数型的层级，这个层级定义了堆叠上下文中该盒子相对其他盒子z轴上的顺序。较大的层级会遮挡小层级，层级可以是负数。在堆叠上下文中，**相同层级的盒子，在文档树中靠后的会盖住靠前的**。
>
> 根元素形成根堆叠上下文。通过给已定位（包括relative）元素一个非“auto”的z-index属性可以创建新的堆叠上下文。元素的包含块不一定是该元素的堆叠上下文。
>
> 注：翻译自css规范

### 理解

通过以上我们知道，任何盒子都属于一个堆叠上下文，并且，这个堆叠上下文可能不是它的包含块，这个堆叠上下文应该是它的最近的一个创建了堆叠上下文的祖先（类似绝对定位元素相对于最近的已定位祖先）。**给已定位元素一个非auto的z-index可以创建堆叠上下文**。

> 注意：创建堆叠上下文有很多其他的方式，详细内容参考：
>
> https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

需要注意的一点是，z-index为0会产生堆叠上下文，虽然表现和z-index：auto相似。

现在我们知道：

- 任何盒子都**属于一个**堆叠上下文。
- 根元素形成根堆叠上下文。
- 堆叠上下文是原子级的（内部元素不会被其它元素影响，可以理解为形成“整体”）。
- 定位元素加上非auto的z-index可以产生堆叠上下文。
- 在一个堆叠上下文中，子堆叠上下文的上下顺序根据自身的z-index来确定。
- 在一个堆叠上下文中，相同层级的盒子，文档树中靠后的会遮挡靠前的。

我们现在分析一开始的那张图：

![mdndemo](E:\sxq_projs\bolgReact_mobx\src\articles\CSS学习\深入理解z-index\imgs\mdndemo.png)

首先，我们看最外层三个div（绿、绿、粉）。它们都是定位且z-index非auto，因此这三个div都产生了堆叠上下文。它们的父堆叠上下文同为根元素。

因此，他们三个的上下顺序按照z-index的大小排列。div1最大，div1遮挡div3；div2最小，div2被div3遮挡。

再看看div4、5、6。div4，div5，div6都产生堆叠上下文，他们又同属于div3的堆叠上下文，因此div4、5、6按照z-index顺序排列。

我们通过这个例子，可以知道，在分析z-index问题时，首先确定**被分析元素所在的堆叠上下文**，在此基础上再进行其他分析。

上面这个例子比较简单，我们看看稍微复杂的例子。

#### 实例1

```html
<!DOCTYPE HTML>
<html lang="en-US">

<head>
    <meta charset="UTF-8">
    <title>zindex</title>
    <style>
        .big {
            width: 200px;
            height: 200px;
            background: darkgoldenrod
        }

        .small {
            text-align: right;
            width: 100px;
            height: 100px;
        }
    </style>
</head>

<body>
    <div style="position:absolute; background:darkcyan;" class="big">
        <div style="position:absolute;z-index:100;background:darkgray;" class="small">z--100</div>
        <div style="position:absolute;left: 50px;top: 50px;z-index:50;background:red;" class="small">z--50</div>
    </div>

    <div style="position:absolute;left:100px;top:100px;background:black;" class="big">
        <div style="position:absolute;z-index:2;background:rebeccapurple;" class="small">z--2</div>
        <div style="position:absolute;z-index:1;left: 50px;top: 50px;background:greenyellow;" class="small">z--1</div>
    </div>
</body>

</html>
```

运行结果为：

![1](/Users/songxiquan/sxqbigplan/bolgReact_mobx/src/articles/CSS学习/深入理解z-index/imgs/1.png)

首先我们可以注意到，第一个大包含框（深绿）被第二个大包含框（黑）遮挡了，这验证了前文的内容，**层级相同的盒子，处于后面的会遮挡前面的（在后文会有更加详细的解释）**。

下面我们注意中间的4个小盒子。我说一下我一开始的疑惑点：灰盒和红盒同属于第一个大盒子（深绿），第二个大盒子（黑）在第一个大盒子上，第二个大盒子里面的东西应该都在第一个大盒子上面（堆叠上下文是原子级的），为什么红色盒子会遮挡紫色盒子呢？

下面来分析这4个小盒子的z-index计算规则：

首先，我们在分析z-index类的问题时，**一定要先确定被分析元素所在的堆叠上下文**。第一个大包含块（深绿）虽然已经定为，但是它并没有非“auto”的z-index，它并没有形成堆叠上下文，因此它内部的两个小盒子所在的堆叠上下文为**根**。另外两个小盒子情况相同。因此，4个小盒子都属于**根堆叠上下文**，它们的”上下“就根据各自z-index来确定了。

#### 实例2

在实例1的基础上稍作修改：

```html

<div style="position:absolute; background:darkcyan;z-index: 1;" class="big">
        <div style="position:absolute;z-index:100;background:darkgray;" class="small">z--100</div>
        <div style="position:absolute;left: 50px;top: 50px;z-index:50;background:red;" class="small">z--50</div>
</div>
```

仅仅给第一个大盒子（深绿）加个z-index：1。

结果：![2](/Users/songxiquan/sxqbigplan/bolgReact_mobx/src/articles/CSS学习/深入理解z-index/imgs/2.png)

我们来分析一下：首先，深绿盒子现在满足了生成堆叠上下文的条件。前文提到过，**堆叠上下文具有原子级特点**，也就是说其他元素要么被深绿盒子盖住，要么盖住深绿盒子，它内部的盒子和它形成了一个“整体”。

然后，深绿盒子也要属于某一个堆叠上下文。深绿盒子属于根堆叠上下文，紫色和浅绿盒子同样也属于根堆叠上下文，属于同一堆叠上下文的盒子，它们的上下顺序由z-index来决定了。紫色最大，在最上，浅绿和深绿z-index都为1，但是**浅绿在文档树中的顺序靠后**，浅绿也在深绿上。

经过这两个例子，大家可以分析简单的z-index问题了。其中，最关键的就是**确定被分析元素所在的堆叠上下文**。

下面我会介绍在一个堆叠上下文中，它内部元素的堆叠规则。

## 堆叠规则

在每一个堆叠上下文中，以下情况的渲染层级依次升高：

1. z-index为负的子堆叠上下文（会被当前堆叠上下文遮挡）。
2. 处于文档流中的非定位、非行内子元素。
3. 未定位的float元素
4. 处于文档流中的行内、未定位子元素。包括inline、tables 、inline blocks。
5. z-index为0的子堆叠上下文和z-index为0且已定位的子元素。
6. z-index为正数的子堆叠上下文。

大家可能不太理解第五条规则，感觉表述重复，后面我会在实例中给大家解释。

下面说一下曾经困惑我的几个例子。

#### 实例3

```html
<style>
        .big {
            width: 100px;
            height: 100px;
            background: bisque;
            border: 1px solid black;
        }

        .float {
            float: left;
            width: 30px;
            height: 30px;
            background: aquamarine;
        }

        .block {
            width: 40px;
            height: 40px;
            background: saddlebrown;
        }
</style>
<div class="big">
    <div class="block"></div>
    <div style="margin-top: -20px;" class="float"></div>
</div>
```

![3](/Users/songxiquan/sxqbigplan/bolgReact_mobx/src/articles/CSS学习/深入理解z-index/imgs/3.png)

根据前文的堆叠规则3和规则2，可以解释该现象。

#### 实例4

```html
    <style>
        .big {
            width: 100px;
            height: 100px;
            background: bisque;
            border: 1px solid black;
        }

        .float {
            float: left;
            width: 30px;
            height: 30px;
            background: aquamarine;
        }

        .block {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: saddlebrown;
        }
    </style>
<div class="big">
    <div class="block"></div>
    <div style="margin-right: -20px;" class="float"></div>
</div>
```

![4](/Users/songxiquan/sxqbigplan/bolgReact_mobx/src/articles/CSS学习/深入理解z-index/imgs/4.png)

根据堆叠规则3和堆叠规则4可以解释该例子。

下面我们将针对堆叠规则5来进行分析。

#### 实例5

```html
    <style>
        .big {
            width: 100px;
            height: 100px;
            background: bisque;
            border: 1px solid black;
        }

        .ib {
            display: inline-block;
            width: 30px;
            height: 30px;
            background: aquamarine;
        }

        .block {
            width: 40px;
            height: 40px;
            background: saddlebrown;
        }
    </style>
<div class="big">
    <div style="margin-bottom: -20px;" class="ib"></div>
    <div class="block"></div>
</div>
```

![5](/Users/songxiquan/sxqbigplan/bolgReact_mobx/src/articles/CSS学习/深入理解z-index/imgs/5.png)

根据堆叠规则4和规则2很容易解释现象。

下面对代码进行修改：

```css
        .block {
            width: 40px;
            height: 40px;
            background: saddlebrown;
            position: relative;
        }
```

仅给block加上定位。

结果：

![6](/Users/songxiquan/sxqbigplan/bolgReact_mobx/src/articles/CSS学习/深入理解z-index/imgs/6.png)

可以看到，定位的未设置z-index的元素会比inline-block层级高。

那么该情况可以应用哪条规则呢？

答案是第五条，以下是第五条的官方表述：

> the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.

翻译：z-index为0的子堆叠上下文和z-index为0且已定位的子元素。

第一眼看这句话可能会觉得表述重复，z-index为0且已定位的子元素和z-index为0的子堆叠上下文有什么区别呢？

前文提到过：z-index取值为“auto”时，该盒子在当前堆叠上下文中的层级的**计算值**为0。除非它是根元素，它不会创建新的堆叠上下文。

官方文档中的 **z-index为0且已定位的子元素 指的是z-index:auto的定位子元素，而z-index为0的子堆叠上下文 指的是z-index为0的定位子元素。**虽然它们的层级一样，但是auto不会创建堆叠上下文，而0会创建。

实例5中的情况可以应用规则5的**z-index为0且已定位的子元素**。

## 总结

- 在分析z-index问题时，首先要确定待分析元素所属于的堆叠上下文。
- 给已定位的元素设置非auto的z-index可以产生堆叠上下文。
- 一个元素一定属于一个堆叠上下文，这个堆叠上下文是该元素最近的创建堆叠上下文的祖先。
- 根元素会创建根堆叠上下文。
- 处于同一个堆叠上下文的元素，使用**堆叠规则**来判断上下顺序。