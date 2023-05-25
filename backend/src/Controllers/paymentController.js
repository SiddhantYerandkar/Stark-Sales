const Stripe = require('stripe')
const dotenv = require('dotenv')
dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

exports.payment = async (req, res) => {

    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.productId.title,
                    images: [item.productId.productImage]
                },
                unit_amount: item.productId.price * 100,
            },
            quantity: item.quantity,
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/checkout-success`,
        cancel_url: `${process.env.BASE_URL}/cart`,
    });

    res.send({ url: session.url });
}