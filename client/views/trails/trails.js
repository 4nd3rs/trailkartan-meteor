var pageSession = new ReactiveDict();

Template.Trails.rendered = function() {
	
};

Template.Trails.events({
	
});

Template.Trails.helpers({
	
});

var TrailsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TrailsViewSearchString");
	var sortBy = pageSession.get("TrailsViewSortBy");
	var sortAscending = pageSession.get("TrailsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "description", "stravaSegmentID"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var TrailsViewExport = function(cursor, fileType) {
	var data = TrailsViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.TrailsView.rendered = function() {
	pageSession.set("TrailsViewStyle", "table");
	
};

Template.TrailsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("TrailsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("TrailsViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("TrailsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("trails.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		TrailsViewExport(this.trails, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TrailsViewExport(this.trails, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TrailsViewExport(this.trails, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TrailsViewExport(this.trails, "json");
	}

	
});

Template.TrailsView.helpers({

	

	"isEmpty": function() {
		return !this.trails || this.trails.count() == 0;
	},
	"isNotEmpty": function() {
		return this.trails && this.trails.count() > 0;
	},
	"isNotFound": function() {
		return this.trails && pageSession.get("TrailsViewSearchString") && TrailsViewItems(this.trails).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TrailsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TrailsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("TrailsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TrailsViewStyle") == "gallery";
	}

	
});


Template.TrailsViewTable.rendered = function() {
	
};

Template.TrailsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TrailsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TrailsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TrailsViewSortAscending") || false;
			pageSession.set("TrailsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TrailsViewSortAscending", true);
		}
	}
});

Template.TrailsViewTable.helpers({
	"tableItems": function() {
		return TrailsViewItems(this.trails);
	}
});


Template.TrailsViewTableItems.rendered = function() {
	
};

Template.TrailsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("trails.details", {trailId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Trails.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Trails.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("trails.edit", {trailId: this._id});
		return false;
	}
});

Template.TrailsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }
	

	
});
