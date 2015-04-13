var vk = require('api.vk.com');
var chain = new vk.Chain();
var i =0;
while (i<10) {
    chain.push('users.get', {
        user_ids: 1
    }, function (error, response) {
        console.log(error, response);
    });
    i++;
}