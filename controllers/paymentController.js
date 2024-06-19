const instance = require("../instance");

const checkout = async (req, res) => {
  try {
    // Log the incoming request to verify the payload structure
    console.log('Incoming request payload:', req.body);

    // Use the amount directly from the client (already in paise)
    const amountInPaise = req.body.amount;

    // Log the amount to be used
    console.log('Amount in paise:', amountInPaise);

    const options = {
      amount: amountInPaise, // amount in the smallest currency unit (e.g., 50000 paise = 500 INR)
      currency: "INR",
      receipt: req.body.receipt, // assuming you're passing a receipt value
      notes: req.body.notes, // additional notes
    };

    // Log the options before creating the order
    console.log('Order creation options:', options);

    const order = await instance.orders.create(options);

    // Log the created order
    console.log('Created order:', order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order: ", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
    });
  }
};

module.exports = { checkout };
