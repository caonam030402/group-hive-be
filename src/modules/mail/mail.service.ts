import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nContext } from 'nestjs-i18n';
import { MailData } from './interfaces/mail-data.interface';

import { MailerService } from '../mailer/mailer.service';
import path from 'path';
import { AllConfigType } from '../../config/config.type';
import { MaybeType } from '../../utils/types/maybe.type';
import * as nodemailer from 'nodemailer';

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

type SendMailOptionsWithTemplate = nodemailer.SendMailOptions & {
  templatePath: string;
  context: Record<string, unknown>;
};

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async sendEmailWithRetry(
    mails: MailData,
    email: string,
    retries: number = MAX_RETRIES,
  ): Promise<void> {
    let attempts = 0;
    let success = false;

    while (attempts < retries && !success) {
      try {
        await this.mailerService.sendMail({ ...mails, to: email });
        success = true;
      } catch (error) {
        attempts++;
        console.error(
          `Attempt ${attempts} failed for email ${email}: ${error.message}`,
        );

        if (attempts < retries) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
      }
    }

    if (!success) {
      console.error(
        `Failed to send email to ${email} after ${MAX_RETRIES} attempts`,
      );
    }
  }

  async sendBulkEmails(
    emails: string[],
    mails: SendMailOptionsWithTemplate,
    batchSize: number = 10,
  ): Promise<void> {
    const sendBatch = async (batch: string[]) => {
      const emailPromises = batch.map((email) =>
        this.sendEmailWithRetry(mails, email),
      );
      await Promise.all(emailPromises);
    };

    const emailBatches: string[][] = [];
    for (let i = 0; i < emails.length; i += batchSize) {
      emailBatches.push(emails.slice(i, i + batchSize));
    }

    const batchPromises = emailBatches.map((batch) => sendBatch(batch));
    await Promise.all(batchPromises);
  }

  async sendEmailInviteWorkspace(emails: string[]): Promise<void> {
    await this.sendBulkEmails(emails, {
      subject: 'Invite workspace',
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'modules',
        'mail',
        'mail-templates',
        'invite-workspace.hbs',
      ),
      context: {
        name: 'caonam',
        inviteCode: '12312',
        link: 'https://google.com',
      },
    });
  }

  async userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let emailConfirmTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;

    if (i18n) {
      [emailConfirmTitle, text1, text2, text3] = await Promise.all([
        i18n.t('common.confirmEmail'),
        i18n.t('confirm-email.text1'),
        i18n.t('confirm-email.text2'),
        i18n.t('confirm-email.text3'),
      ]);
    }

    const url = new URL(
      this.configService.getOrThrow('app.frontendDomain', {
        infer: true,
      }) + '/confirm-email',
    );
    url.searchParams.set('hash', mailData.data.hash);

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: emailConfirmTitle,
      text: `${url.toString()} ${emailConfirmTitle}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'modules',
        'mail',
        'mail-templates',
        'activation.hbs',
      ),
      context: {
        title: emailConfirmTitle,
        url: url.toString(),
        actionTitle: emailConfirmTitle,
        app_name: this.configService.get('app.name', { infer: true }),
        text1,
        text2,
        text3,
      },
    });
  }

  async confirmOtp(
    mailData: MailData<{ code: number; email: string; expires: number }>,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Confirm OTP',
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'modules',
        'mail',
        'mail-templates',
        'confirm-otp.hbs',
      ),
      context: {
        otp: mailData.data.code,
        name: mailData.data.email,
        validityPeriod: mailData.data.expires,
      },
    });
  }

  async forgotPassword(
    mailData: MailData<{ hash: string; tokenExpires: number }>,
  ): Promise<void> {
    const i18n = I18nContext.current();
    let resetPasswordTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;
    let text4: MaybeType<string>;

    if (i18n) {
      [resetPasswordTitle, text1, text2, text3, text4] = await Promise.all([
        i18n.t('common.resetPassword'),
        i18n.t('reset-password.text1'),
        i18n.t('reset-password.text2'),
        i18n.t('reset-password.text3'),
        i18n.t('reset-password.text4'),
      ]);
    }

    const url = new URL(
      this.configService.getOrThrow('app.frontendDomain', {
        infer: true,
      }) + '/password-change',
    );
    url.searchParams.set('hash', mailData.data.hash);
    url.searchParams.set('expires', mailData.data.tokenExpires.toString());

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: resetPasswordTitle,
      text: `${url.toString()} ${resetPasswordTitle}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'modules',
        'mail',
        'mail-templates',
        'reset-password.hbs',
      ),
      context: {
        title: resetPasswordTitle,
        url: url.toString(),
        actionTitle: resetPasswordTitle,
        app_name: this.configService.get('app.name', {
          infer: true,
        }),
        text1,
        text2,
        text3,
        text4,
      },
    });
  }

  async confirmNewEmail(mailData: MailData<{ hash: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let emailConfirmTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;

    if (i18n) {
      [emailConfirmTitle, text1, text2, text3] = await Promise.all([
        i18n.t('common.confirmEmail'),
        i18n.t('confirm-new-email.text1'),
        i18n.t('confirm-new-email.text2'),
        i18n.t('confirm-new-email.text3'),
      ]);
    }

    const url = new URL(
      this.configService.getOrThrow('app.frontendDomain', {
        infer: true,
      }) + '/confirm-new-email',
    );
    url.searchParams.set('hash', mailData.data.hash);

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: emailConfirmTitle,
      text: `${url.toString()} ${emailConfirmTitle}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'modules',
        'mail',
        'mail-templates',
        'confirm-new-email.hbs',
      ),
      context: {
        title: emailConfirmTitle,
        url: url.toString(),
        actionTitle: emailConfirmTitle,
        app_name: this.configService.get('app.name', { infer: true }),
        text1,
        text2,
        text3,
      },
    });
  }
}
