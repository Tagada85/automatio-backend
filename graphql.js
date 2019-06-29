const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} = require('graphql')
const GraphQLTimeStamp = require('./GraphQLTimeStamp')
const db = require('./models/')

const fetchProduct = (_, args) => {
	const id = args.id
	return db.Product.findOne({ id }, (err, doc) => {
		if (!err) {
			return doc
		}
	})
}

const fetchProducts = () => {
	return db.Product.find({}, (err, docs) => {
		if (!err) {
			return docs
		}
	})
}

const Transaction = new GraphQLObjectType({
	name: 'Transaction',
	fields: {
		id: { type: GraphQLString },
		quantity: { type: GraphQLInt },
		time: { type: GraphQLTimeStamp }
	}
})
const Product = new GraphQLObjectType({
	name: 'Product',
	fields: {
		id: { type: GraphQLString },
		transactions: { type: new GraphQLList(Transaction) }
	}
})

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		product: {
			type: Product,
			args: {
				id: { type: GraphQLString }
			},
			resolve: fetchProduct
		},
		products: {
			type: new GraphQLList(Product),
			resolve: fetchProducts
		}
	}
})

const schema = new GraphQLSchema({ query: Query })

module.exports = {
	schema,
	fetchProduct,
	fetchProducts
}
