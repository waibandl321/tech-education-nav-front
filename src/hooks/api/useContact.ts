import * as mutations from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { CreateContactInput } from "@/API";
import useAPIResponse from "./useAPIResponse";

export default function useContact() {
  const { getErrorMessage } = useAPIResponse();
  const client = generateClient();

  // 作成
  const apiCreateContact = async (reviewInput: CreateContactInput) => {
    try {
      const result = await client.graphql({
        authMode: "apiKey",
        query: mutations.createContact,
        variables: { input: reviewInput },
      });
      return {
        isSuccess: true,
        data: result.data.createContact,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error: getErrorMessage(error),
      };
    }
  };

  return {
    apiCreateContact,
  };
}
