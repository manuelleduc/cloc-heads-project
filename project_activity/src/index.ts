import * as mysql from "mysql";
import GitHubApi = require("github");
import Test from "./Test";

var github = new GitHubApi({
    version: "3.0.0",
    protocol: "https",
    host: "api.github.com",
    timeout: 5000,
    headers: {
        "user-agent": "HEADS App Cloc"
    }
});

function getCommitActivity(user: string, repo: string, cb:(a:any) => any) {
    github.repos.getStatsCommitActivity({
        user: user,
        repo: repo
    }, (err:any, res:any) =>  {
        if(err) {
            console.log(err);
        } else {
            const filtered = res.filter((elem:any) => elem.days);
            cb(filtered);
        }
    });

}

function saveInMysql(host:string, port: number, user: string, password: string, database: string): mysql.IConnection {
    var connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        port: port
    });
    return connection;
}

function saveActivity(connection: mysql.IConnection):( element: any, isLast: boolean, username: string, repo:string) => void {
    return function(element, isLast, username, repo) {
        element.days.forEach((elem: any, index:number, array:Array<any>) => {
            const activity = {
                day: index,
                activity: elem,
                week: element.week,
                username: username,
                repo: repo
            };

            connection.query("INSERT INTO activity SET ?", activity);

            // Quick and dirty !
            if(index +1 >= array.length && isLast) {
                connection.end();
            }
        });
    }
}

function createTable(connection: mysql.IConnection, callback: (err: mysql.IError, ...args: any[]) => void) {
    const query = "CREATE TABLE IF NOT EXISTS activity (day integer, activity integer, week integer, username varchar(255), repo varchar(255) )";
    connection.query(query, callback);
}

const mysqlConnection = saveInMysql(process.env.MYSQL_HOST, +process.env.MYSQL_PORT, process.env.MYSQL_USER, process.env.MYSQL_PWD, process.env.MYSQL_DB_NAME);

const saveAction = saveActivity(mysqlConnection);
createTable(mysqlConnection, () => {
    const username = process.argv[2];
    const repo = process.argv[3];
    getCommitActivity(username, repo, (res) => {
        res.forEach((elem: any, index: number, array:Array<any>) => {
            saveAction(elem, index + 1 >= array.length, username, repo);
        });
    });
});
