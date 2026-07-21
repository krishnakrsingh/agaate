import { InvestorSnapshot } from "./investor-narrative/InvestorSnapshot";
import { OperatingModel } from "./investor-narrative/OperatingModel";
import { ProductionInfrastructure } from "./investor-narrative/ProductionInfrastructure";
import { DataAdvisoryLayer } from "./investor-narrative/DataAdvisoryLayer";
import { MarketEcosystem } from "./investor-narrative/MarketEcosystem";
import { PeopleGovernance } from "./investor-narrative/PeopleGovernance";

export default function SectionInvestorNarrative() {
  return (
    <>
      <InvestorSnapshot />
      <OperatingModel />
      <ProductionInfrastructure />
      <DataAdvisoryLayer />
      <MarketEcosystem />
      <PeopleGovernance />
    </>
  );
}
