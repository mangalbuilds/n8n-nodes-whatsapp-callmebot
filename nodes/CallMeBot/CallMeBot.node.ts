import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  JsonObject,
  NodeApiError,
  NodeConnectionTypes,
  NodeOperationError,
} from 'n8n-workflow';

export class CallMeBot implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'WhatsApp CallMeBot',
    name: 'callMeBot',
    icon: 'file:whatsapp.svg',
    group: ['transform'],
    version: 1,
    usableAsTool: true,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Send instant free WhatsApp messages and speed-to-lead alerts using CallMeBot API',
    defaults: {
      name: 'WhatsApp CallMeBot',
    },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [
      {
        name: 'callMeBotApi',
        required: true,
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
        const rawText = this.getNodeParameter('text', i) as string;

        if (!rawText) {
          throw new NodeOperationError(this.getNode(), 'Message text is required', {
            itemIndex: i,
          });
        }

        const response = await this.helpers.httpRequestWithAuthentication.call(
          this,
          'callMeBotApi',
          {
            method: 'GET',
            url: 'https://api.callmebot.com/whatsapp.php',
            qs: {
              text: rawText,
            },
            returnFullResponse: true,
          },
        );

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
        throw new NodeApiError(this.getNode(), error as JsonObject);
      }
    }

    return [returnData];
  }
}
