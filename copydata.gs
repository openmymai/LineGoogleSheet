function copyData() {
  const ss = SpreadsheetApp.getActive();

  const ssh = ss.getSheetByName("data1");
  let tsh;
  const data = ssh.getRange("A1:D"+ssh.getLastRow()).getValues();
  const fdata = data.map(r=>[r[0],r[1],r[2],r[3].toLocaleString().toString().substring(r[3].toLocaleString().toString().indexOf(", ")+1)]);

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let monthToAdd = 1;
  let currDate = new Date();
  currDate.setMonth(currDate.getMonth() + monthToAdd);

  let sName = monthNames[currDate.getMonth()]+" "+currDate.getFullYear();
  let sheetArray = ss.getSheets();
  let creationFlag = false;
  
  for (let itr in sheetArray) {
    if(sheetArray[itr].getSheetName == sName) {
      creationFlag = false;
      break;
    } else {
      creationFlag = true;
    }
  }

  if (creationFlag) {
    tsh = ss.insertSheet(sName);
  }
  

  if(fdata.length > 0) {
    tsh.getRange(tsh.getLastRow()+1,1,fdata.length,fdata[0].length).setValues(fdata);
  }
}