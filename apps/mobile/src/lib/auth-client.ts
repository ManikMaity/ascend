import { createAscendAuthClient } from "@ascend/auth/client";
import { getAuthUrl } from "./api";

export const authClient = createAscendAuthClient(getAuthUrl());
