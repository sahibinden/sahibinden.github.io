---
layout: page
permalink: /hakkinda/
title: Sahibinden Ekibi
tags: [sahibinden, yazılım ekibi]
modified: 2014-02-19
image:
  feature: sahiplex-1.jpg
  credit: Sahiplex
---

<ul>
{% for author in site.authors %}
    <li><img src="/images/avatars/{{ author.avatar }}" alt="{{ author.name }}"></li>
{% endfor %}
</ul>