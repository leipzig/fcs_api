'use strict';
var AWS = require("aws-sdk");

AWS.config.update({region:'us-east-1'});
var docClient = new AWS.DynamoDB.DocumentClient();



//arn:aws:dynamodb:us-east-1:205853417430:table/TechnicalMetadata

var params = {
	TableName: "TechnicalMetadata",
};

docClient.scan(params, function(err, data) {
	if (err) {
		console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
	} else {
		console.log("Query succeeded.");
		var myjsons = {};
		data.Items.forEach(function(item) {
			var myjson = item.s3_metadata;
			myjson.keyName = item.keyName;
			//console.log(item.keyName);
			Object.assign(myjsons,myjson);
			console.log(myjson);
		});
		console.log(myjsons);
	}
});


var params = {
	    TableName: "TechnicalMetadata",
	    FilterExpression: "s3_metadata.expuuid = :uuid",
	    ExpressionAttributeValues: {
	        ":uuid": "7192da80-8134-498f-a987-34419351bc6b"
	    }
	};
	docClient.scan(params, function(err, data) {
		if (err) {
			console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
		} else {
			console.log("Query succeeded.");
			var myjsons = {};
			data.Items.forEach(function(item) {
				var myjson = item.s3_metadata;
				myjson.keyName = item.keyName;
				//console.log(item.keyName);
				Object.assign(myjsons,myjson);
				console.log(myjson);
			});
			console.log("fuck you");
		}
	});