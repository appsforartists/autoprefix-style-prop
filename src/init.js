require("./polyfills");

var flexboxKeys = [
  "alignContent",
  "alignItems",
  "alignSelf",
  "flex",
  "flexBasis",
  "flexDirection",
  "flexFlow",
  "flexGrow",
  "flexShrink",
  "flexWrap",
  "justifyContent",
  "order",
  "transform",
];

function AutoprefixStyleProp (styleProp, userAgent) {
  if (!userAgent) {
    // use `this` instead of `global` to be accomodate browsers without Webpack
    userAgent = this.navigator
      ? this.navigator.userAgent
      : null;
  }

  var result = {};

  Object.keys(styleProp).forEach(
    key => {
      // Browser sniffing sucks, but Safari overloads display, and there's
      // no way to set a style key to two values in React
      if (
           key === "display" && styleProp["display"].includes("flex")
        && userAgent && userAgent.includes("WebKit") && !userAgent.includes("Chrom")
      ) {
        result["display"] = `-webkit-${ styleProp["display"] }`;

      } else if (flexboxKeys.includes(key)) {
        var titleCasedKey = key.substring(0, 1).toUpperCase() + key.substring(1);
        result[`Webkit${ titleCasedKey }`] = styleProp[key];

      } else {
        result[key] = styleProp[key];
      }
    }
  );

  return result;
}

module.exports = AutoprefixStyleProp;
