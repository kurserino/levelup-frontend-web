import next from "eslint-config-next";

export default [
  ...next,
  {
    rules: {
      // intentionally permissive to allow "dirty" code examples
      "@next/next/no-img-element": "off"
    }
  }
];


