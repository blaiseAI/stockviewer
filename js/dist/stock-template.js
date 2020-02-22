(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['stock'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <tr>\n                        <td>"
    + alias3(((helper = (helper = lookupProperty(helpers,"x") || (depth0 != null ? lookupProperty(depth0,"x") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"x","hash":{},"data":data,"loc":{"start":{"line":27,"column":28},"end":{"line":27,"column":33}}}) : helper)))
    + "</td>\n                        <td>"
    + alias3((lookupProperty(helpers,"currency")||(depth0 && lookupProperty(depth0,"currency"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"y") : depth0),{"name":"currency","hash":{},"data":data,"loc":{"start":{"line":28,"column":28},"end":{"line":28,"column":42}}}))
    + "</td>\n                    </tr>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"display\">\n    <div class=\"stock-view\">\n        <div class=\"stock-preview\">\n            <div class=\"hr\">\n                <h1>"
    + alias3((lookupProperty(helpers,"toUpper")||(depth0 && lookupProperty(depth0,"toUpper"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"symbol") : depth0),{"name":"toUpper","hash":{},"data":data,"loc":{"start":{"line":5,"column":20},"end":{"line":5,"column":38}}}))
    + "</h1>\n            </div>\n            <div class=\"stock-preview-detail\">\n                <div class=\"price\">"
    + alias3((lookupProperty(helpers,"currency")||(depth0 && lookupProperty(depth0,"currency"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"price") : depth0),{"name":"currency","hash":{},"data":data,"loc":{"start":{"line":8,"column":35},"end":{"line":8,"column":53}}}))
    + "</div>\n            <div class=\"details\">Zone: "
    + alias3(((helper = (helper = lookupProperty(helpers,"zone") || (depth0 != null ? lookupProperty(depth0,"zone") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"zone","hash":{},"data":data,"loc":{"start":{"line":9,"column":39},"end":{"line":9,"column":47}}}) : helper)))
    + "</div>\n            <div class=\"details\">Last Updated: "
    + alias3(((helper = (helper = lookupProperty(helpers,"date") || (depth0 != null ? lookupProperty(depth0,"date") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":10,"column":47},"end":{"line":10,"column":55}}}) : helper)))
    + "</div>\n            </div>\n        </div>\n        <div class=\"stock-preview-table\">\n           <div class=\"hr\">\n                <h1>Past 5 Days</h1>\n           </div>\n            <table>\n                <thead>\n                    <tr>\n                        <th>Date</th>\n                        <th>Stock Price</th>\n                    </tr>\n                </thead>\n                <tbody>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"pastDays") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":20},"end":{"line":30,"column":29}}})) != null ? stack1 : "")
    + "                </tbody>\n            </table>\n        </div>\n    </div>\n   <div id=\"chart\">\n</div>\n</section>";
},"useData":true});
})();