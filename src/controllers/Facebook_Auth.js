const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User'); // Giả sử bạn có model User

passport.serializeUser((user, done) => {
  done(null, user.id); // Lưu user.id vào session
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID, // Lấy từ biến môi trường hoặc config
    clientSecret: process.env.FACEBOOK_APP_SECRET, // Lấy từ biến môi trường hoặc config
    callbackURL: "/auth/facebook/callback", // Đường dẫn callback bạn đã cấu hình trên Facebook
    profileFields: ['id', 'displayName', 'emails'] // Các trường bạn muốn lấy từ profile Facebook
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Kiểm tra xem người dùng đã tồn tại trong database chưa
      let user = await User.findOne({ facebookId: profile.id });

      if (user) {
        return done(null, user);
      }

      // Nếu chưa tồn tại, tạo người dùng mới
      const newUser = new User({
        facebookId: profile.id,
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : null
      });

      user = await newUser.save();
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));