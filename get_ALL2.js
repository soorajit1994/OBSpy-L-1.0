if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) 
          || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

var freq_dict = {};
var inde = 0;
var DOCUMENT = document;
var Iframe_Xpath = '';
var Iframe_name = '';
var Iframe_web = '';

function getDomPath(el, Xpath) {
  var P = Iframe_Xpath !== "" ? 'Iframe-' + Iframe_name : 'Page-' + DOCUMENT.title.substring(0, 40);
  var B = Iframe_Xpath !== "" ? 'Browser-' + Iframe_web : 'Browser-' + DOCUMENT.title.substring(0, 40);
  var Iframe_Xpath2 = Iframe_Xpath !== "" ? Iframe_Xpath : " ...";
  var html = '<h5 align="center"><b>Object Hierarchy</b></h5> <div style="color:#FF1493">  <ul class="tree">\
    <li>\
      <input type="checkbox" checked="checked" id="c1" />\
      <label class="tree_label" for="c1"><i class="fa fa-globe"></i>' + B + '</label>\
      <ul>\
        <li>\
          <input type="checkbox" checked="checked" id="c2" />\
           <label class="tree_label" for="c2"><i class="fa fa-file"></i>' + P + ' </label>\
          <ul>\
          <li>\
            <input type="checkbox" checked="checked" id="c5" />\
            <label for="c5" class="tree_label">Parent-' + ObjectGen(el.parentNode) + '</label>\
            <ul>\
              <li><span class="tree_label"><i class="fa fa-pencil"></i> WebElement-' + ObjectGen(el) + '</span></li>\
             </ul>\
          </li>\
          </ul>\
 </li>\
 </ul>\
 </li>\
 </ul>\
  </div>\
    ';
  html += '<hr><h5 align="center"><b>Xpath Hierarchy</b></h5> <div style="color:#6A55C2">  <ul class="tree">\
    <li>\
      <input type="checkbox" checked="checked" id="c1" />\
      <label class="tree_label" for="c1"><i class="fa fa-globe"></i>' + B + '</label>\
      <ul>\
        <li>\
          <input type="checkbox" checked="checked" id="c2" />\
           <label class="tree_label" for="c2"> ' + Iframe_Xpath2 + ' </label>\
          <ul>\
              <li><span class="tree_label"> ' + Xpath + '</span></li>\
             </ul>\
 </li>\
</ul>\
    </li>\
    </ul> </div>\
    ';
  return html;
}

function GetNodesvalues(el, data) {
  var nodes = [],
      values = [];
  nodes.push("Text", "Tag");
  values.push(data["TEXT"], data["TAG"]);

  for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
    att = atts[i];
    nodes.push(att.nodeName);
    values.push(att.nodeValue);
  }

  data["NODES"] = nodes;
  data["VALUES"] = values;
  var data = GetStyles(el, data);
  data = getOperation(el, data);
  data["HIERARCHY"] = getDomPath(el, data["XPATH"]);
  return data;
}

function GetStyles(el, data) {
  var nodes = [],
      values = [];
  var styles = window.getComputedStyle(el);

  for (i = 0; i < styles.length; i++) {
    nodes.push(styles[i]);
    var value = '';

    if (styles.getPropertyValue(styles[i]).substring(0, 3) == 'rgb') {
      value = styles.getPropertyValue(styles[i]);
    } else {
      value = styles.getPropertyValue(styles[i]);
    }

    values.push(value);
  }

  data["STYLE_NODES"] = nodes;
  data["STYLE_VALUES"] = values;
  return data;
}

function getOperation(el, data) {
  var ops = [];
  var vals = [];

  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
    ops.push("sendKeys(String input);", "click();", "keyDown(WebElement target, java.lang.CharSequence key)", "keyUp(java.lang.CharSequence key)");
    vals.push("Sends keys to the active element.", "Clicks at the current mouse location.", "Performs a modifier key press.", "Performs a modifier key release.");
  } else {
    ops.push("click()", "clickAndHold()", "doubleClick()", "dragAndDrop(WebElement source, WebElement target)");
    vals.push("Clicks at the current mouse location.", "Clicks (without releasing) at the current mouse location.", "Performs a double-click at the current mouse location.", "For dargging and dropping element");
  }

  data["OPERATIONS"] = ops;
  data["OPERATIONS_VALUES"] = vals;
  return data;
}

function check_div(e) {
  if (e.tagName === 'DIV') {
    var TEXT = [].reduce.call(e.childNodes, function (a, b) {
      return a + (b.nodeType === 3 ? b.textContent : '');
    }, '');
  }

  if (e.tagName === 'IMG' || e.tagName === "I" || e.tagName === "ICON") {
    var TEXT = "IMG";
  }

  if (e.tagName === 'INPUT' || e.tagName === "TEXTAREA" || e.tagName === "SVG" || e.tagName === "IFRAME" || e.tagName === "CANVAS" || e.tagName === "SELECT") {
    var TEXT = "INPUT";
  } else {
    var TEXT = [].reduce.call(e.childNodes, function (a, b) {
      return a + (b.nodeType === 3 ? b.textContent : '');
    }, '');
  }

  return TEXT;
}

function TagGen(e) {
  if (e.getAttribute("type") === "checkbox") {
    return "CHECKBOX";
  }

  if (e.getAttribute("type") === "radio") {
    return "RADIO";
  }

  if (e.getAttribute("type") === "submit") {
    return "BUTTON";
  }

  if (e.getAttribute("type") === "button") {
    return "BUTTON";
  } else {
    return e.tagName.toUpperCase();
  }
}

function ObjectGen(e) {
  var s = e.textContent.trim();

  if (s === "") {
    if (e.getAttribute('value')) {
      return e.getAttribute('value');
    }

    if (e.getAttribute('aria-label')) {
      return e.getAttribute('aria-label');
    }

    if (e.getAttribute('placeholder')) {
      return e.getAttribute('placeholder');
    }

    if (e.getAttribute('title')) {
      return e.getAttribute('title');
    }

    if (e.getAttribute("name")) {
      return e.getAttribute("name");
    }

    if (e.id !== "") {
      return e.id;
    }

    if (e.className !== "") {
      return e.className;
    }

    if (e.getAttribute("type")) {
      return e.getAttribute("type");
    }
  } else {
    var punctuationless = s.replace(/[.,\/#!$%\^&\*;:<>{}=\-_`~()]/g, "");
    var finalString = punctuationless.replace(/\s{2,}/g, " ");
    var finalString = finalString.replace(/ /g, '').substring(0, 15); /// console.log("Final String",finalString)

    return finalString.trim();
  }
}

function isHidden(el) {
  return el.offsetParent === null;
}

function getPathToFailed(element) {
  if (element.id !== "") {
    return "//*[@id='" + element.id + "']";
  }

  if (element === DOCUMENT.body) {
    return element.tagName.toLowerCase();
  }

  var ix = 0;
  var siblings = element.parentNode.childNodes;

  for (var i = 0; i < siblings.length; i++) {
    var sibling = siblings[i];

    if (sibling === element) {
      if (getPathToFailed(element.parentNode) === 'body') {
        return 'html/' + getPathToFailed(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
      } else {
        return getPathToFailed(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
      }
    }

    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
}

function getPathTo(element) {
  if (element === DOCUMENT.body) {
    return element.tagName.toLowerCase();
  } else {
    for (a = 0; a < attribute_list.length; a++) {
      if (element.getAttribute(attribute_list[a])) {
        return "//*[@" + attribute_list[a] + "='" + element.getAttribute(attribute_list[a]) + "']";
      }
    }
  }

  var ix = 0;
  var siblings = element.parentNode.childNodes;

  for (var i = 0; i < siblings.length; i++) {
    var sibling = siblings[i];

    if (sibling === element) {
      if (getPathTo(element.parentNode) === 'body') {
        return 'html/' + getPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
      } else {
        return getPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
      }
    }

    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
}

function getPageXY(element) {
  var x = 0,
      y = 0;

  while (element) {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  }

  return [x, y];
}

function getElementsByXPath(xpath, parent) {
  var results = [];
  console.log("DOCC",DOCUMENT.title,xpath)
  var query = DOCUMENT.evaluate(xpath, parent || DOCUMENT, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var _i = 0, length = query.snapshotLength; _i < length; ++_i) {
    results.push(query.snapshotItem(_i));
  }

  return results;
} ///FOR COLLECTION TAGS AND ATTRIBUTES  ///  


var Iframe_element = [];
var ALL = [];
var attributes = [];
var tags = [];
var attribute_list = [];
var rejected_tags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'NOFRAME', 'TRACK', 'VIDEO', 'FONT', 'EVENTSOURCE', 'RECT', 'PATH', 'path', 'circle','TR','TBODY','TABLE','DIV','HR','SMALL','BR','LINK','OL'];
var rejected_attributes = ['style', 'align', 'allow', 'autocapitalize', 'autocomplete', 'autofocus', 'autoplay', 'bgcolor', 'border', 'buffered', 'charset', 'checked', 'color', 'cols', 'colspan', 'contenteditable', 'controls', 'crossorigin', 'decoding', 'disabled', 'download', 'draggable', 'hidden', 'spellcheck', 'tabindex', 'translate', 'height', 'maxlength', 'max', 'min', 'sandbox', 'rowspan', 'width', 'size', 'aria-haspopup', 'aria-expanded', 'aria-labelledby', 'aria-label', 'datetime', 'aria-hidden', 'focusable', 'id', 'class', 'd'];
var rejected_event_attributes = [];
function includes(container, value) {
	var returnValue = false;
	var pos = container.indexOf(value);
	if (pos >= 0) {
		returnValue = true;
	}
	return returnValue;
}
function Main(elements) {
  ////var elements=DOCUMENT.body.getElementsByTagName("*");
  for (var e = 0; e < elements.length; e++) {
    var el = elements[e];

    

    var tag = el.tagName;

    if (!includes(rejected_tags,tag) && !includes(tags,tag)) {
      tags.push(tag);
    }
  }
attributes=["id","class","type","title","src","href","value","placeholder"];
  
  console.log(attributes, tags); ////******************************/

  var results = 'False';
  var XPATHS = [];
  var INSERTED_ELEMENTS = [];
  X = '';
  var guessable_elements = tags;
  attribute_list = attributes;
  var elements = DOCUMENT.body.getElementsByTagName("*");
console.log(elements.length)
  for (var e = 0; e < elements.length; e++) {
    try {
      if (includes(guessable_elements,elements[e].tagName) && !elements[e].hasAttribute("type") || elements[e].hasAttribute("type") && elements[e].type !== "hidden" && elements[e].type !== "HIDDEN" && elements[e] !== null&&!includes(INSERTED_ELEMENTS,elements[e])) {
        if (elements[e].tagName === "IFRAME") {
          Iframe_element.push(elements[e]);
        }
      if(ALL.length===500){

        return ALL;
      }
        for (attr = 0; attr < attribute_list.length; attr++) {
          ///console.log("ATTR",attribute_list[attr],elements[e].hasAttribute(attribute_list[attr]))
          if (elements[e].hasAttribute(attribute_list[attr])) {
            ///console.log(attribute_list[attr])
            var X = guess_xpath(elements[e].tagName, attribute_list[attr], elements[e]); ///console.log(X);

            var locator = getElementsByXPath(X);

            if (locator.length === 1) {
              ///console.log(locator[0].tagName)
              var TEXT = check_div(elements[e]);

              if (TEXT.trim() !== "" && !isHidden(locator[0])) {
                var results = 'True';
                break;
              }
            } ///console.log( getElementsByXPath(X) );
            if (locator.length > 1){
              for(l=0;l<locator.length;l++){


                if(locator[l]==elements[e]){

                  X="("+X+")"+"["+String(l+1)+"]"
                  var results='True';
                  break;




                }
                
              }



            }

          }
        }

        if (results == 'True' && X !== '') {
          if (!includes(INSERTED_ELEMENTS,elements[e])) {
            INSERTED_ELEMENTS.push(elements[e]);
            var Obj = elements[e].tagName.toLowerCase() + "_" + ObjectGen(elements[e]);
            var TAG = TagGen(elements[e]);
            var Z = {
              "XPATH": X,
              "TEXT": elements[e].textContent.trim(),
              "OBJ": Obj,
              "TAG": TAG
            };
            Z = GetNodesvalues(elements[e], Z);
            ALL.push(Z);
            X = '';
            results = 'False';
          }
        } else {
        /// console.log(elements[e]);
          var TEXT = check_div(elements[e]);

          if (TEXT.trim() !== "" && !isHidden(elements[e])) {
            X = getPathTo(elements[e]);

            if (!X.endsWith("']") && !X.substring(0, 4) == 'html') {
              var PARENT = X.split("']")[0] + "']";
              var TAIL = X.split("/").slice(-1)[0].split("[")[0];
              var PARENT_TAIL = PARENT + "//" + TAIL;
              var locator = getElementsByXPath(PARENT_TAIL);

              if (locator.length === 1) {
                X = PARENT_TAIL;
                var Obj = elements[e].tagName.toLowerCase() + "_" + ObjectGen(elements[e]);
                var TAG = TagGen(elements[e]);
                var Z = {
                  "XPATH": X,
                  "TEXT": elements[e].textContent.trim(),
                  "OBJ": Obj,
                  "TAG": TAG
                };

                if (!includes(INSERTED_ELEMENTS,elements[e])) {
                  Z = GetNodesvalues(elements[e], Z);
                  ALL.push(Z);
                  INSERTED_ELEMENTS.push(elements[e]);
                  X = '';
                  results = 'False';
                }
              } else {
                if (PARENT_TAIL in freq_dict) {
                  inde = freq_dict[PARENT_TAIL];
                  freq_dict[PARENT_TAIL] = inde + 1;
                  X = "(" + PARENT_TAIL + ")[" + String(inde) + "]";
                } else {
                  freq_dict[PARENT_TAIL] = 1;
                  X = "(" + PARENT_TAIL + ")[" + String(1) + "]";
                } ///console.log("PARENT TAIL",X)


                var Obj = elements[e].tagName.toLowerCase() + "_" + ObjectGen(elements[e]);
                var TAG = TagGen(elements[e]);
                var Z = {
                  "XPATH": X,
                  "TEXT": elements[e].textContent.trim(),
                  "OBJ": Obj,
                  "TAG": TAG
                };

                if (!includes(INSERTED_ELEMENTS,elements[e])) {
                  Z = GetNodesvalues(elements[e], Z);
                  ALL.push(Z);
                  INSERTED_ELEMENTS.push(elements[e]);
                  X = '';
                  results = 'False';
                }
              }
            } else {
              PX = getPathToFailed(elements[e]);

              if (PX.substring(0, 4) == 'html') {
                var X = PX;
                var Obj = elements[e].tagName.toLowerCase() + "_" + ObjectGen(elements[e]);
                var TAG = TagGen(elements[e]);
                var Z = {
                  "XPATH": X,
                  "TEXT": elements[e].textContent.trim(),
                  "OBJ": Obj,
                  "TAG": TAG
                };

                if (!includes(INSERTED_ELEMENTS,elements[e])) {
                  Z = GetNodesvalues(elements[e], Z);
                  ALL.push(Z);
                  INSERTED_ELEMENTS.push(elements[e]);
                  X = '';
                  results = 'False';
                }
              } else {
                var PARENT_ABS = PX.split("']")[0] + "']";
                var PARENT_ABSO = X.split("']")[0] + "']";
                var MERGED = PARENT_ABS + PARENT_ABSO; /////console.log("PFailed Initiallly",MERGED)

                locator = getElementsByXPath(MERGED);

                if (locator.length === 1) {
                  X = "(" + MERGED + ")[" + String(1) + "]";
                  var Obj = locator[0].tagName.toLowerCase() + "_" + ObjectGen(locator[0]);
                  var TAG = TagGen(locator[0]);
                  var Z = {
                    "XPATH": X,
                    "TEXT": locator[0].textContent.trim(),
                    "OBJ": Obj,
                    "TAG": TAG
                  };

                  if (!includes(INSERTED_ELEMENTS,locator[0])) {
                    Z = GetNodesvalues(locator[0], Z);
                    ALL.push(Z);
                    INSERTED_ELEMENTS.push(locator[0]);
                    X = '';
                    results = 'False';
                  }
                } else {
                  if (MERGED in freq_dict) {
                    inde = freq_dict[MERGED];
                    freq_dict[MERGED] = inde + 1;
                    X = "(" + MERGED + ")[" + String(inde + 1) + "]";
                  } else {
                    freq_dict[MERGED] = 1;
                    X = "(" + MERGED + ")[" + String(1) + "]";
                  }

                  var Obj = elements[e].tagName.toLowerCase() + "_" + ObjectGen(elements[e]);
                  var TAG = TagGen(elements[e]); /// console.log("PARENT TAIL",X)

                  var Z = {
                    "XPATH": X,
                    "TEXT": elements[e].textContent.trim(),
                    "OBJ": Obj,
                    "TAG": TAG
                  };

                  if (!includes(INSERTED_ELEMENTS,elements[e])) {
                    Z = GetNodesvalues(elements[e], Z);
                    ALL.push(Z);
                    INSERTED_ELEMENTS.push(elements[e]);
                    X = '';
                    results = 'False';
                  }
                }
              }
            } //*********************************************************** */

          }
        }
      }
    } catch (err) {
      console.log(err)
    }
  } ///    console.log(Iframe_element);

}

function guess_xpath(tag, attr, element) {
  var attr2 = element.getAttribute(attr);

  if (String(attr2).length > 25) {
    var XPATH = "//" + tag.toLowerCase() + "[contains(@" + attr + ",'" + attr2.substring(0, 25) + "')]";
  } else {
    var XPATH = '//' + tag.toLowerCase() + "[@" + attr + "='" + attr2 + "']";
  }

  return XPATH;
}

Main(DOCUMENT.body.getElementsByTagName("*")); ///console.log(ALL)

for (var k = 0; k < Iframe_element.length; k++) {
  try {
    Iframe_name = ObjectGen(Iframe_element[k]);
    Iframe_Xpath = getPathTo(Iframe_element[k]);
    Iframe_web = DOCUMENT.title.substring(0, 70);
    DOCUMENT = Iframe_element[k].contentWindow.document;
    var script_tag = DOCUMENT.createElement('script');
    script_tag.type = 'text/javascript';
    script_tag.text = ms;

    DOCUMENT.getElementsByTagName('head')[0].appendChild(script_tag);
   
      
      Main(Iframe_element[k].contentWindow.document.body.getElementsByTagName("*"));
   
    
  } catch (err) {
    console.log("Pass Iframe",err);
  }
}
console.log("Completed",ALL)
sessionStorage.setItem("DATA", JSON.stringify(ALL));
////console.log(ALL)
return ALL;
