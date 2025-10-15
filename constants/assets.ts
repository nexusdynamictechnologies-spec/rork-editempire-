export type VehicleCatalog = Record<string, { models: string[] }>;
export type PhoneCatalog = Record<string, { models: string[]; aliases?: string[] }>;

export type WheelBrand = {
  name: string;
  aliases: string[];
};

export type WheelStyle = {
  name: string;
  aliases: string[];
};

export type WheelCatalog = {
  brands: WheelBrand[];
  styles: WheelStyle[];
  commonSizesInches: number[];
};

export const vehicleCatalog: VehicleCatalog = {
  Toyota: { models: ['Camry', 'Corolla', 'RAV4', 'Supra', 'Tacoma', 'Tundra', 'Prius', 'GR86'] },
  Honda: { models: ['Civic', 'Accord', 'CR-V', 'Pilot', 'S2000', 'NSX', 'Fit'] },
  Ford: { models: ['F-150', 'Mustang', 'Bronco', 'Explorer', 'Focus', 'Ranger', 'GT'] },
  Chevrolet: { models: ['Silverado', 'Camaro', 'Corvette', 'Tahoe', 'Suburban', 'Malibu'] },
  BMW: { models: ['3 Series', '5 Series', '7 Series', 'X5', 'X3', 'M3', 'M4', 'i8'] },
  'Mercedes-Benz': { models: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'G-Class', 'AMG GT'] },
  Audi: { models: ['A4', 'A6', 'A8', 'Q5', 'Q7', 'RS6', 'R8'] },
  Volkswagen: { models: ['Golf', 'Jetta', 'Passat', 'Tiguan', 'GTI'] },
  Nissan: { models: ['Altima', 'Maxima', 'GT-R', '370Z', 'Rogue', 'Sentra'] },
  Hyundai: { models: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Ioniq 5'] },
  Kia: { models: ['Optima', 'Sorento', 'Sportage', 'Telluride', 'Stinger', 'EV6'] },
  Tesla: { models: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck', 'Roadster'] },
  Porsche: { models: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', '718 Cayman'] },
  Lamborghini: { models: ['Huracán', 'Aventador', 'Urus', 'Revuelto'] },
  Ferrari: { models: ['488', 'F8 Tributo', 'Roma', 'SF90', '812 Superfast', 'Portofino'] },
  Maserati: { models: ['Ghibli', 'Quattroporte', 'Levante', 'MC20'] },
  'Aston Martin': { models: ['DB11', 'DBS', 'Vantage', 'DBX'] },
  Jaguar: { models: ['XE', 'XF', 'F-PACE', 'F-TYPE', 'I-PACE'] },
  'Land Rover': { models: ['Defender', 'Range Rover', 'Range Rover Sport', 'Discovery'] },
  Subaru: { models: ['Impreza', 'WRX', 'Forester', 'Outback', 'BRZ'] },
  Mazda: { models: ['Mazda3', 'Mazda6', 'CX-5', 'MX-5 Miata'] },
  Volvo: { models: ['XC90', 'XC60', 'S60', 'S90'] },
  Lexus: { models: ['IS', 'ES', 'LS', 'RX', 'LX', 'LC 500'] },
  Acura: { models: ['TLX', 'RDX', 'MDX', 'NSX'] },
  Infiniti: { models: ['Q50', 'Q60', 'QX60', 'QX80'] },
  Genesis: { models: ['G70', 'G80', 'G90', 'GV80'] },
  Mini: { models: ['Cooper', 'Countryman', 'Clubman'] },
  'Alfa Romeo': { models: ['Giulia', 'Stelvio', '4C'] },
  Cadillac: { models: ['Escalade', 'CT5', 'Lyriq'] },
  GMC: { models: ['Sierra', 'Yukon', 'Hummer EV', '3500 Denali', '3500HD Denali', '2500 Denali', '2500HD Denali'] },
  Dodge: { models: ['Charger', 'Challenger', 'Durango', 'Viper'] },
  Jeep: { models: ['Wrangler', 'Grand Cherokee', 'Gladiator'] },
  Ram: { models: ['1500', '2500', 'TRX'] },
  Chrysler: { models: ['300', 'Pacifica'] },
  Bugatti: { models: ['Chiron', 'Veyron'] },
  Bentley: { models: ['Continental GT', 'Bentayga', 'Flying Spur'] },
  'Rolls-Royce': { models: ['Phantom', 'Ghost', 'Wraith', 'Cullinan'] },
  'McLaren': { models: ['720S', '650S', 'Artura', 'P1'] },
};

export const phoneCatalog: PhoneCatalog = {
  Apple: {
    aliases: ['iphone', 'apple iphone'],
    models: [
      'iPhone 16 Pro Max','iPhone 16 Pro','iPhone 16','iPhone 16 Plus',
      'iPhone 15 Pro Max','iPhone 15 Pro','iPhone 15','iPhone 15 Plus',
      'iPhone 14 Pro Max','iPhone 14 Pro','iPhone 14','iPhone 14 Plus',
      'iPhone 13 Pro Max','iPhone 13 Pro','iPhone 13','iPhone 13 mini',
      'iPhone 12 Pro Max','iPhone 12 Pro','iPhone 12','iPhone 12 mini'
    ]
  },
  Samsung: {
    aliases: ['galaxy', 'samsung galaxy'],
    models: [
      'Galaxy S24 Ultra','Galaxy S24+','Galaxy S24',
      'Galaxy S23 Ultra','Galaxy S23+','Galaxy S23',
      'Galaxy Z Fold6','Galaxy Z Flip6','Galaxy Z Fold5','Galaxy Z Flip5',
      'Galaxy Note20 Ultra'
    ]
  },
  Google: {
    aliases: ['pixel'],
    models: ['Pixel 9 Pro XL','Pixel 9 Pro','Pixel 9','Pixel 8 Pro','Pixel 8','Pixel 7 Pro','Pixel 7']
  },
  OnePlus: { models: ['OnePlus 12','OnePlus 12R','OnePlus 11','OnePlus Open'] },
  Xiaomi: { aliases: ['mi','redmi'], models: ['Xiaomi 14 Ultra','Xiaomi 14','Redmi Note 13 Pro'] },
  Huawei: { models: ['Pura 70 Ultra','Mate 60 Pro'] },
  Oppo: { models: ['Find X7 Ultra','Find N3'] },
  Vivo: { models: ['X100 Pro','X100'] },
  Sony: { aliases: ['xperia'], models: ['Xperia 1 VI','Xperia 5 V'] },
  Motorola: { aliases: ['moto'], models: ['Edge 50 Ultra','Razr 50 Ultra'] },
  Nothing: { models: ['Phone (2a)','Phone (2)'] },
};

export const wheelCatalog: WheelCatalog = {
  brands: [
    { name: 'BBS', aliases: ['bbs'] },
    { name: 'HRE', aliases: ['hre'] },
    { name: 'Vossen', aliases: ['vossen'] },
    { name: 'Rotiform', aliases: ['rotiform'] },
    { name: 'Enkei', aliases: ['enkei'] },
    { name: 'OZ Racing', aliases: ['oz', 'ozracing', 'oz racing'] },
    { name: 'Work Wheels', aliases: ['work', 'work wheels'] },
    { name: 'RAYS Volk Racing', aliases: ['rays', 'volk', 'volk racing', 'rays volk'] },
    { name: 'ADV.1', aliases: ['adv1', 'adv.1', 'adv 1'] },
    { name: 'Forgiato', aliases: ['forgiato'] },
    { name: 'Asanti', aliases: ['asanti'] },
    { name: 'American Racing', aliases: ['american racing'] },
    { name: 'Fuel Off-Road', aliases: ['fuel', 'fuel offroad', 'fuel off-road'] },
    { name: 'Method Race Wheels', aliases: ['method', 'method wheels'] },
    { name: 'TSW', aliases: ['tsw'] },
    { name: 'Konig', aliases: ['konig', 'könig'] },
  ],
  styles: [
    { name: 'mesh', aliases: ['mesh', 'y-spoke', 'basketweave'] },
    { name: 'split 5-spoke', aliases: ['split 5 spoke', 'split 5-spoke', 'split five spoke'] },
    { name: 'multi-spoke', aliases: ['multi spoke', 'multi-spoke'] },
    { name: 'deep dish', aliases: ['deep dish', 'step lip', 'fat lip'] },
    { name: 'concave', aliases: ['concave'] },
    { name: 'turbofan', aliases: ['turbofan', 'aero disc', 'aero'] },
    { name: 'beadlock', aliases: ['beadlock', 'bead lock'] },
  ],
  commonSizesInches: [15, 16, 17, 18, 19, 20, 21, 22, 24, 26],
};

export const assetAliases: Record<string, string> = {
  'ak47': 'Kalashnikov AK-47 rifle',
  'ak-47': 'Kalashnikov AK-47 rifle',
  'ar15': 'AR-15 style rifle',
  'ar-15': 'AR-15 style rifle',
  'iphone': 'Apple iPhone smartphone',
  'iphone 16 pro max': 'Apple iPhone 16 Pro Max smartphone',
  'iphone 16 pro': 'Apple iPhone 16 Pro smartphone',
  'iphone 15 pro max': 'Apple iPhone 15 Pro Max smartphone',
  'iphone 15 pro': 'Apple iPhone 15 Pro smartphone',
  'iphone 14 pro': 'Apple iPhone 14 Pro smartphone',
  's24 ultra': 'Samsung Galaxy S24 Ultra smartphone',
  's23 ultra': 'Samsung Galaxy S23 Ultra smartphone',
  'z fold 6': 'Samsung Galaxy Z Fold6 smartphone',
  'z flip 6': 'Samsung Galaxy Z Flip6 smartphone',
  'pixel 9 pro': 'Google Pixel 9 Pro smartphone',
  'pixel 8 pro': 'Google Pixel 8 Pro smartphone',
  'macbook': 'Apple MacBook laptop',
  'ps5': 'Sony PlayStation 5 console',
  'xbox': 'Microsoft Xbox Series console',
  'gtr': 'Nissan GT-R',
  'g-wagon': 'Mercedes-Benz G-Class',
  'g wagon': 'Mercedes-Benz G-Class',
  'lambo': 'Lamborghini',
  'vette': 'Chevrolet Corvette',
  'miata': 'Mazda MX-5 Miata',
  'gmc denali': 'GMC Denali',
  'denali': 'GMC Denali',
  '3500 denali': 'GMC 3500 Denali',
  '3500hd denali': 'GMC 3500HD Denali',
  '2500 denali': 'GMC 2500 Denali',
  '2500hd denali': 'GMC 2500HD Denali'
};

export type ResolvedVehicle = { make?: string; model?: string };
export type ResolvedPhone = { brand?: string; model?: string };

export type ResolvedWheelSpec = {
  diameterInches?: number;
  brand?: string;
  style?: string;
};

export function resolveVehicleFromText(text: string): ResolvedVehicle {
  const lower = text.toLowerCase();
  for (const alias in assetAliases) {
    if (lower.includes(alias)) {
      const val = assetAliases[alias];
      if (val.includes(' ')) {
        const parts = val.split(' ');
        const make = parts[0];
        return { make };
      }
    }
  }
  let matchedMake: string | undefined;
  let matchedModel: string | undefined;
  for (const make of Object.keys(vehicleCatalog)) {
    if (lower.includes(make.toLowerCase())) {
      matchedMake = make;
      const models = vehicleCatalog[make].models;
      for (const model of models) {
        const modelLower = model.toLowerCase();
        if (lower.includes(modelLower)) {
          matchedModel = model;
          break;
        }
      }
      break;
    }
  }
  if (!matchedMake) {
    for (const make of Object.keys(vehicleCatalog)) {
      const models = vehicleCatalog[make].models;
      for (const model of models) {
        if (lower.includes(model.toLowerCase())) {
          matchedMake = make;
          matchedModel = model;
          break;
        }
      }
      if (matchedMake) break;
    }
  }
  return { make: matchedMake, model: matchedModel };
}

export function resolvePhoneFromText(text: string): ResolvedPhone {
  const lower = text.toLowerCase();
  let matchedBrand: string | undefined;
  let matchedModel: string | undefined;

  for (const [brand, info] of Object.entries(phoneCatalog)) {
    if (lower.includes(brand.toLowerCase()) || (info.aliases ?? []).some(a => lower.includes(a))) {
      matchedBrand = brand;
      for (const model of info.models) {
        if (lower.includes(model.toLowerCase())) {
          matchedModel = model;
          break;
        }
      }
      break;
    }
  }

  if (!matchedBrand) {
    for (const [brand, info] of Object.entries(phoneCatalog)) {
      for (const model of info.models) {
        if (lower.includes(model.toLowerCase())) {
          matchedBrand = brand;
          matchedModel = model;
          break;
        }
      }
      if (matchedBrand) break;
    }
  }

  return { brand: matchedBrand, model: matchedModel };
}

export function resolveWheelSpecFromText(text: string): ResolvedWheelSpec {
  const lower = text.toLowerCase();
  let diameterInches: number | undefined;
  const sizeMatch = lower.match(/\b(\d{2})(?:\s?inch|\s?in|\s?\"|\s?-?inch|\s?-?in|\b)(?:\s?rims?|\s?wheels?)?/);
  if (sizeMatch) {
    const val = parseInt(sizeMatch[1], 10);
    if (!Number.isNaN(val) && val >= 14 && val <= 30) {
      diameterInches = val;
    }
  } else {
    const shortMatch = lower.match(/\b(\d{2})s\b/);
    if (shortMatch) {
      const val = parseInt(shortMatch[1], 10);
      if (!Number.isNaN(val) && val >= 14 && val <= 30) {
        diameterInches = val;
      }
    }
  }

  let brand: string | undefined;
  for (const b of wheelCatalog.brands) {
    if (b.aliases.some(a => lower.includes(a))) {
      brand = b.name;
      break;
    }
  }

  let style: string | undefined;
  for (const s of wheelCatalog.styles) {
    if (s.aliases.some(a => lower.includes(a))) {
      style = s.name;
      break;
    }
  }

  return { diameterInches, brand, style };
}

export function resolveAssetAliasesInText(text: string): string {
  const lower = text.toLowerCase();
  let result = text;
  for (const key in assetAliases) {
    if (lower.includes(key)) {
      const canonical = assetAliases[key];
      result += ` (canonical: ${canonical})`;
    }
  }
  return result;
}
