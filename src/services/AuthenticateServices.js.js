const Freelancer = require('../models/freelancer');
const Employer = require('../models/employer');
const bcrypt = require('bcrypt');
const freelancer = require('../models/freelancer');

const RegisterFreelancer = (FreelancerData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newFreelancer = new Freelancer(FreelancerData);
      await newFreelancer.save();

      const savedData = await newFreelancer.save();
      console.log('Saved data:', savedData);

      console.log('sucess');

      resolve("Created:", newFreelancer);
    } catch (e) {
      console.log('fail1');
      reject(e);
    }
  });
};

const RegisterEmployer = (EmployerData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newEmployer = new Employer(EmployerData);
      await newEmployer.save();

      const savedData = await newEmployer.save();
      console.log('Saved data:', savedData);


      resolve("Created:", newEmployer);
    } catch (e) {
      console.log('f3')
      reject(e);
    }
  });
};

const checkLogin = async (username, password) => {
  try {
    // Tìm người dùng theo tên người dùng (hoặc email)
    let user = await Freelancer.findOne({ username });

    if (!user) {
      const companyName = username;
      user = await Employer.findOne({ companyName });
      if (!user) {
        throw new Error('Invalid username ');
      }
      else {
        if (password !== user.companyPassword) {
          throw new Error('Invalid password');
        }
      }
    }
    else if (user) {
      console.log('123');
      if (password !== user.password) {
        throw new Error('Invalid username or password');
      }
    }

    // Trả về thông tin người dùng (bao gồm cả mật khẩu)
    return user.toObject(); // Hoặc bạn có thể trả về token nếu bạn sử dụng JWT
  } catch (e) {
    throw e; // Ném lỗi để xử lý ở nơi gọi hàm này
  }
};

module.exports = {
  RegisterEmployer,
  RegisterFreelancer,
  checkLogin,
};