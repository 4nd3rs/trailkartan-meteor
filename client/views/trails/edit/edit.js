var pageSession = new ReactiveDict();

Template.TrailsEdit.rendered = function() {
	
};

Template.TrailsEdit.events({
	
});

Template.TrailsEdit.helpers({
	
});

Template.TrailsEditEditForm.rendered = function() {
	

	pageSession.set("trailsEditEditFormInfoMessage", "");
	pageSession.set("trailsEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.TrailsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("trailsEditEditFormInfoMessage", "");
		pageSession.set("trailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var trailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(trailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("trailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("trails", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("trailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Trails.update({ _id: t.data.trail._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("trails", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.TrailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("trailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("trailsEditEditFormErrorMessage");
	}
	
});
