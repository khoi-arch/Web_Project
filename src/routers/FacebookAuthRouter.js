const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route để bắt đầu đăng nhập bằng Facebook
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Route callback sau khi đăng nhập Facebook thành công hoặc thất bại
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Đăng nhập thành công, chuyển hướng người dùng hoặc thực hiện hành động khác
    res.redirect('/');
  });


// Route để logout (nếu cần)
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;