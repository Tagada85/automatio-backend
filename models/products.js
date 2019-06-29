const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productsSchema = new Schema({
	id: String,
	transactions: [
		{
			id: String,
			quantity: Number,
			time: Date
		}
	]
})

const Product = mongoose.model('Product', productsSchema)

module.exports = Product
