import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
} from 'n8n-workflow';

export class CallMeBot implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'WhatsApp CallMeBot',
    name: 'callMeBot',
    icon: 'file:whatsapp.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Send instant free WhatsApp messages and speed-to-lead alerts using CallMeBot API',
    defaults: {
      name: 'WhatsApp CallMeBot',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'callMeBotApi',
        required: false,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Message',
            value: 'message',
          },
        ],
        default: 'message',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['message'],
          },
        },
        options: [
          {
            name: 'Send Text Message',
            value: 'send',
            description: 'Send a WhatsApp message to a phone number',
            action: 'Send a WhatsApp message',
          },
        ],
        default: 'send',
      },
      {
        displayName: 'Authentication Mode',
        name: 'authMode',
        type: 'options',
        options: [
          {
            name: 'Use Saved Credential',
            value: 'credential',
            description: 'Use credentials configured in n8n credentials manager',
          },
          {
            name: 'Specify In Node Parameters',
            value: 'parameter',
            description: 'Enter phone and API key directly in this node (useful for dynamic recipients)',
          },
        ],
        default: 'parameter',
        description: 'How to provide the CallMeBot Phone Number and API Key',
      },
      {
        displayName: 'Phone Number',
        name: 'phone',
        type: 'string',
        displayOptions: {
          show: {
            authMode: ['parameter'],
          },
        },
        default: '',
        placeholder: '919876543210',
        required: true,
        description: 'Target WhatsApp phone number including country code (e.g. 919876543210 or 15551234567). Non-digits will be stripped.',
      },
      {
        displayName: 'API Key',
        name: 'apiKey',
        type: 'string',
        typeOptions: { password: true },
        displayOptions: {
          show: {
            authMode: ['parameter'],
          },
        },
        default: '',
        required: true,
        description: 'CallMeBot API key for this WhatsApp phone number',
      },
      {
        displayName: 'Message Text',
        name: 'text',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        placeholder: '🚨 New Lead Intercepted: John Doe from Acme Corp',
        required: true,
        description: 'Message content to dispatch via WhatsApp. Supports emojis, line breaks, and dynamic n8n expressions.',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const authMode = this.getNodeParameter('authMode', i) as string;
        let phone = '';
        let apiKey = '';

        if (authMode === 'credential') {
          const credentials = await this.getCredentials('callMeBotApi', i);
          phone = credentials.phone as string;
          apiKey = credentials.apiKey as string;
        } else {
          phone = this.getNodeParameter('phone', i) as string;
          apiKey = this.getNodeParameter('apiKey', i) as string;
        }

        const rawText = this.getNodeParameter('text', i) as string;

        // Sanitize phone number (remove +, spaces, hyphens)
        const sanitizedPhone = phone.replace(/[^\d]/g, '');

        if (!sanitizedPhone) {
          throw new NodeOperationError(this.getNode(), 'Invalid Phone Number provided', {
            itemIndex: i,
          });
        }

        if (!apiKey) {
          throw new NodeOperationError(this.getNode(), 'CallMeBot API Key is required', {
            itemIndex: i,
          });
        }

        // CallMeBot requires URL-encoded query parameters
        const encodedText = encodeURIComponent(rawText);
        const url = `https://api.callmebot.com/whatsapp.php?phone=${sanitizedPhone}&text=${encodedText}&apikey=${apiKey}`;

        const response = await this.helpers.httpRequest({
          method: 'GET',
          url,
          returnFullResponse: true,
        });

        const responseBody = (response.body as string) || '';
        const isSuccess =
          response.statusCode === 200 &&
          (responseBody.toLowerCase().includes('message queued') ||
            responseBody.toLowerCase().includes('message sent') ||
            responseBody.toLowerCase().includes('success') ||
            !responseBody.toLowerCase().includes('error'));

        returnData.push({
          json: {
            success: isSuccess,
            statusCode: response.statusCode,
            phone: sanitizedPhone,
            messagePreview: rawText.slice(0, 80),
            rawResponse: responseBody.trim(),
            timestamp: new Date().toISOString(),
          },
          pairedItem: {
            item: i,
          },
        });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: (error as Error).message,
              success: false,
            },
            pairedItem: {
              item: i,
            },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

