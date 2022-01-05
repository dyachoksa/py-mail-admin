import { useStore } from "@/store";
import { Message } from "@/store/messages";
import { nanoid } from "nanoid";

export const createSuccessMessage = (
  message: string,
  description?: string,
  actionLink?: any
): Message => ({
  id: nanoid(6),
  type: "success",
  message,
  description,
  actionLink,
});

export const useMessages = () => {
  const store = useStore();

  return {
    showSuccess(message: string, description?: string, actionLink?: any) {
      return store.dispatch(
        "showMessage",
        createSuccessMessage(message, description, actionLink)
      );
    },
  };
};
