import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { LoggerService } from "../logger/custom.logger";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private myLogger: LoggerService) {}

  use(req: Request, res: Response, next: Function) {
    const {
      httpVersion,
      headers,
      method,
      baseUrl,
      params,
      query,
      body,
      socket,
    } = req;
    const ip = headers["x-forwarded-for"] || socket.remoteAddress;
    this.myLogger.log(
      {
        baseUrl,
        ip,
        query,
        body,
      },
      `${method}`,
    );
    next();
  }
}
