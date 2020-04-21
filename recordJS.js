

    
  
SetFooter()

function SetFooter(){
    
  if (!document.head.contains(document.getElementById("style_id"))) {
    var css = `.my_foot {
       position: fixed;
       left: 0;
       bottom: 0;
       width: 100%;
       height:auto;
       background-color: #222533;
       color: white;
       font-weight: bold;
       box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
       z-index:9999;
    }`,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.setAttribute("id","style_id")
    head.appendChild(style);
    
    
    style.type = 'text/css';
    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    }
      var btn = document.createElement("DIV");
      btn.innerText=" Object Picker ";
      btn.setAttribute("class", "my_foot");
      btn.setAttribute("id", "my_foot_id");
      if(!document.body.contains(document.getElementById("my_foot_id"))){
      document.body.appendChild(btn);
      }
    
}
function isClickable(e){
    if(e.tagName==="I"||e.tagName==="SPAN"||e.tagName==="BUTTON"||e.tagName==="A"||e.tagName==="LABEL"||e.tagName==="IMG"||e.tagName==="SVG"||e.tagName==="DIV"||e.type==="button"||e.type==="submit"||e.hasAttribute("onclick")){

        return true;

    }
    else{
        return true;
    }



}
function check_div(e){
    if(e.tagName==='DIV'){
            var TEXT=[].reduce.call(e.childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, '');
              }
              if(e.tagName==='IMG'){
                  var TEXT="IMG"



              }
              if(e.tagName==='INPUT'||e.tagName==="TEXTAREA"||e.tagName==="SVG"||e.tagName==="IFRAME"||e.tagName==="CANVAS"||e.tagName==="SELECT"){

                var TEXT="INPUT"


              }
              else{
                var TEXT=[].reduce.call(e.childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, '');
              }
    return TEXT;
    
    }
    function TagGen(e){


        if(e.getAttribute("type")==="checkbox"){

            return "CHECKBOX"


        }
        if(e.getAttribute("type")==="radio"){
            return "RADIO"


        }
        if(e.getAttribute("type")==="submit"){
            return "BUTTON"


        }
        if(e.getAttribute("type")==="button"){
            return "BUTTON"


        }
        else{
            return e.tagName.toUpperCase();
        }

        

    }
    function ObjectGen(e){
       var s=e.textContent.trim()
       if(s===""){
            if(e.getAttribute('value')){
            return e.getAttribute('value');
            }
            if(e.getAttribute('aria-label')){
                return e.getAttribute('aria-label');
                }
                if(e.getAttribute('placeholder')){
                    return e.getAttribute('placeholder');
                    }
            
            if(e.getAttribute('title')){
                return e.getAttribute('title');
            }
            if(e.getAttribute("name")){
                return e.getAttribute("name");
            }
            if(e.id!==""){
                return e.id
            }
            
            
            if(e.className!==""){
                return e.className;
            }
            if(e.getAttribute("type")){
                return e.getAttribute("type");
            }

       }
       else{
        var punctuationless = s.replace(/[.,\/#!$%\^&\*;:<>{}=\-_`~()]/g,"");
        var finalString = punctuationless.replace(/\s{2,}/g," ");
        var finalString=finalString.replace(/ /g,'').substring(0,15);
       /// console.log("Final String",finalString)
        return finalString.trim();}


    }
    function isHidden(el) {
        return (el.offsetParent === null)
    }

    function getPathToFailed(element) {
        ///PXconsole.log("FAIL TITLE",document.title);
       
        
        if(element.id!==""){
            return "//*[@id='"+element.id+"']"
        }
        if (element===document.body){
        
            return element.tagName.toLowerCase();
        }
        


        
        
    
        var ix= 0;
        var siblings= element.parentNode.childNodes;
        for (var i= 0; i<siblings.length; i++) {
            var sibling= siblings[i];
            
            if (sibling===element){
            
            if(getPathToFailed(element.parentNode)==='body'){
                return 'html/'+getPathToFailed(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
            }
            else{
            return getPathToFailed(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
    
            }
    
            }
            
            if (sibling.nodeType===1 && sibling.tagName === element.tagName) {
                ix++;
            }
        }
    }
    function getPathTo(element) {
       
        
        
        if (element===document.body){
        
            return element.tagName.toLowerCase();
        }
        else{

            for(a=0;a<attribute_list.length;a++){
                if(element.getAttribute(attribute_list[a])){
                    

                   

                        return "//*[@"+attribute_list[a]+"='"+element.getAttribute(attribute_list[a])+"']"
                    

                    
                }


            }
            
        }
    
        var ix= 0;
        var siblings= element.parentNode.childNodes;
        for (var i= 0; i<siblings.length; i++) {
            var sibling= siblings[i];
            
            if (sibling===element){
            
            if(getPathTo(element.parentNode)==='body'){
                return 'html/'+getPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
            }
            else{
            return getPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
    
            }
    
            }
            
            if (sibling.nodeType===1 && sibling.tagName === element.tagName) {
                ix++;
            }
        }
    }
    
    function getPageXY(element) {
        var x= 0, y= 0;
        while (element) {
            x+= element.offsetLeft;
            y+= element.offsetTop;
            element= element.offsetParent;
        }
        return [x, y];
    }
    function getElementsByXPath(xpath, parent)
    {
        let results = [];
        let query = document.evaluate(xpath, parent || document,
            null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0, length = query.snapshotLength; i < length; ++i) {
            results.push(query.snapshotItem(i));
        }
        return results;
    }
    ///FOR COLLECTION TAGS AND ATTRIBUTES  ///  
   var attributes=[];
   var tags=[];
   
   var rejected_tags=['SCRIPT','STYLE','NOSCRIPT','NOFRAME','TRACK','VIDEO','FONT','EVENTSOURCE','RECT','PATH','path','circle'];
   
   var rejected_attributes=['style','align','allow','autocapitalize','autocomplete','autofocus','autoplay','bgcolor','border','buffered','charset','checked','color','cols','colspan','contenteditable','controls','crossorigin','decoding','disabled','download','draggable','hidden','spellcheck','tabindex','translate','height','maxlength','max','min','sandbox','rowspan','width','size','aria-haspopup','aria-expanded','aria-labelledby','aria-label','datetime','aria-hidden','focusable','data','data-ga','data-google-query-id','onclick','onabort', 'onautocomplete', 'onautocompleteerror', 'onblur', 'oncancel', 'oncanplay', 'oncanplaythrough', 'onchange', 'onclick', 'onclose', 'oncontextmenu', 'oncuechange', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragexit', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange', 'onemptied', 'onended', 'onerror', 'onfocus', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onpause', 'onplay', 'onplaying', 'onprogress', 'onratechange', 'onreset', 'onresize', 'onscroll', 'onseeked', 'onseeking', 'onselect', 'onshow', 'onsort', 'onstalled', 'onsubmit', 'onsuspend', 'ontimeupdate', 'ontoggle', 'onvolumechange', 'onwaiting','d','title'];

var elements=document.body.getElementsByTagName("*");
    for(e=0;e<elements.length;e++){
            var el=elements[e];
        for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++){
            if(!rejected_attributes.includes(atts[i].nodeName)&&!/^\d+$/.test(atts[i].nodeValue)&&atts[i].nodeValue!=='true'&&atts[i].nodeValue!=='false'&&atts[i].nodeValue.toLowerCase!=='both'&&!attributes.includes(atts[i].nodeName)&&atts[i].nodeValue.length<60&&atts[i].nodeValue.trim()!==""){
            attributes.push(atts[i].nodeName);
            }
         }
        var tag=el.tagName;
        if(!rejected_tags.includes(tag)&&!tags.includes(tag)){
                tags.push(tag);
            }

      }
    attributes.unshift("id", "class");
  ///  console.log(attributes,tags);

////******************************/
var freq_dict={};
var inde=0;
    var results='False';
    var ALL=[];
    var XPATHS=[];
    var INSERTED_ELEMENTS=[];
    X=''
    var guessable_elements = tags;
    var attribute_list = attributes;
   
//############################RECORD MAINN XPATH#########################################///
    function Main(ELE){
    
        var elements=[ELE];
        
        
        
        for (e=0;e<elements.length;e++){
            try{
            if(guessable_elements.includes(elements[e].tagName)&&!elements[e].hasAttribute("type")||(elements[e].hasAttribute("type")&&elements[e].type!=="hidden"&&elements[e].type!=="HIDDEN")&&elements[e]!==null){
            for (attr=0;attr<attribute_list.length;attr++){
                
                if(elements[e].hasAttribute(attribute_list[attr])){
    
    
    
                ///console.log(attribute_list[attr])
                var X=guess_xpath(elements[e].tagName,attribute_list[attr],elements[e])
                ///console.log(X);
                var locator=getElementsByXPath(X);
                if (locator.length===1){
                ///console.log(locator[0].tagName)
                
               var TEXT=check_div(elements[e]);
                
                if(TEXT.trim()!==""&&!isHidden(locator[0])){
                var results='True';
                break;
                }
                }
                ///console.log( getElementsByXPath(X) );
    
                }
    
                }
    
    
            if (results=='True'&&X!==''){
                
                if(!INSERTED_ELEMENTS.includes(elements[e])){
                INSERTED_ELEMENTS.push(elements[e]);
                var Obj=elements[e].tagName.toLowerCase()+"_"+ObjectGen(elements[e])
                

                var TAG=TagGen(elements[e])
                var Z={"XPATH":X,"TEXT":elements[e].textContent.trim(),"OBJ":Obj,"TAG":TAG}
               
            ALL.push(Z);
            X=''
            results='False'}
            
    
    
            }
            else{
            ///console.log(elements[e]);
            var TEXT=check_div(elements[e]);
            if(TEXT.trim()!==""&&!isHidden(elements[e])){
            
            X=getPathTo(elements[e])
           
            if(!X.endsWith("']")&&!X.startsWith("html")){
                var PARENT=X.split("']")[0]+"']"    
                
                var TAIL=X.split("/").slice(-1)[0].split("[")[0] ;
                var PARENT_TAIL=PARENT+"//"+TAIL;
                var locator=getElementsByXPath(PARENT_TAIL);
    
                if(locator.length===1){
              
                X=PARENT_TAIL;
              
                var Obj=elements[e].tagName.toLowerCase()+"_"+ObjectGen(elements[e])
                var TAG=TagGen(elements[e])
                var Z={"XPATH":X,"TEXT":elements[e].textContent.trim(),"OBJ":Obj,"TAG":TAG}
                if(!INSERTED_ELEMENTS.includes(elements[e])){
                ALL.push(Z);
                INSERTED_ELEMENTS.push(elements[e])
                X=''
                results='False'}
                }
                else{
                    for(l=0;l<locator.length;l++){
                        if(locator[l]===elements[e]){
                        X="("+PARENT_TAIL+")["+String(l+1)+"]";
                        
                        var Obj=locator[l].tagName.toLowerCase()+"_"+ObjectGen(locator[l])
                        var TAG=TagGen(locator[l])
                         var Z={"XPATH":X,"TEXT":locator[l].textContent.trim(),"OBJ":Obj,"TAG":TAG}
                         if(!INSERTED_ELEMENTS.includes(locator[l])){
                        ALL.push(Z);
                        
                        INSERTED_ELEMENTS.push(locator[l])
                        X=''
                        results='False'}
                    }
                }




                }
            
            















































            
            }
            else{
                PX=getPathToFailed(elements[e])
                //console.log("PX",PX)
                if(PX.startsWith("html")){
                    
                    var X=PX;
                   
                    var Obj=elements[e].tagName.toLowerCase()+"_"+ObjectGen(elements[e])
                    
                    var TAG=TagGen(elements[e])
                    
                    var Z={"XPATH":X,"TEXT":elements[e].textContent.trim(),"OBJ":Obj,"TAG":TAG}

                    if(!INSERTED_ELEMENTS.includes(elements[e])){
                    ALL.push(Z);
                    INSERTED_ELEMENTS.push(elements[e])
                    X=''
                    results='False'}


                }
                

                else{

                    
                    var PARENT_ABS=PX.split("']")[0]+"']"
                    var PARENT_ABSO=X.split("']")[0]+"']"
                    var MERGED=PARENT_ABS+PARENT_ABSO
                    console.log("PFailed Initiallly",MERGED,elements[e],document.title)
                    
                  
                    locator=getElementsByXPath(MERGED);
                   console.log(locator.length)
                    
                        for(l=0;l<locator.length;l++){
                            if(locator[l]===elements[e]){
                        X="("+MERGED+")["+String(l+1)+"]";
                        
                        
                        var Obj=locator[l].tagName.toLowerCase()+"_"+ObjectGen(locator[l])
                        var TAG=TagGen(locator[l])
                         var Z={"XPATH":X,"TEXT":locator[l].textContent.trim(),"OBJ":Obj,"TAG":TAG}
                         if(!INSERTED_ELEMENTS.includes(locator[l])){
                        ALL.push(Z);
                        INSERTED_ELEMENTS.push(locator[l])
                        X=''
                        results='False'}
                    }
                } 
                    
                }


                   
                   
                    

            }
            //*********************************************************** */
        }
    
    
            }
    
            }}
            catch(err){
                console.log("Q-MatePro Says: ",err,elements[e],freq_dict)
            }
            
    
    
        }
        
       
    function guess_xpath(tag,attr,element){
    
    
    
    var attr2=element.getAttribute(attr)
   
    
    
    
    
    if(attr==="href"){
        
        var XPATH="//"+tag.toLowerCase()+"[contains(@"+attr+",'"+attr2.substring(0,25)+"')]"

    }
    else{
    var XPATH='//'+tag.toLowerCase()+"[@"+attr+"='"+attr2+"']"
    }
    return XPATH;
    }
   /// console.log(ALL);
    
    return ALL;
}
//############################END#########################################///
function getDomPath(el,Xpath) {
   var P= sessionStorage.getItem("IFRAME")?`Iframe-`+sessionStorage.getItem("IFRAME_NAME"):`Page-`+document.title.substring(0,40);
   var B= sessionStorage.getItem("IFRAME")?`Browser-`+sessionStorage.getItem("IFRAME_WEB"):`Browser-`+document.title.substring(0,40);
   var Iframe_Xpath= sessionStorage.getItem("IFRAME")?sessionStorage.getItem("IFRAME"):" ..."
    var html=`<h5 align="center"><b>Object Hierarchy</b></h5> <div style="color:#FF1493">  <ul class="tree">
    <li>
      <input type="checkbox" checked="checked" id="c1" />
      <label class="tree_label" for="c1"><i class="fa fa-globe"></i>`+B+`</label>
      <ul>
        <li>
          <input type="checkbox" checked="checked" id="c2" />
          
          <label class="tree_label" for="c2"><i class="fa fa-file"></i>`+P+` </label>
          <ul>
          <li>
            <input type="checkbox" checked="checked" id="c5" />
            <label for="c5" class="tree_label">Parent-`+ObjectGen(el.parentNode)+`</label>
            <ul>
              <li><span class="tree_label"><i class="fa fa-pencil"></i> WebElement-`+ObjectGen(el)+`</span></li>
            
            </ul>
          </li>
         
        
        </ul>



        </li>



      </ul>
    </li>
    
    
   
  </ul>
  </div>
    `


    html+=`<hr><h5 align="center"><b>Xpath Hierarchy</b></h5> <div style="color:#6A55C2">  <ul class="tree">
    <li>
      <input type="checkbox" checked="checked" id="c1" />
      <label class="tree_label" for="c1"><i class="fa fa-globe"></i>`+B+`</label>
      <ul>
        <li>
          <input type="checkbox" checked="checked" id="c2" />
          
          <label class="tree_label" for="c2"> `+Iframe_Xpath+` </label>
          <ul>
              <li><span class="tree_label"> `+Xpath+`</span></li>
            
            </ul>



        </li>



      </ul>
    </li>
    
    
   
  </ul>
  </div>
    `
   return html;
  }
function GetNodesvalues(el,data){


    var nodes=[], values=[];
    nodes.push("Text","Tag")
    values.push(data["TEXT"],data["TAG"])

    for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++){
        att = atts[i];
        nodes.push(att.nodeName);
        values.push(att.nodeValue);
    }
    
data["NODES"]=nodes;
data["VALUES"]=values;
var data=GetStyles(el,data);
data=getOperation(el,data);

data["HIERARCHY"]=getDomPath(el,data["XPATH"]);
return data;
}
function GetStyles(el,data){


    var nodes=[], values=[];
    var styles=window.getComputedStyle(el)
    for(i=0;i<styles.length;i++){
        
        nodes.push(styles[i]);
        var value='';
        if(styles.getPropertyValue(styles[i]).startsWith("rgb")){

            value=styles.getPropertyValue(styles[i]);
        }
        else{
            value=styles.getPropertyValue(styles[i]);
        }
   
        values.push(value);
    }
data["STYLE_NODES"]=nodes;
data["STYLE_VALUES"]=values;
return data;
}
function getOperation(el,data){
    var ops=[];
    var vals=[]
    if(el.tagName==="INPUT"||el.tagName==="TEXTAREA"){
        ops.push("sendKeys(String input);","click();","keyDown(WebElement target, java.lang.CharSequence key)","keyUp(java.lang.CharSequence key)");
        vals.push("Sends keys to the active element.","Clicks at the current mouse location.","Performs a modifier key press.","Performs a modifier key release.")
    }
    else{


        ops.push("click()","clickAndHold()","doubleClick()","dragAndDrop(WebElement source, WebElement target)");
        vals.push("Clicks at the current mouse location.","Clicks (without releasing) at the current mouse location.","Performs a double-click at the current mouse location.","For dargging and dropping element")
    }
    data["OPERATIONS"]=ops;
    data["OPERATIONS_VALUES"]=vals;
    return data;


}


var elem='';
document.body.addEventListener("click", ClickListenner);

document.body.addEventListener('mouseover', MouseInListenerFunction,true);
    document.body.addEventListener('mouseout', MouseOutListenerFunction,true);


    function MouseInListenerFunction(event){
       if(event.target.tagName==="IFRAME"){

        sessionStorage.setItem("IFRAME", getPathTo(event.target));
    
        sessionStorage.setItem("IFRAME_NAME", ObjectGen(event.target));
        sessionStorage.setItem("IFRAME_WEB", document.title.substring(0,70));
       //// document= event.target.contentWindow.document;
  


       }
        event.target.style.border = '0.2em solid #0066cc';
        var FOOT="<p><b>Object: </b>"+ObjectGen(event.target)+" <b>Absolute Xpath: </b>"+getPathTo(event.target);
        var el=event.target;
        for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++){
            att = atts[i];
            
            FOOT+=" <b>"+att.nodeName+": </b> "+att.nodeValue
            
        }
        FOOT+="</p>"
        
        ///document.getElementById("my_foot_id").innerHTML=FOOT
     
        
        }
        function MouseOutListenerFunction(event){
            if(event.target.tagName==="IFRAME"){

                event.target.contentWindow.document.body.removeEventListener("click", ClickListenner);
        
                event.target.contentWindow.document.body.removeEventListener('mouseover', MouseInListenerFunction,true);
                event.target.contentWindow.document.body.removeEventListener('mouseout', MouseOutListenerFunction,true);
        
                
                sessionStorage.setItem("IFRAME", "");
                sessionStorage.setItem("IFRAME_NAME", "");
                sessionStorage.setItem("IFRAME_WEB", "");
             ///   document= parent.document;
        
               }
            event.target.style.border = '';
           
            }
function ClickListenner(event){
    if(isClickable(event.target)){
    if(event.target.hasAttribute('href')){
        
        event.preventDefault();
        var Xpath=Main(event.target);
     
      
console.log("Xpath:::",Xpath[0])

   var data=Xpath[0]
var data=GetNodesvalues(event.target,data);

sessionStorage.setItem("element", JSON.stringify(data));
var delayInMilliseconds = 1000; //1 second

setTimeout(function() {
   
    window.location.href = event.target.getAttribute('href');
}, delayInMilliseconds);
}
else{
    
   var Xpath=Main(event.target);
   
    
   var data=Xpath[0]
    var data=GetNodesvalues(event.target,data);

    
    
    sessionStorage.setItem("element", JSON.stringify(data));
    }
}
    }
    
   /// sessionStorage.setItem("element", String(getPathToFailed(event.target)));














    var X=sessionStorage.getItem("element");

    console.log("XX",X)
    if (X){
    sessionStorage.setItem("element", "");
    }

    return X;


////RETURNINGGGGGGGGGGGGGG