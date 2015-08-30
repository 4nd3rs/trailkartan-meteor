Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var freeRoutes = [
	"home",
	"trails",
	"trails.insert",
	"trails.details",
	"trails.edit"
];

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.map(function () {

	this.route("home", {path: "/", controller: "HomeController"});
	this.route("trails", {path: "/trails", controller: "TrailsController"});
	this.route("trails.insert", {path: "/trails/insert", controller: "TrailsInsertController"});
	this.route("trails.details", {path: "/trails/details/:trailId", controller: "TrailsDetailsController"});
	this.route("trails.edit", {path: "/trails/edit/:trailId", controller: "TrailsEditController"});
});
