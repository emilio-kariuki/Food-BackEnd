//get one item
export const getOne = (model) => async (req, res) => {
  try {
    const doc = await model.findById({ _id: req.params.id }).exec();

    if (!doc) {
      throw new Error("Item cannot be found");
    }

    res.status(200).send({ data: doc });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getMany = (model) => async (req, res) => {
  try {
    const docs = await model.find().exec();

    if (!docs) {
      throw new Error("Items have not been fetched");
    }

    res.status(200).send({ data: docs });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const createOne = (model) => async(req,res)=>{
    try{
        const doc = await model.create(req.body)

        if(!doc){
            throw new Error("Item was not created")
        }

        res.status(200).send({message: "Item has been created Successfully"})

    }catch(e){
        res.status(500).send({message: e.message})
    }
}

export const updateOne = (model) => (req, res) => {
  try {
    const update = model.findOneAndUpdate({ _id: req.params.id },req.body).exec();

    if (!update) {
      
      throw new Error("Item has not been updated");
    }

    res.status(200).send({ message: "Item has been updated successfully" });
  } catch (e) {

    res.status(500).send({ message: e.message });
  }
};

export const deleteOne = (model) => async (req, res) => {
  try {
    const remove = await model.findOneAndDelete({ _id: req.params.id }).exec();

    if (!remove) {
      throw new Error("Item has not been removed");
    }

    res.status(200).send({ message: "Item has been removed successfully" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const crudController = (model) => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  deleteOne: deleteOne(model),
  updateOne: updateOne(model),
});
