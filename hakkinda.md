---
layout: page
permalink: /ekibimiz/
title: Sahibinden Ekibi
tags: [sahibinden, yazılım ekibi]
modified: 2014-02-19
image:
  feature: sahiplex-1.jpg
  credit: Sahiplex
---

<ul class="team-list">
{% for author in site.authors %}
    {% if author[1].working %}
    <li><img src="/images/avatars/{{ author[1].avatar }}" alt="{{ author[1].name }}" class="author-photo"><div>
        <div class="baloon-container">
            <p class="social-links">{% if author[1].twitter %}
                <a class="icon-twitter" href="https://twitter.com/{{ author[1].twitter }}"></a>
            {% endif %}
            {% if author[1].github %}
                <a class="icon-github" href="https://github.com/{{ author[1].github }}"></a>
            {% endif %}</p>
            <h2>{{ author[1].name }}</h2>
            <p>{{ author[1].title }}</p>
        </div>
    </div></li>
    {% endif %}
{% endfor %}
</ul>