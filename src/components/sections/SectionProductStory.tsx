import { ProductStoryIntro } from "./product-story/ProductStoryIntro";
import { KisaanMall } from "./product-story/KisaanMall";
import { ConnectedModel } from "./product-story/ConnectedModel";
import { InvestorProof } from "./product-story/InvestorProof";

export default function SectionProductStory() {
  return (
    <>
      <ProductStoryIntro />
      <KisaanMall />
      <ConnectedModel />
      <InvestorProof />
    </>
  );
}
