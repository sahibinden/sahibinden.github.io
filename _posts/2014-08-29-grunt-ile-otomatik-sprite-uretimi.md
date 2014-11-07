---
layout: post
title: "Grunt ile Otomatik Sprite Üretimi"
description: Grunt ve spritesmith kullanarak otomatik CSS sprite üretme yöntemine bakalım
category: genel
author: muratcorlu
tags: [grunt, spritesmith, css, sprite]
comments: true
share: true
---

![Grunt ile Otomatik Sprite Üretimi](/images/posts/sprite-uretimi/grunt-sprite-generate.png)

Yaptığımız web sayfası ve web uygulamalarında, bir optimizasyon adımı olarak, kullandığımız tasarımsal grafiklerin birleştirilerek sunulmasına **css sprite** yöntemi denir. Bu yöntemde, her biri birkaç kilobayt olan bir çok grafik dosyasının sunucudan ayrı ayrı çekilmesi yerine, bunlar tek ve büyük bir resim dosyasına dönüştürülerek sunucudan tek bir talep ile çekilir. Bu hem sayfanın daha hızlı yüklenmesini, hem de görece dosya boyutlarının küçülmesini sağlar.

## CSS Sprite yöntemi kullanımı ve dezavantajları

Örneğin, bir klasörde aşağıdaki gibi, `add.png`, `edit.png`, `delete.png` adında 3 adet ikon grafiğimizin olduğunu düşünelim. Bunları kullanacağımız alanlar için aşağıdaki gibi bir CSS kodu yazarız:

![](/images/posts/sprite-uretimi/add.png) ![](/images/posts/sprite-uretimi/edit.png) ![](/images/posts/sprite-uretimi/delete.png)

{% highlight css %}
.icon-add {
    background: url('add.png') no-repeat left top;
}
.icon-edit {
    background: url('edit.png') no-repeat left top;
}
.icon-delete {
    background: url('delete.png') no-repeat left top;
}
{% endhighlight %}

CSS sprite yöntemiyle bu 3 resmi alt alta yerleştirip birleştirerek `toolbar-icons.png` adlı tek bir dosya oluşturup, aşağıdaki gibi bir resim ve CSS ile aynı görüntüyü elde edebiliriz:

![](/images/posts/sprite-uretimi/sprite.png)

{% highlight css %}
.icon-add,
.icon-edit,
.icon-delete {
    width: 16px;
    height: 16px;
    background: url('toolbar-icons.png') no-repeat;
}

.icon-add {
    background-position: 0px 0px;
}

.icon-edit {
    background-position: 0px 16px;
}

.icon-delete {
    background-position: 0px 32px;
}
{% endhighlight %}

Bu sayede artık tek bir resim dosyasını CSS ile elementlerin `background`ları olarak belirleyip, pozisyonlarıyla oynayarak aynı görüntüye ulaşmış olduk. Bu yöntemin hız açısından faydalarının yanı sıra, geliştirme aşamasında bazı dezavantajları olduğunu hemen hissetmişsinizdir:

- **CSS kodunun karmaşıklaşması:** Hiç kuşku yok ki, CSS kodunun karmaşıklığı açısından, her dosyanın ayrı ayrı olduğu durum çok daha okunaklı, anlaşılır ve pratik. CSS sprite yönteminde pozisyon hesaplamaları yapmak, hangi pozisyonun resmin neresini ifade ettiğini anlamak oldukça güç.
- **Sprite oluşturmanın güçlüğü:** Resimleri birleştirmek için bir resim editörüne ihtiyacınız olacak. CSS3'ün verdiği imkanlarla, artık önyüzlerde çok daha az grafik kullandığımız ve önyüz yazılımcılarının özel bir grafik uygulamasına ihtiyaç duymadan çalışabilmesini hedeflememiz gereken günlerde, bir optimizasyon ihtiyacı için Photoshop veya benzeri bir uygulama sahibi olmak ve bunu kullanmak zorunda olmak gerçekten üzücü.
- **Oluşan sprite'ın güncellenmesi zorluğu:** 50-60 grafiğin birleştirilmesiyle oluşan bir sprite'da, artık kullanmayacağımız bir ikonun sprite'dan çıkarılması gerektiğinde karşınıza çıkan iş yükünü düşünün: Bu ikon altındaki bütün ikonlar yukarı kayacağı için CSS kodunuzdaki bütün pozisyonları da tekrar elden geçirmeniz gerekecektir.
- **Ekip halinde çalışmaya getirdiği yükler:** 3-5 veya üzeri sayıdaki bir ekiple önyüz geliştirdiğinizde, aynı anda bu sprite'a birşeyler ekleyip çıkarıyor olma riskiniz oldukça yüksektir. Bir binary dosya olduğu için, `git` gibi versiyonlama sistemi kullanıyor olsanız bile, bu çakışmaları çözmek büyük bir külfet olacaktır.

## Çok problem, tek çözüm

"Madem bu kadar derdi vardı, ne diye bize CSS sprite sistemini övdün?" diyebilirsiniz. Ama durun; tüm bu dezavantajların akılcı çözümleri var: Sprite'ları otomatik üretmek.

Sercan'ın yakın zamanda [blogumuzda tanıttığı]({% post_url 2014-07-03-grunt %}) **Grunt** adlı **NodeJS** kütüphanesi ile, yukarıdaki gibi bir çok problemimize pratik çözümler üretebiliyoruz. Sprite üretme problemine getirilen çözümler de bunlardan en verimlilerinden biri.

## Haydi başlayalım!

Otomatik sprite üretebilmek için öncelikle sistemimize `npm` ve `grunt` kurmamız gerekiyor. `npm`, `nodejs`nin içinde geliyor ve [nodejs.org](http://nodejs.org/) adresinden indirilip kolayca kurulabilir. `npm` kurulduktan sonra Grunt'ı da aşağıdaki komut ile kurabiliriz:

{% highlight bash %}
> npm install -g grunt-cli
{% endhighlight %}

Şimdi bir proje klasörü oluşturalım ve denemelik bazı resimler yerleştirelim:

{% highlight bash %}
> mkdir -p sprite-test/src/img
{% endhighlight %}

Örnek olarak [famfamfam](http://www.famfamfam.com/)'dan Silk ikon paketini [indirip](http://www.famfamfam.com/lab/icons/silk/), içinden çıkan 1000 adet png dosyasını(ya da dilediğiniz kadarını) oluşturduğumuz img klasörüne kopyalayalım.

Şimdi komut satırında `sprite-test` klasörüne gidip, `grunt` kütüphanesini ve sprite üretmek için kullanacağımız eklenti olan `grunt-spritesmith` eklentisini kuralım:

{% highlight bash %}
> npm install grunt
> npm install grunt-spritesmith
{% endhighlight %}

Kurulum sırasında bazı opsiyonel paketlerin(`canvassmith` gibi) yüklenmesinde hata alabilirsiniz, önemsemeyin.

[grunt-spritesmith](https://github.com/Ensighten/grunt-spritesmith), bir çok özelleştirme seçeneğiyle, belirttiğiniz resim dosyalarını birleştirmeye yarayan bir grunt eklentisi. Eklentiyi kurduktan sonra grunt ile deneyebilmek için proje klasörümüze `Gruntfile.js` isminde, aşağıdaki içerikteki konfigürasyon dosyamızı ekleyelim:

{% highlight js %}
module.exports = function (grunt) {
  // grunt konfigurasyonu
  grunt.initConfig({
    sprite:{
      all: {
        src: 'src/img/*.png',
        destImg: 'assets/img/sprite.png',
        destCSS: 'assets/css/sprites.css'
      }
    }
  });

  // `grunt-spritesmith` eklentisini yukle
  grunt.loadNpmTasks('grunt-spritesmith');
}
{% endhighlight %}

Bu dosyayı kaydettikten sonra, dosyanın olduğu konumda aşağıdaki komut ile belirttiğimiz sprite görevini çalıştırabiliriz:

{% highlight bash %}
> grunt sprite
{% endhighlight %}

Komutu çalıştırıp, görevin çalışması tamamlandığında(eğer 1000 adet png dosyası kopyaladıysanız sprite'ın oluşması biraz vakit alabilir), `assets/img` klasöründe `sprite.png` adlı bir resim dosyası oluştuğunu ve bu resmin `src/img` klasörü altındaki bütün png dosyalarını içerdiğini göreceksiniz. Bunun yanında `assets/css` klasöründe oluşan `sprites.css` dosyasının da aşağıdaki gibi(ama daha uzunca) bir içeriğe sahip olduğunu göreceksiniz:

{% highlight css %}
/*
Icon classes can be used entirely standalone. They are named after their original file names.

```html
<i class="icon-home"></i>
```
*/
.icon-accept {
  background-image: url(../img/sprite.png);
  background-position: 0px -16px;
  width: 16px;
  height: 16px;
}
.icon-add {
  background-image: url(../img/sprite.png);
  background-position: 0px -8000px;
  width: 16px;
  height: 16px;
}
.icon-anchor {
  background-image: url(../img/sprite.png);
  background-position: 0px -32px;
  width: 16px;
  height: 16px;
}
.icon-application {
  background-image: url(../img/sprite.png);
  background-position: 0px -48px;
  width: 16px;
  height: 16px;
}
....
{% endhighlight %}

CSS dosyasında, `src/img` klasünüzdeki her bir png dosyası için, o dosyanın adıyla bir class oluşturulduğunu, bu resmin, oluşturulan sprite resmindeki konumunun ve boyutunun da otomatik olarak hesaplandığını göreceksiniz. Üretilen bu css dosyasını HTML dokümanınıza dahil edip bu class adlarını kullanarak tek dosyalık sprite dosyanızdan dilediğiniz ikonu kolayca gösterebilirsiniz.

## Neler kazandık?

- CSS dosyası oluştururken piksel hesapları yapma karmaşasından kurtulduk.
- Sprite üretmek için Photoshop ya da benzeri bir grafik editörü kullanma külfetinden kurtulduk.
- Sprite'a yeni bir resim eklemek veya varolan bir resmi çıkartmak, klasöre dosya eklemek veya klasörden dosya çıkarmak kadar pratikleşti.
- Üzerinde çalıştığımız ikonların her biri ayrı dosya olduğu için, ekip halinde çalışırken aynı dosya üzerinde çalışmaktan dolayı çakışma yaşama riskimiz oldukça azaldı.

Yani, bütün dezavantajlarımız bir anda uçuverdi. Aslında bununla da kalmış değiliz, yeni imkanlar da bizi bekliyor:

- Sprite üretme algoritmalarını değiştirerek, çok kolay bir şekilde, örneğin her bir ikonun çevresinde 10 piksellik boşluk olmasını sağlayabiliriz. Veya resimleri alt alta değil de çapraz bir şekilde de yerleştirebiliriz. (bknz: [padding opsiyonu](https://github.com/Ensighten/grunt-spritesmith#usage) ve [algorithm opsiyonu](https://github.com/Ensighten/grunt-spritesmith#usage))
- grunt-spritesmith, css çıktısı vermek dışında, stylus, less, sass, json gibi formatlarda da çıktı üretebiliyor. Hatta template imkanı ile, istediğiniz formatta çıktı üretebiliyorsunuz. Böylece ürettiğiniz sprite verisini istediğiniz alanda istediğiniz şekilde değerlendirebilirsiniz.
- Küçük müdahalelerle, belirleyeceğiniz kurallara göre gruplanmış birden fazla sprite üretebilir, hatta yüksek yoğunluklu ekranlar(retina) için farklı sprite versiyonlarını pratik şekilde üretebilirsiniz.(Bu konuya başka bir makalede değineceğiz.)

## Sonuç

Önyüz geliştirme araçlarına her gün bir yenisi ekleniyor ve her biri, bir başka konudaki probleme çözüm getiriyor veya bize yeni ufuklar açıyor. Sprite üretme de bunlardan biri. Şu an sprite üretme konusunda hatırı sayılır derecede bir konfora ulaştığımız söylenebilir. Ne dersiniz?
