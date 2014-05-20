---
layout: post
title: "Sublime Text'i Etkin Kullanma"
description: Sublime Text'i nasıl daha etkin kullanacağımızı göreceğiz.
category: genel
author: sercaneraslan
tags: [sublime-text]
comments: true
share: true
---

![Sublime Text](/images/posts/sublime/sublime.png)

Yazılımcıların yıllardır sürdürdüğü editör kavgalarını bilmeyeniniz yoktur. Herkes kendi kullandığı editörü savunur, karşılıklı editör özellikleri yarıştırılır ve bu bitmek bilmeyen tartışma uzar, uzar, uzar...

İşte [Sublime Text](http://www.sublimetext.com/) de, her ne kadar 2007 yılından beri geliştiriliyor olsa da geçtiğimiz birkaç yıl içinde yazılımcıların tartışır olduğu editörler arasında yerini aldı.

Peki Sublime Text bu tartışılan editörler arasına hangi özellikleriyle girmeyi başardı?

- Hızlılık,
- Stabillik,
- Sadelik,
- Özelleştirilebilme,
- Çoklu düzenleme / Çoklu seçim,
- Eklenti / Paket desteği,
- Dosyalar / Projeler arası hızlı gezinme,
- Komut Paleti (Command Pallette),
- Bütün işletim sistemlerine uyumluluk,
- Pencere yönetimi,
- Snippet'lar

öne çıkan özellikleri arasında. Şimdi detaylara inelim.

## Kullanıcı Ayarları

Sublime Text, kullanıcılara özel ayarlamalar yapma imkanı tanıyor. Örneğin, sayfada yatay scroll çıkmasını istemiyorsanız sırasıyla **"Sublime Text > Preferences > Settings - User"** menüsüne tıklayarak **"word_wrap": true** tanımını ekleyebilirsiniz. Aşağıda benim kullandığım ayarları göreceksiniz. Diğer tanımlanabilen özellikleri görmek için de **"Sublime Text > Preferences > Settings - Default"** menüsüne göz atabilirsiniz.

{% highlight javascript %}
{
    // Tema
    "theme": "predawn.sublime-theme",

    // Tema - Syntax
    "color_scheme": "Packages/User/predawn (SL).tmTheme",

    // Tema - Varsayilan Sidebar
    "sidebar_default": true,

    // Tema - Kucuk Tabler
    "tabs_small": true,

    // Line Endingi default olarak unix yapar.
    "default_line_ending": "unix",

    // Degisiklik kaydedildiginde sayfanin en altina (yoksa eger) otomatik olarak bos satir ekler.
    "ensure_newline_at_eof_on_save": true,

    // Sayfadan odaginizi kaybettiginiz anda sayfa kaydedilir.
    "save_on_focus_lost": true,

    // Tableri otomatik olarak bosluk yapar.
    "translate_tabs_to_spaces": true,

    // Sidebardan dosyaya tiklayinca otomatik olarak onizleme yapmasini iptal eder.
    "preview_on_click": false,

    // Yatay scroll cikmasini engeller.
    "word_wrap": true,

    // Scroll hizini arttirir.
    "scroll_speed": 5.0,

    // Sayfanın en altini kolay okuyabilmek icin fazladan bos alan birakir.
    "scroll_past_end": true,

    // Klasor isimlerinin kalin olmasini saglar.
    "bold_folder_labels": true,

    // Imlecin bulundugu satiri highlight eder.
    "highlight_line": true,

    // Icerigi degistirilmis tableri highlight eder.
    "highlight_modified_tabs": true
}
{% endhighlight %}

## Kısayol Ekleme

Kendinize özgü kısayollar eklemek için **"Sublime Text > Preferences > Key Bindings - User"** a tıklayarak kısayol ekleme dosyasını açabilirsiniz. Nesnenin **"keys"** özelliğine kısayol tuş kombinasyonu ve **"command"** özelliğine de çalıştırılacak metod tanımlanır.

{% highlight javascript %}
[
    {
        "keys": ["ctrl+shift+n"],
        "command": "new_window"
    }
]
{% endhighlight %}

Yukarıdaki tanım, **"Ctrl + Shift + N"** tuşlarına basıldığında **"new_window"** metodunu çalıştıracak yani yeni bir Sublime Text sayfası açacak.

**İpucu:** Tüm metodları görmek için **"Sublime Text > Preferences > Key Bindings - Default"**a bakabilirsiniz.


## Kısayol Olarak Snippet Ekleme

Snippet'lar, hazır kod parçalarıdır. Kısayol ekleme işleminde yaptığımız gibi **"Sublime Text > Preferences > Key Bindings - User"** dosyasına aşağıdaki ekleme yapılır. **"insert_snippet"** metodu sayesinde **"Ctrl + Shift + C"** tuşlarına bastığımızda sayfamıza **console.log();** içeriği eklenecek ve imleç **$1** ile tanımladığımız değişken alana odaklanmış olacak. Bu sayede **console.log();** methodunun direk parametresini yazabilir durumda olacağız.

{% highlight javascript %}
[
    {
        "keys": ["ctrl+shift+n"],
        "command": "new_window"
    }, {
        "keys": ["ctrl+shift+c"],
        "command": "insert_snippet",
        "args": {
            "contents": "console.log($1);"
        }
    }
]
{% endhighlight %}

Birden fazla değişken alan kullanmak istediğinizde **$1,$2,$3** gibi değişken alanlar tanımlayabilirsiniz. İlk değişken alanı yazdıktan sonra **Tab** tuşuna basarsanız otomatik olarak sıradaki değişken alana odaklanmış olacaksınız.

## Ayrı Dosya Olarak Snippet Ekleme

Daha büyük kod parçaları kullanmak isterseniz ayrı dosya olarak Snippet eklemeyi kullanabilirsiniz. **"Sublime Text > Tools > New Snippet"** menüsü seçilir. Dosya aşağıda ki gibi değiştirilir.

{% highlight html %}
<snippet>
    <content><![CDATA[
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>$1</title>
    </head>
    <body>
        <h1>$1</h1>
    </body>
</html>
]]></content>
    <tabTrigger>html5</tabTrigger>
    <scope>source.html</scope>
</snippet>
{% endhighlight %}

Snippet'larda 3 alan vardır. **"content"**, **"tabTrigger"** ve **"scope"**.

**content:** Hazır kod parçalarımızı bu etiket içerisinde tutacağız. **"Kısayol Olarak Snippet Ekleme"** başlığında anlattığımız gibi burada da değişken alanlar kullanılabiliyor.

**tabTrigger:** Hazır kod parçasını kullanmak isteğimizde kullanacağımız anahtar kelimeyi (**html5**) bu alana yazıyoruz.

**scope:** Burada hazır kodumuzun hangi alanlarda kullanabileceğini belirtiyoruz. **scope** etiketini eklemezsek her dosyada kullanabiliriz. Örneğin sadece HTML'de ya da JavaScript dosyalarında kullanmak istiyorsak **source.html** ya da **source.javascript** dememiz yeterli olacaktır.

Snippet'i kaydetmek istediğimizde Sublime Text bize **"Packages > User"** klasörünü öneriyor, Snippet'imizi bu klasör altına **".sublime-snippet"** uzantısı ile kaydediyoruz. Örneğin, **html5.sublime-snippet**. Artık tek yapmamız gereken bir dosya açıp **html5** yazıp **Tab** tuşuna basmak.

Benim kullandığım Snippet'ları [github hesabımdaki dotfiles deposundan](https://github.com/sercaneraslan/dotfiles/tree/master/sublime-text-3/snippet) inceleyebilirsiniz.

**Not:** scope alanını eklediyseniz snippet'ınız sadece ilgili alanda çalışacaktır.
**Not 2:** Snippet eklediğiniz halde snippet'ı çalıştıramıyorsanız Sublime Text'i kapatıp tekrar açmanızı öneririm.


## Paket Yükleme (Plug-in / Eklenti)

Öncelikle **"Sublime Package Control"**ü yükleyeceğiz. **"Sublime Text > View > Show Console"**u açıyoruz. Sonra aşağıdaki uzun kodu Console'a yapıştırıp **"Enter"**a basıyoruz.

{% highlight python %}
import urllib.request,os,hashlib; h = '7183a2d3e96f11eeadd761d777e62404' + 'e330c659d4bb41d3bdf022e94cab3cd0'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
{% endhighlight %}

Bir süre bekledikten sonra **"Sublime Package Control"** kurulmuş oluyor.

**"Cmd + Shift + P"** tuş kombinasyonuyla **"Command Pallette"**i açıp **"Package Control"** yazıyoruz ve yüklediğimiz özellikler listeleniyor.

Yeni bir paket yüklemek istediğinizde **"Package Control: Install Package"**, yüklediğiniz paketi silmek için **"Package Control: Remove Package"**, paket listenizi görmek için ise **"Package Control: List Package"**ı kullanabilirsiniz.

**"Package Control: Install Package"**ı seçtikten sonra biraz bekliyoruz ve tüm paketler listeleniyor. Buradan istediğimiz paketi arayıp/seçip **"Enter"** ile yükleyebilirsiniz.

**İpucu:** **"Cmd + Shift + P"** tuş kombinasyonu ile Sublime Text'in tüm özelliklerine kısayoldan ulaşabilirsiniz.

## Paketler (Plug-in'ler / Eklentiler)

Paketler, Sublime Text'in en güzel özelliklerinden biri. Aşağıda benim kullandığım ve tavsiye ettiğim paketleri göreceksiniz. Tüm paketleri detaylı olarak [Package Control'ün yazarına ait siteden](https://sublime.wbond.net/) inceleyebilirsiniz.

- **[Git](https://sublime.wbond.net/packages/Git)** - Git özelliklerini Sublime üzerinde kullanmanıza imkan verir.

- **[Git Gutter](https://sublime.wbond.net/packages/GitGutter)** - Açık olan dosyanın master'dan farklı olan kısımlarını gösterir.

- **[BracketHighlighter](https://sublime.wbond.net/packages/BracketHighlighter)** - Açılıp kapanan '[]', '{}', '()' benzeri karakterler üzerine tıklandığında sol tarafta karakterler nerede başlamış, nerede bitmiş gösterir.

- **[SublimeLinter](https://sublime.wbond.net/packages/SublimeLinter)** - Hataları, fazladan konulan boşlukları vs gösterir.

- **[AutoFileName](https://sublime.wbond.net/packages/AutoFileName)** - Path yazılan alanlarda (Örn: background: url('/image/'); ) bilgisayardaki path hiyerarşisini kullanmaya imkan verir.

- **[Inc-Dec-Value](https://sublime.wbond.net/packages/Inc-Dec-Value)** - Değeri değiştirilebilen alanlarda Debug Tool'larda olduğu gibi aşağı-yukarı oklarla değerleri değiştirmeye imkan verir. (Alt tuşuna basarak aşağı yukarı okları ile hareket ederek deneyebilirsiniz.)

- **[Pretty JSON](https://sublime.wbond.net/packages/Pretty%20JSON)** - JSON formatındaki verileri girintilemek için "Cmd + Ctrl + J" tuş kombinasyonu ile kullanılır.

- **[Alignment](https://sublime.wbond.net/packages/Alignment)** - Seçili alanda "Ctrl + Alt + A" tuş kombinasyonuyla kod hizalamaya imkan verir. 

- **[Can I Use](https://sublime.wbond.net/packages/Can%20I%20Use)** - Seçili alandaki kelimeyi "Cmd + Alt + F" tuş kombinasyonuyla 'caniuse.com' sitesinde açar.

- **[Sidebar Enhancements](https://sublime.wbond.net/packages/SideBarEnhancements)** - Sublime'ın sidebar üzerinde sağ tıklayınca açılan menüsüne yeni özellikler ekler. 

- **[YUI Compressor](https://sublime.wbond.net/packages/YUI%20Compressor)** - "Cmd + B" tuş kombinasyonuyla CSS ve JavaScript sayfalarını sıkıştırabilirsiniz.

- **[Stylus](https://sublime.wbond.net/packages/Stylus)** - Stylus Syntax'ını ekler.

- **[Live Reload](https://sublime.wbond.net/packages/LiveReload)** - Tarayıcı extension'larıyla yazılan kodun anında tarayıcıda gözükmesine imkan verir.

#### Snippets

- **[Emmet](https://sublime.wbond.net/packages/Emmet)** - HTML/CSS snippet'larını ekler. Detaylar için [emmet websitesine](http://docs.emmet.io/cheat-sheet/) bakabilirsiniz.

- **[Angular​JS Snippets](https://sublime.wbond.net/packages/AngularJS%20Snippets)** - Angular​.js snippet'larını ekler.

- **[Nodejs](https://sublime.wbond.net/packages/Nodejs)** - Node.js snippet'larını ekler. "fs" yazdıktan sonra "Ctrl + Space" tuş kombinasyonu ile kullanılabilenecek methodlar görüntülenir.

- **[jQuery](https://sublime.wbond.net/packages/jQuery)** - jQuery snippet'larını ekler.

#### Temalar

- **[Predawn](https://github.com/jamiewilson/predawn)**

[![Predawn](/images/posts/sublime/predawn.png)](https://github.com/jamiewilson/predawn)

- **[Flatland](https://sublime.wbond.net/packages/Theme%20-%20Flatland)**

[![Flatland](/images/posts/sublime/flatland.png)](https://sublime.wbond.net/packages/Theme%20-%20Flatland)

- **[Phoenix](https://sublime.wbond.net/packages/Theme%20-%20Phoenix)**

[![Phoenix](/images/posts/sublime/phoenix.png)](https://sublime.wbond.net/packages/Theme%20-%20Phoenix)

- **[Spacegray](https://sublime.wbond.net/packages/Theme%20-%20Spacegray)**

[![Spacegray](/images/posts/sublime/spacegray.png)](https://sublime.wbond.net/packages/Theme%20-%20Spacegray)

## Kısayollar

Kısayollar, Sublime Text'i etkin kullanabilmemiz için olmazsa olmazlardan. Çünkü kısayollar ile birçok işimizi fare kullanmadan ve menülerde gezinmeden hızlı bir şekilde halledebiliyoruz.

#### Gezinme

|-----------------------+------------------------------------------------------------------|
| Kısayol               | Açıklama                                                         |
|:----------------------|:-----------------------------------------------------------------|
| Cmd + P               | Dosya açmak için kullanılır.                                     |
| Cmd + R               | Dosya içindeki sembollere ulaşır. (fonksiyon, class vb.)         |
| Cmd + G               | Belirtilen satır numarasına gider.                               |
|-----------------------+------------------------------------------------------------------|

#### Genel

|-----------------------+------------------------------------------------------------------|
| Kısayol               | Açıklama                                                         |
|:----------------------|:-----------------------------------------------------------------|
| Cmd + Shift + P       | Komut paletini açar. (Command Pallette)                          |
| Cmd + K + B           | Side Bar'ı açar / kapar.                                         |
|-----------------------+------------------------------------------------------------------|

#### Bul/Değiştir

|-----------------------+------------------------------------------------------------------|
| Kısayol               | Açıklama                                                         |
|:----------------------|:-----------------------------------------------------------------|
| Cmd + F               | Ara                                                              |
| Cmd + Alt + F         | Değiştir                                                         |
| Cmd + Shift + F       | Side Bar'da açık olan dosya ya da projeler içerisinde arar.      |
|-----------------------+------------------------------------------------------------------|

#### Tablar

|-----------------------+------------------------------------------------------------------|
| Kısayol               | Açıklama                                                         |
|:----------------------|:-----------------------------------------------------------------|
| Cmd + Shift + T       | Son kapatılan tabı açar.                                         |
| Cmd + [NUM]           | Tab'lerde tab sıralarıyla gezinme. [1-9]                         |
|-----------------------+------------------------------------------------------------------|

#### Pencereleri Bölme

|-----------------------+------------------------------------------------------------------|
| Kısayol               | Açıklama                                                         |
|:----------------------|:-----------------------------------------------------------------|
| Cmd + Alt + 1         | Sayfayı tek sütun yapar.                                         |
| Cmd + Alt + 2         | Sayfayı 2 sütun yapar.                                           |
| Cmd + Alt + 3         | Sayfayı 3 sütun yapar.                                           |
| Cmd + Alt + 4         | Sayfayı 4 sütun yapar.                                           |
| Cmd + Alt + 5         | Sayfayı grid olarak 4 parçaya böler.                             |
| Ctrl + [NUM]          | Pencereler arasında gezinme. [1-4]                               |
| Ctrl + Shift + [NUM]  | Penceredeki içeriği başka pencereye taşır. [1-4]                 |
|-----------------------+------------------------------------------------------------------|

#### Bookmark

Satırlara işaret ekleyerek hızlı gezinme sağlar.

|-----------------------+------------------------------------------------------------------|
| Kısayol               | Açıklama                                                         |
|:----------------------|:-----------------------------------------------------------------|
| Cmd + Fn + F2         | Üzerinde bulunulan satıra bookmark ekler/kaldırır.               |
| Fn + F2               | Bir sonraki bookmark'a gider.                                    |
| Shift + Fn + F2       | Bir önceki bookmark'a gider.                                     |
| Cmd + Fn + Shift + F2 | ütün bookmark'ları temizler.                                     |
|-----------------------+------------------------------------------------------------------|

#### İçerik Manipülasyonu

|-----------------------+------------------------------------------------------------------|
| Kısayol               | Açıklama                                                         |
|:----------------------|:-----------------------------------------------------------------|
| Cmd + K + U           | Seçilen metinleri büyük harfe çevirir.                           |
| Cmd + K + L           | Seçilen metinleri küçük harfe çevirir.                           |
|-----------------------+------------------------------------------------------------------|

#### Düzenleme

|-----------------------+------------------------------------------------------------------|
| Kısayol               | Açıklama                                                         |
|:----------------------|:-----------------------------------------------------------------|
| Alt                   | Alt tuşuna basılı tutarak imleci yukarı ya da aşağıya sürükleyerek birden fazla satırda (hepsi aynı sütunda olmak üzere) düzenleme yapabilirsiniz.|
| Cmd + D               | Her basımda seçili olan kelimenin aynısını yakalar ve çoklu düzenleme imkanı sağlar.|
| Cmd + Click           | Tıklanan yerlere imleç ekler.                                    |
| Cmd + Shift + L       | Seçilen satırların sonuna imleç ekler.                           |
| Cmd + C               | Hiçbirşey seçilmediğinde imlecin bulunduğu satırı kopyalar.      |
| Cmd + X               | Hiçbirşey seçilmediğinde imlecin bulunduğu satırı keser.         |
| Cmd + Enter           | Üzerinde bulunulan satırdan sonra yeni bir satır ekler.          |
| Cmd + Shift + Enter   | Üzerinde bulunulan satırdan önce yeni bir satır ekler.           |
| Cmd + L               | Satırı seçer.                                                    |
| Cmd + Shift + /       | İmlecin bulunduğu satırı yorum alanı yapar/yorumu açar.          |
| Cmd + Shift + D       | İmlecin bulunduğu satırdan bir tane daha kopyalar.               |
| Cmd + J               | İmlecin bulunduğu satırla alt satırı birleştirir.                |
| Cmd + Shift + V       | Girintiyi düzenleyerek yapıştırır. (Boşluklardan dolayı kodun kaymasını düzeltir.) |
| Cmd + Alt + .         | Kapatılmayan etiketlerini kapatır.                               |
| Cmd + K + Backspace   | İmleçten satır başına kadar siler.                               |
| Cmd + Alt + ]         | Seçilen satırları bir tab içeri iter.                            |
| Cmd + Alt + [         | Seçilen satırları bir tab geri çeker.                            |
| Ctrl + Shift + K      | Satırı siler.                                                    |
| Ctrl + M              | Açılıp kapanan '[]', '{}', '()' benzeri karakterler üzerindeyken basılırsa imleç açıldığı yerden kapandığı yere gider. |
| Ctrl + Shift + M      | Açılıp kapanan '[]', '{}', '()' benzeri karakterler üzerindeyken basılırsa karakterler arasını seçer. |
| Ctrl + K              | İmleçten satır sonuna kadar siler.                               |
| Ctrl + Y              | Son yapılan işlemi tekrarlar.                                    |
| Ctrl + Space          | Otomatik tamamlama önerilerini görmenizi sağlar.                 |
| Ctrl + Cmd + Up       | Satırı bir üst satır ile yer değiştirir.                         |
| Ctrl + Cmd + Down     | Satırı bir alt satır ile yer değiştirir.                         |
|-----------------------+------------------------------------------------------------------|


## Sonuç

Görüldüğü üzere editör tartışmalarında Sublime Text'in yeri de oldukça sağlam. Tabii ki Sublime Text'in özellikleri burada saydıklarımızdan ibaret değil, değinmediğimiz özellikleri de mevcut.

Yazıda değinmemiz gerektiğini düşündüğünüz özellikleri yorum bölümünde paylaşırsanız, faydalı bir doküman oluşturma yolunda güzel bir adım atmış olabiliriz.
