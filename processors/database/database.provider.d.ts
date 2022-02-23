import mongoose from 'mongoose';
import { EmailService } from '@/processors/helper/email.service';
export declare const databaseProvider: {
    inject: (typeof EmailService)[];
    provide: string;
    useFactory: (emailService: EmailService) => Promise<typeof mongoose>;
};
