"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mailgen = require("mailgen");
function genEmailString(mailBody) {
    console.log("vao mail ne");
    let mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: mailBody.productName,
            link: mailBody.productWebUrl
        }
    });
    let email = {
        body: {
            greeting: "Hello",
            signature: "XIn chào",
            name: mailBody.receiverName,
            intro: "Chúng tôi là",
            action: {
                instructions: `XIn chào ${mailBody.productName} bấm vào nút xác nhận!`,
                button: {
                    color: '#22BC66',
                    text: "Xác nhận",
                    link: mailBody.confirmLink
                }
            },
            outro: `Outro`
        }
    };
    return mailGenerator.generate(email);
}
exports.default = genEmailString;
//# sourceMappingURL=reminderEmail.js.map