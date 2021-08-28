function doGet(e) {
  if (!e.parameter.page) {
    var template = HtmlService.createTemplateFromFile('index')
    return  template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width , initial-scale=1')
  }
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width , initial-scale=1')
}


function getUrl() {
  var url = ScriptApp.getService().getUrl()
  return url
}

function uploadFiles(form) {
  try {
    var folderDes = DriveApp.getFolderById('xxx')     // แก้ไข
    var subFolder = form.myLecturer
    var folder, folders = DriveApp.getFoldersByName(subFolder);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = folderDes.createFolder(subFolder);
    }
    var home = "xxx";  // แก้ไข
        
    var file = folder.createFile(form.myFile);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.COMMENT);
    var url = file.getUrl()
    var lecturer = form.myLecturer
    var leader = form.myleader
    var projectTitle = form.myProjectTitle
    var numGroup = form.myNumGroup
    var email = form.myEmail
    var telephone = form.myTelephone
    
    // ** changeUrl for spreadsheet **
    var ss = SpreadsheetApp.openById("xxx");    // แก้ไข
    var sh = ss.getSheetByName('sheet1')
    ss.appendRow([new Date(), lecturer, leader, projectTitle, numGroup, email, telephone, url])
    return  "ข้อมูลของ.." + leader + " ทำโปรเจ็คเรื่อง " + projectTitle+ " ได้ถูกอัพโหลดเข้าระบบเป็นที่เรียบร้อยแล้ว ขอบคุณครับ  <p><p><a href ='"+url+"' ><button>คลิกดูงานที่ส่ง</button></a> <p><a href ='"+home+"' ><button>กลับหน้าหลัก</button></a>"   
  } catch (error) {
    return error.toString();
  }

}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}


// Function for Searching 
function processForm(formObject){  
  var result = "";
  if(formObject.searchtext){
      result = search(formObject.searchtext);
  }
  return result;
}

function search(searchtext){
  var spreadsheetId = '1SVHsz6prrdZafyi3lmlfBdgjc6nGmFQSzpWt-43j_wc';
  var dataRage  = 'sheet1!A2:G';
  var data = Sheets.Spreadsheets.Values.get(spreadsheetId, dataRage).values;
  var ar = [];
  
  data.forEach(function(f) {
    if (~f.indexOf(searchtext)) {
      ar.push(f);
    }
  });
  return ar;
}
