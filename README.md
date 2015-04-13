# api.vk.com
## Установка
``` bash
$ npm i api.vk.com
```
## Использование
``` js
// vk(method, options, callback);
var vk = require('api.vk.com');
vk('users.get', {user_ids:1}, function(error, response){
    console.log(response);
});
```
# Конструктор Chain
Для контроля за количеством запросов в минуту создан конструктор Chain.
``` js
var vk = require('api.vk.com');
//vk.Chain(limit, requests); limit - лимит запросов в секунду, requests - массив запросов, где запрос это [method, options, callback]
var chain = new vk.Chain();
// chain.push(method, options, callback);
chain.push('users.get', {user_ids:1}, function(error, response){
    console.log(response);
});


```