import { SPComponentLoader } from "@microsoft/sp-loader";

export default class GlobalFunctions {
    public static setFullBleed(useFullBleed: boolean): void {
        let scrollRegionHeight: number = 500;

        if (useFullBleed) {
            SPComponentLoader.loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", { globalExportsName: "jQuery" }).then((_jQuery: any): void => {
                if (DEBUG) {
                    _jQuery("#workbenchPageContent").css("max-width", "1800px");
                    _jQuery(".CanvasZone").css("max-width", "none");

                    scrollRegionHeight = 400;

                    _jQuery("#VirtualMailList > div:last-child").css("height", scrollRegionHeight + "px");
                    _jQuery("#HtmlBodyContainer").css("height", scrollRegionHeight + "px");

                    console.log("Workbench expanded ok using jQuery");
                } else {
                    _jQuery(".SPCanvas div:first-child").css("max-width", "none");
                    _jQuery(".CanvasZone").css("max-width", "none");
                    _jQuery("[class^='pageTitle_']").css("display", "none");

                    // Remove space around wp
                    _jQuery(".ControlZone").css("padding", "0");
                    _jQuery(".ControlZone").css("margin-top", "0");
                    _jQuery(".CanvasZone").css("padding", "0 9px");

                    // Set the container to full height
                    setTimeout(() => {
                        // Hide the primary command bar, and make SURE with a timeout
                        _jQuery(".commandBarWrapper").hide();

                        // Remove margin form bottom on page
                        _jQuery(".ControlZone").css("margin-bottom", "0");

                        // Hide stuff
                        _jQuery("[class^='commentsWrapper_']").css("display", "none");
                        _jQuery("[class^='footerBar_']").css("display", "none");
                        _jQuery("[class^='canvasSpacerSection_']").css("display", "none");

                        // Remove scroll from scroll region
                        _jQuery("[class^='scrollRegion_']").css("overflow-y", "hidden");

                        // Get the height of the scroll region
                        scrollRegionHeight = _jQuery("[class^='scrollRegion_']").height();

                        //VirtualMailList - mins height of filter div
                        _jQuery("#VirtualMailList > div:last-child").css("height", scrollRegionHeight - 81 + "px");
                        _jQuery("#HtmlBodyContainer").css("height", scrollRegionHeight - 81 + "px");


                        console.log("PROD canvas expanded ok using jQuery. Scroll region height is " + scrollRegionHeight);
                    }, 1000);
                }
            });
        }
    }

}
