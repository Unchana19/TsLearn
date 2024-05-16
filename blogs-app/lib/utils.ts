import formidable from "formidable";
import { IncomingMessage } from "node:http";

interface FormidablePromise {
  files: formidable.Files<string>;
  body: formidable.Fields;
}

export const readFile = (req: IncomingMessage): Promise<FormidablePromise> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ files, body: fields });
    });
  });
};
