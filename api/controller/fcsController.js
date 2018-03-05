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
				myjson.composite = item.s3_metadata.expmoniker+' ('+item.s3_metadata.expuuid+')';
				myjson.instrument_date = item.fcs_metadata.$DATE;
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
	setTimeout(function() {
		res.send(req.body);
	}, 2000);
};

exports.batch_experiment = function(req, res) {
	return(0);
	var batch = new AWS.Batch();
	var params = {
	            jobDefinition: "sleep60", 
            jobName: "titration", 
            jobQueue: "fcs-batch-queue"
	};
	batch.submitJob(params, function(err, data) {
	  if (err){
	  	console.log(err, err.stack); // an error occurred
	  	res.send(err);
	  }
	  else{
	  	console.log(data);           // successful response
	  	res.send("thanks");
	  }
	});
}


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