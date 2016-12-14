"use strict";
const TorrentParser = (function(){
	const defaults = {
		root : null //required
	};

	function create(options){
    	let torrentParser = {};
		torrentParser.options = Object.assign({}, defaults, options);
    	bind(torrentParser);
    	return torrentParser;
    }

	function bind(torrentParser){
		torrentParser.parseMagnetLink = parseMagnetLink.bind(torrentParser);
	}

	function parseMagnetLink(torrent){
		const magnetPrefix = /^magnet:\?/;
		const hashPrefix = /^urn:btih:/;

		if(!magnetPrefix.test(torrent)){
			throw "not a valid magnet link"
		}
		const queryParams = new URLSearchParams(torrent.replace(magnetPrefix, ""));
		let torrentInfo = {};
		if(queryParams.has("xt")){
			let xt = queryParams.get("xt");
			if(!hashPrefix.test(xt)){
				throw "not a valid bittorrent info hash";
			}
			torrentInfo.infoHash = xt.replace(hashPrefix, "");
		}
		if(queryParams.has("xl")){
			torrentInfo.length = queryParams.get("xl");
		}
		if(queryParams.has("dn")){
			torrentInfo.displayName = queryParams.get("dn");
		}
		if(queryParams.has("tr")){
			torrentInfo.trackers = queryParams.getAll("tr");
		}
		return torrentInfo;
	}

	return {
		create : create
	};
})();
