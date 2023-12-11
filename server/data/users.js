import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Abhishek Singh',
    email: 'abhi@gmail.com',
    password: bcrypt.hashSync('12345', 10),
  },
];
export default users;
