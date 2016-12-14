"use strict";
//requires getRandomNumberString, getRandomByteString
const TorrentTracker = (function(){
	const defaults = {
		url : null, //required
		infoHash : "", //required
		peerCount : 5,
		sdp : null, //required
		total : 0
	};

	function create(options){
    	let torrentTracker = {};
		torrentTracker.options = Object.assign({}, defaults, options);
    	bind(torrentTracker);
    	torrentTracker.init();
    	return torrentTracker;
    }

	function bind(torrentTracker){
		torrentTracker.init = init.bind(torrentTracker);
		torrentTracker.send = send.bind(torrentTracker);

		torrentTracker.announce = announce.bind(torrentTracker);
		torrentTracker.setDownloaded = setDownloaded.bind(torrentTracker);
		torrentTracker.setUploaded = setUploaded.bind(torrentTracker);
	}

	function announce(){
		this.send({
			action : "announce",
			downloaded : this.downloaded,
			info_hash : this.options.infoHash,
			left : this.options.total - this.downloaded,
			numwant : this.options.peerCount,
			offers: [
				{
					offer : this.sdp,
					offer_id: Util.getRandomByteString(18)
				}
			],
			peer_id : this.peerId,
			uploaded : this.uploaded
		});
	}

	function send(obj){
		this.socket.then(s => {
			s.send(JSON.stringify(obj));
		});
	}

	function getPeerId(){
		return `-Wz0000-${Util.getRandomHexString(12)}`;
	}

	function getSocket(url){
		return new Promise((resolve, reject) => {
			let socket = new WebSocket(url);
			socket.onopen = e => resolve(e.target);
		});
	}

	function setUploaded(bytes){
		this.uploaded = bytes;
	}

	function setDownloaded(bytes){
		this.downloaded = bytes;
	}

	function init(){
		this.socket = getSocket(this.options.url);
		this.peerId = getPeerId();
		this.downloaded = this.options.downloaded;
		this.uploaded = this.options.uploaded;
	}

	return {
		create : create
	};
})();
