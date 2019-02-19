---
layout: post
title: "Kusursuz Testler Yazmak: Selenium IDE"
description: Bir araştırma projesi için JSON’ın XML karşılığına ihtiyacım oldu.
category: genel
author: sercaneraslan
tags: [selenium, selenium ide, selenium nasıl kullanılır, selenium nedir, selenium öğren, selenium tool]
comments: true
share: true
---

Bir internet projesinde projeyi geliştirmek kadar yapılan geliştirmenin herhangi bir yan etkisinin olup olmadığını beklenen şekilde çalışıp çalışmadığını test etmek te büyük önem taşır. Sahibinden.com gibi günde 2 milyon kişinin[^1] ziyaret ettiği bir sitenin geliştiricisi olarak hata yapma lüksünüz yoktur. Sitelerin kullanıcı kitlesi büyüyüp çeşitlendiğinde yapılan geliştirmelerin yan etkileri de çok büyük olabildiğinden bu test işlemi de başlı başına bir problem olabilmektedir. Sahibinden.com’da yapılacak her geliştirmenin yayına alınmasından önce bütün sayfalarda elle gezilerek test edilmesi oldukça acı verici olurdu. Tabi ki böyle bir test ortamı makul karşılanamayacağından Selenium çözümü günümüz test yönetimi alanında bilinen en iyi çözümdür.

## Selenium IDE Nedir?

Selenium IDE, Firefox için geliştirilmiş bir eklentidir. Selenium, Web tabanlı uygulamaların testlerini browser/tarayıcı üzerinden yapmamızı sağlayan ve tüm web testlerinin yapılabileceği, açık kaynak kodlu bir test aracıdır (Veritabanı bağlantısı ile yapılabilecek testler, Flash uygulamalar vs. hariç). Diğer test araçlarına göre daha fazla gelişmiştir.

Selenium IDE ile Firefox’taki hareketlerimizi kayıt edebiliriz ve sonra ürettiğimiz test kodlarını otomatik testler için kullanabiliriz.

Örneğin; www.sahibinden.com sayfasına gidilmesi, login olmak için gerekli linke tıklanması, login formunun doldurulması ve submit butonuna tıklanması aşağıdaki kodlardan oluşur:

| Komut | Element | Değişken |
|-------+---------+----------|
| open | http://www.sahibinden.com/ | |
| clickAndWait | link=login | |
| type | username | sercaneraslan |
| type | password | 123456 |
| clickAndWait | //button[@type='submit'] | |

Her zaman otomatik test yapmak iyi değildir. Ödeme, üye girişi gibi önemli sayfaların manuel olarak test edilmesi daha uygundur. Ayrıca yazılan testler bir süre sonra sayfaların değişikliğe uğraması sebebiyle geçerliliğini yitirecektir. Bundan dolayı, testlerin güncel tutulması önemlidir.

Unutulmamalıdır ki Sahibinden.com gibi aylık sayfa gösterimi 2 Milyar[^1] olan büyük sitelerde sayfalar sık sık değişikliğe uğrar.

## Selenium IDE Nasıl Kurulur ?

Selenium IDE bir Firefox eklentisi olduğu için öncelikle Firefox’un bilgisayarımızda kurulu olması gerekmektedir. Firefox 5.0 ve üzeri versiyona sahipseniz [buraya](http://seleniumhq.org/download/) tıklayarak Selenium IDE’yi yükleyebilirsiniz.

Selenium IDE yüklemesi bittiğinde Firefox menüsünden sırasıyla “Araçlar > Selenium IDE” linklerine tıklanarak Selenium IDE’ye ulaşılabilir.

## Selenium IDE’yi Tanıyalım

![](/images/posts/selenium/seleniumView.png)

**Dosya**
: Yeni bir Test Case açmaya, kaydetmeye ya da daha önceden kaydedilmiş bir Test Case’i eklemeye ya da açmaya yarar.

**Düzenle**
: Kontrol işlemlerinin yapıldığı bölümdür. (Kes, Yapıştır, Geri Al vb.)

**Options**
: Bu bölüm IDE ile alakalı ayarlamaların yapıldığı ve varsayılan IDE dilini herhangi bir dile çevirme imkanının bulunduğu bölümdür.

**Options > Options**
: Karakter kodlaması ve Selenium komutlarında "Wait" komutu için milisaniye cinsinden sürenin belirlenmesi bu kısımda yapılır. Varsayılan bekleme süresi “30.000 ms = 30 sn” dir. Ayrıca Bu kısımda kişisel JavaScript'lerinizi de yükleyebilirsiniz.

**Options > Format**
: Selenium scriptlerini HTML dilinden başka herhangi bir dile çevirmek için kullanılır.

**Options > Clipboard Format**
: Hızlı bir şekilde mevcut diğer dillere çevirmek için kullanılır.

**Yardım**
: Genel Yardım bölümüdür. Bu bölümde özellikle “UI-Element Documentation” işinize yarayabilir. Genel olarak tüm IDE’yi anlatmaktadır.

**Base URL**
:Test yapılman istenen URL (Web Adresi) bu alana yazılır. Eğer kayıtlı bir Test Case’iniz varsa Test Case’i çalıştırdığınızda URL otomatik olarak gelecektir.

**Fast & Slow**
: Bu kısımda testin hızını ayarlayabilirsiniz. Testin varsayılan hızı 10′dur. Hız göstergesi 1 ile 10 arasındadır. Eğer testi 1 seviyesine getirirseniz hız, bir insanın test yaptığı hıza eşit olacaktır. Burada ki amaç testi yakalayamama durumunda hızı yavaşlatmaktır. Test hızını teste başlamadan önce ayarlamanız gerekmektedir.

**Play All**
: Tüm Test Case’leri çalıştırmak için kullanılır.

**Play**
: Üzerinde çalışılan Test Case’i çalıştırmak için kullanılır.

**Pause**
: Çalıştırılmış bir Test Case’i bekletmek için kullanılır.

**Step**
: Bekletilmiş bir Test Case’i adım adım ilerletmek için kullanılır.

**Test Runner**
: Hem Selenium kodunu hem Test Case’i hem de testi yaptığınız siteyi hızlı bir şekilde görmek için kullanılan ideal bir araçtır.

**Record**
: Testi kaydetmek ve testi durdurmak için kullanılır. Selenium IDE’yi ilk başlattığınızda kayıt otomatik başlar, işlemlerinizi yaptıktan sonra kaydı bitirmek için Record tuşuna basmanız gerekmektedir.

**Log**
: Testin çalıştırılması ile birlikte hatalı ve başarılı işlemlerin kaydını tutar.

**Reference**
: Komutların açıklamasını gösterir. Komutların nasıl kullanılacağı burada ayrıntılı olarak anlatılmaktadır.

**UI-Element**
: Yardım bölümünde detaylı olarak açıklaması bulunmaktadır, biz şuan bu özelliğe değinmeyeceğiz.

**Rollup**
: Yardım bölümünde detaylı olarak açıklaması bulunmaktadır, biz şuan bu özelliğe değinmeyeceğiz.

## Selenium IDE Nasıl Çalışır ?

1) **Command:** Olayların gerçekleşmesi için komutların girilmesini sağlar. En çok kullanılanları görelim;

**open**
: URL’i ( Siteyi/adresi ) açmak içindir.

**click**
: Bir nesneye tıklamak içindir.

**clickandWait**
: Nesneye tıkladıktan sonra sayfanın yüklenmesini bekler.

**assertElementPresent**
: Belirtilen elemanın yüklenmesini bekler.

**assertTextPresent**
: Belirtilen bir text’in(yazının) sayfada olup olmadığını kontrol eder.

**deleteCookie**
: Belirtilen Cookie’nin silinmesi sağlar.

**mouseOver**
: Mouse’u belirtilen elementin üzerine götürür.

**verifyTextPresent**
: Belirtilen nesnenin belirmesini bekler ve sağlamasını yapar.

**waitForPageToLoad**
: Sayfanın yüklenmesini bekler.

**captureEntirePageScreenshot**
: Üzerinde test yaptığınız sayfanın ekran görüntüsünü çerçevesiz olarak kaydeder.

**waitForElementPresent**
: Sayfadaki bir elementin yüklenmesini bekler, bunu genellikle JavaScript tarafından kontrol edilen elementler için kullanırız.

**type**
: Bir input’un içine yazmak için kullanılır.

2) **Target:** Command’ta belirttiğimiz olayın hangi nesne üzerinde gerçekleşeceğini belirtiriz. Burada CSS Locator ya da Xpath gibi “Yer Bulucular” kullanmamız gerekmektedir. Bir sonra ki konuda “Yer Bulucular”a değineceğiz.

    Css=#menu1 ( HTML’de ki elemanlardan id si menu1 olan [id="menu1"] demek.)
    Xpath=div[@id=’menu1’] ( id si menu1 olan div [id="menu1"] demek.)

3) **Value:** Target’ta belirttiğimiz nesnenin bir değeri varsa ve o değeri belirtmemiz gerekiyorsa ya da sitede bir yere bir değer yazmamız gerekiyorsa kullanırız.

Label = Üye Girişi (İçinde “Üye Girişi” yazan HTML elemanı demektir. Örneğin, <span>Üye Girişi</span> )

## Selenium IDE Yer Bulucular – Locators

Selenium IDE ve yazılım dillerinde kullanılan Locator’ları (Yer Bulucuları) 4 tanedir.

**Xpath
CSS Locator
DOM (Data Object Model)
Link Locator**

### Selenium IDE XPath nedir, nasıl kullanılır?

Xpath, Selenium IDE de kullanılan bir yol göstericidir. Genelde veritabanından sorgu çektiğimizde Test Case’de sorguyu Path’e vermek için kullanılır. Diğer Locator’larda veri sorgusu çekilemiyor. Bu arada Xpath sadece IE (Internet Explorer) tarayıcısında diğer tarayıcılara göre 10 kat daha yavaş çalışmaktadır. Bu yüzden önerilmiyor ama veritabanından bir sorgunun karşılaştırılması gerekiyorsa en ideal yöntem olarak görülmektedir.

Selenium IDE ile kayıda başlayıp www.sahibinden.com ’un Anasayfası’ndaki “Acil Acil” linkine tıkladığınızda Selenium IDE “Source” bölümünde şöyle bir kayıt tutar;

    <tr>
        <td>open</td>
        <td>/</td>
        <td></td>
    </tr>
    <tr>
        <td>click</td>
        <td>//div[@id='content']/div[3]/div[1]/div[2]/ul[1]/li[1]/a/strong/span/</td>
        <td></td>
    </tr>

Bu Path kayıt sırasında otomatik olarak yazılır fakat istikrarlı çalışmamaktadır çünkü sitenin farklı bir sayfasında aynı linke tıklamak istediğinizde divler ya da tablollarda kayma olursa yol bulunamaz. Dolayısıyla şöyle bir ifade kullanmak daha mantıklıdır;

    Xpath=//*/a[@title='Acil Acil']

Bu şekilde yazılan bir Locator şu anlama gelmektedir. HTML bloğunun herhangi bir yerindeki linkin title’lı “Acil Acil” olan ifadedir. Alternatif olarak HTML ağacında yukarı ve aşağıya gidilebilir. Xpath Locator olarak class, id, name, title, span, a, div, type, ul, li gibi ifadelerini tanıyabilmektedir fakat farklı isimlere sahip olmasına rağmen mesela id gibi nitelikleri aynı ise HTML ağacında ilk başta geleni almaktadır. Bu yüzden Locator’a uniqe (sadece ona ait olan) bir nitelik belirtmek gerekir.

### Selenium IDE CSS Locator nedir, nasıl çalışır?

Xpath’e göre yaklaşık 10 kat daha hızlı çalışabilen bir Locator’dır. Çalışma mantığı Web sitelerinde yer alan HTML ağacındaki CSS class ve CSS id ‘lerine göre yer bulmaya yarar. Selenium CSS3 dahil tüm CSS Selector’lara destek vermektedir.

Selenium IDE kullanırken Xpath yerine CSS Locator ifadeleri yazıyoruz. Yine www.sahibinden.com ’un anasayfasındaki “Acil Acil” linkini tıkladığınızda Xpath ile

    Xpath=//*/a[@title='Acil Acil'] yazmak yerine CSS=.boxContent a yazmak yeterli olacaktır.

Buradaki (.)nokta class olduğunu boxContent class ismini, a ise ağacın altındaki linki belirtir. Diyelim ki yukarıdaki HTML ağacında “ul privateCats” in altındaki 3. li ‘nin altındaki linke gitmek istediğimde

CSS=.cats privateCats li + li + li a yazmamız gerekiyor. Xpath’le yine 3. li'ye ulaşmak istersek `Xpath=//*/ul[@class='cats privateCats']/li[3]/a`

Önemli bir nokta var, buradaki “3″, sayfa değiştikçe değişebilir. Yani farklı bir sayfada 5 tane li yazmak gerekebilir. Bu yüzden böyle bir path kullanmak sakıncalıdır.

Bunun yerine `Xpath=//*/a[@title='Top 100]` ya da `CSS=a[title=Top 100]` yazmalıyız. Bu noktada CSS “Where” (Nerede) sorgusuna cevap verir ama test ortamında kararlı çalışmaz.

### Selenium IDE Link Locator nedir, nasıl çalışır?

Xpath ve CSS Locator’un çalışmadığı zamanlarda kullanılır. Her zaman kullanmak sakıncalıdır. Selenium linki bulamayabilir ya da link sayfa açılışında yüklenmemiş olabilir. CSS Locator kadar hızlı çalışır.

Selenium IDE kullanırken Xpath yerine Link Locator ifadeleri yazıyoruz. Yine www.sahibinden.com ’un anasayfasındaki acil acil linkini tıkladığınızda Xpath ile

    Xpath=//*/a[@title='Acil Acil'] yazmak yerine Link=Acil Acil yazıyoruz.

## Selenium IDE DOM (Data Object Model)

Css Locator ve Xpath yeterli olduğu için bu konu üzerinde durmayacağız. Eğer konu hakkında bilgi sahibi olmak isterseniz buraya tıklayabilirsiniz.

##Selenium IDE ile Test Hazırlamak

Record ikonuna tıkladığımızda Selenium IDE yaptığımız hareketleri kayıt etmeye başlar ve eğer sayfamız fazla miktarda JavaScript içermiyorsa oluşturulan kodlar işimizi görecektir fakat internette ki çoğu web sayfası JavaScript tabanlı dinamik özelliği barındırır. JavaScript’in sayfanın elementlerini kontrol etmesi Selenium’un düzgün kod oluşturmasını zorlaştırır. Örneğin bir linkin üzerine geldiğinizde sayfadaki bir div’in oluşturulması (OnMouseOver event’ına bağlı olarak) ve sizin bu div’in içindeki bir linke tıklamanızı Selenium IDE düz olarak koda dökemez. Bu yüzden araya ek kodlar ekleyerek oluşan kodları düzenlemeniz gerekir.

Örnek Test (Base URL: http://www.sahibinden.com/)

* Anasayfa’dan login olma sayfasına git.
* Login olma ekranında kullanıcı adını gir.
* Login olma ekranında şifreyi gir.
* Submit butonuna bas.
* “Bana Özel” sayfasına yönlenip yönlenmediğini kontrol et.
* “Adres Bilgilerim”e tıkla.
* Çıkan sayfada Güncelle’ye tıkla.
* TC Kimlik Noyu 11111111111 olarak değiştir.
* Kaydet butonuna tıkla.
* “Lütfen T.C. Kimlik Numaranızı Doğru Olarak Giriniz.” hata mesajının sayfada yer alıp almadığını kontrol et.

Bu işlemleri Selenium Ide ile kayıt ettiğimizde bize aşağıdaki kodu oluşturur:

| open | http://www.sahibinden.com/ | |
| clickAndWait | link=tıklayın | |
| type | username | sercaneraslan |
| type | password | 123456 |
| clickAndWait | //button[@type='submit'] | |
| clickAndWait | //div[@id='dropmenudiv']/a[2]/div/div/div/span | |
| clickAndWait | //fieldset[@id='1484921']/table/tbody/tr[1]/td[3]/a/div/div/div/span/nobr | |
| clickAndWait | //button[@type='submit'] | |

5\. satırda yer alan “clickAndWait” komutu “dropmenudiv” id’li div’e ulaşmaya çalışıyor fakat “Bana Özel” sayfasında ki bu div JavaScript ile “Üyeliğim” linkinin üzerine geldiğimizde oluşturuluyor. Dolayısıyla mouse’un “Üyeliğim” linkinin üzerine gitmesi gerektiğini kodumuza eklemeliyiz.

Bu tip JavaScript kökenli problemleri çözdükten sonra sayfalarda ki kontrolleri yapmamız gerekiyor. Login olduktan sonra gittiğimiz sayfada “Bana Özel” yazıp yazmadığının kontrolü için “assertTextPresent” komutunu kullanmamız gerekir. “TC Kimlik No” girildikten sonra sayfada hata oluşup oluşmadığını görmek için de aynı komutu kullanmalıyız.

Kodun son hali:

| open | http://www.sahibinden.com/ | |
| clickAndWait | link=tıklayın | |
| type | username | sercaneraslan |
| type | password | 123456 |
| clickAndWait | //button[@type='submit'] | |
| assertTextPresent | Bana Özel > Özet | |
| mouseOver | link=Üyeliğim | |
| clickAndWait | //div[@id='dropmenudiv']/a[2]/div/div/div/span | |
| clickAndWait | //fieldset[@id='1484921']/table/tbody/tr[1]/td[3]/a/div/div/div/span/nobr | |
| type | id_number | 02554687988 |
| clickAndWait | //button[@type='submit'] | |
| assertTextPresent | Kayıt başarı ile güncellendi. | |
| clickAndWait | link=tıklayınız | |


## Selenium IDE ile ilgili Son Bilgiler

Selenium IDE,  PHP, Java, Ruby vb. bir çok dilde çıktı verebilir. Fakat Test Case’leri varsayılan olarak HTML tablolarında saklar.

Farklı tarayıcıda test yapmak için (Örneğin; Opera, Chrome, Internet Explorer vs) Selenium Remote Control (Selenium RC), birden fazla Test Case’in aynı anda test edilmesi için Selenium Grid kullanmanız gerekmektedir.

Kaydettiğiniz birden fazla Test Case’i aynı IDE yi kullanarak çalıştırabilir ve rapor alabilirsiniz. Selenium IDE ile test yapacaksanız ve testi daha sonra Selenium RC ya da Selenium Grid kullanarak farklı tarayıcılarda çalıştıracaksanız kesinlikle CSS Locator kullanmanızı tavsiye ederim. Çünkü Xpath’e göre 10 kat daha hızlıdır ve otomatik testlerin bir insana göre de 10 kat hızlı olduğunu düşünürsek 100 kat daha hızlı test yapabilirsiniz.

Dilerim, ülkemizde de tüm dünyada olduğu gibi, otomatikleştirilmiş testler hakettiği ilgiyi görür ve daha hatasız, daha kararlı ve daha hızlı geliştirilen web uygulamalarına kavuşabiliriz.

[^1]: Temmuz 2011 verisi
