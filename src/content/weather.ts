import type { WeatherType } from '../sim/types';

export interface WeatherDef {
  type: WeatherType;
  label: string;
  sunlight: number;
  rain: number;
  tempDelta: number;
  stabilityDelta: number;
  skyColor: number;
  groundColor: number;
}

export const WEATHER_DEFS: Record<WeatherType, WeatherDef> = {
  sunny: {
    type: 'sunny',
    label: 'Cerah',
    sunlight: 1.15,
    rain: 0,
    tempDelta: 0.06,
    stabilityDelta: 0.02,
    skyColor: 0xcfe0ff,
    groundColor: 0x6b6250,
  },
  rain: {
    type: 'rain',
    label: 'Hujan',
    sunlight: 0.7,
    rain: 0.55,
    tempDelta: -0.05,
    stabilityDelta: -0.01,
    skyColor: 0x90a7bd,
    groundColor: 0x40505a,
  },
  snow: {
    type: 'snow',
    label: 'Salju',
    sunlight: 0.55,
    rain: 0.2,
    tempDelta: -0.12,
    stabilityDelta: -0.02,
    skyColor: 0xdbe8f5,
    groundColor: 0x8a95a3,
  },
  storm: {
    type: 'storm',
    label: 'Badai',
    sunlight: 0.45,
    rain: 0.35,
    tempDelta: -0.04,
    stabilityDelta: -0.14,
    skyColor: 0x50596b,
    groundColor: 0x2c313d,
  },
};

export const WEATHER_ORDER: WeatherType[] = ['sunny', 'rain', 'snow', 'storm'];
