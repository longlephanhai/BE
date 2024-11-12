const Order = require("../../models/order.models")

const basicArea = async (req, res) => {
  try {
    const data = await Order.find().select('createdAt total').sort({ createdAt: 1 });
    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    let dataChart = monthNames.map((month) => ({ name: month, tổng: 0 }));
    data.forEach((item) => {
      const date = new Date(item.createdAt);
      const monthIndex = date.getMonth();
      dataChart[monthIndex].tổng += item.total * 1000;
    });

    res.json({
      dataChart: dataChart,
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
module.exports = { basicArea }