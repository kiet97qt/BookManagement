const nodemailer = require("nodemailer");

const create = (data) => Books.create(data);
const findAll= () => Books.find({});
const findById= (id) => Books.findOne({ _id : id })
const updateOne=(id,data) => Books.updateOne({ _id : id }).set(data);
const deleteOne=(id) => Books.destroyOne({ _id : id });

function sendMailFromAdmin(mailOptions) {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'kietnodejs1997@gmail.com',
          pass: 'redagon291'
        }
      });
      return transporter.sendMail(mailOptions)
  }

module.exports = {
    create,
    findAll,
    findById,
    updateOne,
    deleteOne,
    sendMailFromAdmin,
}