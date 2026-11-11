import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class CallMeBotApi implements ICredentialType {
  name = 'callMeBotApi';
  displayName = 'CallMeBot WhatsApp API';
  documentationUrl = 'https://www.callmebot.com/blog/free-api-whatsapp-messages/';
  properties: INodeProperties[] = [
    {
      displayName: 'Phone Number',
      name: 'phone',
      type: 'string',
      default: '',
      required: true,
      placeholder: '+1234567890 or 919876543210',
      description: 'Your verified WhatsApp phone number with international country code (no + or spaces needed, will be sanitized automatically)',
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description: 'API key received from CallMeBot WhatsApp bot',
    },
  ];
}

