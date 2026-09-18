tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary": "#ffffff", "inverse-primary": "#84d7b2", "surface-bright": "#f8f9fa",
        "background": "#f8f9fa", "on-background": "#191c1d", "surface-container-high": "#e7e8e9",
        "tertiary": "#722d29", "primary-fixed-dim": "#84d7b2", "outline-variant": "#bec9c1",
        "on-secondary-container": "#656464", "surface": "#f8f9fa", "on-primary-fixed": "#002115",
        "primary": "#004e36", "surface-tint": "#096c4d", "inverse-on-surface": "#f0f1f2",
        "surface-container-lowest": "#ffffff", "secondary": "#5f5e5e", "secondary-container": "#e5e2e1",
        "on-primary-container": "#90e4be", "on-error-container": "#93000a",
        "on-secondary-fixed-variant": "#474646", "tertiary-container": "#8f443e",
        "on-surface-variant": "#3f4943", "inverse-surface": "#2e3132",
        "on-tertiary-fixed-variant": "#76312c", "secondary-fixed-dim": "#c8c6c5",
        "primary-container": "#00684a", "surface-dim": "#d9dadb", "on-tertiary-fixed": "#3d0606",
        "tertiary-fixed-dim": "#ffb4ac", "surface-container-highest": "#e1e3e4",
        "on-primary-fixed-variant": "#005139", "on-secondary-fixed": "#1c1b1b",
        "tertiary-fixed": "#ffdad6", "primary-fixed": "#9ff4cd", "on-tertiary-container": "#ffc5be",
        "surface-container": "#edeeef", "error": "#ba1a1a", "on-tertiary": "#ffffff",
        "on-surface": "#191c1d", "outline": "#6f7a73", "error-container": "#ffdad6",
        "surface-variant": "#e1e3e4", "on-secondary": "#ffffff", "surface-container-low": "#f3f4f5",
        "secondary-fixed": "#e5e2e1", "on-error": "#ffffff"
      },
      borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
      spacing: {
        "space-xs": "0.25rem", "space-2xl": "4rem", "space-sm": "0.5rem", "margin": "1.25rem",
        "space-lg": "1.5rem", "margin-desktop": "4rem", "space-md": "1rem", "gutter": "1.5rem",
        "gutter-desktop": "2.5rem", "space-xl": "2.5rem", "space-3xl": "6rem"
      },
      fontFamily: {
        "body-sm": ["Geist"], "stat-metric": ["Geist"], "headline-xl-mobile": ["Bebas Neue"],
        "display-hero-mobile": ["Bebas Neue"], "label-code": ["Geist"], "label-caps": ["Geist"],
        "headline-lg": ["Bebas Neue"], "body-lg": ["Geist"], "headline-xl": ["Bebas Neue"],
        "body-md": ["Geist"], "display-hero": ["Bebas Neue"], "headline-sm": ["Geist"]
      },
      fontSize: {
        "body-sm": ["12px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "400" }],
        "stat-metric": ["56px", { "lineHeight": "56px", "letterSpacing": "-0.03em", "fontWeight": "300" }],
        "headline-xl-mobile": ["40px", { "lineHeight": "40px", "letterSpacing": "0.02em", "fontWeight": "400" }],
        "display-hero-mobile": ["64px", { "lineHeight": "58px", "letterSpacing": "0.02em", "fontWeight": "400" }],
        "label-code": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "label-caps": ["11px", { "lineHeight": "16px", "letterSpacing": "0.18em", "fontWeight": "700" }],
        "headline-lg": ["36px", { "lineHeight": "36px", "letterSpacing": "0.03em", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "400" }],
        "headline-xl": ["64px", { "lineHeight": "60px", "letterSpacing": "0.02em", "fontWeight": "400" }],
        "body-md": ["14px", { "lineHeight": "22px", "letterSpacing": "0em", "fontWeight": "400" }],
        "display-hero": ["112px", { "lineHeight": "96px", "letterSpacing": "0.02em", "fontWeight": "400" }],
        "headline-sm": ["18px", { "lineHeight": "24px", "letterSpacing": "0.08em", "fontWeight": "700" }]
      }
    }
  }
};