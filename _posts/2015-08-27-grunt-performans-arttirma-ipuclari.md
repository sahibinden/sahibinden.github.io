---
layout: post
title: "Grunt Performans Arttırma İpuçları"
description: "Grunt Performans Arttırma İpuçları"
category: grunt
author: sercaneraslan
tags: [grunt]
comments: true
share: true
---

![Grunt](/images/posts/grunt/gruntPerformans.png)

SAFE'in (sahibinden.com geliştirme ortamının) ilk versiyonunu Ağustos 2013'te hazırlanmaya başlamıştık. O sıralarda dosyaların sayısı, dosya boyutları ve Grunt task'larımızın sayısı bugüne göre çok daha azdı. Dolayısıyla Grunt task'larımız çok kısa sürelerde tamamlanıyordu ve iyileştirme yapmak gibi bir ihtiyaç hissedilmemişti. O günden bugüne kadar küçük ve orta seviyede geliştirmelerimiz devam etti fakat aradan geçen 2 sene sonunda dosya sayılarının, dosya boyutlarının ve task'larımızın sayısının artması sebebiyle task'larımızın çalışma süreleri ilk zamanlara göre fazlasıyla artış gösterdi. Tabi bu task'ların çoğu saniyeler içinde tamamlanıyor ama sahibinden.com gibi büyük ölçekli firmalar için zaman çok önemli.

Zamanı daha verimli kullanabilmek için SAFE'i v2'ye geçirirken edindiğim Grunt tecrübelerine birlikte göz atalım.

### Task'ların İçindeki İşleri Eş zamanlı Çalıştırma

Task'ların içindeki işleri ve task'ların kendilerini eş zamanlı olarak çalıştırmak oldukça iyi bir yöntem. Bu sayede çok fazla dosyanız olsa bile işleriniz çok kısa sürecek.

Örneğin;

100 tane HTML dosyasını tek seferde sıkıştırmak yerine 4 parça haline getirip 25'er dosya halinde eş zamanlı olarak sıkıştırmak çok daha hızlı sonuç verecektir. Task'ların içindeki işleri eş zamanlı çalıştırabilmeyi sağlaması için [grunt-parallelize](https://github.com/teppeis/grunt-parallelize) plugin'ini kullanacağız.

{% highlight javascript %}
npm install grunt-parallelize --save-dev
{% endhighlight %}

komutuyla plugin'i yükledikten sonra eş zamanlı olarak çalıştırmak istediğiniz işleri **parallelize** task'ının altına tanımlayınız.

Örneğin;

{% highlight javascript %}
grunt.initConfig({
    stylus: {
        all: {
            files: {
                'build/css/common.css': ['app/styles/**/*.styl']
            }
        }
    },
    parallelize: {
        stylus: {
            all: 4
        }
    }
});
{% endhighlight %}

Yukarıdaki örnekte bulunan rakam (4), stylus task'ının kaç parçaya bölünerek çalışacağını belirtmektedir. Benim edindiğim tecrübe, Grunt'ı çalıştırdığınız makinedeki çekirdek sayısı / 2'dir. Yani makinenizde 8 çekirdek varsa task'ları 4'e bölmek en iyi sonucu verecektir.

### Task'ları Eşzamanlı Çalıştırma

Yukarıdaki örnekte task içindeki işleri eş zamanlı çalıştırmayı görmüştük. Bu başlıkta ise birden fazla task'ı aynı anda yani eş zamanlı olarak çalıştırmayı göreceğiz.

{% highlight javascript %}
npm install grunt-concurrent --save-dev
{% endhighlight %}

komutuyla [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent) plugin'ini yükledikten sonra hangi task'ları eş zamanlı çalıştıracağımızı tanımlayalım.

{% highlight javascript %}
grunt.initConfig({
    concurrent: {
        live: [
            'stylus:live',
            'uglify:live'
        ],
        tests: [
            'eslint',
            'karma',
            'jsonlint'
        ]
    }
});
{% endhighlight %}

Yukarıdaki örnekte task olarak **concurrent:live**'ı kullandığınızda **stylus:live** ve **uglify:live** task'ları eş zamanlı çalışarak zamandan oldukça tasarruf ettirecek. Aynı şekilde **concurrent:tests**'i kullandığınızda **eslint**, **karma** ve **jsonlint** task'ları eş zamanlı çalışacaklar.

SAFE v2'de performansımızı en çok arttıran plugin'lerden biridir. Sprite'ları üretme, Bower bağımlılıklarını yükleme, Stylus'ları CSS'e derleme gibi çok zaman alan task'ları eş zamanlı çalıştırarak oldukça zaman kazandık. Performans iyileştirmelerinin sonuçlarını ileride anlatmaya çalışacağım.

Not: Task'ların süre ve tip olarak uyumluluğu çalışma süresini olumlu ya da olumsuz olarak etkileyebiliyor. En iyi uyumu yakalamak için farklı testler yapmanızı öneririm.

### Grunt Plugin'lerinin Hızlı Yüklenmesini Sağlama

SAFE'in ilk versiyonunu hazırladığımız zamanlarda Grunt plugin'lerini otomatik olarak ve hızlı bir şekilde yüklemek gibi bir imkan yoktu. Her plugin'in tek tek yüklenmesi gerekiyordu ve bu işlem uzun sürüyordu. Çözüm olarak plugin'ler sadece gerektiği zamanlarda yüklensinler diye belli kontroller eklenmişti.

Örneğin, default task'ı çalışıyorsa JavaScript sıkıştırma işini yapmayacağımız için "grunt-contrib-uglify" plugin'ini yüklemiyorduk. Tabi bu kontrolleri yaklaşık 80 satırda yaptığımız için kodun okunabilirliği azalmış, geliştirilmesi zorlaşmış ve karmaşıklığı artmıştı. Şimdi ise tek satır kod ile bütün plugin'leri kontrol etmeksizin yükleyebiliyoruz ve bu işlem yaklaşık 3 milisaniye sürüyor.

{% highlight javascript %}
npm install load-grunt-tasks --save-dev
{% endhighlight %}

komutuyla [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) plugin'ini yükledikten sonra **Gruntfile.js**'teki **module.exports** fonksiyonu içerisine **require('load-grunt-tasks')(grunt);** satırını ekliyoruz.

Örneğin;

{% highlight javascript %}

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig();
    grunt.registerTask('default', []);
}
{% endhighlight %}

Yukarıdaki **require('load-grunt-tasks')(grunt);** satırı **['grunt-*', '@*/grunt-*']** pattern'ına uyan plugin'leri otomatik olarak yükleyecektir. Eğer **package.json** dosyanızda farklı bir pattern'a uyan plugin ismi varsa [dokümana](https://github.com/sindresorhus/load-grunt-tasks) göre güncelleyebilirsiniz.

### Sadece Değişen Dosyayı İşleme

Grunt, **watch** modundayken herhangi bir dosyada değişiklik yapıldığında watch edilen bütün dosyalar işlem görür. Örneğin, watch modundayken bir Stylus dosyası değiştirirseniz **bütün** Stylus'larınız tekrar derlenir. Bütün dosyaların derlenmesi yerine sadece değişen dosyayı derlemek için [grunt-newer](https://github.com/tschaub/grunt-newer) plugin'ini kullanacağız.

{% highlight javascript %}
npm install grunt-newer --save-dev
{% endhighlight %}

komutuyla plugin'i yükledikten sonra sadece değişen dosyalar için çalışmasını istediğimiz task'ın adının başına **"newer:"** ekliyoruz.

Örneğin;

{% highlight javascript %}
grunt.initConfig({
    stylus: {
        all: {
            files: {
                'build/css/common.css': ['app/styles/**/*.styl']
            }
        }
    },
    watch: {
        stylus: {
            files: ['app/views/**/*.styl'],
            tasks: ['newer:stylus:all']
        }
    }
});
{% endhighlight %}

Yukarıdaki kod herhangi bir Stylus dosyası değiştinde **newer**'ı çalıştıracak. O da değişen dosyayı bulup **stylus**'un altındaki **all** task'ını çalıştıracak. Bu işlemin sonucunda **common.css** dosyasına sadece değiştirilen dosyadaki değişiklik eklenmiş olacak.

### Fast Task'ı ile Geliştirme Ortamınızı Hızlıca Ayağa Kaldırma

Eğer bir Performans arttırma işi yapıyorsanız size tavsiyem kendinize sürekli olarak **"Acaba buna gerek var mı?"** sorusunu sormanızdır. Onun gerekli olduğunu düşünseniz bile yine de bu soruyu kendinize en az 1 defa sorun. İşte **fast** task'ının çıkış noktası bu soru idi.

Grunt'ın default task'ında bulunan yani geliştirme ortamını ayağa kaldırmak için yaptırdığımız işleri aslında her seferinde yapmamıza gerek yoktur. default task bir kez çalıştığında "tmp, build vs" gibi geçici klasörlerde dosyalarımız işlenmiş bir şekilde durur. İşlenen dosyaların tekrar işlenmesine gerek olmadığı için sadece server'ı ve watch'u açmanız yeterli olacaktır.

Örneğin;

{% highlight javascript %}
grunt.registerTask('fast', [
    'connect:server',
    'watch'
]);
{% endhighlight %}

Yukarıdaki gibi bir task tanımlayıp **grunt fast** komutunu çalıştırırsanız geliştirme ortamınız 1 saniye içine ayağa kalkacaktır. Güzel, değil mi?

### Task'ların Çalışma Sürelerini Raporlama

Bu başlıkta performans arttırmaya değil raporlamaya yönelik bir plugin'den bahsedeceğim. Kullanacağınız yeni plugin'lerin ne kadar fayda sağladığını [time-grunt](https://github.com/sindresorhus/time-grunt) plugin'i ile ölçeceğiz.

{% highlight javascript %}
npm install time-grunt --save-dev
{% endhighlight %}

komutuyla plugin'ini yükledikten sonra **Gruntfile.js**'teki **module.exports** fonksiyonu içerisine **require('time-grunt')(grunt);** satırını ekliyoruz.

{% highlight javascript %}

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig();
    grunt.registerTask('default', []);
}
{% endhighlight %}

Bu işlemden sonra konsoldan hangi task'ın ne kadar sürede çalıştığını, diğer task'lara oranla ne kadar sürdüğünü, toplam çalışma süresini vb bilgileri ölçebileceksiniz.

### Gruntfile.js'i Düzenleme

Daha okunabilir, geliştirilebilir ve tekrar kullanılabilir bir Gruntfile.js dosyasına sahip olmak için aşağıdaki adımları izleyebilirsiniz.

* Task'lara özel olarak tanımlanan herhangi bir şey varsa bunları task'ların içlerine alınız. Bu sayede gerektiği zaman kullanılacaklar ve task'ları sildiğinizde başka bir yere bakmak zorunda kalmayacaksınız.

* Kullanılmayan herhangi bir şey varsa silin. Örneğin; "pkg: grunt.file.readJSON('package.json')" gibi bir config'iniz varsa muhtemelen kullanmıyorsunuzdur.

* Daha okunabilir olması için indentleri düzeltin, her task'ın ne iş yaptığını ve neden kullanıldığı yorum (comment) olarak ekleyin.

* Elle yazılmış olan ve dosya isimlerinden oluşan uzun array’leri config.json benzeri ayrı bir dosyaya taşıyın.

### SONUÇ

Hangi plugin'lerin bize nasıl bir fayda sağladığını ve sonuçlarının nasıl etki ettiğini görelim;

#### package
package task'ı, Live'a / Canlı Ortama gönderim sırasında çalışan task'ımızdır. HTML'lerin sıkıştırılması, Stylus dosyalarının CSS'e derlenmesi, Sprite'ların üretilmesi gibi işleri yapar yani SAFE kodlarının Live'a hazır hale gelmesini sağlar. package task'ı, Eskiden yaklaşık **1 dakika 14 saniye**de tamamlanırken şu an yaklaşık **29 saniye**de tamamlanıyor. Yani eskisine göre hızımızda **2.5 kat** ya da **%156** artış oldu.

#### default
default task'ı, Local / Geliştirme ortamını ayağa kaldırırken çalışan task'ımızdır. Bu task'ta dosyaların sıkıştırılması, birleştirilmesi vb işlere ihtiyaç yoktur yani SAFE kodlarının Local ortamda hata ayıklayabilir bir şekilde çalışmasını sağlamaktadır. Eskiden Local ortamı ayağa kaldırmak yaklaşık **33 saniye** sürerken şu an yaklaşık **14 saniye** sürüyor. Yani eskisine göre hızımızda **2.2 kat** ya da **%126** artış oldu.

#### fast
default task'ın eski hali **33 saniye** sürerken fast task'ı şu an **1 saniye** sürüyor. Yani eskisine göre hızımızda **33.7** kat ya da **%3270** artış oldu.

#### sprite
Sprite’ları üretmek eskiden yaklaşık **31 saniye** sürerken şu an yaklaşık **5 saniye** sürüyor. Yani eskisine göre hızımızda **6 kat** ya da **%498** artış oldu.

#### test
Kod kalitesini yüksek tutmak için çalışan testler eskiden yaklaşık **9 saniye** sürerken şu an yaklaşık **5 saniye** sürüyor. Yani eskisine göre hızımızda **1.8 kat** ya da **%80** artış oldu.
