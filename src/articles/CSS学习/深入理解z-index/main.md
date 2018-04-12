# 深入理解z-index

一开始认为z-index是很简单的属性，但是在真正的项目中发现它不会按照我的预期工作。因此，我参考了css规范对z-index进行了总结。

CSS规范：https://www.w3.org/TR/CSS21/visuren.html#z-index

## 概述

引用规范中对z-index的描述：

> For a positioned box, the ['z-index'](https://www.w3.org/TR/CSS21/visuren.html#propdef-z-index) property specifies:
>
> 1. The stack level of the box in the current stacking context.
> 2. Whether the box establishes a stacking context.

> 翻译：
>
> 对于已定位的盒子，z-index属性声明了：
>
> 1. 该盒子在当前“堆叠上下文（stacking context）“中的层级。
> 2. 该盒子是否生成了堆叠上下文

从这段话中，可以知道z-index只对已定位的盒子生效。并且在z-index的计算过程中”堆叠上下文“非常重要。

## 可能的值

> 整数：
>
> 这个整数是盒子在当前堆叠上下文中的层级，该盒子也创建了新的堆叠上下文。
>
> auto：
>
> 该盒子在当前堆叠上下文中的层级为0。除非它是根元素，它不会创建新的堆叠上下文。
>
> 注：翻译自css规范

现在我们可以知道：对已定位的盒子设置非0的z-index会产生新的堆叠上下文，根元素会创建一个堆叠上下文。

## 堆叠上下文（ stacking context）

前面多次提到了堆叠上下文，那么什么是堆叠上下文呢？

浏览器根据堆叠上下文来确定渲染树中元素的渲染顺序（后渲染的遮挡先渲染的），堆叠上下文中可以包含其他堆叠上下文。

堆叠上下文是原子级的，其他堆叠上下文中的盒子，不会影响该堆叠上下文。

**任何盒子都归属于一个堆叠上下文**，

