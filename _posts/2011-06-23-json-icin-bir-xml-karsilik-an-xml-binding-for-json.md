---
layout: post
title: JSON İçin Bir XML Karşılık (An XML Binding for JSON)
description: Bir araştırma projesi için JSON’ın XML karşılığına ihtiyacım oldu.
category: genel
author: guvendemir
tags: [json, xml]
comments: true
share: true
---

([English version follows](#an-xml-binding-for-json))

Bir araştırma projesi için JSON’ın XML karşılığına ihtiyacım oldu. Nihai amaç JSON’dan JSON’a bazı dönüşümler yapmaktı ve bu işi XSLT kullanarak yapmayı bir denemek istiyordum.

Google’da JSON için (yarı) standart bir XML karşılık var mı diye aradım ama enteresan bir şey bulamadım, ve kendim bir tane uydurdum…

İhtiyacım olan karşılığın böyle özellikleri olması gerekiyordu:

* Geri dönüştürülebilirlik: JSON -> XML -> JSON dönüşümü kayıpsız ve fazlalıksız olmalı
* XPATH ve XSLT ile işlemesi kolay olmalı

Sonuç olarak aşağıdaki aşağıdaki XML karşılığa ulaştım, önce bir örnekle, daha sonra da kural listesi ile:

    <user type="object">
        <name type="string" value="John Smith" />
        <active type="boolean" value="true" />
        <group type="null" />
        <age type="integer" value="30" />
        <weight type="float" value="80.0" />

        <addresses type="array">
            <item type="object">
                ...
            </item>
        </addresses>
    </user>

Ve bunlar da kurallar:

* Her XML elemanı bir type sıfatına (attribute) sahip olacak ve bu sıfat o elemanın JSON tipini belirleyecek. Sıfatın değeri bunlardan biri olabilir: object, array, null, boolean, string, integer and float.
* Her değer elemanın, null’lar hariç, (yani: boolean, string, integer and float), bir value sıfatı bulunur.
* Objeleri temsil eden elemanların alanlarını temsil eden alt elemanları olur ve bu elemanlar alan isimleri ile aynı şekilde isimlendirilirler.
* Dizileri temsil eden elemanların dizi elemanlarını temsil eden alt elemanları olur ve bu elemanlar item olarak isimlendirilirler.
* Eğer en üst seviye elemanın manalı bir ismi yoksa o eleman json olarak isimlendirilir. Aksi taktirde bu eleman manalı bir şekilde isimlendirilmelidir, yukarıdaki örnekte de görülebileği şekilde.

Bu karşılığın aşağıdaki bilinen kısıtlamaları vardır:

* JSON özellik isimleri XML QName’lerinin bir alt kümesi olmalıdırlar ki oluşan XML geçerli bir XML olsun.

Netice olarak, JSON’u Jackson ile işleyip yukarıdaki şekilde bir DOM ağacı oluşturmak, geri dönmek oldukça kolay oldu.

Böyle hayali bir DOM ağacı üzerinde çeşitli XSLT dönüşümleri denedim ve orta derecede başarılı oldu (kolaylık vb açısından). Yakın bir gelecekte bir de DOM benzeri ama JSON spesifik bir ağaç üzerinde Java ile dönüşüm yapmayı deneyeceğim. Onun da sonuçlarını başka bir blog yazısı ile paylaşırım.

—--

# An XML Binding for JSON

For a research project I needed a XML binding for JSON. The final task is to do some JSON to JSON transformations and I’ll experiment doing them with XSLT.

I’ve googled a bit for a standard(ish) XML binding for JSON, but haven’t stumbled on anything like that, thus I’ve made up one…

The binding I needed should have had the following properties:

* It should be reversible: the XML shall be convertible back to JSON without loss of information and without structural changes
* Is should be XPATH and XSLT friendly

The following is what I’ve come up with, first by example, then with guidelines:

    <user type="object">
        <name type="string" value="John Smith" />
        <active type="boolean" value="true" />
        <group type="null" />
        <age type="integer" value="30" />
        <weight type="float" value="80.0" />

        <addresses type="array">
            <item type="object">
                ...
            </item>
        </addresses>
    </user>

Here are the guidelines for the binding:

* Every XML element has a type attribute which denotes its JSON type, one of: object, array, null, boolean, string, integer and float.
* Every value element, except for nulls (which is: boolean, string, integer and float), has a value attribute.
* Elements representing objects have children elements representing its fields. Elements representing fields are named accoring to the field name
* Elements representing arrays have children elements representing items of the array. Elements representing items are named item.
* If the top level element does not have a name it can be named json. Otherwise, it should be named meaningfully, as can be seen with the above example.

This scheme has the following known limitations:

* JSON property names must be a subset of XML QNames so that the resulting document is valid XML

The outcome is that, it is rather easy to parse a JSON document using Jackson parser into a DOM document, and vice versa.

I’ve tried doing some XSLT based transformations on a hypothetical document, with moderate level of success and I plan to compare it with Java based transformations on a DOM like tree, but that’s for another blog entry.
