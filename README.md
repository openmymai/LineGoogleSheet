# Line Official automate to Google Sheet using Apps Script

Apps Script is a rapid application development platform that makes it fast and easy to create business applications that integrate with Google Workspace. 

# Human Resource Management (hrmgt.gs)
When Line Official Account receive message from the user.
It will send to Google Sheet.

## Coding Step.
1. Login to Line Developer Console [https://developers.line.biz/en/](https://developers.line.biz/en/)
2. Create Provider, click Messaging API and issue Token.
3. Open Google Sheet and rename sheet.
4. Click menu Extensions->Apps Script
5. Use hrmgt.gs code and deploy as web app.
6. Use web app url, put it in Line Official Account->Messaging API->Webhooks and enable "Use webhooks"

## Verification
- Add line official account and send message.
- It will record that message to Google sheet.
