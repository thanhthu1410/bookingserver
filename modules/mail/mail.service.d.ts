interface MailOption {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    attachments?: any;
}
import reminderEmail from './templates/reminderEmail';
export declare const templates: {
    reminderEmail: typeof reminderEmail;
};
export declare class MailService {
    sendMail(mailOption: MailOption): Promise<boolean>;
}
export {};
