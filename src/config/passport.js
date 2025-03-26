const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookAuthServices = require('../services/FacebookAuthServices'); // Điều chỉnh đường dẫn nếu cần

module.exports = function(app) { // Nhận instance của app nếu bạn cần truy cập các cấu hình khác
  passport.use(new FacebookStrategy({
    clientID: '1913948382710091',
    clientSecret: '1b8bc3ad52a6cbf0540c3f8bd085700a',
    callbackURL: '/auth/facebook/callback', // Phải trùng với route callback bạn đã định nghĩa
    profileFields: ['id', 'displayName', 'emails'] // Các trường thông tin bạn muốn lấy từ Facebook
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await FacebookAuthServices.findOrCreateUser(profile);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));

  passport.serializeUser((user, done) => {
    done(null, user.id); // Hoặc một định danh duy nhất khác của người dùng
  });

  passport.deserializeUser(async (id, done) => {
    // Tìm người dùng trong database dựa trên ID
    // const user = await User.findById(id);
    // done(null, user);
    // Trong ví dụ này, chúng ta không có model User chung, bạn có thể cần điều chỉnh
    // dựa trên cách bạn quản lý freelancer.
    // Ví dụ:
    const freelancer = await require('../models/freelancer').findById(id);
    done(null, freelancer);
  });

  app.use(passport.initialize());
  app.use(passport.session());
};