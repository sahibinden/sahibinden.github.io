---
layout: post
title: "AngularJS - Hata Ayıklama Modu"
description: "AngularJS - Hata Ayıklama Modu - Debug Mode"
category: genel
author: sercaneraslan
tags: [angularjs]
comments: true
share: true
---

![Angular](/images/posts/angularjs/angularjs.jpg)

AngularJS kullanılan bir projenin derlenmiş HTML kodlarını incelediğinizde hata ayıklama (debug) için eklenmiş bilgileri görürsünüz. Bu bilgiler elemanlara class olarak eklenir.

Mesela normalde kodunuz aşağıdaki gibiyken;

{% highlight html %}
{% raw %}
<p>Merhaba {{ name }}!</p>
{% endraw %}
{% endhighlight %}

derlenmiş hali aşağıdaki gibi olacaktır.

{% highlight html %}
<p class="ng-binding">Merhaba Sercan!</p>
{% endhighlight %}

Benzer şekilde `ng-bind` ya da `ng-bind-html` directive'leri de bilgilendirme ekleyecek. Ayrıca AngularJS kodu derlendiğinde yeni bir scope yaratılır ve yaratılan scope'un tipine göre view'a / HTML'e "ng-scope" ya da "ng-isolated-scope" class'ı eklenir.

AngularJS 1.3 versiyonu ile birlikte `$compileProvider`'a `debugInfoEnabled()` metodu eklendi. Bu metoda `false` parametresi geçerek bilgilendirmeleri kapatabilir ve aşağıdaki bir satır kod ile canlı ortama aldığınız kodlarınızın daha hızlı çalışmasını sağlayabilirsiniz. Yani hata ayıklama modunu kapatmak size performans kazandırır.

{% highlight javascript %}
$compileProvider.debugInfoEnabled(false);
{% endhighlight %}

Aşağıda hata ayıklama modunun kapalı ve açık olduğu durumlara ait 2 örnek bulunmaktadır. Tarayıcı üzerinden teftiş (inspect) ederek normalde hangi bilgilendirmeler yapılıyor ve hata ayıklama modu kapatıldığında hangi bilgilendirmeler yapılmıyor inceleyebilirsiniz.

#### Hata Ayıklama Modu Açık (Varsayılan)

<p data-height="250" data-theme-id="9501" data-slug-hash="XJGmVN" data-default-tab="result" data-user="sercaneraslan" class='codepen'>See the Pen <a href='http://codepen.io/sercaneraslan/pen/XJGmVN/'>XJGmVN</a> by Sercan Eraslan (<a href='http://codepen.io/sercaneraslan'>@sercaneraslan</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

#### Hata Ayıklama Modu Kapalı (Önerilir)

<p data-height="250" data-theme-id="9501" data-slug-hash="JozYZr" data-default-tab="result" data-user="sercaneraslan" class='codepen'>See the Pen <a href='http://codepen.io/sercaneraslan/pen/JozYZr/'>JozYZr</a> by Sercan Eraslan (<a href='http://codepen.io/sercaneraslan'>@sercaneraslan</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Peki, Canlı Ortamda Hata Ayıklamak İstersek?

Telaşlanmayın, bunun güzel ve kolay bir yolu var. `angular` objesine `reloadWithDebugInfo()` adında bir metod eklendi. Canlı ortamda sayfa açıkken tarayıcının `console` bölümüne aşağıdaki kodu yazarsanız sayfanız hata ayıklama modu açık olarak derlenecektir. Havalı değil mi?

{% highlight javascript %}
angular.reloadWithDebugInfo();
{% endhighlight %}

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
