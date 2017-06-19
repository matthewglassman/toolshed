var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create tools schema
var ToolSchema = new Schema ({
	
	toolName: {
		type: String		
	},
	toolPrice: {
		type: Number		
	},
	toolCondition: {
		// working condition - usable, not-usable
		type: String		
	},
	toolStatus: {
		type:Boolean
		// rented or available
	},
	toolHeldBy: {
		// who has it rented currently
		// use UserId from the other table
		type:String
	},
	toolMaxDays: {
		// number of days for which it can be rented
		type: Number		
	}, 
	toolUrl: {
		// url to a picture of the tool
		type: String		
	},
	toolOwner: {
		type: String
	},
	toolDue: {
		// added tool due date - ML
		type: Date
	},
	toolOwnerName: {
		type: String
	},
	toolCreatedDate: {
		type:Date
	}
});
// Create tool model wth the ToolsShema
var Tool = mongoose.model("Tool", ToolSchema);
module.exports = Tool;