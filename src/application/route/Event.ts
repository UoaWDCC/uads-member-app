import * as express from "express";

const Get = (req: express.Request, res: express.Response): void => {
  res.json({
    message: "hello",
  });
};

export { Get as GET_EVENT };
