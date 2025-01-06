// api/new-meetup
import {MongoClient} from 'mongodb'
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client =  await MongoClient.connect('mongodb+srv://rajni:11112222@cluster0.bfz0a.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db()
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();

    //sending response with res object
    res.status(201).json({message:'Mettup inserted'});
  }
}
export default handler;
