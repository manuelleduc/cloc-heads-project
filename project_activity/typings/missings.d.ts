declare module "github" {
    export class GitHubApi {
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
    }
}