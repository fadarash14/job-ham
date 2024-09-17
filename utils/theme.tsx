const theme = {
  colors: {
    lipstick: "#db143d",
    paleGrey: "#e8e8ec",
    white: "#fff",
    purplish_brown: "#474546",
    butterscotch: "#fcc155",
    navy: "#004175",
    brown_grey: "#acacac",
    light_blue_grey: "#cccccf",
    brownish_grey: "#707070",
    orange_yellow: "#fba303",
    pine_green: "#091d24",
    very_light_pink: "#d1d1d1",
    pale_lilac: "#e8e8ec",
    maize: "#fcc155",
    green_blue: "#00c39c",
    water_blue: "#14a5db",
    deep_sky_blue: "#0a84ff",
    perrywinkle: "#8886ec",
    purplish_brown_11: "#474546",
    pinkish_grey: "#d1d1d1",
    mustard: "#FFB95C",
    green: "#1ABC9C",
  },

  breakpoints: ["576px", "768px", "1200px", "1440px"],
  mediaQueries: {
    small: `@media screen and (min-width: 576px)`,
    medium: `@media screen and (min-width: 768px)`,
    large: `@media screen and (min-width: 1200px)`,
    xlarge: `@media screen and (min-width: 1440px)`,
  },
  zIndices: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    offcanvas_backdrop: 1040,
    offcanvas: 1045,
    modal_backdrop: 1050,
    modal: 1055,
    popover: 1070,
    tooltip: 1080,
  },
};
export default theme;
