var pageSession = new ReactiveDict();

Template.TrailsInsert.rendered = function() {
	
};

Template.TrailsInsert.events({
	
});

Template.TrailsInsert.helpers({
	
});

Template.TrailsInsertInsertForm.rendered = function() {
	

	pageSession.set("trailsInsertInsertFormInfoMessage", "");
	pageSession.set("trailsInsertInsertFormErrorMessage", "");

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

Template.TrailsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("trailsInsertInsertFormInfoMessage", "");
		pageSession.set("trailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var trailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(trailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("trailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("trails", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("trailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Trails.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.TrailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("trailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("trailsInsertInsertFormErrorMessage");
	}
	
});
