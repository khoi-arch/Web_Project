const User = require('../models/freelancer');

const createUser = (userData) => {
  return new Promise(async (resolve, reject) => { 
    try {
      const newUser = new User(userData); 
      await newUser.save(); 

      resolve("Created:",newUser); 
    } catch (e) {
      reject(e);
    }
  });
};

const checkLogin = async (username, password) => {
  try {
    // Tìm người dùng theo tên người dùng (hoặc email)
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    // So sánh mật khẩu đã nhập với mật khẩu trong DB
    if (password !== user.password) {
      throw new Error('Invalid username or password');
    }

    // Trả về thông tin người dùng (bao gồm cả mật khẩu)
    return user.toObject(); // Hoặc bạn có thể trả về token nếu bạn sử dụng JWT
  } catch (e) {
    throw e; // Ném lỗi để xử lý ở nơi gọi hàm này
  }
};

module.exports = {
  createUser,
  checkLogin,
};