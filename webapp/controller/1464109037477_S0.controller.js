sap.ui.define([
               "sap/ui/core/Fragment",
               "sap/ui/core/mvc/Controller",
               "sap/ui/model/Filter"], function(Fragment, BaseController, Filter) {
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
				
				oModel.loadData(
						"/sap/opu/odata/sap/Z_CATS_API_SRV/senderkostenstelleSet()?$format=json", "",
						false);

				this.getView().setModel(oModel, "dialog_kostl");


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
		},
		
		_onValueHelpRequest_kostenstelle: function(oEvent) {
			
		/*	var that= this;
			
			var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
				basicSearchText: this.theTokenInput.getValue(), 
				title: "Company",
				supportMultiselect: false,
				supportRanges: false,
				supportRangesOnly: false, 
				key: this.aKeys[0],				
				descriptionKey: this.aKeys[1],
				stretch: sap.ui.Device.system.phone, 
	 
				ok: function(oControlEvent) {
					that.aTokens = oControlEvent.getParameter("tokens");
					that.theTokenInput.setTokens(that.aTokens);
	 
					oValueHelpDialog.close();
				},
	 
				cancel: function(oControlEvent) {
					sap.m.MessageToast.show("Cancel pressed!");
					oValueHelpDialog.close();
				},
	 
				afterClose: function() {
					oValueHelpDialog.destroy();
				}
			});
			
			
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [
				      	{label: "Company Code", template: "CompanyCode"},
				        {label: "Company Name", template: "CompanyName"},
				        {label: "City", template: "City", demandPopin : true},
				        {label: "Currency Code", template: "CurrencyCode", demandPopin : true}
				      ]
			});
			oValueHelpDialog.getTable().setModel(oColModel, "columns");
	 
			
			var oRowsModel = new sap.ui.model.json.JSONModel();
			oRowsModel.setData(this.aItems);
			oValueHelpDialog.getTable().setModel(oRowsModel);
			if (oValueHelpDialog.getTable().bindRows) {
				oValueHelpDialog.getTable().bindRows("/"); 
			}
			if (oValueHelpDialog.getTable().bindItems) { 
				var oTable = oValueHelpDialog.getTable();
				
				oTable.bindAggregation("items", "/", function(sId, oContext) { 
					var aCols = oTable.getModel("columns").getData().cols;
				
					return new sap.m.ColumnListItem({
						cells: aCols.map(function (column) {
							var colname = column.template;
							return new sap.m.Label({ text: "{" + colname + "}" });
						})
					});
				});
			}	
			
			oValueHelpDialog.setTokens(this.theTokenInput.getTokens());
			
			var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
				advancedMode:  true,
				filterBarExpanded: false,
				showGoOnFB: !sap.ui.Device.system.phone,
				filterGroupItems: [new sap.ui.comp.filterbar.FilterGroupItem({ groupTitle: "foo", groupName: "gn1", name: "n1", label: "Company Code", control: new sap.m.Input()}),
				                   new sap.ui.comp.filterbar.FilterGroupItem({ groupTitle: "foo", groupName: "gn1", name: "n2", label: "Company Name", control: new sap.m.Input()}),
				                   new sap.ui.comp.filterbar.FilterGroupItem({ groupTitle: "foo", groupName: "gn1", name: "n3", label: "City", control: new sap.m.Input()}),
				                   new sap.ui.comp.filterbar.FilterGroupItem({ groupTitle: "foo", groupName: "gn1", name: "n4", label: "Currency Code", control: new sap.m.Input()})],
				search: function() {
					sap.m.MessageToast.show("Search pressed '"+arguments[0].mParameters.selectionSet[0].getValue()+"''");
				}
			});			
					
			if (oFilterBar.setBasicSearch) {
				oFilterBar.setBasicSearch(new sap.m.SearchField({
					showSearchButton: sap.ui.Device.system.phone, 
					placeholder: "Search",
					search: function(event) {
						oValueHelpDialog.getFilterBar().search();
					} 
				}));  
			}
			
			oValueHelpDialog.setFilterBar(oFilterBar);
			
			if (this.theTokenInput.$().closest(".sapUiSizeCompact").length > 0) { // check if the Token field runs in Compact mode
				oValueHelpDialog.addStyleClass("sapUiSizeCompact");
			} else {
				oValueHelpDialog.addStyleClass("sapUiSizeCozy");			
			}
			
			oValueHelpDialog.open();
			oValueHelpDialog.update(); */
			
			/* #######
			var dialogName = "d_kostenstelle";
			this.dialogs = this.dialogs || {};
			var dialog = this.dialogs[dialogName];
			var source = oEvent.getSource();
			var bindingContext = source.getBindingContext();
			var path = (bindingContext) ? bindingContext.getPath() : null;
			var model = (bindingContext) ? bindingContext.getModel() : this.getView().getModel();
			var view;
			if (!dialog) {
				view = sap.ui.xmlview({
					viewName: "generated.app.view." + dialogName
				});
				view._sOwnerId = this.getView()._sOwnerId;
				dialog = view.getContent()[0];
				this.dialogs[dialogName] = dialog;
			}
			dialog.open();
			
			if (view) {
				dialog.attachBeforeClose(function() {
					//dialog.rerender();
					//this.getView().byId('ipt_senderkostenstelle').setText('test');
					
				});
			} else {
				view = dialog.getParent();
			}
			
			this.getView().byId('ipt_senderkostenstelle').setText('test');
			//view.setModel(model);
			//view.bindElement(path, {}); 
			
			#######*/
			
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"generated.app.view.Dialog",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}

			// create a filter for the binding
			/*
			this._valueHelpDialog.getBinding("items").filter([new Filter(
				"Name",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);
			*/

			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
		},
		
		_handleValueHelpClose : function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.getView().byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		}
	});
}, /* bExport= */ true);