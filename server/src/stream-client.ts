import { StreamClient } from "@stream-io/node-sdk";

const apiKey = "myy5dxg34vmq";
const apiSecret = "wd3h93rfqnhurgyv59h3d8e67k7udxex3km98at8rwe7cgf5bdaam9ejpjs42zdk";


export const client = new StreamClient(apiKey, apiSecret)