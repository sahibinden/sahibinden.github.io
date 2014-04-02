---
layout: post
title: "Sahibinden.com Mart 2014 ziyaretçi teknoloji istatistikleri"
description: 2014 Mart ayında Türk internet kullanıcılarının teknolojik eğiliminin seyrini görelim
category: genel
author: muratcorlu
tags: [android, browser stats, chrome, firefox, Internet Explorer, ios, mobil, tarayıcı istatistikleri, windows]
comments: true
share: true
---

Sahibinden Labs blogumuzda yayınladığımız ziyaretçi teknoloji istatistikleri yazılarımız oldukça ilgi görüyordu. Teknik bazı problemlerden kaynaklı uzunca bir aradan sonra, bazı yöntem değişiklikleriyle birlikte istatistikleri sunmaya devam ediyoruz.

Yöntem değişikliğimizin birincisi artık istatistikleri daha önceki istatistiklerimizde olduğu gibi **"ziyaret sayıları"**na göre değil, **"ziyaretçi sayılarına"** göre verecek olmamız. Ziyaret sayıları, tarayıcıların kullanıcılarının değişik kullanım tecrübelerinden kaynaklanan farklılıklar nedeniyle genel tabloda yanlış anlaşılmaya sebebiyet verecek sonuçlara sebep olabiliyordu. Zira biz yazılımcılar, bir tarayıcının kullanım oranını merak ettiğimizde, aslında bu tarayıcıyla ilgili vereceğimiz kararın **"kaç kişiyi"** etkileyeceğini merak ederiz. Çünkü o tarayıcıda problem yaşayacak kişi sayısı, bize hata raporu ve müşteri şikayeti olarak geri dönecektir. Bu kişi ayda 2 kere ziyaret etse de, 10 kere ziyaret etse de şikayet eden sayısı 1 olacaktır. Daha önce sunduğumuz ziyaret sayılarına dayalı istatistikte, Internet Explorer kullanıcılarının siteyi daha az sıklıkla ziyaret etmesinden kaynaklı olarak, kullanım oranında kişi sayısına oranla daha düşük bir oran görüldüğünü farkettik. Bunun da biz yazılımcıların ulaşmaya çalıştığı veriye göre yanıltıcı olduğunu düşündük. Şu an sunacağımız istatistiklerse, mart ayı içerisinde sitemizi ziyaret eden her bir farklı ziyaretçinin 1 sayıldığı durumdaki kullanım oranlarını göreceğiz.

Sayım yöntemiyle değil ama, sunum yöntemiyle ilgili bir değişiklik de mobil cihazlarla masaüstü cihazları birbirinden daha ayrı şekilde sunmamız olacak. Buna karar vermemizde, sahibinden.com masaüstü sitesine mobil cihazlardan gelen ziyaretçi oranının %20'lere ulaşmasının etkisi büyük. Mobil cihazlar masaüstü cihazlara göre çok farklı işletim sistemleri ve tarayıcı alışkanlıklarına sahip olduğundan, istatistiklerde bu farklılığı görerek bakmak gerektiğini düşündük.

Bu yöntem kararları çerçevesinde Mart 2014 kullanım ortamalarını inceleyelim:

## Tarayıcı istatistikleri

Mart ayı ziyaretçi kullanım ortalamalarına göre, tüm cihazlardan gelen ziyaretçilerin tarayıcı kullanım oranları şu şekilde:

|-------------------+---------|
| Tarayıcı          | Yüzde   |
|:------------------|--------:|
| Chrome            | 51.06%  |
| Internet Explorer | 24.87%  |
| Firefox           | 7.43%   |
| Safari            | 6.33%   |
| Android Browser   | 5.91%   |
| YaBrowser         | 1.63%   |
| Diğer             | 2.77%   |
|-------------------+---------|
{: class="chart" }

Google Chrome'un tahtını sağlamlaştırdığı görülüyor. Safari ve Android Browser'ın listede kendine sağlam yerler bulmasından mobil cihazların hayatımıza ne kadar girdiğini de görüyoruz. Gelin şimdi bir de sadece masaüstü cihazlardan gelen ziyaretçileri baz aldığımızda sonuç nasıl oluyor, bir bakalım:

|-------------------+--------+
| Tarayıcı          | Yüzde  |
|:------------------|-------:|
| Chrome            | 57.14% |
| Internet Explorer | 30.42% |
| Firefox           | 9.13%  |
| YaBrowser         | 1.99%  |
| Safari            | 0.64%  |
| Opera             | 0.57%  |
| Diğer             | 0.11%  |
|-------------------+--------|
{: class="chart" }

Mobil cihazlar çıktığında Safari'nin masaüstü versiyonunun gerçek halini görüyoruz. Internet Explorer mobilde neredeyse hiç olmadığı için, masaüstünde oranı daha yüksek çıkıyor. Ama buna rağmen Chrome'un da oranı daha da artıyor.

Web geliştiricilerinin derdi eski tarayıcılar. Eski tarayıcılar deyince de akla gelenler Internet Explorer versiyonları. Zira 10. yaşını doldurmuş Internet Explorer'lar hâlâ hayatımızda. Şimdi de Internet Explorer versiyonlarının tüm cihazlardaki ve sadece masaüstü cihazlardaki kullanım oranlarına bakalım:

|----------+--------+----------|
| Versiyon | Yüzde  | Masaüstü |
|:---------|-------:|---------:|
| 11.0     | 8.23%  | 10.18%   |
| 8.0      | 7.58%  | 9.37%    |
| 10.0     | 4.61%  | 5.70%    |
| 9.0      | 3.92%  | 4.85%    |
| 7.0      | 0.53%  | 0.66%    |
| Diğer    | 0.10%  | 0.13%    |
|----------+--------+----------|

Internet Explorer 8'in hâlâ en çok kullanılan 2. Internet Explorer olduğunu görmek biz geliştiriciler için üzücü olsa da, IE 8 ve IE 9'un toplamda %11 gibi bir orana gerilemesi ümit verici. Internet Explorer 10'dan itibaren otomatik güncelleme sistemine geçilmesinin faydası olarak da, IE10 kullanıcılarının hızlı bir şekilde IE11'e geçiş yaptığını görüyoruz.

## İşletim sistemleri

Masaüstü cihazların işletim sistemi dağılımı -eski yazılarımızı takip edenler bilir- verdiğimiz en heyecansız istatistikler. Windows'a yaklaşmayı başarabilen bir işletim sistemi yok henüz:

|-----------------+--------|
| İşletim Sistemi | Yüzde  |
|:----------------|-------:|
| Windows         | 98.44% |
| Macintosh       | 0.80%  |
| Linux           | 0.72%  |
|-----------------+--------|
{: class="chart" }

Windows işletim sisteminin versiyonlarının kullanım oranları ise şu şekilde:

|-----------------+--------|
| İşletim Sistemi | Yüzde  |
|:----------------|-------:|
| 7               | 60.71% |
| XP              | 24.06% |
| 8               | 8.82%  |
| 8.1             | 2.91%  |
| Vista           | 1.84%  |
|-----------------+--------|
{: class="chart" }

Görüldüğü üzere Windows versiyonlarında Windows 7 hakimiyetini almış görünüyor. Windows 8 henüz beklenen yaygınlığa kavuşamadığı gibi, Nisan ayında [Microsoft'un desteğini çekeceğini açıkladığı](http://www.microsoft.com/en-us/windows/enterprise/end-of-support.aspx) Windows XP'nin %24'lük kullanım oranı ise düşündürücü.

## Mobil cihazlar

Mart ayı boyunca mobil cihazlardan masaüstüne özgü sitemizi(m.sahibinden.com ve mobil uygulamaların kullanımları hariç) ziyaret eden ziyaretçilerimizin, tüm ziyaretçilerimize oranı **%19.19** olarak belirlendi.

Mobil cihazlardan gelen ziyaretlerin tarayıcı oranları şu şekilde:

|-------------------+--------|
| Tarayıcı          | Yüzde  |
|:------------------|-------:|
| Android Browser   | 30.77% |
| Safari            | 30.28% |
| Chrome            | 25.51% |
| Nokia Browser     | 4.21%  |
| Opera Mini        | 2.82%  |
| Safari (in-app)   | 1.98%  |
| Internet Explorer | 1.47%  |
| Diğer             | 2.96%  |
|-------------------+--------|
{: class="chart" }

Mobil cihazlardan gelen ziyaretlerin işletim sistemleri oranları dağılımı:

|-----------------+--------|
| İşletim Sistemi | Yüzde  |
|:----------------|-------:|
| Android         | 54.68% |
| iOS             | 35.02% |
| SymbianOS       | 5.24%  |
| Windows Phone   | 1.47%  |
| Diğer           | 3.59%  |
|-----------------+--------|
{: class="chart" }

## Ekran çözünürlükleri

Tüm ziyaretçilerin kullandığı cihazların ekran çözünürlük dağılımına baktığımızda şöyle bir tabloyla karşılaşıyoruz:

|------------+--------|
| Çözünürlük | Yüzde  |
|:-----------|-------:|
| 1366x768   | 26.79% |
| 1024x768   | 11.45% |
| 1280x1024  | 6.32%  |
| 1280x800   | 5.84%  |
| 1440x900   | 5.37%  |
| 1920x1080  | 4.08%  |
| 1600x900   | 2.99%  |
| 1360x768   | 2.96%  |
| 360x640    | 2.86%  |
| 768x1024   | 2.44%  |
| 320x480    | 2.06%  |
| 320x568    | 1.96%  |
| 720x1280   | 1.85%  |
| 1024x600   | 1.46%  |
| 1152x864   | 1.22%  |
| Diğer      | 31.43% |
|------------+--------|
{: class="chart" }

Mobil cihazlar işin içine girdiğinde o kadar çok çeşit ekran çözünürlüğü var ki; en çok kullanılan ilk 14 çözünürlükten sonraki %1 ve altında kullanılan çözünürlüklerin toplam kullanım oranı %31'i geçiyor. Dolayısıyla mobil arayüz geliştirirken herhangi bir çözünürlükte çalışabilme ihtimalini göz önünde bulundurmak gerekiyor.

Sadece masaüstü cihazların çözünürlüklerine baktığımızda ise bazı çözünürlükler daha da ön plana çıkıyor:

|------------+---------|
| Çözünürlük | Yüzde   |
|------------|---------|
| 1366x768   | 34.43%  |
| 1024x768   | 14.67%  |
| 1280x1024  | 8.12%   |
| 1280x800   | 7.07%   |
| 1440x900   | 6.90%   |
| 1920x1080  | 5.25%   |
| 1600x900   | 3.84%   |
| 1360x768   | 3.80%   |
| 1024x600   | 1.58%   |
| 1152x864   | 1.57%   |
| 1680x1050  | 1.52%   |
| 1280x768   | 1.49%   |
| 1280x720   | 1.49%   |
| 1280x960   | 0.81%   |
| 1301x731   | 0.59%   |
| Diğer      | 14.34%  |
|------------+---------|
{: class="chart" }

## Sonuç

Her sunduğumuz istatistik makalesinde mobil cihazların hayatımıza biraz daha fazla girdiğini ve biz geliştiricilerin dikkatini bu yöne yöneltmesi gerektiğini görüyoruz. Bu nedenle, verileri sunarken yaptığımız değişikliklerden memnun olduğunuzu umuyoruz.

Uzunca bir aradan sonra size sunduğumuz istatistiklerdeki verileri nasıl buldunuz? Verileri daha anlaşılır ve verimli hale getirmek için önerileriniz nelerdir?