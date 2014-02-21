# Sahibinden Labs

Sahibinden çalışanlarının teknik makalelerinden oluşan blog. [Hazırlık aşamasında]

## Nasıl makale eklenir?

1. Bu repoyu forklayın.
2. Daha önce bir yazı eklemediyseniz;
    1. Forkladığını repoyu bilgisayarınıza klonlayın.
    2. `images/avatars` klasörüne `adinizsoyadiniz.jpg` şeklinde dosya adıyla, kare boyutunda, en az 150 piksel boyutunda bir avatar ekleyin.
    3. `_config.yml` dosyasında `authors` isimli listeye kendi kullanıcı bilgilerinizi ekleyin. Girilecek bilgilerle ilgili ayrıntılı açıklamaları aşağıdaki "Yazar bilgileri ayrıntıları" bölümünde bulabilirsiniz.
    4. `authors` klasörüner `adinizsoyadiniz.md` isimli bir dosya ekleyin. Klasördeki diğer herhangi bir dosyadaki içeriği kopyalayıp, `author` ve `permalink` alanlarını güncelleyin.
3. Yazınızı `_posts` klasörüne `2012-10-25-yazi-basligi.md` formatındaki isme sahip bir dosya ekleyerek, içine Markdown formatında yazın.
4. Eğer görsel eklemeniz gerekirse, bunları `images/posts` klasörü içine, yazınız için yeni bir klasör açıp kullanabilirsiniz.
5. Oluşturduğunuz tüm içeriği "Pull request" ile blog editörlerine ulaştırın.
6. İçeriğiniz sorumlu kişiler tarafından onaylanıp siteye eklenecektir.
7. Her tür düzeltme ve diğer katkılar için de yukarıdaki işlemler geçerlidir.

## Yazar bilgileri ayrıntıları

name
: Tam ad ve soyadınız

avatar
: Eklediğiniz avatar resminizin dosya adı

title:
: Şirketteki ünvanınız (opsiyonel)

permalink
: İsminizin yazar arşivi sayfası url'inde görülecek hali (`/yazar/murat-corlu/` şeklinde görünmesi için `murat-corlu` değeri girilmeli)

twitter
: Twitter kullanıcı adınız (opsiyonel)

github
: Github kullanıcı adınız (opsiyonel)

working
: true verilmeli