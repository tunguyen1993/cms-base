import { Injectable, NestMiddleware } from "@nestjs/common";

const allowedExt = [
  ".js",
  ".ico",
  ".css",
  ".png",
  ".jpg",
  ".woff2",
  ".woff",
  ".ttf",
  ".svg",
];
export const ROUTE_PREFIX = "api";

const resolvePath = (file: string) =>
  join(__dirname, "/../../../frontend/", file);
import { join } from "path";
import { Request, Response } from "express";

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const { url } = req;
    if (url.indexOf(ROUTE_PREFIX) === 1 || url.indexOf("files") === 1) {
      // it starts with /api --> continue with execution
      next();
    } else if (allowedExt.filter((ext) => url.indexOf(ext) > 0).length > 0) {
      // it has a file extension --> resolve the file
      console.log("here be the other files: " + resolvePath(url));
      res.sendFile(resolvePath(url));
    } else {
      // in all other cases, redirect to the index.html!
      res.sendFile(resolvePath("index.html"));
    }
  }
}
