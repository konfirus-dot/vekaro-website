// Single source for the fleet shown on the homepage ("Nasza flota") and on
// the three service pages, and for the vehicle details modal. Order matters:
// it's the display order. Names, prices, descriptions and spec labels live in
// messages/*.json under `fleet` (keyed by `key`); this file holds the
// language-neutral data.
//
// `image`: a photo of that exact model (transparent PNG, side view, 2:1), or
// null to show an empty image area of the same size; never a different car.

/**
 * Placeholder for a specification the client hasn't confirmed yet. Specs set
 * to UNCONFIRMED are hidden from visitors; replace with the real value (see
 * the types below) to show it. Do not guess values.
 */
export const UNCONFIRMED = null;

export type FuelType = "petrol" | "diesel" | "hybrid" | "lpg" | "electric";
export type Transmission = "manual" | "automatic";
export type BodyType = "hatchback" | "sedan" | "estate" | "cargoVan";

export type VehicleSpecs = {
  fuel: FuelType | null;
  transmission: Transmission | null;
  seats: number | null;
  bodyType: BodyType | null;
};

export type FleetVehicle = {
  key: "fiatTipo" | "fiatPanda" | "skodaCitigo" | "fordTransit";
  image: string | null;
  specs: VehicleSpecs;
};

export const FLEET: FleetVehicle[] = [
  {
    key: "fiatTipo",
    image: "/images/car-fiat-tipo.png",
    specs: {
      fuel: "lpg",
      transmission: "manual",
      seats: 5,
      bodyType: "sedan",
    },
  },
  {
    key: "fiatPanda",
    image: "/images/car-fiat-panda.png",
    specs: {
      fuel: "lpg",
      transmission: "manual",
      seats: 5,
      bodyType: "hatchback",
    },
  },
  {
    key: "skodaCitigo",
    image: "/images/car-skoda-citigo.png",
    specs: {
      fuel: "lpg",
      transmission: "manual",
      seats: 4,
      bodyType: "hatchback",
    },
  },
  {
    key: "fordTransit",
    image: "/images/car-ford-transit.png",
    specs: {
      fuel: "diesel",
      transmission: "manual",
      seats: 3,
      // Confirmed: a cargo van (not a passenger minibus).
      bodyType: "cargoVan",
    },
  },
];
