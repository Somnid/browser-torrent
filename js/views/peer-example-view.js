"use strict";

var PeerTrackerView = (function(){

	function create(){
		var appView = {};
		bind(appView);
		appView.init();
		return appView;
	}

	function bind(appView){
		appView.setBndr = setBndr.bind(appView);
		appView.init = init.bind(appView);

		appView.announce = announce.bind(appView);
	}

	function setBndr(){
		this.bndr = Bndr.create()
					.setTemplate(document.body)
					.setModel({
						magnet : ""
					})
					.bindElementReverse("#magnet", "magnet")
					.bindElementReverse("#tracker", "tracker")
					.bindEvent("#announce", "click", this.announce)
					.attach();
		this.model = this.bndr.getBoundModel();
	}

	function announce(){
		const torrentParser = TorrentParser.create();
		const torrentInfo = torrentParser.parseMagnetLink(this.model.magnet);
		this.peerConnection.addEventListener("negotiationneeded", () => {
			this.peerConnection.createOffer().then(sdp => {
				console.log("creating offer");
				this.peerConnection.setLocalDescription(sdp, () => {
					let torrentTracker = TorrentTracker.create({
						url : this.model.tracker,
						infoHash : Util.hexStringToByteString(torrentInfo.infoHash),
						sdp : sdp
					});
					torrentTracker.announce();
				})
			});
		}, { once : true });
		this.peerConnection.createDataChannel(Util.getRandomHexString(20), {
			reliable: true
		});
	}

	function getQueryData(){
		let searchParams = new URLSearchParams(window.location.search.substr(1));
	}

	function init(){
		this.setBndr();
		this.peerConnection = new webkitRTCPeerConnection({
			iceServers : [
				{ urls : ["stun:stun.l.google.com:19302"] }
			]
		});
	}

	return {
		create : create
	};

})();
