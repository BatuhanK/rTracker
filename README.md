# rTracker

![önce](http://i.imgur.com/kSRxYb0.png)
![sonra](http://i.imgur.com/UBQC8if.png)
(*evet çizerken elim titredi*)

rTracker etkinlik vb. sayfalarda canlı Retweet gösterimi için kullanılabilecek bir araçtır. Yalnızca back-end kodları mevcuttur.

Front-end için örnek bir kullanım eklenmiştir.
(sample.html -> sadece console.log | *portları düzenleyin lütfen*)

## Gereksinimler

*   node.js
*   mysql
*   twitter app


### Kurulum

Config dosyasının içerisini düzenlemek ve db_schema.sql içerisindeki tabloyu import etmek gerekiyor. ( mysql )

Daha sonra

```sh
$ npm install
$ npm start

```
### json/jsonp data
![json/jsonp çıktı veren endpoint](http://i.imgur.com/TfuL94T.png)
json/jsonp çıktı veren bir endpoint ekledim.
server:port/api/users adresinden çıktı alabilirsiniz
