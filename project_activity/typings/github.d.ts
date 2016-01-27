declare module "github" {

    class GitHubApi {
        constructor(a: {
            version: string;
            debug?:boolean;
            protocol: string;
            host: string;
            timeout: number;
            headers: {
                "user-agent": string;
            };
        });
        user: any;
        repos: {
            getStatsCommitActivity(msg: {
                user: string,
                repo:string
            }, callback:any): void;
        }
    }
    export = GitHubApi;
}