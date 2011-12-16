---
layout: post
title: Internet Explorer’dan CSS Kullanımına Kota 
author: muratco
created: !!timestamp '2010-10-19 10:00:00'
tags:
    - CSS
    - Internet Explorer
	- Tecrübeler
---

Sahibinden.com için uğraştığımız bir web mimarisinde, sayfalarımızdaki stil tanımlamalarını geliştirme ortamımızda kullanım alanlarına göre küçük parçalara ayırıyoruz. Böylece sayfalarda bölgesel işler yapılırken geliştirme daha kolay ilerletilebiliyor ve modüler bir yapıya ulaşabiliyoruz. Bu stil dosyaları yayımlama ortamına alırken otomatik bir işlemle birleştiriliyor ve tek bir css dosyası haline getiriliyor.

<!--more-->

Geçenlerde önyüz kodlayan arkadaşlardan ilginç bir şikayet geldi. Söylediklerine göre Internet Explorer’da bazı css dosyaları yüklenmiyordu. Önyüz ekibi olarak Internet Explorer’da karşılaştığımız herhangi bir problemde çok şaşırmıyoruz artık. Bilakis artık bizi şaşırtan, yazdığımız standartlara uygun doğru bir kodun herhangi bir işleme tabi tutulmadan Internet Explorer’da da çalışması oluyor. Şaşırıyoruz; çünkü bu nadiren oluyor.

Yalnız bu problem bizi çok uğraştırdı. Yüklenmediği ya da içinde yazılanların etkisini görmediğimiz stil dosyalarının link etiketleri HTML dokümanımızda görünüyordu, ancak o dosyanın içine ne yazarsak yazalım hiçbir şekilde etkilemiyordu. Sonra dosyanın adını değiştirerek daha ön sıralara aldığımızda dosyanın okunduğunu farkedince bu sefer şaşırdık. Neden olduğu hakkında manidar bir açıklama bulamayınca ben de yarı ciddi olarak “Internet Explorer aynı sayfada -farzı muhal- 20 taneden fazla css yüklemiyordur belki” dedim. Gülüştük ettik… Sonra biraz bakıştık ve yüklenen dosyaları saymaya başladık: 33 tane. Google’a sorduk ve sonucu görünce daha çok güldük: http://support.microsoft.com/kb/262161

Evet, Internet Explorer’lar (sadece 6 falan değil, bütün versiyonları) aynı sayfada 30′dan fazla stil etiketi kullanmaya müsade etmiyor. 30′dan sonrakileri de kale almıyor. 30 sayısı da biraz şüpheli. Bunun 31 yada 32 olduğunu iddia edenler de var(ki bizim duruma 32 daha uygun).

Microsoft ekibinin böyle bir karara nasıl vardığını, neden 20 ya da 50 falan değil de 30′da karar kılındığını ekip olarak çok merak ettik, üzerine bolca da geyik yaptık ama mantıklı bir gerekçe bulamadık.

Evet, bir Internet Explorer vakası daha ekibimize saatlere maloldu. Hep derim, Internet Explorer aradan çekilse Internet teknolojisi daha hızlı gelişir diye. Buna bir sağlam örnek daha gördük.

Nasıl çözdüğümüzü merak edenler de olabilir: Biz geliştirme ortamımızda stil dosyalarını anlık olarak birleştirip gönderen bir kod yazarak çözdük. Yayına alırken zaten tek dosya haline getirdiğimizden orada böyle bir sorun yoktu. Bu yöntemin yanında stil dosyalarını birkaç başka stil dosyasından @import yöntemiyle çağırmak gibi bir yöntem de kullanılıyormuş. Ancak bu konuda da bazı performans sıkıntıları var. Zira bir sayfada hem HTML’den hem de stil içinden css dosyaları çağrıldığında bunlar sıraya konuyor ve yüklenmeleri uzuyor. Falan filan…