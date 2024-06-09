import useAPIResponse from "./useAPIResponse";
import { createContact } from "../server/fetchData";
import { Contact, CreateContactInput } from "@/types/APIDataType";

export default function useContact() {
  const { getErrorMessage } = useAPIResponse();

  // 作成
  const apiCreateContact = async (reviewInput: CreateContactInput) => {
    try {
      const result = await createContact<Contact>("/api/contact/create", reviewInput);
      return {
        isSuccess: true,
        data: result,
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
