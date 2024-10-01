import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    HUGGINGFACE_ACCESS_TOKEN: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    HUGGINGFACE_ACCESS_TOKEN: process.env.HUGGINGFACE_ACCESS_TOKEN,
  },
});
