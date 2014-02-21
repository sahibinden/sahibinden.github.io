---
layout: post
title: "Internet Explorer 6 Sonrası Hayat"
description: Internet Explorer 6 devri sona erdi. Peki ne kazandık?
category: genel
author: fatihhayrioglu
tags: [CSS, Internet Explorer]
comments: true
share: true
---

Uzun süredir IE 6 için kod yazan biz arayüz geliştiricileri IE 6’nın saf dışı kalması ile bir boşlukta kaldık. Bir sevinç vardı içimizde ama yeterli değildi sanki, tabi yıllardır hayatımızı İstanbul trafiği kadar etkileyen ikinci bir sorundan kurtulmuştuk ve bunu öyle kolay kolay atlatmamızı beklememek gerekiyordu. Yazdığımız her kod bloğunu IE 6 ile test etmeden içimiz rahat etmiyordu, ama artık seviye atlamıştık ve bölüm sonu canavarını yenmiştik. Atari oyunlarındaki gibi aslında bölüm sonu canavarını yendikten sonra, sonraki bölümler daha zorlu geçecekti ama artık işin mantığını öğrenmiştik. Evet, IE 6 bize çok çektirdi ama IE 6 ile uğraşırken sorunların üstesinden gelmeyi öğrendik. (“Bu kadarına da pollyannacılık denir” şeklinde bir cümleyi aklınızdan geçiriyorsanız, size IE 6 ile yaşadığınız süreci hatırlamanızı öneririm.) Sizinle burada IE 6 sonrası hayat ve tarayıcı desteği konusunda bir şeyler paylaşacağım.

### Tarayıcı Desteği Nedir?

Arayüz geliştiricileri için kod yazarken dikkate alması gereken en önemli konulardan birisi farklı tarayıcıları düşünerek kod yazmaktır. Bu nedenle arayüz geliştiricilerinin gözü devamlı tarayıcı istatistiklerindedir. Arayüz geliştiricileri için kod yazmak sorun değil zevktir. Ancak farklı tarayıcılar için kod yazmak büyük bir sorundur. Arayüz geliştiricilerinin çalışma zamanının büyük bölümü farklı tarayıcılar için kod yazmak ile geçiriyor. Ayrıca uzun uğraşlar sonucu çözümü bulamamak veya dolambaçlı yollardan çözüm bulmak da sinir bozuyor. Her arayüz geliştiricinin bir satır kodluk çözüm için saatlerini harcadığı olmuştur.

Tarayıcı desteği; sitenizi ziyaret eden kullanıcıların kullandığı farklı tarayıcılarda sitenizin aynı görüntülenmesi ve aynı işlevselliği sağlaması olarak özetleyebiliriz. Bir projeye başlarken veya mevcut bir projeye dâhil olduğumuzda daha kod yazmaya başlamadan bilmemiz gereken bilgilerden birisi sitenin hangi tarayıcıları destekleyeceğidir. Cevaba göre yazdığımız kod ve test sürecimiz değişecektir. Projenin zamanını direk etkileyen bir etkendir tarayıcı uyumluluğu.

### Internet Explorer 6’nın gidişi bize neler getirdi?

Birçok PSD to HTML# sitesi IE 6 desteği için fazladan para istemektedir. Benzer bir durum çalıştığımız şirketlerde yapmamız pek mümkün değil tabiki. Patrona veya müdürümüze IE 6’ya uygun kod yazarım ama aylık %15 fazladan para alırım deme imkanımız yok. Olsa güzel olurdu o ayrı. Evet, belki para istemiyoruz ama genel anlamda düşünüldüğünde elinizdeki arayüz geliştiricilerin harcadığı zaman, uğraşırken verdiği emek ve üstüne üstlük çalışan üzerinde bıraktığı olumsuz etkiyi hesaba kattığımızda %15 bile az gelir. Bu durumu erken gören birçok firma çok önceden IE 6 desteğini kaldırdı. Türkiye’de hâlâ bu kararı verememiş şirketlerin olması üzücü tabi. Kendi açımdan düşününce sahibinden.com’un Kasım 2011 tarihinden itibaren bu kararı almış olması benim için çok büyük bir avantajdır. Darısı hâlâ IE 6 için kod yazanlara.

[IE6 Sonrası Kod Yazma Alışkanlıklarımızı Güncellemek ][1]adlı bir yazı yazmıştım. Bu yazıyı özet geçersek IE 6 sonrası ne kadar rahatladığımızı bir nebze anlayacağız.

  * Saydam PNG fix yazmadan kullanabiliyoruz.
Tam bir saydamlık sağlayan tek resim formatı saydam png’dir. Bu resim formatı IE 6 tarafından desteklenmiyordu. Artık tüm tarayıcıların desteğini sağladığımıza göre resimleri farklı yapılarda daha etkin kullanabileceğiz.
  * Tüm elemanlarda [:hover][2] desteği
IE 6 sadece bağlantılardaki :hover etkisini destekliyordu. IE 6 sonrasında tüm elemanlara :hover etkisini ekleyebiliyoruz. Bir elemana :hover etkisin katmak için bağlantı için alma zorunluluğumuz kalmadı artık.
  * [min-height][3], [min-width][4], [max-height][5] ve [max-width][6] desteği
Tasarım tutarlılığında önemli bir özellik olan min-x özellikleri sayesinden bazen javascript ile yapmak zorunda kaldığımız işleri css ile hallediyoruz.
  * [position:fixed][7] desteği
HTML elemanlarını sayfanın istediğimiz yerine sabitlememizi sağlanayan position:fixed özelliğini artık sorunsuz olarak kullanabileceğiz.
  * CSS2.1 Seçici Tam Desteği(Bir iki eksik ile)
Arayüz geliştiricilerin eli ayağı olan seçiciler açısından çok büyük avantajlar geliyor.
  * &gt; – [çocuk (child) seçicisi][8].
Bir kapsayıcı elemanın sadece bir alt elemanını seçmemizi sağlayan güzel bir seçici. Tüm alt elemanlarından ayrıcı özelliği ile gayet kullanışlı
  * %2B – [Bitişik Kardeş Seçicisi(Adjacent Sibling)][9]
Aynı seviyedeki elemanlardan sonraki elemanı seçmemizi sağlıyor.
  * ~ – Genel Kardeş Seçicisi
Aynı seviyedeki belirlenen elemanları seçmemizi sağlıyor. Bitişik kardeş seçicisinden farkı aynı seviyedeki tüm elemanları seçmesidir.
  * [attr] – [Özellik Seçicileri(Attribute selector).][10]
HTML elemanlarına tanımlana özelliklere göre ayrım yapmamızı sağlar. Kullandıkça avantajlarını daha iyi göreceğimiz bu seçicilerin.
  * :first-child – [ilk çocuk seçicisi.][11]
Sıralı elemanların ilkini seçmek için kullanılan seçici. Liste ile oluşturulan yapılar için çok kullanışlı bir özellik.
  * :first-line – [ilk satır seçicisi.][12]
  * :first-letter – [ilk harf seçicisi.][13]
  * İki sınıf tanımlama
Birden fazla sınıf kullanılan elemanların birden fazla sınıfı kullanarak seçmemizi sağlıyor.
  * sorunsuz [!important ][14]kullanımı

ve ayrıca onlarca sorundan kurtulmuş olduk. 2001 yılında çıkan bir tarayıcı için çok uzun süren bir serüvenin sonuna geldik. Kod yazmak için bilgisayarımın başına oturduğumda IE 6 sonrası yenilikleri uyguladıkça ayrı bir heyecan duyuyorum.

Kasım ayından bu yana yazdığım uygulamalardan bir kaç örnek verecek olursam;

**Özellik Seçicisi**
Özellik seçicisi sayesinde input’ları artık birbirinden ayırt etmek için sınıf tanımlaya gerek yok.
input[type=”text”] tanımı birçok yerde beni benden alıyor.

**first-child seçicisi**
Ardışık gelen yapılarda aradaki çizgiler ve boşluklar için ayrı sınıf tanımlamaya gerek yok. Bu gibi yapılar genelde yazılım çıktısı sonunda çıkan htmller olduğu için yazılım kısmında yazılan kodlamada da azalma oldu.

**Tüm elemanlarda :hover kullanımı**
Artık li ve div’lerin :hover’larına tanımlama yaparak, bağlantılarla kısıtlı kalma sorunundan kurtulduk. Birçok menü ve içerik gizle göster özelliğini bu sayede kolayca yapabiliyoruz.

**saydam png kullanımı**
[sahibinden.com][15] gibi büyük sitelerde yapılan tasarımın farklı durum ve tasarımlara uygun alanlar oluşturma isteği çok oluyor. Bu gibi durumlarda kullanılan resimlerin saydam olması bize çok büyük avantajlar sağlıyor. Artık saydam png kullanırken IE 6’yı düşünmüyorum. Sadece boyutu sorun oluyor mu olmuyor mu, onu düşünüyorum. :D

**min-height kullanımı**
Height değerini unuttum neredeyse. Birçok yerde min-height özelliğini kullanıyorum. Gereksiz yerlerde değil de gerektiğinde tabi.

**Çocuk seçicisi kullanımı**
DOM içinde eleman seçerken çok büyük avantajları oluyor. Süper bir seçici.

### Hangi Tarayıcıları Desteklemek Gerekir

![][16]

Sahibinden.com sitesinde

  * Safari’nin son sürümleri
  * Chrome
  * Firefox 4%2B
  * Internet Explorer 7%2B

desteği sunmaktayız. Tüm testlerimizi bu tarayıcılar ile yapıyoruz.

Normal siteler için %5’in altındaki tarayıcılar göz ardı edilebilirken [sahibinden.com][15] gibi geniş kitlelere erişen siteler için bu oran %2’lere kadar düşüyor.

### Tarayıcı Desteğinin Geleceği

Tarayıcı desteği CSS3 ve HTML5 özelliklerinin çıkması ile biraz şekil değiştirdi. CSS3 ve HTML5’in bazı özellikleri uygulanıp desteklemeyen tarayıcılar göz ardı ediliyor. Facebook ve Twitter gibi dünya genelinde büyük kitlelere hitap eden siteler bu konuda önderlik ediyor. İşlevsellik yönünden aynı işlemi görürken görsellik açısından avantajlar sağlayan bu özelliklerin kullanımı ile kodlama ve site hızı konusunda ciddi avantajlar getirmektedir.

Sahibinden.com olarak bu konuda da ciddi bir ilerleme sağlamış durumdayız. Sahibinden.com sitesinde

  * border-radius
  * box-shadow
  * text-shadow
  * css3 gradient

gibi CSS3 özelliklerini kullanıyoruz.

Tarayıcı desteğinde işlevsellikten ödün vermeden görselliği oluşturan elemanları gerçek manalarında kullanarak birçok yönden avantaj sağlıyoruz.

Yeni nesil tarayıcıların gelişimini göz önüne aldığımızda bu kabul geleceği şimdiden yakalamamızı sağlıyor.

### Gelen gideni aratmayacak

Farklı tarayıcılar ve farklı sürümleri için verilen bu desteğin kesin çözümü için Google Chrome’un yaptığı gibi tüm tarayıcıların otomatik güncelleme özelliğini getirmelidirler. Bu sayede tarayıcılar kendilerini devamlı güncel tutacak ve tüm kullanıcılar yeni nesil tarayıcılara otomatik olarak geçmiş olacaktır.

Chrome’dan sonra Firefox’un da bu konuda adım atması ve kendini otomatik olarak güncellemesi bu konuda bizleri ümitlendirmektedir. Asıl sevindirici haber ise Microsoft’tan geldi. Microsoft’un kendi blogundan [yapılan açıklamada][17] Internet Explorer’un da bundan sonra otomatik güncelleneceği sürprizini yaptı. Bu haber, 2012 yılına daha bir ümitli girmemizi sağladı.

### Sonuç

Hâlâ arayüz geliştiricilerin zamanının çoğunu alan “farklı tarayıcılar için kod yazma” işinin yakında sonu gelecek gibi görünüyor. Google Chrome önderliğinde tarayıcıların kendilerini otomatik olarak güncellemesi ile farklı tarayıcılar için kod yazma sorunumuz çözülecektir.

### Kaynaklar

  1. [http://www.communitymx.com/content/article.cfm?page=1&amp;cid=7D9B1][18]
  2. [http://boagworld.com/technology/effective-browser-support]()
  3. [http://webdesign.about.com/od/testing/a/browser_support.htm]()
  4. [http://boagworld.com/design/a-demonstration-of-graded-browser-support]()
  5. [http://arborwebsolutions.com/2009/11/controlling-your-design-on-the-web-part-1-browser-grading/]()
  6. [http://developer.yahoo.com/yui/articles/gbs/index.html]()
  7. [http://windowsteamblog.com/ie/b/ie/archive/2011/12/15/ie-to-start-automatic-upgrades-across-windows-xp-windows-vista-and-windows-7.aspx]()
  8. [http://labs.sahibinden.com/yazi/sahibinden-com-ziyaretcileri-2011-yili-teknoloji-analizi/]()

   [1]: http://www.fatihhayrioglu.com/ie6-sonrasi-kod-yazma-aliskanliklarimizi-guncellemek/
   [2]: http://www.w3schools.com/cssref/sel_hover.asp
   [3]: http://www.w3schools.com/cssref/pr_dim_min-height.asp
   [4]: http://www.w3schools.com/cssref/pr_dim_min-width.asp
   [5]: http://www.w3schools.com/cssref/pr_dim_max-height.asp
   [6]: http://www.w3schools.com/cssref/pr_dim_max-width.asp
   [7]: http://www.w3schools.com/cssref/pr_class_position.asp
   [8]: http://www.w3.org/TR/CSS2/selector.html#child-selectors
   [9]: http://www.w3.org/TR/CSS2/selector.html#adjacent-selectors
   [10]: http://www.w3.org/TR/CSS2/selector.html#attribute-selectors
   [11]: http://www.w3schools.com/cssref/sel_firstchild.asp
   [12]: http://www.w3schools.com/cssref/sel_firstline.asp
   [13]: http://www.w3schools.com/cssref/sel_firstletter.asp
   [14]: http://www.w3.org/TR/CSS2/cascade.html#important-rules
   [15]: http://sahibinden.com/
   [16]: https://lh3.googleusercontent.com/0EzWqL9hQPROV6CjxgzeN6G7lytwFq3zd8vgWXGZBrEuwxyIqxf38qdaQZZGE8-RzqKZVnzmtiOx8JQE-BKlVnOknTEyI_98Pnwmuug2EODF7P282vg
   [17]: http://windowsteamblog.com/ie/b/ie/archive/2011/12/15/ie-to-start-automatic-upgrades-across-windows-xp-windows-vista-and-windows-7.aspx
   [18]: http://www.communitymx.com/content/article.cfm?page=1&amp;cid=7D9B1
