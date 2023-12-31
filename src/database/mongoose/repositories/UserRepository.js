const MongoRepository = require("../MongoRepository");
const UserSchema = require("../../schemas/UserSchema.js");

module.exports = class UserRepository extends MongoRepository {
  constructor(mongoose) {
    super(mongoose, mongoose.model("Users", UserSchema));
  }

  parse(entity) {
    return {
      _id: null,
      ...(super.parse(entity) || {}),
    };
  }
};
