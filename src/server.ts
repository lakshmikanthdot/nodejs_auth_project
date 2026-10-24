// main root file
// running the server and listening to the port

import { env } from "process";
import { createApp } from "./app";
import { logger } from "./lib/logger";

const app = createApp();

app.listen(env.PORT, () => {
  logger.info(`Server is running on port http://localhost:${env.PORT}`);
});
// test commit
