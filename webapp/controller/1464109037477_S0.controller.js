sap.ui.define(["sap/ui/core/mvc/Controller"], function(BaseController) {
	"use strict";

	return BaseController.extend("generated.app.controller.1464109037477_S0", {
		
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("1464109037477_S0").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			
			var date = new Date();
			window.fullDatum = date.toLocaleDateString();
			//var fullDatum = "" + date.getFullYear() + date.getMonth() + date.getDate();
			
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData(
						"/sap/opu/odata/sap/Z_CATS_API_SRV/CATS_DATASet('" + date.toLocaleDateString()+ "')?$format=json", "",
						false);

				this.getView().setModel(oModel);


		},
		
		handleCalendarSelect: function(oEvent) {
			var oCalendar = oEvent.oSource;
			console.log(oCalendar);
			//alert(oCalendar._oFocusedDate);
			var aSelectedDates = oCalendar.getSelectedDates();
			var oDate;
			oDate = aSelectedDates[0].getStartDate();
							
			var month = oDate.getMonth() + 1;
			//if (month < 10) month = '0' + month;
			window.fullDatum = oDate.getDate() + "." +  month + "." + oDate.getFullYear();
			
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(
					"/sap/opu/odata/sap/Z_CATS_API_SRV/CATS_DATASet('" + window.fullDatum + "')?$format=json", "",
					false);

			this.getView().setModel(oModel);

		},
		
		handleRouteMatched: function(oEvent) {
			var params = {};
			if (oEvent.mParameters.data.context || oEvent.mParameters.data.masterContext) {
				this.sContext = oEvent.mParameters.data.context;
				this.sMasterContext = oEvent.mParameters.data.masterContext;

				if (!this.sContext) {
					this.getView().bindElement("/" + this.sMasterContext, params);
				} else {
					this.getView().bindElement("/" + this.sContext, params);
				}

			}

		},
		_onPressSapResponsivePage0footersapmBar1contentRightsapmButton1: function() {
			var oEntry = {};
			
			oEntry.Stunden = parseInt(this.getView().byId("ipt_dauer").getProperty('value'));
			oEntry.Kostenstelle = this.getView().byId("ipt_senderkostenstelle").getProperty('value');
			oEntry.Eauftrnr = this.getView().byId("ipt_auftragsnummer").getProperty('value');
			oEntry.Lsart = this.getView().byId("ipt_leistungsart").getProperty('value');
			oEntry.Workda = window.fullDatum;
			
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z_CATS_API_SRV", true);
			sap.ui.getCore().setModel(oModel);
			
			oModel.create('/CATS_DATASet', oEntry, null, function(oData, oResponse){
			    	alert("Eintrag erfolgreich angelegt!");
			    },function(oData, oResponse){
			    	alert("Eintrag konnte nicht angelegt werden!");
			})
		}
	});
}, /* bExport= */ true);