import { brMessages } from "./nationalMessages";
import { internationalMessages } from "./internacionalMessages";

export interface Messages {
  title: string;
  description: string;
  step: number;
}

export const messages = {
  BR: brMessages,
  INT: internationalMessages,
};
