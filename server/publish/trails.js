Meteor.publish("trails", function() {
	return Trails.find({}, {});
});

Meteor.publish("trails_empty", function() {
	return Trails.find({_id:null}, {});
});

Meteor.publish("trail", function(trailId) {
	return Trails.find({_id:trailId}, {});
});

