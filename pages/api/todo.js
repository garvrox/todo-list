import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const { db } = await connectToDatabase();
    const todoList = db.collection("todo_list");
    const result = await todoList.insertOne(data);
    if (result.acknowledged) {
      res.status(201).json({ insertedId: result.insertedId });
    }
  } else if (req.method === "PUT") {
    const { db } = await connectToDatabase();
    const todoList = db.collection("todo_list");
    // create a filter for a movie to update
    const filter = { _id: ObjectId(req.query.id) };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        isComplete: 1,
      },
    };
    const result = await todoList.updateOne(filter, updateDoc, options);
    if (result.acknowledged) {
      res.status(201).json({ message: "Data updated successfully!" });
    }
  } else {
    const { db } = await connectToDatabase();
    const todoList = await db
      .collection("todo_list")
      .find({})
      .sort({ _id: -1 })
      .limit(20)
      .toArray();
    res.json(todoList);
  }
};
