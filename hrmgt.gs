// Code.gs, implement for Human Resource
// Collect employee leave activities (Sick leave, annual leave, private leave)

function doPost(e) {
  ssId = "<Google Sheet ID>";
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName("data1");
  const data = getTodayDateTime();

  //use BetterLog
  Logger = BetterLog.useSpreadsheet(ssId);

  var requestJSON = e.postData.contents;
  Logger.log(requestJSON);

  var requestObj = JSON.parse(requestJSON).events[0];
  var userMessage = requestObj.message.text;
  Logger.log(userMessage);

  var userId = requestObj.source.userId;
  var userProfiles = getUserProfiles(userId);
  
  var lastRow = sheet.getLastRow();
  
  sheet.getRange(lastRow + 1, 1).setValue(userProfiles[0]);
  sheet.getRange(lastRow + 1, 2).setValue(userMessage);
  sheet.getRange(lastRow + 1, 3).setValue(data.date);
  sheet.getRange(lastRow + 1, 4).setValue(data.time);
}

function getUserProfiles(userId) {
  var url = "https://api.line.me/v2/bot/profile/" + userId;
  var lineHeader = {
    "Content-Type": "application/json",
   "Authorization": "Bearer <Line Developer Token>" //แก้ไข
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

function getTodayDateTime() {
  const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000;
  const todayTimeZoneOffset = (new Date(Date.now() - timeZoneOffset)).toISOString().slice(0, -1);
  const date = todayTimeZoneOffset.split("T")[0];
  const time = todayTimeZoneOffset.split("T")[1];
  return { date, time };
}