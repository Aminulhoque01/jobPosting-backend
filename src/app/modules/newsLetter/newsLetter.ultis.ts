import mailchimp from '@mailchimp/mailchimp_marketing';
import { config, MailchimpConfig } from '../../../config';

const mailchimpConfig: MailchimpConfig = config.mailchimp;

mailchimp.setConfig({
  apiKey: mailchimpConfig.apiKey,
  server: mailchimpConfig.server,
});

export default mailchimp;