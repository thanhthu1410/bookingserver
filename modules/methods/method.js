"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveNotificationToFile = void 0;
const fs = require("fs");
function saveNotificationToFile(notification) {
    return new Promise((resolve, reject) => {
        fs.readFile('notification.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                reject(err);
                return;
            }
            let notifications = [];
            if (data) {
                try {
                    notifications = JSON.parse(data);
                }
                catch (error) {
                    console.error('Error parsing JSON:', error);
                    reject(error);
                    return;
                }
            }
            notifications.push(notification);
            fs.writeFile('notification.json', JSON.stringify(notifications), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    reject(err);
                }
                else {
                    console.log('Notification saved successfully!');
                    resolve(notifications);
                }
            });
        });
    });
}
exports.saveNotificationToFile = saveNotificationToFile;
//# sourceMappingURL=method.js.map