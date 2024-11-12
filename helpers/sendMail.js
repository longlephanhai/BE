const nodemailer = require('nodemailer');

const sendMail = (email, subject, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS_EMAIL
    }
  });
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: subject,
    html: `Nhập mã otp để thay đổi mật khẩu ${otp} `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
const sendMailProduct = async (email, subject, products, infoUser) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS_EMAIL
    }
  });
  let itemsContent = '';
  for (let item of products) {
    itemsContent += `
      <p><strong>Sản phẩm:</strong> ${item.product_id.title}</p>
      <p><strong>Số lượng:</strong> ${item.quantity}</p>
      <p><strong>Giá tiền:</strong> ${item.product_id.price}</p>
      <p><img src="${item.product_id.thumbnail}" alt="${item.product_id.title}" width="100" /></p>
      <hr>
    `;
  }
  const emailContent = `
    <h1>Thank you for your purchase</h1>
    <p><strong>Họ và tên:</strong> ${infoUser.fullName}</p>
    <p><strong>Email:</strong> ${infoUser.email}</p>
    <p><strong>Số điện thoại:</strong> ${infoUser.phone}</p>
    <p><strong>Địa chỉ:</strong> ${infoUser.address}</p>
    <h2>Sản phẩm:</h2>
    ${itemsContent}
  `;

  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: subject,
    html: emailContent
  };
  await transporter.sendMail(mailOptions);
}
const sendEmailResponse = async (title, description, email) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS_EMAIL
    }
  });
  const emailContent = `
   <h1>${description}</h1>
  `;
  const mailOptions = {
    from: process.env.MAIL,
    to: process.env.MAIL,
    subject: title,
    html: emailContent,
    replyTo: email
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
const emailToClinet = async (emailUser, contentUser, contentAdmin, title) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS_EMAIL
    }
  });

  const emailContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #4CAF50;">Nội dung từ người dùng</h2>
      <p>${contentUser}</p>
      <hr style="margin: 20px 0;">
      <h2 style="color: #2196F3;">Phản hồi từ quản trị viên</h2>
      <p>${contentAdmin}</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.MAIL,
    to: emailUser,
    subject: title,
    html: emailContent
  };
  await transporter.sendMail(mailOptions);
}
module.exports = { sendMail, sendMailProduct, sendEmailResponse, emailToClinet }