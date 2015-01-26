---
layout: post
title: "ngShow, ngHide ve ngIf AngularJS Directive'lerinin Doğru Kullanımı"
description: "ngShow, ngHide ve ngIf AngularJS Directive'lerinin Doğru Kullanımı"
category: genel
author: sercaneraslan
tags: [angularjs]
comments: true
share: true
---

![Sublime Text](/images/posts/angularjs/angularjs.jpg)

Angular kodu yazarken birçok sayfada ngShow, ngHide ve ngIf directive'lerini kullanmaktayız. Bu directive'ler işlerimizi çok kolaylaştırıyor ve kodun okunabilirliğine oldukça yardımcı oluyor fakat kullanırken dikkat etmemiz gereken bazı unsurlar var. Her ne kadar birbirine benziyor gibi görünseler de farklılar. Bu yüzden ihtiyacımıza uygun olanını tercih etmeliyiz.

## ngShow ve ngHide Kullanımı

Eğer sayfanızda oturum süresi boyunca gizlenip görünecek olan içerikler varsa bu içerikler için ngShow ya da ngHide kullanmalısınız. Eğer sayfanızda oturum süresi boyunca değişmeyecek bir içerik için ngShow ya da ngHide kullanırsanız yazılan içerikler DOM'a boşu boşuna yüklenecekler.

Eğer ngShow ya da ngHide içinde kullanacağınız değişkenin değeri bir AJAX isteğinin cevabına göre belirlenecekse ve AJAX isteğinin cevabı herhangi bir nedenden ötürü (internet hızı, tarayıcı yavaşlığı vs) yavaş gelirse, sayfa ilk yüklendiğinde değişkeninizin değeri "null" olacak ve ngShow ya da ngHide kuralınız çalışmayacak. Ta ki AJAX isteği tamamlanana kadar. Bu durumda görünmesi gereken alanlar görünmeyebilecek, görünmemesi gereken alanlar ise görünebilecek.

{% highlight html %}
<p ng-hide="messages.length > 0">Mesajınız bulunmamaktadır.</p>
{% endhighlight %}

Yukarıdaki örneği inceleyelim;

Angular, "$scope" altında tanımlanmış olan değişkenleri sürekli güncel tuttuğu için sayfa ilk yüklendiğinde "messages" değişkeninin değeri AJAX cevabı gelene kadar "null" olacak. Dolayısıyla ngHide içinde yazılan "messages.length > 0" kuralı "false" olacak. Kural "false" olduğunda ngHide directive'i içeriği gizleyemeyecek. Bu durumda yukarıdaki içerik, AJAX isteği bitene kadar görünecek ve istek bittiğinde kaybolacak.

Bu sorunun çözümü basit. ngHide yerine ngShow kullanalım ve kuralımızı tekrar düzenleyelim. Aşağıdaki içerik AJAX isteği yıllar sürecek olsa bile istek bittikten sonra görünecek çünkü "messages" değişkeni "null" olsada kural "false" olacağı için görünme/kaybolma sorunu yaşanmayacak.

{% highlight html %}
<p ng-show="messages.length === 0">Mesajınız bulunmamaktadır.</p>
{% endhighlight %}

Eğer sayfalarınızda AJAX isteklerinden dönen cevaplarla üretilecek büyük içerikler olacaksa template'inizdeki içeriği bir div ile sarmalayarak "Sadece ana obje erişilebilir olduğunda içeriği göster" diyebiliriz.

Örneğin;

{% highlight html %}
<!-- Mesajlarin verisi hazir olana kadar loading gosteriyoruz. -->
<div ng-hide="messages">
    <p>Mesajlar Yükleniyor...</p>
</div>

<!-- Mesajlarin verisi hazir oldugunda icerigi gosterecegiz. -->
<div ng-show="messages">

    <!-- Mesaj olmadigi durumda mesajınız yok diyoruz -->
    <div ng-hide="messages.length > 0">
        <p>Mesajınız bulunmamaktadır.</p>
    </div>

    <!-- Herhangi bir mesaj varsa mesajlari listeliyoruz -->
    <div ng-show="messages.length > 0">
        <ul>
            <li ng-repeat="message in messages">
                <span ng-bind="message.content"></span>
            </li>
        </ul>
    </div>
</div>
{% endhighlight %}

Yukarıdaki örnekte bizim görünmesini istemediğimiz içerikler görünmeyecek, verilerimiz hazır olduğunda istediğimiz içerikler görünecek. Gizle/göster yapacağımız içerikler bir div ile sarmalandığından ve bu div'e "messages" array'i hazır olduğunda görün dediğimiz için görünme/kaybolma sorunları yaşanmayacak.

## ngIf Kullanımı

Eğer sayfanızda oturum süresi boyunca sadece bir kez görünebilme ihtimali olan içerikler varsa bu içerikler için ngIf kullanmalısınız. ngIf kullanmanız durumunda görünmeyecek olan içerikler DOM'a yüklenmeyecek dolayısıyla içeriklerdeki directive'ler çalışmayacak. ngShow ve ngHide kullanılması durumunda içerikler DOM'a yüklenir ve içeriklerdeki directive'ler çalışır. Bu sebeple ngIf kullanımı size oldukça performans sağlayacaktır, o yüzden ngShow ya da ngHide yazarken "Buraya ngIf yazmam gerekir mi?" diye düşünmenizi tavsiye ederim.

ngIf, kullanılan bloğun içinde yeni bir "child scope" yaratılır. Eğer ngIf kullanılan bloğun içinde mevcut scope'taki bir değişkeni değiştirmek isterseniz "$parent.degiskenAdi" şeklinde erişmeniz gerekecektir.

Örnek:

<p data-height="400" data-theme-id="9501" data-slug-hash="QwgKXb" data-default-tab="result" data-user="sercaneraslan" class='codepen'>See the Pen <a href='http://codepen.io/sercaneraslan/pen/QwgKXb/'>QwgKXb</a> by Sercan Eraslan (<a href='http://codepen.io/sercaneraslan'>@sercaneraslan</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Sonuç

ngShow, ngHide ve ngIf directive'lerinin nasıl kullanıldığını, avantajlarını ve dezavantajlarını gördük. Siz de ihtiyacınıza uygun olanı seçerek performans sağlayın ve görünüm problemleri yaşamayın.
