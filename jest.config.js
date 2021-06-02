module.exports = {
  testMatch: [
    "**/test/**/*.js"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/lib/",
    ".cache"
  ],
  transformIgnorePatterns: [
    "/node_modules/"
  ],
  transform: {
    "^.+\\.[t|j]sx?$": [
      "babel-jest",
      {ignore: ["/node_modules/"]}
    ]
  }
}
