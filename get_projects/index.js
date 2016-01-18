var https = require('https');
var _ = require('lodash');
var user = process.argv[2];


var get_page =  function(i) {
    var options = {
        host: "api.github.com",
        path: '/users/' + user + '/repos?per_page=100&page='+i,
        headers: {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'
        }
    };

    https.get(options, function callback_http_repos(res) {
        var body = '';
        res.on('data', function callback_http_data_repo(chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var json = JSON.parse(body);
            var urls = _.map(json, function get_project_url(project) {
                return project["full_name   "];
            });

            console.log(_.join(urls, '\n'));
        });

    });
};

get_page(1);
get_page(2);
get_page(3);