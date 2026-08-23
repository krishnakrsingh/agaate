import "i18next";
import common from "../locales/en/common.json";
import hero from "../locales/en/hero.json";
import beyond from "../locales/en/beyond.json";
import nursery from "../locales/en/nursery.json";
import proof from "../locales/en/proof.json";
import appChapter from "../locales/en/app-chapter.json";
import mall from "../locales/en/mall.json";
import cropWorld from "../locales/en/crop-world.json";
import valueProp from "../locales/en/value-prop.json";
import investor from "../locales/en/investor.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
      hero: typeof hero;
      beyond: typeof beyond;
      nursery: typeof nursery;
      proof: typeof proof;
      "app-chapter": typeof appChapter;
      mall: typeof mall;
      "crop-world": typeof cropWorld;
      "value-prop": typeof valueProp;
      investor: typeof investor;
    };
  }
}
