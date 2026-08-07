import { JobPosition } from "@/types";

export const jobs: JobPosition[] = [
  {
    id: "job-01",
    title: "Field Agronomist",
    dept: "Crop Operations",
    loc: "Jhajjar Hub (Haryana)",
    type: "Full-Time",
    desc: "Work directly in field sectors calibrating input schedules and diagnosing early pathological symptoms on tomato/chilli crops.",
    reqs: [
      "B.Sc. or M.Sc. in Agriculture / Agronomy.",
      "Deep understanding of Solanaceae disease cycles (Blight, Phytophthora).",
      "Fluency in Hindi and local Haryanvi dialects.",
    ],
  },
  {
    id: "job-02",
    title: "Embedded IoT Hardware Engineer",
    dept: "Farm Technology",
    loc: "Gurugram Lab (Delhi NCR)",
    type: "Full-Time",
    desc: "Design and program LoRa-based telemetry node boards, calibrating moisture and optical NPK spectrometer sensors for low-power solar deployment.",
    reqs: [
      "2+ years experience in PCB layout design and firmware development (C/C++).",
      "Experience with LoRaWAN, mesh networking, and sleep-cycle power optimization.",
      "Familiarity with environmental packaging standard specifications.",
    ],
  },
  {
    id: "job-03",
    title: "Institutional Sales Lead",
    dept: "Market Linkages",
    loc: "Gurugram Office",
    type: "Full-Time",
    desc: "Manage direct buyback purchasing relationships with supermarket corporate buyers and large food processing units.",
    reqs: [
      "Familiarity with vegetable wholesale channels or agricultural supply logistics.",
      "Proven contract negotiations experience with procurement units.",
    ],
  },
];
