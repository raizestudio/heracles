export interface IAPIGovFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    label: string;
    score: number;
    housenumber: string;
    id: string;
    banId: string;
    name: string;
    postcode: string;
    citycode: string;
    oldcitycode: string;
    x: number;
    y: number;
    city: string;
    oldcity: string;
    context: string;
    importance: number;
    street: string;
  };
};
