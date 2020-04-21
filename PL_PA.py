import selenium
import ast
from selenium import webdriver  # Import from seleniumwire
from ast import literal_eval
import json
#from selenium.webdriver.chrome.options import Options
driver=''
req=[]


recordJs=open("wgxpath.install.js").read()+open("recordJS.js").read()

ext_tuple=('.mp3', '.avi','.js','.css','.less','.scss','.png','.ico','.txt','.ini','.jpg','.mp4','xls','.doc','xlsx','.ppt','.pptx','.docx','.json','.java','.as','.mx','.asp','.ts','.jsp','.svg','.php','.xml','.xaml',
          '.yml' ,'.woff2','.jpeg')

def stop():
    global driver
   
    JS="""

    console.log("s")
localStorage.setItem("STOP", "TRUE");

console.log("STOPPED",localStorage.getItem("STOP"));
    """
    driver.execute_script(JS)
    print("STOPPED")
    driver.add_cookie({'name': 'STOP', 'value': 'TRUE'})
    return "STOPPED"

def initiate_driver(url):
    global driver
    #options = webdriver.ChromeOptions()
    #options.add_experimental_option('debuggerAddress', 'localhost:9014')
    #url = "http://localhost:4567/wd/hub"
    driver = webdriver.Ie()
    driver.get(url)
def locate_all_iframes(driver,xpath,op):
    iframes = driver.find_elements_by_xpath("//iframe")
    element=None
    for index, iframe in enumerate(iframes):
        
        driver.switch_to.frame(index)
        try:
            element=driver.find_element_by_xpath(xpath)
            if op=="ADD":
                driver.execute_script("arguments[0].style.border = '0.4em solid yellow';",element)
            if op=="REMOVE":
                driver.execute_script("arguments[0].style.border = '';",element)
        
           

            
        except:
            pass
        locate_all_iframes(driver,xpath,op)
        driver.switch_to.parent_frame()  
    if element is None:
        try:
            element=driver.find_element_by_xpath(xpath)
            if op=="ADD":
                driver.execute_script("arguments[0].style.border = '0.4em solid yellow';",element)
            if op=="REMOVE":
                driver.execute_script("arguments[0].style.border = '';",element)
            return element
        except:
            return None

    else:
        return element

def locate(xpath,LOCATED):

    global driver
    try:
        
        
        if LOCATED!="":
            try:
                element1=locate_all_iframes(driver,LOCATED,"REMOVE")
                
            except:
                element=locate_all_iframes(driver,xpath,"ADD")
                
        element=locate_all_iframes(driver,xpath,"ADD")
        
        
        return "PASS"
    except Exception as e:

        print(str(e))
       
        return "FAIL"
def find_all_iframes(driver,Xpath,data):
    iframes = driver.find_elements_by_xpath("//iframe")
    for index, iframe in enumerate(iframes):
        # Your sweet business logic applied to iframe goes here.
        driver.switch_to.frame(index)
        Xpath=driver.execute_script(open("wgxpath.install.js").read()+open("recordJS2.js").read())
        find_all_iframes(driver,Xpath,data)
        driver.switch_to.parent_frame()
    return Xpath,data
def Q_recorder():

    global driver
    global recordJs
    Xpath=None
    data={}
    driver.add_cookie({'name': 'STOP', 'value': 'FALSE'})
    try:
        #Xpath=driver.execute_script(open("wgxpath.install.js").read()+recordJs,"STARTED")
        #driver.switch_to.default_content()
        
        Xpath=driver.execute_script(open("wgxpath.install.js").read()+open("recordJS2.js").read())
        if Xpath is None:
            return find_all_iframes(driver,Xpath,data)
        
                
                        
    except Exception as e:
        print(str(e))
        driver.switch_to_window(driver.window_handles[-1])
        
    return Xpath,data
COOK='''




'''
def main():
    global driver
    
        
    #driver.switch_to.window()
    JS=open("wgxpath.install.js").read()+open('get_ALL2.js').read()
    event_attributes=open('event_attributes.txt').read().split(", ")
    print(driver.window_handles)
    driver.switch_to_window(driver.window_handles[-1])
    #driver.set_script_timeout(45)
    try:
        A=driver.execute_script(JS,event_attributes)
    except:
        print("timee")
        A=driver.execute_script("console.log('Timed Out..'); console.log(sessionStorage.getItem('DATA'));return sessionStorage.getItem('DATA');") 
        A=ast.literal_eval(A)
        #print(driver.get_cookies())
    print(A)  
    #JS11=open('smart_xpath.js').read()
    #driver.execute_script(JS11)
    #print(A)
    return A
def pageLocatorCreation(name,xpath):
    
    i = 0 
    L = "import org.openqa.selenium.WebElement;\n" 
    L+="import org.openqa.selenium.support.FindBy;\n"
    L+="import org.openqa.selenium.support.PageFactory;\n\n"
    L+="public class PageLocators {\n"
    length = len(name)
    while i < length:
        variableName=name[i].replace(' ','_')
        L+="\t@FindBy(xpath=\""+ xpath[i] + "\")\n"
        L+="\tpublic WebElement " + variableName + ";\n\n"
        i = i + 1
    L+="\tpublic PageLocators()\n\t{\n"
    L+="\tPageFactory.initElements(/*Please specify driver*/,this);\n\t}\n}"
    print(L)
    return L

def pageClassCreation(name,xpath):
    
    i = 0 
    
    L = "package pageobjects;\n" 
    L+="import automation.library.selenium.core.Element;\n"
    L+="import org.openqa.selenium.support.PageFactory;\n\n"
    L+="public class pageClass extends BaseP0 {\n"
    length = len(name)
    while i < length:
        variableName=name[i].replace(' ','_')
        L+='\tprivate By '+variableName+' = '+'By.xpath("'+xpath[i]+'");\n'
      
        i = i + 1
    L+="\n"
    i=0
    while i < length:
        variableName=name[i].replace(' ','_')
        
        L+="\tpublic Element " + variableName + "() throws IOException,InteruptedException\n\t{\n"
        L+="\t\treturn $("+variableName+");\n\t}\n"
        i = i + 1
    
    print(L)
    return L
def pageActionCreation(tag,name,xpath):
    objName="obj_PageLocators"
    L="import PageLocators.PageLocators;\n\n\n"
    L+="public class PageActions {\n\n"
    L+="\tPageLocators"+" "+objName+" =new PageLocators();\n\n"
    print(tag)
    for t in range(0,len(tag)):
        print(t,tag[t])
        
        if(tag[t]=="INPUT"or tag[t]=="TEXTAREA"):
            L+="\tpublic void method_"+name[t]+"(String data) throws InterruptedException(){\n"
            L+="\t\t"+objName+"."+name[t]+".sendKeys(data);\n"
            L+="\t}\n\n"
        elif(tag[t]=="SELECT"):
            L+="\tpublic void method_"+name[t]+"(value) throws InterruptedException(){\n"
            L+="\t\tSelect dropdown= new Select("+objName+"."+name[t]+");\n"
            L+="\t\tdropdown.selectByVisibleText(value);\n"
            L+="\t}\n\n"
        
            
        elif(tag[t]=="BUTTON" or tag[t]=="RADIO" or tag[t]=="CHECKBOX" or tag[t]=="A" ):

            L+="\tpublic void method_"+name[t]+"() throws InterruptedException(){\n"
            L+="\t\t"+objName+"."+name[t]+".click();\n"
        
            L+="\t}\n\n"
        else:
            L+="\tpublic void method_"+name[t]+"() throws InterruptedException(){\n"
            L+="\t\t"+objName+"."+name[t]+".getText();\n"
            L+="\t}\n\n"
        
    L+="}"
    return L


    
        

    
    
        
    