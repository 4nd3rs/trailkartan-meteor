this.Areas = new Mongo.Collection("areas");

this.Areas.userCanInsert = function(userId, doc) {
	return true;
}

this.Areas.userCanUpdate = function(userId, doc) {
	return true;
}

this.Areas.userCanRemove = function(userId, doc) {
	return true;
}
