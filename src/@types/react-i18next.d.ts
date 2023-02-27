import "react-i18next";
import * as ko from "../locales/ko";

declare module "react-i18next" {
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    // defaultNS: "main";
    // custom resources type
    resources: {
      header: typeof ko.header;
    };
  }
}
