Areas.allow({
	insert: function (userId, doc) {
		return Areas.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Areas.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Areas.userCanRemove(userId, doc);
	}
});

Areas.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Areas.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Areas.before.remove(function(userId, doc) {
	
});

Areas.after.insert(function(userId, doc) {
	
});

Areas.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Areas.after.remove(function(userId, doc) {
	
});
