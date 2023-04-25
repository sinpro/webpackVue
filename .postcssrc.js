// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "autoprefixer": {
       "browsers": [
         "> 1%",
         "last 4 versions",
         "ie >= 9",
         "firefox >= 40",
         "chrome >= 40",
         "not ie <= 8"
       ]
    }
  }
}
