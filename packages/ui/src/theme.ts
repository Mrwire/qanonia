export const qanouniaTheme = {
  colors: {
    primary: '#0F1F3D',
    accent: '#C9A227',
    muted: '#E6E9EF',
  },
  borderRadius: {
    base: '0.75rem',
  },
} as const;

export type QanouniaTheme = typeof qanouniaTheme;
