this.TrailsDetailsController = RouteController.extend({
	template: "TrailsDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("trail", this.params.trailId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			trail: Trails.findOne({_id:this.params.trailId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});