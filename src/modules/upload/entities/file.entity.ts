import { files } from "src/core/drizzle/schema";
import { InferModel } from 'drizzle-orm';

export type File = InferModel<typeof files>