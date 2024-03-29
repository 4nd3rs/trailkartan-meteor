var pageSession = new ReactiveDict();

Template.TrailsDetails.rendered = function() {
	
};

Template.TrailsDetails.events({
	
});

Template.TrailsDetails.helpers({
	
});

Template.TrailsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("trailsDetailsDetailsFormInfoMessage", "");
	pageSession.set("trailsDetailsDetailsFormErrorMessage", "");

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

Template.TrailsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("trailsDetailsDetailsFormInfoMessage", "");
		pageSession.set("trailsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var trailsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(trailsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("trailsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("trailsDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("trails", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("trails", {});
	}

	
});

Template.TrailsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("trailsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("trailsDetailsDetailsFormErrorMessage");
	}
	
});
