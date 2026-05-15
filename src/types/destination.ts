export type DestinationCategory =
  | "heritage"
  | "food"
  | "museums"
  | "churches"
  | "parks"
  | "hidden-gems";

export type FilterChip =
  | "all"
  | "heritage"
  | "food"
  | "museums"
  | "churches"
  | "parks"
  | "hidden-gems";

export interface RouteStop {
  destinationId: string;
  label: string;
  duration: string;
  reason: string;
}

export interface RoutePlan {
  title: string;
  duration: string;
  stops: RouteStop[];
  walkingNote: string;
}

export interface Destination {
  id: string;
  name: string;
  category: DestinationCategory;
  tags: string[];
  coordinates: [number, number];
  imageQuery: string;
  wikiTitle: string;
  shortDescription: string;
  summary: string;
  whyItMatters: string;
  story: string;
  culturalMeaning: string;
  whatToDo: string[];
  localTips: string[];
  nearbyKnowledge: string[];
  foodSpots: string[];
  guideScript: string;
  routes: {
    quick: RoutePlan;
    halfDay: RoutePlan;
    fullDay: RoutePlan;
  };
  captions: {
    tourist: string;
    localTourism: string;
    social: string;
  };
  recommendedTime?: string;
  entranceFee?: string;
  locationLabel: string;
  badges?: string[];
  walkingRoute?: boolean;
  initials: string;
}

export type FoodKind =
  | "filipino"
  | "merienda"
  | "street"
  | "modern"
  | "cafe"
  | "regional";

export interface FoodSpot {
  id: string;
  name: string;
  kind: FoodKind;
  area: string;
  coordinates: [number, number];
  signature: string;
  blurb: string;
  priceRange: "budget" | "moderate" | "splurge";
  imageQuery: string;
  initials: string;
  hours?: string;
  storyHook?: string;
}

export type AppTab = "stories" | "eats" | "routes" | "saved";

export interface CommonsImage {
  title: string;
  imageUrl: string;
  thumbUrl: string;
  pageUrl: string;
  author?: string;
  license?: string;
  credit?: string;
}
