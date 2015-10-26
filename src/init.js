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
  "transformOrigin",
  "transformOriginX",
  "transformOriginY",
  "transformOriginZ",
  "transformStyle",
];

function AutoprefixStyleProp (styleProp, userAgent) {
  if (!userAgent) {
    userAgent = typeof navigator !== "undefined"
      ? this.navigator.userAgent
      : null;

    var isSafari = userAgent && userAgent.includes("WebKit") && !userAgent.includes("Chrom");
  }

  var result = {};

  Object.keys(styleProp).forEach(
    key => {
      // Browser sniffing sucks, but Safari overloads display, and there's
      // no way to set a style key to two values in React
      if (isSafari && key === "display" && styleProp["display"].includes("flex")) {
        result["display"] = `-webkit-${ styleProp["display"] }`;

      } else if (isSafari && flexboxKeys.includes(key)) {
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
