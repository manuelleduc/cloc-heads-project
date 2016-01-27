import * as mysql from "mysql";
import {GitHubApi} from "github";

console.log("lol");
var github = new GitHubApi({
    version: "3.0.0",
    protocol: "https",
    host: "api.github.com",
    timeout: 5000,
    headers: {
        "user-agent": "HEADS App Cloc"
    }
});

github.user;