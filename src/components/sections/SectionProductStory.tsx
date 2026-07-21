import { ProductStoryIntro } from "./product-story/ProductStoryIntro";
import { TalkToAgronomist } from "./product-story/TalkToAgronomist";
import { KisaanMall } from "./product-story/KisaanMall";
import { ConnectedModel } from "./product-story/ConnectedModel";
import { InvestorProof } from "./product-story/InvestorProof";
import { ClosingAction } from "./product-story/ClosingAction";

export default function SectionProductStory() {
  return (
    <>
      <ProductStoryIntro />
      <TalkToAgronomist />
      <KisaanMall />
      <ConnectedModel />
      <InvestorProof />
      <ClosingAction />
    </>
  );
}
