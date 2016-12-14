"use strict";

var AppView = (function(){

	function create(){
		var appView = {};
		bind(appView);
		appView.init();
		return appView;
	}

	function bind(appView){
		appView.installServiceWorker = installServiceWorker.bind(appView);
		appView.serviceWorkerInstalled = serviceWorkerInstalled.bind(appView);
		appView.serviceWorkerInstallFailed = serviceWorkerInstallFailed.bind(appView);
		appView.setBndr = setBndr.bind(appView);
		appView.init = init.bind(appView);

		appView.run = run.bind(appView);
		appView.run2 = run2.bind(appView);
	}

	function installServiceWorker(){
		if("serviceWorker" in navigator){
			navigator.serviceWorker.register("service-worker.js", {scope: "./"})
				.then(this.serviceWorkerInstalled)
				.catch(this.serviceWorkerInstallFailed);
		}
	}

	function serviceWorkerInstalled(registration){
		console.log("App Service registration successful with scope:", registration.scope);
	}

	function serviceWorkerInstallFailed(error){
		console.error("App Service failed to install", error);
	}

	function setBndr(){
		this.bndr = Bndr.create()
					.setTemplate(document.body)
					.setModel({
						magnet : ""
					})
					.bindElementReverse("#magnet", "magnet")
					.bindEvent("#run", "click", this.run)
					.bindEvent("#run2", "click", this.run2)
					.attach();
		this.model = this.bndr.getBoundModel();
	}

	function run(){
		this.client = new WebTorrent();
		this.client.add(this.model.magnet, x => {
			let first = x.files[0];
			first.appendTo("body");
		});
	}

	function run2(){
		let parser = TorrentParser.create();
		let magnetInfo = parser.parseMagnetLink(this.model.magnet);
		let tracker = TorrentTracker.create({
			url : magnetInfo.trackers[3]
		});
	}

	function getQueryData(){
		let searchParams = new URLSearchParams(window.location.search.substr(1));
	}

	function init(){
		this.installServiceWorker();
		this.setBndr();
	}

	return {
		create : create
	};

})();
