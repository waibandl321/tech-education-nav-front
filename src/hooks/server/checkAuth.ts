import config from "@/amplifyconfiguration.json";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { getCurrentUser } from "aws-amplify/auth/server";
import { IncomingMessage, ServerResponse } from "http";

type ServerSideRequest = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string;
  }>;
};

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const checkAuth = async (
  req: ServerSideRequest,
  res: ServerResponse
) => {
  try {
    await runWithAmplifyServerContext({
      nextServerContext: { request: req, response: res },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
  } catch (error) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
