import { connect, models, Schema, model } from 'mongoose'

connect(process.env.MONGO_URL as string)
    .then(() => console.log('Successfully connected to the database!'))
    .catch(console.error)

export default models.link || model('link', new Schema({
    url: String,
    code: String
}))