Trails.allow({
	insert: function (userId, doc) {
		return Trails.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Trails.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Trails.userCanRemove(userId, doc);
	}
});

Trails.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Trails.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Trails.before.remove(function(userId, doc) {
	
});

Trails.after.insert(function(userId, doc) {
	
});

Trails.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Trails.after.remove(function(userId, doc) {
	
});
