﻿using System.Web;
using System.Web.Optimization;

namespace IndieWebGamesMVC
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.UseCdn = true;

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/app.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/directives.js"
                ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/font-awesome.css",
                      "~/Content/style4.css"));

            bundles.Add(new ScriptBundle("~/bundles/api").Include(
                "~/Scripts/API/controllers.js",
                "~/Scripts/API/models.js"
                ));

            //bundles.Add(new ScriptBundle("~/bundles/Pubnub", "http://cdn.pubnub.com/pubnub-3.1.min.js"));
            //bundles.Add(new ScriptBundle("~/bundles/Pubnub-angular", "http://pubnub.github.io/angular-js/scripts/pubnub-angular.js"));
        }
    }
}
