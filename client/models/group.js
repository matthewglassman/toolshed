// Require mongoose
var mongoose = require("mongoose");
// Create schema class
var Schema = mongoose.Schema;

// Create group schema
var GroupSchema = new Schema ({
	 
	// Group is requiring string
	groupName: {
		type : String		
	},
	groupCreatedDate: {
		type:Date
	},
	users: [{
		type: Schema.Types.ObjectId,
		ref: "User"
	}]

});

// Create group model with the GroupSchema
var Group = mongoose.model("Group", GroupSchema);

// Export the model
module.exports = Group;
