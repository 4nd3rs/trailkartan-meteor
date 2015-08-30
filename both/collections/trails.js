this.Trails = new Mongo.Collection("trails");

this.Trails.userCanInsert = function(userId, doc) {
	return true;
}

this.Trails.userCanUpdate = function(userId, doc) {
	return true;
}

this.Trails.userCanRemove = function(userId, doc) {
	return true;
}
