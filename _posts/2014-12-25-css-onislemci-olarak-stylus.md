---
layout: post
title: "CSS Önişlemcisi olarak Stylus"
description: CSS Önişlemcilerinin ve özellikle Stylus'un öne çıkan yönleri
category: genel
author: muratcorlu
tags: [css, stylus]
comments: true
share: true
---
![Stylus](/images/posts/stylus/stylus.png)

Web sitesinden web uygulaması yazmaya dönüşen web önyüz kodlama dünyasında, yeni ihtiyaçlara yönelik bir çok yeni çözüm ortaya çıktı. Node.js, Grunt, Gulp gibi teknolojiler bunların önde gelenleri. Tabi bu gelişim sürecinden CSS'in de uzak kalması düşünülemezdi.

## CSS Önişlemciler Neden Gerekli?

CSS önişlemcileri(pre-processor), CSS'in durağan dünyasına dinamizm katan çözümler getirdi. CSS'de olmayan ve yakın zamanda kullanılabilecek gibi görünmeyen bir çok yazım kolaylığını CSS önişlemcileri ile yapmak mümkün.

CSS önişlemciler, sonucu yine CSS olan ara bir derleyiciden ibaretdirler. Sadece size daha kısa ve daha kolay geliştirilebilir bir dil yapısı kullanma imkanı veren önişlemciler, sonucunda yine CSS çıkarttığı için, bunlardan faydalanmanız size tarayıcı uyumsuzluğu gibi herhangi bir dezavantaj getirmez.

### Değişken kullanımı

Bir CSS önişlemcisi kullanmanın kazandırdıklarının başında değişken tanımlama imkanı geliyor. Büyük ve fazla katılımcılı yazılım projelerinde, web sitemizin ya da uygulamamazın sahip olduğu renk paletine göre CSS yazarken, aynı renk kodunu tekrar tekrar yazmamız gerekir. Örneğin;

{% highlight css %}
.important-link {
    color: #336699;
}

.highlight {
    background-color: #336699;
}
{% endhighlight %}

Görüldüğü üzere, bir renk tanımı birden fazla yerde geçiyor. Bunun Onlarca CSS dosyasında yüzlerce farklı CSS kuralı içerisinde olduğunu düşündüğünüzde bunu kontrol etmenin, bir değişiklik ihtiyacında "tümünü bul ve değiştir" dışında bir çözümümüzün olmadığı aşikar. Bakın [Stylus](http://learnboost.github.io/stylus/)'da bunu nasıl yapıyoruz:

{% highlight css %}
maincolor = #336699

.important-link
    color maincolor

.highlight
    background-color maincolor
{% endhighlight %}

Bu şekilde bir arayüz proglamlamada, ilgili değişkenlerinizi bir arada tutarak, hem yönetimi kolay, hem okunaklı hem de daha hızlı geliştirilebilir bir stil yönetimine kavuşmuş oluyoruz.

### Mixin ve fonksiyon kullanımı

Mixin ve fonksiyon kullanımı da, CSS'de benzer fakat küçük farklılara sahip tanımlar yaptığımız durumlar için büyük fayda sağlıyor. Hemen bir örnek verelim:

{% highlight css %}
.widget {
    border-radius 5px
    border-color #336699
    border-size 5px
}

.welcome {
    border-radius 15px
    border-color #333
    border-size 15px
}
{% endhighlight %}

Gördüğünüz üzere birbirine benzer fakat farklı değerlere sahip iki farklı CSS seçicisi yazdığımızda, tekrar eden kural tanımları kaçınılmaz olabiliyor. Bunu Stylus'da nasıl halledebileceğimize bir bakalım:

{% highlight css %}
widget(borderSize=5px, color=#336699)
    border-radius borderSize
    border-color color
    border-size borderSize

.widget
    widget()

.welcome
    widget 15px #333
{% endhighlight %}

Yukarıdaki 2 yazımın da çıktısı aynı şey olacak ancak Stylus tarzı yazımda, "widget" diye tanımladığımız kurala benzer başka elementler eklemek çok daha kolay. Yukarıdaki bir mixin örneğiydi. Kullanım olarak buna çok yakın bir örnek de fonksiyonlar. Fonksiyonlar mixin'lere oldukça benzerler. Farkı, fonksiyonların bir değer dönebiliyor olması, bu sayede, bir kural değil, bir değer üretmek gerektiğinde kullanma imkanı verirler. Örneğin;

{% highlight css %}
main-padding-size = 10px
padding-step = 5px

extendPadding(step)
    main-padding-size + (step * padding-step)

.widget
    padding extendPadding(1)

.welcome
    padding extendPadding(2)
{% endhighlight %}

Yukarıdaki tanımın çıktısı aşağıdaki gibi bir CSS kodu olacaktır:

{% highlight css %}
.widget {
  padding: 15px;
}
.welcome {
  padding: 20px;
}
{% endhighlight %}

## @extend

Mixin'ler ortak kuralların tekrar tekrar kolayca kullanılmasını sağlarlar. Ancak bu CSS'de gereksiz kod tekrarına yol açabilir. Örneğin CSS'de aşağıdaki gibi kurallar yazarak tekrar yazımları önleriz;

{% highlight css %}
.widget,
.welcome {
    padding: 10px;
    border-radius: 10px;
}

.welcome {
    font-size: 1.5em;
}
{% endhighlight %}

Bu tarz bir kuralı ilk akla Stylus'da birden fazla şekilde yazabiliriz. İlk akla gelen yöntemi basitçe yazım tarzını değiştirmek olabilir:

{% highlight css %}
.widget
.welcome
    padding 10px
    border-radius 10px

.welcome
    font-size 1.5em
{% endhighlight %}

Ancak bu şekilde yazdığımızda ".welcome" seçicisini tekrar etmiş olduk. Kuralları kalıtım ile almak için kullanılan @extend metodu burada işimize yarayacaktır:

{% highlight css %}
.widget
    padding 10px
    border-radius 10px

.welcome
    @extend .widget
    font-size 1.5em
{% endhighlight %}

Bu şekilde yazdığımızda, herhangi bir tekrara girmeden, CSS çıktımızda da kural tekrarlarını engelleyerek kalıtım özelliklerinden faydalanmış olduk.

### Daha neler neler

Stylus'un(aslında tüm CSS önişlemcilerinin) yukarıda bahsettiğim birkaç temel özelliğiyle, hem bu özellikleri gelişmiş şekilde kullanarak hem de bu yazıda bahsetmediğim daha bir çok ayrıntılı özellik sayesinde, CSS yazımınızı hem verimli hem de eğlenceli bir hale dönüştürebilirsiniz.

## Neden SASS veya LESS değil de, Stylus?

Kuşku yok ki, CSS Önişlemcisi seçeneklerinde Stylus'dan daha popüler seçenekler de mevcut. Bunlardan ilk akla gelenleri [SASS](http://sass-lang.com) ve [LESS](http://lesscss.org). Hangi CSS önişlemcisini seçmek gerektiği sorusu üzerine araştırma yaptığınızda genelde vardığınız nokta bu "hangisini" kullanmak üzerine değil, bir CSS önişlemcisi kullanıp/kullanmamak üzerine dönüyor. Zira CSS önişlemcilerinin birbirleri arasındaki fark, biraz damak tadı gibi, küçük ve genelde kişisel şeyler. Ancak bizim Sahibinden'de Stylus seçmemizde iki etken büyük rol oynadı:

### Yazım tarzı özgürlüğü

Stylus, SASS ve LESS'e göre daha özgür bir yazım tarzına sahip. SASS ve LESS'in aksine, Stylus'da süslü parantezler, iki nokta üstüste işareti ve noktalı virgül işareti opsiyonel. Herhangi bir katkısı olmayan bu işaretleri kullanma zorunluluğundan kurtulmak ekip olarak hoşumuza giden bir özellik oldu.

### Tek bağımlılık node.js

Sahibinden'de yeni önyüz mimarimizi oluştururken, minimum sayıda teknoloji bağımlılığına sahip olmayı istedik. Bir çok Node.js uygulamasını kullanacağımız baştan belli olacağı için, olabildiğince Node.js çözümleri üzerinden devam etmek ve bunun dışındaki bağımlılıklardan uzak durmak istedik. Bu konuda da Ruby ile yazılmış SASS ve kendine has bir derleyicisi olan LESS'e karşılık, bir Node.js uygulaması olan Stylus öne çıktı.

## Sonuç

Büyük ekiplerle karmaşık web uygulamaları geliştirmek istediğinizde, stil tanımlarınızın yönetimi için herhangi bir CSS önişlemcisi(pre-processor) kullanmak projelerinizin yönetilebilirliğini ve geliştirme hızını olumlu yönde etkileyecektir. Biz kendi ihtiyaçlarımız ve zevkimize daha uygun bulduğumuz için Stylus'u seçtik ancak herhangi bir CSS önişlemcisi kullanmak, CSS'ten iyidir.

**Not:** Stylus yazımını herhangi bir kuruluma gerek olmadan tarayıcınızda denemek için [http://learnboost.github.io/stylus/try.html](http://learnboost.github.io/stylus/try.html) adresini kullanabilirsiniz.
