sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./QuickView1", "./Popover1",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, QuickView1, Popover1, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.検証2.controller.Page5", {
		handleRouteMatched: function(oEvent) {
			var sAppId = "App6260bf57e8637201d13f334e";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function(oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype" && prop.includes("Set")) {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		_onButtonPress: function() {
			alert("123");

		},
		_onLinkPress: function(oEvent) {

			var sQuickviewName = "QuickView1";
			this.mQuickviews = this.mQuickviews || {};
			var oQuickview = this.mQuickviews[sQuickviewName];

			if (!oQuickview) {
				oQuickview = new QuickView1(this.getView());
				this.mQuickviews[sQuickviewName] = oQuickview;

				oQuickview.getControl().setPlacement("PreferredRightOrFlip");

				// For navigation.
				oQuickview.setRouter(this.oRouter);
			}

			var oSource = oEvent.getSource();

			oQuickview.open(oSource);

		},
		_onToggleButtonPress: function() {

			this.close();

		},
		_onHotspotPress: function(oEvent) {

			var sPopoverName = "Popover1";
			this.mPopovers = this.mPopovers || {};
			var oPopover = this.mPopovers[sPopoverName];

			if (!oPopover) {
				oPopover = new Popover1(this.getView());
				this.mPopovers[sPopoverName] = oPopover;

				oPopover.getControl().setPlacement("PreferredRightOrFlip");

				// For navigation.
				oPopover.setRouter(this.oRouter);
			}

			var oSource = oEvent.getSource();

			oPopover.open(oSource);

		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Page5").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

		}
	});
}, /* bExport= */ true);
