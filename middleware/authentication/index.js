const passport = require("passport"),
  JwtStrategy = require("passport-jwt").Strategy,
  User = require("../../models/user"),
  ExtractJwt = require("passport-jwt").ExtractJwt;

// ******************************
// JWT Strategy
// ******************************
let jwtOptions = {
  jwtFromRequest: (req) => {
    return (
      req?.cookies?.jwt || ExtractJwt.fromAuthHeaderWithScheme("Bearer")(req)
    );
  },
  secretOrKey: "supersecretprivatekey",
};

passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done(null, false, { message: "jwt expired" });
    }
    let { iat, exp, ...userData } = jwtPayload;
    userData = await User.findBy({ id: userData.id });
    if (!userData) {
      return done(null, false, { message: "user not found" });
    }
    userData = User.asJson(userData);

    return done(null, userData);
  })
);

module.exports = passport;
