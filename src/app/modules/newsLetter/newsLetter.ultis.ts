import mailchimp from '@mailchimp/mailchimp_marketing';
import config from '../../../config';

mailchimp.setConfig({
  apiKey: config.mailchimp.apiKey as string,
  server: config.mailchimp.server,
});

export default mailchimp;
