const db = require('../models')

module.exports = {
	fetchAll: function(req, res) {
		db.Product.find({}, (err, docs) => {
			if (!err) {
				console.log(docs)
				res.send(docs)
			}
		})
	},
	fetchById: function(req, res) {
		const id = req.params.id
		db.Product.findOne({ id }, (err, doc) => {
			if (!err) {
				res.send(doc)
			}
		})
	},
	delete: function(req, res) {
		try {
			const id = req.body.id
			console.log(typeof id)
			db.Product.findOneAndRemove({ id }, doc => {
				console.log(doc)
			})
			req.io.emit('deletion', id)
		} catch (e) {
			console.log('ERROR')
		}
	},
	create: function(req, res) {
		try {
			const id = req.body.id
			const product = new db.Product({
				id,
				transactions: []
			})
			product.save()
			req.io.emit('creation', id)
		} catch (e) {
			console.log('ERROR')
		}
	}
}
