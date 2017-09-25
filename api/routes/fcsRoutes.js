'use strict';
module.exports = function(app) {
  var fcs = require('../controller/fcsController');

  app.route('/uploads')
   .get(fcs.list_all_uploads);

  //we don't really delete anything
  app.route('/uploads/:id')
    .get(fcs.get_upload)
    .delete(fcs.hide_upload);
	
  app.route('/analysis/:id')
    .get(fcs.analyze_experiment);
};
