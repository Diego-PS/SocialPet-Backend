import mongoose from 'mongoose'
import { Buckets } from '../../Bucket/interfaces/Buckets'
import { AbstractDatabase } from '../interfaces/AbstractDatabase'
import { config } from '../../../config'

export class Database extends AbstractDatabase 
{
    public buckets!: Buckets

    protected connect = async () => 
    {
        // Connect implementation here...
        await mongoose.connect(`${config.DB_CONNECTION}`)

        // Successfully connected
        console.log(`Connected to database`)
    }

    public disconnect = async () =>
    {
        // Disconnect implementation here...
        await mongoose.disconnect()
    }
    
    protected setupBuckets = () =>
    {
        // Setup implementation here...
        const db = mongoose.connection.db
        this.buckets = new Buckets({ database: db })

        // Successfully setted up the buckets
        console.log(`Setted up the buckets`)
    }

    public clear = async () => 
    {
        // Clear implementation here...
        const collections = await mongoose.connection.db?.collections();
        if (!collections) return

        for (let collection of collections) {
            await collection.deleteMany({})
        }
    }

}