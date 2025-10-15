export type JordanShoe = {
  id: string;
  model: string;
  number: number; // 1-38 etc.
  nickname?: string;
  colorway?: string;
  year: number;
  designer?: string;
  image?: string;
};

export const jordanShoes: JordanShoe[] = [
  {
    id: 'aj1-chicago-1985',
    model: 'Air Jordan 1',
    number: 1,
    nickname: 'Chicago',
    colorway: 'White/Varsity Red/Black',
    year: 1985,
    designer: 'Peter Moore',
    image: 'https://images.unsplash.com/photo-1613977257593-65e3492a2f66?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'aj1-bred-1985',
    model: 'Air Jordan 1',
    number: 1,
    nickname: 'Bred',
    colorway: 'Black/Varsity Red/White',
    year: 1985,
    designer: 'Peter Moore',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'aj3-white-cement-1988',
    model: 'Air Jordan 3',
    number: 3,
    nickname: 'White Cement',
    colorway: 'White/Black/Cement Grey',
    year: 1988,
    designer: 'Tinker Hatfield',
    image: 'https://images.unsplash.com/photo-1614252369475-b0e03c8f5322?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'aj4-white-cement-1989',
    model: 'Air Jordan 4',
    number: 4,
    nickname: 'White Cement',
    colorway: 'White/Black/Cement Grey',
    year: 1989,
    designer: 'Tinker Hatfield',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'aj11-concord-1995',
    model: 'Air Jordan 11',
    number: 11,
    nickname: 'Concord',
    colorway: 'White/Black/Dark Concord',
    year: 1995,
    designer: 'Tinker Hatfield',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'aj11-bred-1996',
    model: 'Air Jordan 11',
    number: 11,
    nickname: 'Bred',
    colorway: 'Black/Varsity Red/White',
    year: 1996,
    designer: 'Tinker Hatfield',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'aj12-flu-game-1997',
    model: 'Air Jordan 12',
    number: 12,
    nickname: 'Flu Game',
    colorway: 'Black/Varsity Red',
    year: 1997,
    designer: 'Tinker Hatfield',
  },
  {
    id: 'aj6-infrared-1991',
    model: 'Air Jordan 6',
    number: 6,
    nickname: 'Infrared',
    colorway: 'Black/Infrared',
    year: 1991,
    designer: 'Tinker Hatfield',
  },
];

export function searchJordans(query: string): JordanShoe[] {
  const q = query.trim().toLowerCase();
  if (!q) return jordanShoes;
  return jordanShoes.filter((s) => {
    const hay = [
      s.model,
      String(s.number),
      s.nickname ?? '',
      s.colorway ?? '',
      String(s.year),
    ]
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  });
}
