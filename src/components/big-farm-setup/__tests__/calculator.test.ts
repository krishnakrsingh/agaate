import { describe, it, expect } from "vitest";

export type CropCategory = "vegetables" | "polyhouse" | "fruits";

const CROP_PRESETS: Record<
  CropCategory,
  {
    name: string;
    crops: string;
    capexAcre: number;
    yieldPerAcreTons: number;
    revenuePerTon: number;
    plugsPerAcre: number;
    laborPer10Acres: number;
    paybackMonths: number;
  }
> = {
  vegetables: {
    name: "Commercial Open-Field Vegetables",
    crops: "Tomato, Chilli, Watermelon, Cauliflower",
    capexAcre: 1.85,
    yieldPerAcreTons: 25,
    revenuePerTon: 18000,
    plugsPerAcre: 12000,
    laborPer10Acres: 4,
    paybackMonths: 7,
  },
  polyhouse: {
    name: "Protected High-Tech Polyhouse",
    crops: "Red/Yellow Capsicum, Cucumber, Hydroponics",
    capexAcre: 12.5,
    yieldPerAcreTons: 45,
    revenuePerTon: 42000,
    plugsPerAcre: 14000,
    laborPer10Acres: 8,
    paybackMonths: 18,
  },
  fruits: {
    name: "High-Value Orchards & Fruits",
    crops: "Pomegranate, Papaya, Dragon Fruit",
    capexAcre: 3.2,
    yieldPerAcreTons: 18,
    revenuePerTon: 35000,
    plugsPerAcre: 1200,
    laborPer10Acres: 3,
    paybackMonths: 14,
  },
};

export function calculateFarmMetrics(acres: number, category: CropCategory) {
  const preset = CROP_PRESETS[category];
  const totalCapExLakhs = Math.round(acres * preset.capexAcre * 10) / 10;
  const totalPlugs = Math.round(acres * preset.plugsPerAcre);
  const estimatedManpower = Math.max(2, Math.round((acres / 10) * preset.laborPer10Acres));
  const estimatedYieldTons = Math.round(acres * preset.yieldPerAcreTons);
  const grossRevenueLakhs =
    Math.round(((estimatedYieldTons * preset.revenuePerTon) / 100000) * 10) / 10;
  const netProfitLakhs = Math.round(grossRevenueLakhs * 0.45 * 10) / 10;

  return {
    totalCapExLakhs,
    totalPlugs,
    estimatedManpower,
    estimatedYieldTons,
    grossRevenueLakhs,
    netProfitLakhs,
  };
}

describe("Farm CapEx & ROI Estimator Calculation Engine", () => {
  it("should calculate correct 25-acre open field vegetable projections", () => {
    const metrics = calculateFarmMetrics(25, "vegetables");
    expect(metrics.totalCapExLakhs).toBe(46.3); // 25 * 1.85 = 46.25 -> 46.3
    expect(metrics.totalPlugs).toBe(300000); // 25 * 12000
    expect(metrics.estimatedYieldTons).toBe(625); // 25 * 25
    expect(metrics.grossRevenueLakhs).toBe(112.5); // (625 * 18000) / 100000
    expect(metrics.netProfitLakhs).toBe(50.6); // 112.5 * 0.45 = 50.625 -> 50.6
    expect(metrics.estimatedManpower).toBe(10); // (25 / 10) * 4 = 10
  });

  it("should calculate correct 10-acre polyhouse projections", () => {
    const metrics = calculateFarmMetrics(10, "polyhouse");
    expect(metrics.totalCapExLakhs).toBe(125); // 10 * 12.5
    expect(metrics.totalPlugs).toBe(140000); // 10 * 14000
    expect(metrics.estimatedYieldTons).toBe(450); // 10 * 45
    expect(metrics.grossRevenueLakhs).toBe(189); // (450 * 42000) / 100000
    expect(metrics.netProfitLakhs).toBe(85.1); // 189 * 0.45 = 85.05 -> 85.1
    expect(metrics.estimatedManpower).toBe(8);
  });

  it("should calculate correct 50-acre high-value orchard fruit projections", () => {
    const metrics = calculateFarmMetrics(50, "fruits");
    expect(metrics.totalCapExLakhs).toBe(160); // 50 * 3.2
    expect(metrics.totalPlugs).toBe(60000); // 50 * 1200
    expect(metrics.estimatedYieldTons).toBe(900); // 50 * 18
    expect(metrics.grossRevenueLakhs).toBe(315); // (900 * 35000) / 100000
    expect(metrics.netProfitLakhs).toBe(141.8); // 315 * 0.45 = 141.75 -> 141.8
    expect(metrics.estimatedManpower).toBe(15);
  });
});
