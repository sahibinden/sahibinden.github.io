# Sahibinden Labs

Sahibinden çalışanlarının teknik makalelerinden oluşan blog.

## Ekibe kendinizi nasıl eklersiniz?

Sahibinden çalışanı iseniz;

1. Bu depoyu forklayın.
2. Forkladığınız depoyu bilgisayarınıza klonlayın.
3. `images/avatars` klasörüne `adinizsoyadiniz.jpg` şeklinde dosya adıyla, kare boyutunda, en az 150 piksel boyutunda bir avatar ekleyin.
4. `_data/team.yml` dosyasındaki alfabetik listenin uygun sırasına kendi kullanıcı bilgilerinizi ekleyin. Girilecek bilgilerle ilgili ayrıntılı açıklamaları aşağıdaki "Yazar bilgileri ayrıntıları" bölümünde bulabilirsiniz.

Sahibinden çalışanı değilseniz;

Hemen özgeçmişinizi [kariyer@sahibinden.com](mailto:kariyer@sahibinden.com)'a gönderin, siz de sahibinden ekibine adınızı yazdırın.

## Nasıl makale eklenir?

1. Bu depoyu forklayın.
2. Daha önce bir yazı eklemediyseniz;
    1. Forkladığınız depoyu bilgisayarınıza klonlayın.
    2. `images/avatars` klasörüne `adinizsoyadiniz.jpg` şeklinde dosya adıyla, kare boyutunda, en az 150 piksel boyutunda bir avatar ekleyin.
    3. `_data/team.yml` dosyasındaki alfabetik listenin uygun sırasına kendi kullanıcı bilgilerinizi ekleyin. Girilecek bilgilerle ilgili ayrıntılı açıklamaları aşağıdaki "Yazar bilgileri ayrıntıları" bölümünde bulabilirsiniz.
    4. `authors` klasörüne `adinizsoyadiniz.md` isimli bir dosya ekleyin. Klasördeki diğer herhangi bir dosyadaki içeriği kopyalayıp, `author` ve `permalink` alanlarını güncelleyin.
3. Yazınızı `_posts` klasörüne `2012-10-25-yazi-basligi.md` formatındaki isme sahip bir dosya ekleyerek, içine Markdown formatında yazın.
4. Eğer görsel eklemeniz gerekirse, bunları `images/posts` klasörü içine, yazınız için yeni bir klasör açıp kullanabilirsiniz.
5. Oluşturduğunuz tüm içeriği "Pull request" ile blog editörlerine ulaştırın.
6. İçeriğiniz sorumlu kişiler tarafından onaylanıp siteye eklenecektir.
7. Her tür düzeltme ve diğer katkılar için de yukarıdaki işlemler geçerlidir.
8. Yaptığınız değişikliği kendi bilgisayarınızda denemek için yapmanız gerekenleri [http://jekyllrb.com](http://jekyllrb.com) adresinden edinebilirsiniz.

## Yazar bilgileri ayrıntıları

name
: Tam ad ve soyadınız

avatar
: Eklediğiniz avatar fotoğrafınızın dosya adı. Avatar fotoğrafınız, kare boyutunda, en az 200x200 boyutunda ve jpg formatında olmalıdır.

title
: Şirketteki ünvanınız

permalink
: İsminizin yazar arşivi sayfası url'inde görülecek hali (`/yazar/murat-corlu/` şeklinde görünmesi için `murat-corlu` değeri girilmeli)

twitter
: Twitter kullanıcı adınız (opsiyonel)

github
: Github kullanıcı adınız (opsiyonel)

working
: true verilmeli

## Lokalde sitenin test edilmesi

Bilgisayarınıza jekyll kurulumu yaptıktan sonra blogu klonladığınız klasörde aşağıdaki komutu çalıştırarak siteyi ve yaptığınız değişiklikleri http://localhost:4000/ adresinden test edebilirsiniz:

`jekyll serve --config _config.yml,_config_dev.yml --watch`
