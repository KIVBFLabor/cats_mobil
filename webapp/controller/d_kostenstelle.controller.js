sap.ui.define(["sap/ui/core/mvc/Controller"], function(BaseController) {
	"use strict";

	return BaseController.extend("generated.app.controller.d_kostenstelle", {

		onInit: function() {
			this._oDialog = this.getView().getContent()[0];
			
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(
					"/sap/opu/odata/sap/Z_CATS_API_SRV/senderkostenstelleSet()?$format=json", "",
					false);

			this.getView().setModel(oModel);
			
		},
		onExit: function() {
			this._oDialog.destroy();
		},
		_onSelectionChangeSapmDialog0contentsapmList1464849416547: function() {
			this.getView().getContent()[0].close();
		},
		_onPressSapmDialog0contentsapmButton1464849746658: function() {
			this.getView().getContent()[0].close();
		}
	});
}, /* bExport= */ true);