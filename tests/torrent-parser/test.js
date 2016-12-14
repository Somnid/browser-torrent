QUnit.module("parse");
QUnit.test("should parse torrent infoHash", function(assert){
	let parser = TorrentParser.create();
	let torrentInfo = parser.parseMagnetLink(`magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4`);
	assert.equal(torrentInfo.infoHash, "6a9759bffd5c0af65319979fb7832189f4f3c35d", "got xt");
});
QUnit.test("should parse torrent displayName", function(assert){
	let parser = TorrentParser.create();
	let torrentInfo = parser.parseMagnetLink(`magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4`);
	assert.equal(torrentInfo.displayName, "sintel.mp4", "got dn");
});
QUnit.test("should parse torrent trackers", function(assert){
	let parser = TorrentParser.create();
	let torrentInfo = parser.parseMagnetLink(`magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4`);
	assert.deepEqual(torrentInfo.trackers, [
		"wss://tracker.btorrent.xyz",
		"wss://tracker.fastcast.nz",
		"wss://tracker.openwebtorrent.com",
		"wss://tracker.webtorrent.io"
	], "got dn");
});
QUnit.test("should parse torrent trackers", function(assert){
	let parser = TorrentParser.create();
	let torrentInfo = parser.parseMagnetLink(`magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4&xl=1234`);
	assert.equal(torrentInfo.length, 1234, "got xl");
});
