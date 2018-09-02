import { storage } from "@pnp/pnpjs";
import { sp } from "@pnp/sp";

export namespace spApi {
    export class Ships {
        public static list(): Promise<any> {
            return sp.web.lists.getByTitle("Ships").items.orderBy("Title").get();
        }
    }
    export class User {
        public static get(): Promise<any> {
            return sp.web.currentUser.usingCaching().get();
        }

    }
    export class Files {
        public static getFileValue(serverRelativeUrl: string): Promise<any> {
            return sp.web.getFileByServerRelativeUrl(serverRelativeUrl).getBuffer()
                .then(_response => {
                    return Promise.resolve({
                        url: serverRelativeUrl,
                        buffer: _response
                    });
                });
        }
    }

}
