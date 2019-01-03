// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/6227a28e56f9c085733635ed1c9189f17e425431/body-parser/body-parser.d.ts
declare module "body-parser" {
    import * as express from "express";

    /**
     * bodyParser: use individual json/urlencoded middlewares
     * @deprecated
     */

    function bodyParser(options?: {
        /**
         * if deflated bodies will be inflated. (default: true)
         */
        inflate?: boolean;
        /**
         * maximum request body size. (default: '100kb')
         */
        limit?: any;
        /**
         * function to verify body content, the parsing can be aborted by throwing an error.
         */
        verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
        /**
         * only parse objects and arrays. (default: true)
         */
        strict?: boolean;
        /**
         * passed to JSON.parse().
         */
        reviver?: (key: string, value: any) => any;
        /**
         * parse extended syntax with the qs module. (default: true)
         */
        extended?: boolean;
    }): express.RequestHandler;

    namespace bodyParser {
        export function json(options?: {
            /**
             * if deflated bodies will be inflated. (default: true)
             */
            inflate?: boolean;
            /**
             * maximum request body size. (default: '100kb')
             */
            limit?: any;
            /**
             * request content-type to parse, passed directly to the type-is library. (default: 'json')
             */
            type?: any;
            /**
             * function to verify body content, the parsing can be aborted by throwing an error.
             */
            verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
            /**
             * only parse objects and arrays. (default: true)
             */
            strict?: boolean;
            /**
             * passed to JSON.parse().
             */
            reviver?: (key: string, value: any) => any;
        }): express.RequestHandler;

        export function raw(options?: {
            /**
             * if deflated bodies will be inflated. (default: true)
             */
            inflate?: boolean;
            /**
             * maximum request body size. (default: '100kb')
             */
            limit?: any;
            /**
             * request content-type to parse, passed directly to the type-is library. (default: 'application/octet-stream')
             */
            type?: any;
            /**
             * function to verify body content, the parsing can be aborted by throwing an error.
             */
            verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
        }): express.RequestHandler;

        export function text(options?: {
            /**
             * if deflated bodies will be inflated. (default: true)
             */
            inflate?: boolean;
            /**
             * maximum request body size. (default: '100kb')
             */
            limit?: any;
            /**
             * request content-type to parse, passed directly to the type-is library. (default: 'text/plain')
             */
            type?: any;
            /**
             * function to verify body content, the parsing can be aborted by throwing an error.
             */
            verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
            /**
             * the default charset to parse as, if not specified in content-type. (default: 'utf-8')
             */
            defaultCharset?: string;
        }): express.RequestHandler;

        export function urlencoded(options: {
            /**
             * if deflated bodies will be inflated. (default: true)
             */
            inflate?: boolean;
            /**
             * maximum request body size. (default: '100kb')
             */
            limit?: any;
            /**
             * request content-type to parse, passed directly to the type-is library. (default: 'urlencoded')
             */
            type?: any;
            /**
             * function to verify body content, the parsing can be aborted by throwing an error.
             */
            verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
            /**
             * parse extended syntax with the qs module.
             */
            extended: boolean;
        }): express.RequestHandler;
    }

    export = bodyParser;
}
