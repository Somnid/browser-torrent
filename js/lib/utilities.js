"use strict";
var Util = (function(){

	function getRandomHexString(length){
		let result = "";
		for(var i = 0; i < length; i++){
			result += Math.floor(Math.random() * 17).toString(16);
		}
		return result;
	}

	function getRandomByteString(length){
		const vector = crypto.getRandomValues(new Uint8Array(length));
		let result = "";
		for(let i = 0; i < vector.byteLength; i++){
			result += String.fromCharCode(vector[i]);
		}
		return result;
	}

	function hexStringToByteString(hexString){
		let byteString = "";
		if(hexString.length % 2 != 0){
			hexString += "0";
		}
		for(let i = 0; i < hexString.length; i += 2){
			let hexCoupleString = hexString[i] + hexString[i + 1];
			let byte = parseInt(hexCoupleString, 16);
			byteString += String.fromCharCode(byte);
		}
		return byteString;
	}

	return {
		getRandomHexString,
		getRandomByteString,
		hexStringToByteString
	};

})();
