function doPost(e) {
  var ss = SpreadsheetApp.openById("<Google Sheet ID>");//แก้ไข
  var sheet = ss.getSheetByName("<Sheet Name>");//แก้ไข
  var requestJSON = e.postData.contents;
  var requestObj = JSON.parse(requestJSON).events[0];
  var token = requestObj.replyToken;
  
  if (requestObj.type === "follow") {
    var userId = requestObj.source.userId;
    var userProfiles = getUserProfiles(userId);
    
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1).setValue(userId);
    sheet.getRange(lastRow + 1, 2).setValue(userProfiles[0]);
    sheet.getRange(lastRow + 1, 3).setValue(userProfiles[1]);
    sheet.getRange(lastRow + 1, 4).setFormula("=image(C" + (lastRow + 1) + ")");
    
    var replyText = "สวัสดีคุณ "+ userProfiles[0] + ", ยินดีต้อนรับเข้าสู่การใช้งานบอตนะครับ!!!";//แก้ไข
    return replyMessage(token, replyText);
  }
  var userMessage = requestObj.message.text;
  var replyText = userMessage;
  return replyMessage(token, replyText);
}

function replyMessage(token, replyText) {
  var url = "https://api.line.me/v2/bot/message/reply";
  var lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <LINE OA Token>" //แก้ไข
  };

  var postData = {
    "replyToken" : token,
    "messages" : [{
      "type" : "text",
      "text" : replyText
    }]
  };

  var options = {
    "method" : "POST",
    "headers" : lineHeader,
    "payload" : JSON.stringify(postData)
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
  }
  
  catch (error) {
    Logger.log(error.name + "：" + error.message);
    return;
  }
    
  if (response.getResponseCode() === 200) {
    Logger.log("Sending message completed.");
  }
}
function getUserProfiles(userId) {
  var url = "https://api.line.me/v2/bot/profile/" + userId;
  var lineHeader = {
    "Content-Type": "application/json",
   "Authorization": "Bearer <Line OA Token>" //แก้ไข
  };
  
  var options = {
    "method" : "GET",
    "headers" : lineHeader
  };
  
  var responseJson = UrlFetchApp.fetch(url, options);
  var displayName = JSON.parse(responseJson).displayName;
  var pictureUrl = JSON.parse(responseJson).pictureUrl;
  
  return [displayName, pictureUrl];
}