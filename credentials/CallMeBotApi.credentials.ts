import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
  Icon,
} from 'n8n-workflow';

export class CallMeBotApi implements ICredentialType {
  name = 'callMeBotApi';
  displayName = 'CallMeBot WhatsApp API';
  documentationUrl = 'https://www.callmebot.com/blog/free-api-whatsapp-messages/';
  icon: Icon = 'file:whatsapp.svg';

  properties: INodeProperties[] = [
    {
      displayName: 'Phone Number',
      name: 'phone',
      type: 'string',
      default: '',
      required: true,
      placeholder: '919876543210',
      description: 'Your verified WhatsApp phone number with international country code (no + or spaces)',
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

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      qs: {
        phone: '={{$credentials.phone.replace(/[^\\d]/g, "")}}',
        apikey: '={{$credentials.apiKey}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://api.callmebot.com',
      url: '/whatsapp.php',
      qs: {
        phone: '={{$credentials.phone.replace(/[^\\d]/g, "")}}',
        apikey: '={{$credentials.apiKey}}',
        text: 'Test connection from n8n',
      },
    },
    rules: [
      {
        type: 'responseSuccessBody',
        properties: {
          key: '',
          value: '',
          message: 'Connection successful',
        },
      },
    ],
  };
}
