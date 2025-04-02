import User from "../models/UserModel.js";

export const searchContacts = async (request, response, next) => {
  try {
    const { searchTerm } = request.body;

    if (searchTerm === undefined || searchTerm === null) {
      return response.status(400).send("searchTerm is required.");
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new Regex(sanitizedSearchTerm, "i");

    const contacts = await User.find({
        $and:[
            {_id:{$ne:request.userId}}
        ]

    });

    return response.status(200).send("You have been logged out.");
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};
