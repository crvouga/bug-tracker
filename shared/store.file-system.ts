import fs from "fs";

export const read = <T>(filePath: string): { [key: string]: T } => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.log(error.toString());
    return {};
  }
};

export const write = <T>(filePath: string, object: { [key: string]: T }) => {
  console.log("write", filePath, object);
  fs.writeFileSync(filePath, JSON.stringify(object, null, 4));
};
