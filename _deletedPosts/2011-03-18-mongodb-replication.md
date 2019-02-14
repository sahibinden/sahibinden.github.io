---
layout: post
title: MongoDb + Replica Set
description: NoSQL bir database çözümü olan Mongodb’ye, 1.6.0 versiyonu ile stable olarak eklenen özelliklerden biri de Replica Set özelliği oldu.
category: Sistem
author: serkancapkan
tags: [autofailover, high availability, mongodb, replica set, sistem]
comments: true
share: true
---

NoSQL bir database çözümü olan Mongodb’ye, 1.6.0 versiyonu ile stable olarak eklenen özelliklerden biri de Replica Set özelliği oldu. Bu versiyona kadar kullanılmakta olan replica pair (master-slave) yerine gelen Replica Set’i, master-slave database yapısından ayıran temel özellikler auto failover ve otomatik recovery özelliklerine sahip olması. Bu yazıda, yayınlanmasının hemen ardından sahibinden.com’da kullanmaya başladığımız MongoDb Replica Set hakkında kısa bir bilgi vermeye çalışacağım.

## Neden MongoDb Replica Set?

Öncelikle, ihtiyaçları düşünelim;

- Production sisteminde olan setup’ta MongoDb, read/write değerlerinin yüksek olduğu, sürekli up durumda olması gereki database’leri içermekte.

- Bu database’lerin backup’ı alınmalı.

- %100 uptime ile çalışmalı, dolayısıyla olası bir donanım arızasında verinin backup’tan geri getirilebilir olmasının dışında, böyle bir durumda hiçbir kesinti olmamalı.

Bu ihtiyaçlara çözüm olarak;

- Replica Set kullanılarak read ve write’lar ayrı sunuculara, kod değişikliği yapmadan yönlendirilebilir.

- Data aynı anda 3 farklı (istenirse 2) sunucuda bulunacağı için sürekli backup alınmış olur. Ancak istenirse read/write trafiğinin gelmediği sunucudan yük altında dump alınabilir. İstenirse disaster recovery amaçlı setin elemanlarından bir farklı bir datacenter’da bulundurulabilir.

- Replica Set sayesinde herhangi bir sunucunun down olması durumunda, set çalışmaya devam eder. Down olan sunucu yerine gelince recovery başlar. Bunların tamamı otomatik olarak gerçekleşir.

## Yapı

MongoDb Replica Set, önerilen kurulumda en az 3 sunucu üzerinde çalışır, bu sayı çift kalmak şartı ile artılabilir. Her bir sunucuda çalışan mongodb daemon’ları seti oluşturduktan sonra, aralarında bir seçim yapılır ve bu seçim neticesinde bir tanesi primary member olarak belirlenir. Yaklaşık 2 sn süren bu süreçten sonra, sete bağlanmak isteyen driver’lara hangi elemanın primary durumda olduğu bilgisi verilir ve client’lar o sunucuya write isteklerini gönderirler, bu istekler buradan secondary durumda olan diğer iki sunucuya gönderilir. Aksi belirtilmediği sürece read istekleri de primary durumda olan sunucu üzerinden gerçekleştirilir.

![](/images/posts/mongodb/MongoDbReplicaSet.png)

## Failover

Şimdiye kadar belirtilen kullanım, master-slave yapısı ile de gerçekleştirilebiliyor olmasına rağmen, Replica Set, bu üç sunucudan herhangi birinin down olması durumunda bize önemli  bir imkan sağlayacaktır. Herhangi bir sunucunun down olması durumunda Replica Set’in geriye kalan elemanları arasında bir seçim gerçekleşir ve bu seçimi kazanan member primary duruma geçer. Client driver’ları buna göre write/read işlemlerini bu sunucu üzerine yapmaya başlarlar. Hatırlatmakta fayda var; bu işlem yaklaşık 2 saniye sürer . Görüldüğü gibi bir database down oldu ve manuel bir işleme gerek kalmadan database istekleri farklı bir sunucu üzerine yönlenmeye başladı. Autofailover özelliği Replica Set’in en büyük özelliklerinden biridir.

Replica Set’in oluşturulmasından kısaca kurulumdan bahsetmek gerekirse; (ortam: 64bit linux)

1\. sunucuda (192.168.1.141)

    ./mongod --dbpath /data/db/ --rest  --replSet set1 --port 27001 --logpath /tmp/mongod.log --fork

2\. sunucuda (192.168.1.142)

    ./mongod --dbpath /data/db/ --rest  --replSet set1 --port 27001 --logpath /tmp/mongod.log --fork

3\. sunucuda (192.168.1.143)

    ./mongod --dbpath /data/db/ --rest  --replSet set1 --port 27001 --logpath /tmp/mongod.log --fork

Servisler çalıştırıldı, şimdi bu servisler ile Replica Set oluşturulacak. Bunun için bu üç servisten herhangi birine bağlanıp bu işlemi yapacağız.

1\. sunucuda;

    ./mongo --port 27001
    MongoDB shell version: 1.6.3
    connecting to: 127.0.0.1:27001/test
    MongoDB shell version: 1.6.3
    connecting to: 127.0.0.1:27001/test
    >config = {_id: 'set1', members: [
    {_id: 0, host: '192.168.1.141:27001'},
    {_id: 1, host: '192.168.1.142:27001'},
    {_id: 2, host: '192.168.1.143:27001'}]}
    >rs.initiate(config)

    >rs.status()
    {
    "set" : "set1",
    "date" : "Wed Nov 17 2010 03:13:55 GMT+0200 (EET)",
    "myState" : 1,
    "members" : [
    {
    "_id" : 0,
    "name" : "k07b08p141:27001",
    "health" : 1,
    "state" : 1,
    "self" : true
    },
    {
    "_id" : 1,
    "name" : "192.168.1.142:27001",
    "health" : 1,
    "state" : 2,
    "uptime" : 10750,
    "lastHeartbeat" : "Wed Nov 17 2010 03:13:55 GMT+0200 (EET)"
    },
    {
    "_id" : 2,
    "name" : "192.168.1.143:27001",
    "health" : 1,
    "state" : 7,
    "uptime" : 10746,
    "lastHeartbeat" : "Wed Nov 17 2010 03:13:55 GMT+0200 (EET)"
    }
    ],
    "ok" : 1
    }

Bu işlemin ardından 192.168.1.141 ip’li sunucu primary, 192.168.1.142 ve 192.168.1.143 ise secondary oldular. Yani artık sete yazılan her bir data (öncelikle primary sunucuya olmak üzere) tüm sunuculara yazılacak. Burada birkaç farklı kurulum daha yapılabilirdi. Eğer datanın yalnızca 2 sunucuda bulunmasısının yeterli olduğu düşünülürse 3. sunucuya;

    arbiterOnly: true

parametresini vererek yalnızca seti oluşturmak için 3. sunucu olması, üzerinden data tutmaması söylenebilir. Replica Set’in yapısı gereği, setteki member sayısına göre çoğunluk sayıda member’ın ayakta kalması gerektiği için (3 member var ise 2, 5 member var ise 3) her üç member’ın da farklı sunucu üzerinde tutulması gerekmektedir. Farklı datacenter çözümlerinde bunun gerekli olduğunu, hatta yetmeyeceğini şimdi göreceğiz.

Eğer Replica Set üzerinde bulunan datanın coğrafik olarak da yedeklenmesi isteniyorsa bu, üç farklı sunucunun da (gerçekçi olalım, 2 yeterli) farklı datacenter’larda bulundurulması ile sağlanabilir. Ancak bu durumda setin elemanlarından biri down olduğu takdirde, datanın tamamın yeni bir member oluşturmak üzere network üzerinden taşınması yavaş olacağı için, setin 5 eleman ile oluşturulması gerekmektedir. Bu kurulumda 2 member 1. datacenter’da, diğer 2 member 2. datacenter’da ve 1 member herhangi bir datacenter’da bulunacaktır. Herhangi bir sunucunun down olması durumunda set hala çalışır durumda iken data yanındaki sunucudan down olan sunucunun yerine geçecek sunucuya aktarılır.  Bu durumda da, hatta bu süreçte yeni bir sunucunun daha down olması durumunda kesinti yaşanmaz.

## Sonrası

Mongodb’nin son versiyonları ile stable hale gelen bir diğer önemli özellik de autosharding özelliği. Datanın sürekli olarak büyüdüğü sistemleri scalable tutubilmek için kullanılan bu özellikte data, belirtilen bir key’e göre farklı sunucular üzerine dağıtılarak, hem yük dağıtılmış olur, hem de sınırsız bir büyüme şansı elde edilmiş olur. Replica Set ile birlikte kullanımını ifade eden bir çizim ekleyelim ve bu konuyu bir sonraki yazıya bırakalım.

![](/images/posts/mongodb/mongodb_replicasetsharding1.jpg)

## Kaynaklar

[http://www.mongodb.org/display/DOCS/Replica+Sets]()

[http://www.slideshare.net/mongodb/mongodb-replica-sets]()

[http://www.mongodb.org/display/DOCS/Production+Deployments]()
