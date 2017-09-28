'use strict';
var AWS = require("aws-sdk");
// list_all_uploads
// get_upload id
// hide_upload id
// analyze_experiment id

AWS.config.update({region:'us-east-1'});
	var docClient = new AWS.DynamoDB.DocumentClient();



	//arn:aws:dynamodb:us-east-1:205853417430:table/TechnicalMetadata


exports.list_all_uploads = function(req, res) {
	var params = {
		TableName: "TechnicalMetadata",
	};
	
	docClient.scan(params, function(err, data) {
		if (err) {
			res.send("Unable to query. Error:", JSON.stringify(err, null, 2));
		} else {
			console.log("Query succeeded.");
			var myjsons = [];
			data.Items.forEach(function(item) {
				var myjson = item.s3_metadata;
				myjson.keyName = item.keyName;
				//console.log(item.keyName);
				//https://stackoverflow.com/questions/14974864/combine-or-merge-json-on-node-js-without-jquery
				myjsons.push(myjson);
				console.log(myjson);
			});
			res.send(myjsons);
		}
	});
};

exports.get_upload = function(req, res) {
	res.send("get upload");
};

exports.hide_upload = function(req, res) {
	res.send("hide upload");
};

exports.analyze_experiment = function(req, res) {
	res.send("analyze experiment");
};

//http://uploader.cytovas.com:8080/uploads/experiment/7192da80-8134-498f-a987-34419351bc6b
exports.list_uploads_by_exp = function(req, res) {
	var params = {
	    TableName: "TechnicalMetadata",
	    FilterExpression: "s3_metadata.expuuid = :uuid",
	    ExpressionAttributeValues: {
	        ":uuid": req.params.id
	    }
	};
	docClient.scan(params, function(err, data) {
		if (err) {
			res.send("Unable to query. Error:", JSON.stringify(err, null, 2));
		} else {
			console.log("Query succeeded.");
			var myjsons = [];
			data.Items.forEach(function(item) {
				var myjson = item.s3_metadata;
				myjson.keyName = item.keyName;
				//console.log(item.keyName);
				myjsons.push(myjson);
				console.log(myjson);
			});
			res.send(myjsons);
		}
	});
};