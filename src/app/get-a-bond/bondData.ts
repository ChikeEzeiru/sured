export type BondFlow = "simple" | "complex" | "unsure";

export interface BondSubtype {
  id: string;
  label: string;
  amount: number; // statutory bond amount in dollars
}

export interface BondType {
  id: string;
  label: string;
  flow: BondFlow;
  priceMin?: number;
  priceMax?: number;
  subtypes?: BondSubtype[];
}

export const BOND_TYPES: BondType[] = [
  // ── Simple (instant quote, 2-step flow) ───────────────
  { id: "license-permit", label: "License & Permit Bond", flow: "simple", priceMin: 100, priceMax: 450 },
  {
    id: "contractor-license", label: "Contractor License Bond", flow: "simple", priceMin: 150, priceMax: 500,
    subtypes: [
      { id: "general",     label: "General Contractor",           amount: 15000 },
      { id: "electrical",  label: "Electrical Contractor",        amount: 20000 },
      { id: "plumbing",    label: "Plumbing Contractor",          amount: 20000 },
      { id: "hvac",        label: "HVAC Contractor",              amount: 15000 },
      { id: "roofing",     label: "Roofing Contractor",           amount: 10000 },
      { id: "temp",        label: "Temporary Contractor License", amount: 40000 },
    ],
  },
  {
    id: "auto-dealer", label: "Auto Dealer Bond", flow: "simple", priceMin: 150, priceMax: 600,
    subtypes: [
      { id: "new",        label: "New Vehicle Dealer",      amount: 50000 },
      { id: "used",       label: "Used Vehicle Dealer",     amount: 25000 },
      { id: "wholesale",  label: "Wholesale / Broker",      amount: 10000 },
      { id: "motorcycle", label: "Motorcycle Dealer",       amount: 25000 },
    ],
  },
  {
    id: "motor-vehicle", label: "Motor Vehicle Dealer Bond", flow: "simple", priceMin: 150, priceMax: 600,
    subtypes: [
      { id: "new",      label: "New Vehicle Dealer",  amount: 50000 },
      { id: "used",     label: "Used Vehicle Dealer", amount: 25000 },
      { id: "wholesale", label: "Wholesale Dealer",   amount: 10000 },
      { id: "salvage",  label: "Salvage Dealer",      amount: 25000 },
    ],
  },
  {
    id: "mortgage-broker", label: "Mortgage Broker Bond", flow: "simple", priceMin: 200, priceMax: 800,
    subtypes: [
      { id: "broker",     label: "Mortgage Broker",            amount: 50000  },
      { id: "lender",     label: "Mortgage Banker / Lender",   amount: 100000 },
      { id: "originator", label: "Mortgage Loan Originator",   amount: 25000  },
    ],
  },
  {
    id: "notary", label: "Notary Bond", flow: "simple", priceMin: 50, priceMax: 100,
    subtypes: [
      { id: "standard",      label: "Standard Notary",                    amount: 10000 },
      { id: "electronic",    label: "Electronic / Remote Online Notary",  amount: 10000 },
      { id: "signing-agent", label: "Notary Signing Agent",               amount: 25000 },
    ],
  },
  { id: "title-agent", label: "Title Agent Bond", flow: "simple", priceMin: 150, priceMax: 500 },
  { id: "freight-broker", label: "Freight Broker Bond", flow: "simple", priceMin: 900, priceMax: 1800 },
  { id: "money-transmitter", label: "Money Transmitter Bond", flow: "simple", priceMin: 500, priceMax: 2000 },
  { id: "collection-agency", label: "Collection Agency Bond", flow: "simple", priceMin: 100, priceMax: 400 },
  { id: "customs", label: "Customs Bond", flow: "simple", priceMin: 200, priceMax: 600 },
  { id: "tax-preparer", label: "Tax Preparer Bond", flow: "simple", priceMin: 75, priceMax: 200 },
  // ── Complex (specialist follow-up, 3-step flow) ────────
  { id: "performance", label: "Performance Bond", flow: "complex" },
  { id: "payment", label: "Payment Bond", flow: "complex" },
  { id: "bid", label: "Bid Bond", flow: "complex" },
  { id: "fidelity", label: "Fidelity Bond", flow: "complex" },
  { id: "court", label: "Court Bond", flow: "complex" },
  { id: "subdivision", label: "Subdivision Bond", flow: "complex" },
  { id: "maintenance", label: "Maintenance Bond", flow: "complex" },
  { id: "supply", label: "Supply Bond", flow: "complex" },
  // ── Not sure ───────────────────────────────────────────
  { id: "unsure", label: "I'm not sure what bond I need", flow: "unsure" },
];

export const US_STATES = [
  { abbr: "AL", name: "Alabama" },
  { abbr: "AK", name: "Alaska" },
  { abbr: "AZ", name: "Arizona" },
  { abbr: "AR", name: "Arkansas" },
  { abbr: "CA", name: "California" },
  { abbr: "CO", name: "Colorado" },
  { abbr: "CT", name: "Connecticut" },
  { abbr: "DE", name: "Delaware" },
  { abbr: "FL", name: "Florida" },
  { abbr: "GA", name: "Georgia" },
  { abbr: "HI", name: "Hawaii" },
  { abbr: "ID", name: "Idaho" },
  { abbr: "IL", name: "Illinois" },
  { abbr: "IN", name: "Indiana" },
  { abbr: "IA", name: "Iowa" },
  { abbr: "KS", name: "Kansas" },
  { abbr: "KY", name: "Kentucky" },
  { abbr: "LA", name: "Louisiana" },
  { abbr: "ME", name: "Maine" },
  { abbr: "MD", name: "Maryland" },
  { abbr: "MA", name: "Massachusetts" },
  { abbr: "MI", name: "Michigan" },
  { abbr: "MN", name: "Minnesota" },
  { abbr: "MS", name: "Mississippi" },
  { abbr: "MO", name: "Missouri" },
  { abbr: "MT", name: "Montana" },
  { abbr: "NE", name: "Nebraska" },
  { abbr: "NV", name: "Nevada" },
  { abbr: "NH", name: "New Hampshire" },
  { abbr: "NJ", name: "New Jersey" },
  { abbr: "NM", name: "New Mexico" },
  { abbr: "NY", name: "New York" },
  { abbr: "NC", name: "North Carolina" },
  { abbr: "ND", name: "North Dakota" },
  { abbr: "OH", name: "Ohio" },
  { abbr: "OK", name: "Oklahoma" },
  { abbr: "OR", name: "Oregon" },
  { abbr: "PA", name: "Pennsylvania" },
  { abbr: "RI", name: "Rhode Island" },
  { abbr: "SC", name: "South Carolina" },
  { abbr: "SD", name: "South Dakota" },
  { abbr: "TN", name: "Tennessee" },
  { abbr: "TX", name: "Texas" },
  { abbr: "UT", name: "Utah" },
  { abbr: "VT", name: "Vermont" },
  { abbr: "VA", name: "Virginia" },
  { abbr: "WA", name: "Washington" },
  { abbr: "WV", name: "West Virginia" },
  { abbr: "WI", name: "Wisconsin" },
  { abbr: "WY", name: "Wyoming" },
  { abbr: "DC", name: "Washington, D.C." },
];
