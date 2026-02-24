// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Polyfill for older Node/JSDOM (replaceAll is ES2021)
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (search, replace) {
    return this.split(search).join(replace);
  };
}
