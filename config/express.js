const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
var cors = require("cors");
const { json } = require("body-parser");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
module.exports = function () {
  const app = express();

  app.use(compression());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(methodOverride());

  app.use(cors());
  app.use(cookieParser());
  // app.use(express.static(process.cwd() + '/public'));

  /* App (Android, iOS) */
  // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
  require("../src/app/user/userRoute")(app);
  require("../src/app/recipe/recipeRoute")(app);
  require("../src/app/mypage/mypageRoute")(app);
  require("../src/app/refrigerator/refrigeratorRoute")(app);
  require("../src/app/calendar/calendarRoute")(app);
  
  return app;
};
