const UserService = require('../services/UserServices')
const createUser = async (req,res) =>{
    console.log('body req',req.body)
    try
    {
        console.log(req.body)
        const {username,password,fname,birthday,age,image,project_done,phone, experience, email} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckMail = emailRegex.test(email)
        if(!username || !password || !fname || !age || !image || !project_done || !experience || !email)
        {
            return res.status(200).json({
                status: 'Error',
                message: 'The input is required'
            })
        }
        console.log('isCheckEmail',isCheckMail)
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }
    catch(e)
    {
        return res.status(404).json({
            message: e
        })
    }
}

const checkLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Kiểm tra các trường bắt buộc
      if (!username || !password) {
        return res.status(400).json({
          status: 'Error',
          message: 'Username and password are required',
        });
      }
  
      const userInfo = await UserService.checkLogin(username, password);

      console.log('sucess');
      return res.status(200).json({
        status: 'Success',
        user: userInfo,
      });
    } catch (e) {
      console.error('Login error:', e);
      return res.status(401).json({
        status: 'Error',
        message: e.message,
      });
    }
  };
module.exports = {
    createUser,
    checkLogin,
}