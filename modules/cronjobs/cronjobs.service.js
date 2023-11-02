"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CronjobsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronjobsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const mail_service_1 = require("../mail/mail.service");
const appointments_service_1 = require("../appointments/appointments.service");
const fs = require("fs");
const ejs = require("ejs");
const time_service_1 = require("../time/time.service");
let CronjobsService = CronjobsService_1 = class CronjobsService {
    mail;
    appointmentsService;
    timeService;
    constructor(mail, appointmentsService, timeService) {
        this.mail = mail;
        this.appointmentsService = appointmentsService;
        this.timeService = timeService;
    }
    logger = new common_1.Logger(CronjobsService_1.name);
    async handleCron() {
        try {
            const apm = await this.appointmentsService.findAll();
            const time = await this.timeService.findAll();
            for (let i in apm.data) {
                if (apm.data[i].IsReminder == false) {
                    const [hour, minute] = apm.data[i].time.split(':');
                    const [day, month, year] = apm.data[i].date.split('/');
                    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:00`;
                    const timestamp = new Date(formattedDate).getTime();
                    if (time.data.reminderTime) {
                        if (timestamp - Date.now() > 0 && timestamp - Date.now() < (1000 * 60 * Number(time.data.reminderTime)) && apm.data[i].status == "ACCEPTED") {
                            console.log("alll");
                            const ejsTemplate = fs.readFileSync('reminderTemplate.ejs', 'utf8');
                            const templateData = {
                                customerName: apm.data[i].customer.fullName,
                                date: apm.data[i].date,
                                time: apm.data[i].time,
                                appointmentDetail: apm.data[i].appointmentDetails,
                                total: apm.data[i].appointmentDetails.reduce((acc, detail) => acc + detail.price, 0)
                            };
                            const compiledHtml = ejs.render(ejsTemplate, templateData);
                            const resultSendMail = await this.mail.sendMail({
                                to: `${apm.data[i].customer.email}`,
                                subject: "Rasm Salon Reminder Email",
                                html: compiledHtml
                            });
                            console.log("result send mail", resultSendMail);
                            if (!resultSendMail)
                                return false;
                            let updateApponintmentReminder = await this.appointmentsService.updateReminderEmail(apm.data[i].id);
                            console.log("resultupdateApponintmentReminder", updateApponintmentReminder);
                        }
                    }
                }
            }
        }
        catch (err) {
            console.log("err", err);
        }
    }
    create(createCronjobDto) {
        return 'This action adds a new cronjob';
    }
    findAll() {
        return `This action returns all cronjobs`;
    }
    findOne(id) {
        return `This action returns a #${id} cronjob`;
    }
    update(id, updateCronjobDto) {
        return `This action updates a #${id} cronjob`;
    }
    remove(id) {
        return `This action removes a #${id} cronjob`;
    }
};
exports.CronjobsService = CronjobsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronjobsService.prototype, "handleCron", null);
exports.CronjobsService = CronjobsService = CronjobsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_service_1.MailService, appointments_service_1.AppointmentsService,
        time_service_1.TimeService])
], CronjobsService);
//# sourceMappingURL=cronjobs.service.js.map