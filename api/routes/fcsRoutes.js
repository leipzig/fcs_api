'use strict';
module.exports = function(app) {
  var fcs = require('../controller/fcsController');

  app.route('/uploads')
   .get(fcs.list_all_uploads);

  app.route('/uploads/:id')
    .get(fcs.get_upload)
    .delete(fcs.hide_upload);
	
	app.route('/uploads/experiment/:id')
    .get(fcs.list_uploads_by_exp);
  
  //titration and other experiments
  app.route('/analysis/experiment')
    .post(fcs.analyze_experiment);
};
