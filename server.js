const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')
const path = require('path')
const app = express()
const PORT = 3000
const graphqlHTTP = require('express-graphql')

const { fetchProduct, fetchProducts, schema } = require('./graphql')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
	req.io = io
	next()
})

const root = {
	product: fetchProduct,
	products: fetchProducts
}

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true
	})
)
app.use(routes)

app.get('/', (req, res) => {
	console.log('in get /')
	res.sendFile(path.join(__dirname, './public', 'index.html'))
})

mongoose.Promise = global.Promise

mongoose.connect(
	`mongodb://Tagada85:kallon85@ds161012.mlab.com:61012/automatio`,
	{
		useMongoClient: true
	}
)

http.listen(PORT, () => {
	console.log(`Running on port ${PORT}`)
})
