# JavaScript SDK

JavaScript SDK provides integration-ready widgets suit for embedding into your application.

Kit contains a pre-made customizable UI featuring bank cards binding and payments acceptance form.

- [Getting started](#getting-started)
  - [CardForm widget](#cardform-widget)
  - [CardSavingForm widget](#cardsavingform-widget)
  - [PayForm widget](#payform-widget)
  - [PayBySavedCardForm widget](#paybysavedcardform-widget)
- [Entry data](#entry-data)
  - [CardForm data](#cardform-data)
  - [CardSavingForm data](#cardsavingform-data)
  - [PayForm data](#payform-data)
  - [PayBySavedCard data](#paybysavedcard-data)
- [Customization](#customization)
  - [CSS classes](#css-classes)
  - [CSS in JSON](#css-in-json)
  - [Inline styles](#inline-styles)
    - [Elements reference](#elements-reference)
  - [Texts](#texts)
    - [CardForm elements](#cardform-elements)
    - [CardSavingForm elements](#cardsavingform-elements)
    - [PayForm elements](#payform-elements)
    - [PayBySavedCardForm elements](#paybysavedcardform-elements)
  - [Post message](#post-message)
    - [Form submit](#form-submit)
    - [Post Messages from JS SDK](#post-messages-from-js-sdk)

## Getting started

Widget is a component that is embedded in iframe; refer to examples below.

1. Create an element with an iframe in.

```html
<iframe id="js-sdk" src="https://<environment>/js-sdk-frame/#/<form>"></iframe>
```

Possible environment values: **sandbox.cardpay.com**, **unlimint.com/js-sdk-frame**. It is recommended to use the sandbox environment for testing the js sdk.

Possible form values: card-form, pay-form, pay-by-saved-card-form

2. Setup `props` for a form.
3. Include data in form.
4. Pass the data to the iframe.

```js
// Find iframe element
const iframe = document.getElementById('js-sdk');

// Pass config if iframe loaded
iframe.addEventListener('load', function () {
  iframe.contentWindow.postMessage({ props }, '*');
});

// Add listener for receive data from iframe
window.addEventListener('message', function (data) {
  console.log('data', data);
});
```

- Alternatively, you can use the wrapper to work with the js-sdk:

```bash
npm i @unlimint/client-js-sdk
```

- Import js-sdk main file:

```js
import '@unlimint/client-js-sdk/main.js';
```

- Find for an element to embed an iframe (for example, it can be an empty div):

```js
const element = document.getElementById('js-sdk');
```

- Call load js-sdk function:

```js
const jsSdk = await loadJsSdk({
  // Select js-sdk form (available values: card, pay, pay-token)
  form: 'card',
  // Pass element
  element,
  // Select sandbox env for debugging the js sdk
  environment: 'sandbox',
  // Pass props
  props,
  // Pass callback for listen iframe messages
  callback: (data) => {
    console.log(data);
  },
});
```

After loading the JS SDK, you can programmatically submit the form at any time by calling:

```js
jsSdk.submit();
```

The default styling in JS SDK is made via **Inter** font. If you do not plan applying customizations with another font, then you have to include **Inter** separately:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
  rel="stylesheet"
/>
```

If your application contains **TypeScript** you can include **\*.d.ts** annotations file to enable types checking into widget creation process.

TypeScript compiler includes these annotations into widget's data.

---

Widgets require URL addresses to receive requests. URLs must be pointed in `props` → `urls` property.

The supported URLs:

- `generateMobileToken` - endpoint for mobile token generation, used in widget for authorization

Mobile token endpoint addresses:

- demo https://sandbox.cardpay.com/demo-merchant/mobile/generate_token
- sandbox environment https://sandbox.cardpay.com/api/mobile/token
- production environment https://cardpay.com/api/mobile/token

It is possible to specify which environment to use. isProdMode can be specified in `props` → `urls` property. By default, the sandbox is used.

---

Widgets allow to setup `enableRedirect` property having `true`/`false` value; false by default:

- `true` - after widget's form submitting user is redirected on the next step of flow via URL provided by processing backend, but `callbacks` → `resolve` property will be ignored

---

### CardForm widget

CardForm widget contains a form for bank card binding feature.

The form allows customer to fill in card's data and save (bind) it for further payments in order to make the purchasing process quick and simple.

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/1_CardForm_sequence.png)

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/2_CardForm_widget.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <iframe id="js-sdk" src="https://<environment>/js-sdk-frame/#/card-form"></iframe>

    <script>
      const props = {
        urls: {
          generateMobileToken: 'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
          cardBinding: 'https://sandbox.cardpay.com/api/mobile/cardbinding',
        },
        enableRedirect: false,
        data: {
          recurringCurrency: 'USD',
          customer: {
            id: 'DfVg56Gvx',
            email: 'test@test.test',
          },
          returnUrls: {
            successUrl: 'https://example.com/success',
            declineUrl: 'https://example.com/decline',
          },
        },
      };

      // Find iframe element
      const iframe = document.getElementById('js-sdk');

      // Pass config if iframe loaded
      iframe.addEventListener('load', function () {
        iframe.contentWindow.postMessage({ props }, '*');
      });

      // Add listener for receive data from iframe
      window.addEventListener('message', function (data) {
        console.log('data', data);
      });
    </script>
  </body>
</html>
```

### CardSavingForm widget

The CardSavingForm contains a form for bank card saving feature.

The form allows merchant to receive token with card data and use it as a temporary token to request the Unlimit API.

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/8_CardSavingForm_sequence.png)

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/9_CardSavingForm_widget.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <iframe id="js-sdk" src="https://<environment>/js-sdk-frame/#/card-form"></iframe>

    <script>
      const props = {
        urls: {
          generateMobileToken: 'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
          cardSaving: 'https://sandbox.cardpay.com/api/mobile/cardsaving',
        },
        settings: {
          cardholder: {
            required: true,
          },
          events: {
            binServiceLookup: true,
            cardNumberValidated: true,
            formInvalid: true,
          },
        },
      };

      // Find iframe element
      const iframe = document.getElementById('js-sdk');

      // Pass config if iframe loaded
      iframe.addEventListener('load', function () {
        iframe.contentWindow.postMessage({ props }, '*');
      });

      // Add listener for receive data from iframe
      window.addEventListener('message', function (data) {
        console.log('data', data);
      });
    </script>
  </body>
</html>
```

### PayForm widget

PayForm widget contains a form for bank card payment feature. Form allows customer to fill in card's data and confirm payment. The card binding option is included too.

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/3_PayForm_sequence.png)

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/4_PayForm_widget.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <iframe id="js-sdk" src="https://<environment>/js-sdk-frame/#/pay-form"></iframe>

    <script>
      const props = {
        urls: {
          generateMobileToken: 'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
          payment: 'https://sandbox.cardpay.com/api/mobile/payment',
        },
        enableRedirect: false,
        data: {
          merchantName: 'Merchant Name',
          merchantOrder: {
            description: 'description',
            id: '21513-216',
          },
          paymentMethod: 'BANKCARD',
          paymentData: {
            amount: '9700.00',
            currency: 'USD',
          },
          customer: {
            email: 'test@test.test',
          },
          returnUrls: {
            successUrl: 'https://example.com/success',
            declineUrl: 'https://example.com/decline',
          },
        },
      };

      // Find iframe element
      const iframe = document.getElementById('js-sdk');

      // Pass config if iframe loaded
      iframe.addEventListener('load', function () {
        iframe.contentWindow.postMessage({ props }, '*');
      });

      // Add listener for receive data from iframe
      window.addEventListener('message', function (data) {
        console.log('data', data);
      });
    </script>
  </body>
</html>
```

### PayBySavedCardForm widget

PayBySavedCardForm widget contains a form for payment by saved card. Form allows customer to fill in CVV2/CVC2 code only and confirm payment.

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/5_PayBySavedCard_widget.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <iframe id="js-sdk" src="https://<environment>/js-sdk-frame/#/pay-by-saved-card-form"></iframe>

    <script>
      const props = {
        urls: {
          generateMobileToken: 'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
          payment: 'https://sandbox.cardpay.com/api/mobile/payment',
        },
        enableRedirect: false,
        data: {
          token: 'e84eca49-6f84-47aa-8e5c-2f6dc6af7151',
          lastDigits: '0002',
          merchantName: 'Merchant Name',
          merchantOrder: {
            description: 'description',
            id: '21513-216',
          },
          paymentMethod: 'BANKCARD',
          paymentData: {
            amount: '9700.00',
            currency: 'USD',
          },
          customer: {
            email: 'test@test.test',
          },
          returnUrls: {
            successUrl: 'https://example.com/success',
            declineUrl: 'https://example.com/decline',
          },
        },
      };

      // Find iframe element
      const iframe = document.getElementById('js-sdk');

      // Pass config if iframe loaded
      iframe.addEventListener('load', function () {
        iframe.contentWindow.postMessage({ props }, '*');
      });

      // Add listener for receive data from iframe
      window.addEventListener('message', function (data) {
        console.log('data', data);
      });
    </script>
  </body>
</html>
```

## Entry data

Widgets accept entry data required for successful card binding or payment operation.

The entry data must be included during widget creation in `props` → `data` property.

### CardForm data

CardForm widget accepts the following parameters:

| Field                 | Subfield 1    | Subfield 2          | Type    | Min. length | Max. length | Is mandatory | Description                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------- | ------------- | ------------------- | ------- | ----------- | ----------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| merchantOrder         |               |                     |         |             |             | No           | Merchant order data.                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                       | id            |                     | String  |             | 50          | No           | Order ID used by the merchant’s shopping cart.                                                                                                                                                                                                                                                                                                                                                                                               |
|                       | description   |                     | String  |             | 200         | No           | Description of product/service being sold.                                                                                                                                                                                                                                                                                                                                                                                                   |
| **recurringCurrency** |               |                     | String  |             | 3           | Yes          | ISO 4217 currency code (optional if paymentData is declared)                                                                                                                                                                                                                                                                                                                                                                                 |
| paymentData           |               |                     |         |             |             |              | Is mandatory if recurringCurrency is not declared.                                                                                                                                                                                                                                                                                                                                                                                           |
|                       | generateToken |                     | Boolean |             |             | No           | If set to "true", token will be generated and returned in the response. Token can be generated only for successful transactions (not for declined transactions).                                                                                                                                                                                                                                                                             |
|                       | **currency**  |                     | String  |             | 3           | Yes          | ISO 4217 currency code.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| billingAddress        |               |                     |         |             |             | No           | Address for billing.                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                       | **country**   |                     | String  | 2           | 3           | Yes          | ISO 3166-1 code of billing country: 2 or 3 latin letters or numeric code.                                                                                                                                                                                                                                                                                                                                                                    |
|                       | state         |                     | String  |             | 40          | No           | The state or province of the billing address associated with the card being used for this purchase.<br>It's recommended to sent in following format: The country subdivision code defined in ISO 3166-2.<br>May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                  |
|                       | **zip**       |                     | String  |             | 12          | Yes          | Billing postal code.                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                       | **city**      |                     | String  |             | 50          | Yes          | Billing city. May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                                                                                                                |
|                       | **addrLine1** |                     | String  |             | 50          | Yes          | First line of the street address or equivalent local portion of the Cardholder billing address associated with the card used for this purchase.<br>May include whitespaces, hyphens, apostrophes, commas, quotes, dots, slashes and semicolons.<br>Required (if available) unless market or regional mandate restricts sending this information.                                                                                             |
|                       | addrLine2     |                     | String  |             | 50          | No           | Second line of the street address or equivalent local portion of the Cardholder billing address associated with the card used for this purchase. Required (if available) unless market or regional mandate restricts sending this information.                                                                                                                                                                                               |
| **cardAccount**       |               |                     |         |             |             | No           | Card account data.                                                                                                                                                                                                                                                                                                                                                                                                                           |
|                       | recipientInfo |                     | String  |             | 500         | No           | Recipient full name. May include whitespaces, hyphens and apostrophes. Mandatory for money transfer operation.                                                                                                                                                                                                                                                                                                                               |
| **customer**          |               |                     |         |             |             | Yes          | Customer data.                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                       | **email**     |                     | String  |             | 256         | Yes          | Customer’s e-mail address.<br>Optional for wallets where setting in PM "May omit customer email" is enabled.                                                                                                                                                                                                                                                                                                                                 |
|                       | **id**        |                     | String  |             | 15          | Yes          | Customer ID is a unique identifier of a cardholder at the Recurring payments service. Each card used by a cardholder within the service is linked to Customer ID and Filing ID.                                                                                                                                                                                                                                                              |
|                       | device        |                     |         |             |             | No           | Customer's device.                                                                                                                                                                                                                                                                                                                                                                                                                           |
|                       |               | fingerprint         | String  |             | 256         | No           | The fingerprint of device.                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                       | ip            |                     | String  |             | 15          | No           | Customer’s IPv4. Mandatory only for S2S mode.                                                                                                                                                                                                                                                                                                                                                                                                |
|                       | locale        |                     | String  |             | 2           | No           | Preferred locale for the payment page (ISO 639-1 language code).<br>The default locale (en or other locale if it's set as default in Merchant account) will be applied if the selected locale (received in request) is not supported.<br>Supported locales are: ar, az, bg, cs, de, el, en, es, fr, hu, hy, id, it, ja, ka, ko, ms, nl, pl, pt, ro, ru, sr, sv, th, tr, uk, vi, zh.                                                          |
|                       | phone         |                     | String  | 8           | 18          | No           | Customer’s phone number.<br>Recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br>Refer to ITU-E.164 for additional information on format and length.<br>Mandatory for wallets where setting in PM "May omit customer email" is enabled and customer.email isn't presented in request.          |
|                       | homePhone     |                     | String  | 8           | 18          | No           | The home phone number provided by the Cardholder. Required (if available) unless market or regional mandate restricts sending this information.<br>Characters format: recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br>Refer to ITU-E.164 for additional information on format and length. |
|                       | workPhone     |                     | String  | 8           | 18          | No           | The work phone number provided by the Cardholder. Required (if available) unless market or regional mandate restricts sending this information.<br>Characters format: recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br>Refer to ITU-E.164 for additional information on format and length. |
|                       | fullName      |                     | String  | 1           | 255         | No           | Customer full name. May include whitespaces, hyphens and apostrophes. Mandatory for money transfer operation.                                                                                                                                                                                                                                                                                                                                |
|                       | livingAddress |                     |         |             |             | No           | Living address. Mandatory for money transfer operation.                                                                                                                                                                                                                                                                                                                                                                                      |
|                       |               | country             | String  | 2           | 3           | Yes          | ISO 3166-1 code of living country: 2 or 3 latin letters or numeric code.                                                                                                                                                                                                                                                                                                                                                                     |
|                       |               | state               | String  |             | 20          | No           | The state or province of the living address. It's recommended to sent in following format: The country subdivision code defined in ISO 3166-1. Mandatory for the US and Canada.                                                                                                                                                                                                                                                              |
|                       |               | city                | String  |             | 20          | Yes          | Living city. May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                                                                                                                 |
|                       |               | address             | String  |             | 100         | Yes          | Living home address. May include whitespaces, hyphens, apostrophes, commas, quotes, dots, slashes and semicolons.                                                                                                                                                                                                                                                                                                                            |
|                       | birthDate     |                     | String  |             | 10          | No           | Customer date of birth in the YYYY-MM-DD format. The value cannot be a future date.                                                                                                                                                                                                                                                                                                                                                          |
| returnUrls            |               |                     |         |             |             | No           | Return URLs are the URLs where customer returns by pressing “Back to the shop” or “Cancel” button in Payment Page mode and redirected automatically in Gateway mode.                                                                                                                                                                                                                                                                         |
|                       | returnUrl     |                     | String  |             | 512         | No           | Overrides default success URL, decline URL, cancel URL (only in Payment page mode), inprocess URL.<br>return URL can be used separately or together with other url parameters.                                                                                                                                                                                                                                                               |
|                       | successUrl    |                     | String  |             | 512         | No           | Overrides default success URL only.                                                                                                                                                                                                                                                                                                                                                                                                          |
|                       | declineUrl    |                     | String  |             | 512         | No           | Overrides default decline URL only.                                                                                                                                                                                                                                                                                                                                                                                                          |
|                       | cancelUrl     |                     | String  |             | 512         | No           | Overrides default cancel URL only.                                                                                                                                                                                                                                                                                                                                                                                                           |
|                       | inprocessUrl  |                     | String  |             | 512         | No           | Special URL for In process status of transaction.                                                                                                                                                                                                                                                                                                                                                                                            |
| settings              |               |                     |         |             |             | No           | Settings parameters.                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                       | cardholder    |                     |         |             |             | No           | Defines the cardholder name input field element on the form.                                                                                                                                                                                                                                                                                                                                                                                 |
|                       |               | required            | Boolean |             |             | No           | Supported values:<br>• true - customer must enter a valid cardholder name<br>• false - cardholder name is an optional field                                                                                                                                                                                                                                                                                                                  |
|                       | livingAddress |                     |         |             |             | No           | Defines the block with living address input fields on the form.                                                                                                                                                                                                                                                                                                                                                                              |
|                       |               | enabled             | Boolean |             |             | No           | Supported values:<br>• true - living address fields are displayed in the form<br>• false - living address fields are not displayed in the form field                                                                                                                                                                                                                                                                                         |
|                       | events        |                     |         |             |             | No           | Events parameters.                                                                                                                                                                                                                                                                                                                                                                                                                           |
|                       |               | binServiceLookup    | Boolean |             |             | No           | Defines BIN_SERVICE_LOOKUP event. Supported values: <br>• true - event with card information will received<br>• false - event with card information won't received.                                                                                                                                                                                                                                                                          |
|                       |               | cardNumberValidated | Boolean |             |             | No           | Defines CARD_NUMBER_VALIDATED event. Supported values: <br>• true - event with card information will received<br>• false - event with card information won't received.                                                                                                                                                                                                                                                                       |
|                       |               | formInvalid         | Boolean |             |             | No           | Defines FORM_INVALID event. Supported values: <br>• true - event with card information will received<br>• false - event with card information won't received.                                                                                                                                                                                                                                                                                |

### CardSavingForm data

CardSavingForm widget accepts the following parameters:

| Field    | Subfield 1 | Subfield 2          | Type    | Min. length | Max. length | Is mandatory | Description                                                                                                                                                            |
| -------- | ---------- | ------------------- | ------- | ----------- | ----------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| settings |            |                     |         |             |             | No           | Settings parameters.                                                                                                                                                   |
|          | cardholder |                     |         |             |             | No           | Defines the cardholder name input field element on the form.                                                                                                           |
|          |            | required            | Boolean |             |             | No           | Supported values:<br>• true - customer must enter a valid cardholder name<br>• false - cardholder name is an optional field                                            |
|          | events     |                     |         |             |             | No           | Events parameters.                                                                                                                                                     |
|          |            | binServiceLookup    | Boolean |             |             | No           | Defines BIN_SERVICE_LOOKUP event. Supported values: <br>• true - event with card information will received<br>• false - event with card information won't received.    |
|          |            | cardNumberValidated | Boolean |             |             | No           | Defines CARD_NUMBER_VALIDATED event. Supported values: <br>• true - event with card information will received<br>• false - event with card information won't received. |
|          |            | formInvalid         | Boolean |             |             | No           | Defines FORM_INVALID event. Supported values: <br>• true - event with card information will received<br>• false - event with card information won't received.          |

### PayForm data

PayForm widget accepts the following parameters:

| Field             | Subfield 1        | Subfield 2          | Type            | Min. length | Max. length | Is mandatory | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------- | ----------------- | ------------------- | --------------- | ----------- | ----------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| merchantName      |                   |                     | String          | 1           | 50          | No           | Merchant order data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **merchantOrder** |                   |                     |                 |             |             | Yes          | Merchant order data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                   | **id**            |                     | String          |             | 50          | Yes          | Order ID used by the merchant’s shopping cart.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|                   | **description**   |                     | String          |             | 200         | Yes          | Description of product/service being sold.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|                   | items             |                     |                 |             |             | No           | Array of items (in the shopping cart).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                   |                   | **name**            | String          |             | 50          | Yes          | The name of product / service, provided to the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|                   |                   | description         | String          |             | 200         | No           | The description of product / service, provided to the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                   |                   | count               | Integer         |             |             | No           | The count of product / service, provided to the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|                   |                   | price               | Decimal         |             |             | No           | Price of product / service with dot as a decimal separator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| shippingAddress   |                   |                     |                 |             |             | No           | Shipping Address                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|                   | **country**       |                     | String          | 2           | 3           | Yes          | ISO 3166-1 code of delivery country: 2 or 3 latin letters or numeric code                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|                   | state             |                     | String          |             | 40          | No           | The state or province of the shipping address associated with the card being used for this purchase.<br />It's recommended to send in following format: The country subdivision code defined in ISO 3166-2.<br />May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                                     |
|                   | zip               |                     | String          |             | 12          | No           | Delivery postal code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                   | city              |                     | String          |             | 50          | No           | Delivery city. May include whitespaces, hyphens, apostrophes, commas and dots                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   | phone             |                     | String          | 5           | 20          | No           | Valid customer phone number                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|                   | addrLine1         |                     | String          |             | 50          | No           | First line of the street address or equivalent local portion of the Cardholder shipping address associated with the card used for this purchase. May include street and house number.                                                                                                                                                                                                                                                                                                                                                                                |
|                   | addrLine2         |                     | String          |             | 50          | No           | Second line of the street address or equivalent local portion of the Cardholder shipping address associated with the card used for this purchase.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **paymentMethod** |                   |                     | String          |             | 50          | Yes          | Payment method type name; insert `BANKCARD` value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **paymentData**   |                   |                     |                 |             |             |              | Yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                   | **amount**        |                     | Decimal         |             |             | Yes          | The total transaction amount in selected currency with dot as a decimal separator, must be less than 100 millions.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                   | **currency**      |                     | String          |             | 3           | Yes          | ISO 4217 currency code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|                   | preauth           |                     | Boolean         |             |             | No           | Option allows to hold on customer funds before providing a service; supported values:<br />• true - enable holding<br />• false - skip holding                                                                                                                                                                                                                                                                                                                                                                                                                       |
|                   | note              |                     | String          |             | 100         | No           | Note about the transaction that will not be displayed to customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                   | dynamicDescriptor |                     | String          |             | 25          | No           | Short description of the service or product, must be enabled by your manager to be used.<br />For Visa cards: maximum length 25 symbols, for MasterCard cards - 22 symbols.                                                                                                                                                                                                                                                                                                                                                                                          |
|                   | transType         |                     | String          | 2           | 2           | No           | Identifies the type of transaction being authenticated.<br />Supported values:<br />• 01 = Goods / Service Purchase<br />• 03 = Check Acceptance<br />• 10 = Account Funding • 11 = Quasi-Cash Transaction<br />• 28 = Prepaid Activation and Load Note: Values derived from the 8583 ISO Standard.                                                                                                                                                                                                                                                                  |
|                   | installmentType   |                     | String          |             |             | No           | Installment type, must be enabled by your manager to be used. Supported values:<br />• IF - Issuer financed. The issuer controls how the customer's account is debited. Acquirer is credited for the entire amount in a single transaction. Only for Credit or Debit Cards.<br />• MF_HOLD - Merchant Financed. For Installment with hold rest amount.The schedule is set by the merchant. Acquirer must send each installment payment transaction by the installment plan. Only for Credit Cards.<br />This is mandatory field, if you need an installment payment. |
|                   | installments      |                     | Array of object |             |             | No           | Array of items (in the shopping cart).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                   |                   | quantity            | Integer         | 1           |             | Yes          | Number of total installment payments, to be charged per defined interval.<br />• For installment payment with **installmentType** = "IF" can be only from the following: 3, 6, 9, 12, 18.<br />• For installment payment with **installmentType** = "MF_HOLD" can be 1-12.                                                                                                                                                                                                                                                                                           |
|                   |                   | amount              | Number          | 1           |             | Yes          | Instalment amount. Must correspond to the total amount divided by the number of instalment payments.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                   | holdPeriod        |                     | Integer         |             |             | No           | The delay between the authorisation and scheduled auto-capture or auto-void, specified in hours. The maximum hold period is 7 days.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                   | postAuthStatus    |                     | String          |             |             | No           | The value contains payment status after hold period if payment has not been completed. Supported values:<br />• Reverse,<br />• Complete.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| billingAddress    |                   |                     |                 |             |             | No           | Billing Address.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|                   | **country**       |                     | String          | 2           | 3           | Yes          | ISO 3166-1 code of billing country: 2 or 3 latin letters or numeric code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|                   | state             |                     | String          |             | 40          | No           | The state or province of the billing address associated with the card being used for this purchase.<br />It's recommended to send in following format: The country subdivision code defined in ISO 3166-2.<br />May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                                      |
|                   | **zip**           |                     | String          |             | 12          | Yes          | Billing postal code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                   | **city**          |                     | String          |             | 50          | Yes          | Billing city. May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   | **addrLine1**     |                     | String          |             | 50          | Yes          | First line of the street address or equivalent local portion of the Cardholder billing address associated with the card used for this purchase.<br />May include whitespaces, hyphens, apostrophes, commas, quotes, dots, slashes and semicolons.<br />Required (if available) unless market or regional mandate restricts sending this information.<br />1-PA: Required unless market or regional mandate restricts sending this information.<br />02-NPA: Required (if available) unless market or regional mandate restricts sending this information.            |
|                   | addrLine2         |                     | String          |             | 50          | No           | Second line of the street address or equivalent local portion of the Cardholder billing address associated with the card used for this purchase. Required (if available) unless market or regional mandate restricts sending this information.                                                                                                                                                                                                                                                                                                                       |
| **cardAccount**   |                   |                     |                 |             |             | No           | Card account data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                   | recipientInfo     |                     | String          |             | 500         | No           | Recipient full name. May include whitespaces, hyphens and apostrophes. Mandatory for money transfer operation.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **customer**      |                   |                     |                 |             |             | Yes          | Customer data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|                   | **email**         |                     | String          |             | 256         | Yes          | Email address of the customer.<br />Field is Optional for wallets where setting in PM "May omit customer email" is enabled.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|                   | id                |                     | String          |             | 256         | No           | Customer ID is a unique identifier of a cardholder at the Recurring payments service. Each card used by a cardholder within the service is linked to Customer ID and Filing ID.                                                                                                                                                                                                                                                                                                                                                                                      |
|                   | fullName          |                     | String          | 1           | 255         | Yes          | Customer full name. May include whitespaces, hyphens and apostrophes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                   | phone             |                     | String          | 8           | 18          | Yes          | Email address of the customer.<br />Field is Optional for wallets where setting in PM "May omit customer email" is enabled.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|                   | identity          |                     | String          |             | 256         | No           | Customer CPF number. Mandatory for all Brazil payment method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   | device            |                     |                 |             |             | No           | Customer's device.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                   |                   | fingerprint         | String          |             | 256         | No           | The fingerprint of device.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|                   | locale            |                     | String          |             | 2           | No           | Preferred locale for the payment page (ISO 639-1 language code).<br />The default locale (en or other locale if it's set as default in Merchant account) will be applied if the selected locale (received in request) is not supported. Supported locales are: ar, az, bg, cs, de, el, en, es, fr, hu, hy, id, it, ja, ka, ko, ms, nl, pl, pt, ro, ru, sr, sv, th, tr, uk, vi, zh.                                                                                                                                                                                   |
|                   | homePhone         |                     | String          | 8           | 18          | No           | The home phone number provided by the Cardholder. Required (if available) unless market or regional mandate restricts sending this information.<br />Characters format: recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br />Refer to ITU-E.164 for additional information on format and length.                                                                                                                     |
|                   | workPhone         |                     | String          | 8           | 18          | No           | The work phone number provided by the Cardholder. Required (if available) unless market or regional mandate restricts sending this information.<br />Characters format: recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br />Refer to ITU-E.164 for additional information on format and length.                                                                                                                     |
|                   | livingAddress     |                     |                 |             |             | No           | Living address. Mandatory for money transfer operation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|                   |                   | country             | String          | 2           | 3           | Yes          | ISO 3166-1 code of living country: 2 or 3 latin letters or numeric code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|                   |                   | state               | String          |             | 20          | No           | The state or province of the living address. It's recommended to sent in following format: The country subdivision code defined in ISO 3166-1. Mandatory for the US and Canada.                                                                                                                                                                                                                                                                                                                                                                                      |
|                   |                   | city                | String          |             | 20          | Yes          | Living city. May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                   |                   | address             | String          |             | 100         | Yes          | Living home address. May include whitespaces, hyphens, apostrophes, commas, quotes, dots, slashes and semicolons.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                   | birthDate         |                     | String          |             | 10          | No           | Customer date of birth in the YYYY-MM-DD format. The value cannot be a future date.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| returnUrls        |                   |                     |                 |             |             | No           | Return URLs are the URLs where customer returns by pressing “Back to the shop” or “Cancel” button in Payment Page mode and redirected automatically in Gateway mode.                                                                                                                                                                                                                                                                                                                                                                                                 |
|                   | returnUrl         |                     | String          |             | 512         | No           | Overrides default success URL, decline URL, cancel URL (only in Payment page mode), inprocess URL.<br />Return URL can be used separately or together with other url parameters.                                                                                                                                                                                                                                                                                                                                                                                     |
|                   | successUrl        |                     | String          |             | 512         | No           | Overrides default success URL only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                   | declineUrl        |                     | String          |             | 512         | No           | Overrides default decline URL only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                   | cancelUrl         |                     | String          |             | 512         | No           | Overrides default cancel URL only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                   | inprocessUrl      |                     | String          |             | 512         | No           | Special URL for In process status of transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| settings          |                   |                     |                 |             |             | No           | Settings parameters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                   | cardholder        |                     |                 |             |             | No           | Defines the cardholder name input field element on the form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                   |                   | required            | Boolean         |             |             | No           | Supported values:<br />• true - customer must enter a valid cardholder name<br />• false - cardholder name is an optional field                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                   | cpf               |                     |                 |             |             | No           | Defines the cpf input field element on the form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|                   |                   | enabled             | Boolean         |             |             | No           | Supported values:<br />• true - customer must enter a valid cpf<br />• false - cpf is not displayed in the form                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                   | livingAddress     |                     |                 |             |             | No           | Defines the block with living address input fields on the form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                   |                   | enabled             | Boolean         |             |             | No           | Supported values:<br>• true - living address fields are displayed in the form<br>• false - living address fields are not displayed in the form field                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                   | events            |                     |                 |             |             | No           | Events parameters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                   |                   | binServiceLookup    | Boolean         |             |             | No           | Defines BIN_SERVICE_LOOKUP event. Supported values: <br>• true - event with card information will received<br>• false - event with card information won't received.                                                                                                                                                                                                                                                                                                                                                                                                  |
|                   |                   | cardNumberValidated | Boolean         |             |             | No           | Defines CARD_NUMBER_VALIDATED event. Supported values: <br>• true - event with card information will received<br>• false - event with card information won't received.                                                                                                                                                                                                                                                                                                                                                                                               |
|                   |                   | formInvalid         | Boolean         |             |             | No           | Defines FORM_INVALID event. Supported values: <br>• true - event with card information will received<br>• false - event with card information won't received.                                                                                                                                                                                                                                                                                                                                                                                                        |

### PayBySavedCard data

PayBySavedCard widget accepts the following parameters:

| Field             | Subfield 1        | Subfield 2  | Type    | Min. length | Max. length | Is mandatory | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ----------------- | ----------- | ------- | ----------- | ----------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **token**         |                   |             | String  |             | 128         | Yes          | Saved card token.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **lastDigits**    |                   |             | String  | 4           | 4           | Yes          | The 4 last digits of saved card.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| merchantName      |                   |             | String  | 1           | 50          | No           | Merchant order data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **merchantOrder** |                   |             |         |             |             | Yes          | Merchant order data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                   | **id**            |             | String  |             | 50          | Yes          | Order ID used by the merchant’s shopping cart.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|                   | **description**   |             | String  |             | 200         | Yes          | Description of product/service being sold.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                   | items             |             |         |             |             | No           | Array of items (in the shopping cart).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                   |                   | **name**    | String  |             | 50          | Yes          | The name of product / service, provided to the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                   |                   | description | String  |             | 200         | No           | The description of product / service, provided to the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|                   |                   | count       | Integer |             |             | No           | The count of product / service, provided to the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                   |                   | price       | Decimal |             |             | No           | Price of product / service with dot as a decimal separator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| shippingAddress   |                   |             |         |             |             | No           | Shipping Address                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|                   | **country**       |             | String  | 2           | 3           | Yes          | ISO 3166-1 code of delivery country: 2 or 3 latin letters or numeric code                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                   | state             |             | String  |             | 40          | No           | The state or province of the shipping address associated with the card being used for this purchase.<br />It's recommended to send in following format: The country subdivision code defined in ISO 3166-2.<br />May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                          |
|                   | zip               |             | String  |             | 12          | No           | Delivery postal code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|                   | city              |             | String  |             | 50          | No           | Delivery city. May include whitespaces, hyphens, apostrophes, commas and dots                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|                   | phone             |             | String  | 5           | 20          | No           | Valid customer phone number                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                   | addrLine1         |             | String  |             | 50          | No           | First line of the street address or equivalent local portion of the Cardholder shipping address associated with the card used for this purchase. May include street and house number.                                                                                                                                                                                                                                                                                                                                                                     |
|                   | addrLine2         |             | String  |             | 50          | No           | Second line of the street address or equivalent local portion of the Cardholder shipping address associated with the card used for this purchase.                                                                                                                                                                                                                                                                                                                                                                                                         |
| **paymentMethod** |                   |             | String  |             | 50          | Yes          | Payment method type name; insert `BANKCARD` value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **paymentData**   |                   |             |         |             |             |              | Yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|                   | **amount**        |             | Decimal |             |             | Yes          | The total transaction amount in selected currency with dot as a decimal separator, must be less than 100 millions.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   | **currency**      |             | String  |             | 3           | Yes          | ISO 4217 currency code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                   | note              |             | String  |             | 100         | No           | Note about the transaction that will not be displayed to customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   | dynamicDescriptor |             | String  |             | 25          | No           | Short description of the service or product, must be enabled by your manager to be used.<br />For Visa cards: maximum length 25 symbols, for MasterCard cards - 22 symbols.                                                                                                                                                                                                                                                                                                                                                                               |
|                   | transType         |             | String  | 2           | 2           | No           | Identifies the type of transaction being authenticated.<br />Supported values:<br />• 01 = Goods / Service Purchase<br />• 03 = Check Acceptance<br />• 10 = Account Funding • 11 = Quasi-Cash Transaction<br />• 28 = Prepaid Activation and Load Note: Values derived from the 8583 ISO Standard.                                                                                                                                                                                                                                                       |
| billingAddress    |                   |             |         |             |             | No           | Billing Address.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|                   | **country**       |             | String  | 2           | 3           | Yes          | ISO 3166-1 code of billing country: 2 or 3 latin letters or numeric code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                   | state             |             | String  |             | 40          | No           | The state or province of the billing address associated with the card being used for this purchase.<br />It's recommended to send in following format: The country subdivision code defined in ISO 3166-2.<br />May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                           |
|                   | **zip**           |             | String  |             | 12          | Yes          | Billing postal code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                   | **city**          |             | String  |             | 50          | Yes          | Billing city. May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|                   | **addrLine1**     |             | String  |             | 50          | Yes          | First line of the street address or equivalent local portion of the Cardholder billing address associated with the card used for this purchase.<br />May include whitespaces, hyphens, apostrophes, commas, quotes, dots, slashes and semicolons.<br />Required (if available) unless market or regional mandate restricts sending this information.<br />1-PA: Required unless market or regional mandate restricts sending this information.<br />02-NPA: Required (if available) unless market or regional mandate restricts sending this information. |
|                   | addrLine2         |             | String  |             | 50          | No           | Second line of the street address or equivalent local portion of the Cardholder billing address associated with the card used for this purchase. Required (if available) unless market or regional mandate restricts sending this information.                                                                                                                                                                                                                                                                                                            |
| **cardAccount**   |                   |             |         |             |             | No           | Card account data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   | recipientInfo     |             | String  |             | 500         | No           | Recipient full name. May include whitespaces, hyphens and apostrophes. Mandatory for money transfer operation.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **customer**      |                   |             |         |             |             | Yes          | Customer data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|                   | **email**         |             | String  |             | 256         | Yes          | Email address of the customer.<br />field is Optional for wallets where setting in PM "May omit customer email" is enabled.                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                   | device            |             |         |             |             | No           | Customer's device.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   |                   | fingerprint | String  |             | 256         | No           | The fingerprint of device.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                   | locale            |             | String  |             | 2           | No           | Preferred locale for the payment page (ISO 639-1 language code).<br />The default locale (en or other locale if it's set as default in Merchant account) will be applied if the selected locale (received in request) is not supported. Supported locales are: ar, az, bg, cs, de, el, en, es, fr, hu, hy, id, it, ja, ka, ko, ms, nl, pl, pt, ro, ru, sr, sv, th, tr, uk, vi, zh.                                                                                                                                                                        |
|                   | homePhone         |             | String  | 8           | 18          | No           | The home phone number provided by the Cardholder. Required (if available) unless market or regional mandate restricts sending this information.<br />Characters format: recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br />Refer to ITU-E.164 for additional information on format and length.                                                                                                          |
|                   | workPhone         |             | String  | 8           | 18          | No           | The work phone number provided by the Cardholder. Required (if available) unless market or regional mandate restricts sending this information.<br />Characters format: recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br />Refer to ITU-E.164 for additional information on format and length.                                                                                                          |
|                   | fullName          |             | String  | 1           | 255         | No           | Customer full name. May include whitespaces, hyphens and apostrophes. Mandatory for money transfer operation.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|                   | livingAddress     |             |         |             |             | No           | Living address. Mandatory for money transfer operation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                   |                   | country     | String  | 2           | 3           | Yes          | ISO 3166-1 code of living country: 2 or 3 latin letters or numeric code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                   |                   | state       | String  |             | 20          | No           | The state or province of the living address. It's recommended to sent in following format: The country subdivision code defined in ISO 3166-1. Mandatory for the US and Canada.                                                                                                                                                                                                                                                                                                                                                                           |
|                   |                   | city        | String  |             | 20          | Yes          | Living city. May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|                   |                   | address     | String  |             | 100         | Yes          | Living home address. May include whitespaces, hyphens, apostrophes, commas, quotes, dots, slashes and semicolons.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                   | birthDate         |             | String  |             | 10          | No           | Customer date of birth in the YYYY-MM-DD format. The value cannot be a future date.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| returnUrls        |                   |             |         |             |             | No           | Return URLs are the URLs where customer returns by pressing “Back to the shop” or “Cancel” button in Payment Page mode and redirected automatically in Gateway mode.                                                                                                                                                                                                                                                                                                                                                                                      |
|                   | returnUrl         |             | String  |             | 512         | No           | Overrides default success URL, decline URL, cancel URL (only in Payment page mode), inprocess URL.<br />Return URL can be used separately or together with other url parameters.                                                                                                                                                                                                                                                                                                                                                                          |
|                   | successUrl        |             | String  |             | 512         | No           | Overrides default success URL only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|                   | declineUrl        |             | String  |             | 512         | No           | Overrides default decline URL only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|                   | cancelUrl         |             | String  |             | 512         | No           | Overrides default cancel URL only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   | inprocessUrl      |             | String  |             | 512         | No           | Special URL for In process status of transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| settings          |                   |             |         |             |             | No           | Settings parameters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                   | livingAddress     |             |         |             |             | No           | Defines the block with living address input fields on the form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|                   |                   | enabled     | Boolean |             |             | No           | Supported values:<br>• true - living address fields are displayed in the form<br>• false - living address fields are not displayed in the form field                                                                                                                                                                                                                                                                                                                                                                                                      |
|                   | events            |             |         |             |             | No           | Events parameters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   |                   | formInvalid | Boolean |             |             | No           | Defines FORM_INVALID event. Supported values: <br>• true - event with card information will received<br>• false - event with card information won't received.                                                                                                                                                                                                                                                                                                                                                                                             |

## Customization

Widgets support UI customization for labels, styles. Customization parameters are applied to widget's instance upon creation via `props`.

Widgets consist of components set that includes elements. CSS-class or style-object can be assigned to an element in order to override the default one.

Name of widget's component starts with prefix `$`; name of element has no prefix.

Elements can have a set of states: field focus, input validation notice etc.

State naming template is `${elementName}_${stateName}`.

State customization must be performed via `customClasses` property only.

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/6_Style_customization.png)

### CSS classes

CSS-class name for its elements and states can be customized via `customClasses` property.

```javascript
props: {
  customClasses: {
    $payForm: {
      container: 'custom-pay-form',
    },
    $textInput: {
      label: 'custom-label',
    },
    $button: {
      button: 'custom-button',
    },
    $footer: {
      container: 'custom-footer',
    },
  },
  ...
}
// CSS
.custom-pay-form {
  background-color: #F1F2C2;
}
.custom-label {
  color: #F58A58;
}
.custom-button {
  background-color: #D1F555;
  border: 2px solid #000;
}
.custom-footer {
  background-color: #F1F2C2;
}
```

### CSS in JSON

It is possible to pass styles as css in json:

```js
const props = {
  ...,
  styles: {
    '.unl-js-sdk_form__body': {
      'background-color': 'red',
    },
  },
  ...
};
```

It is compiled into CSS:

```css
.unl-js-sdk_form__body {
  background-color: red;
}
```

### Inline styles

Customized inline styles for elements can be assigned via `customStyles` property. CSS styles must be pointed in snake-case.

```javascript
props: {
  customStyles: {
    $payForm: {
      container: {
        'background-color': '#F1F2C2',
      },
    },
    $textInput: {
      label: {
        'color': '#F58A58',
      },
    },
    $button: {
      button: {
        'background-color': '#D1F555',
        'border': '2px solid #000',
      },
    },
    $footer: {
      container: {
        'background-color': '#F1F2C2',
      },
    },
  },
  ...
}
```

#### Elements reference

| Component          | Element            | State   | Description                                                                    |
| ------------------ | ------------------ | ------- | ------------------------------------------------------------------------------ |
| textInput          |                    |         | Text field input component                                                     |
|                    | container          |         | Container-element for the rest of elements                                     |
|                    | control            |         | Defines input-field border and inner elements layout                           |
|                    |                    | focused | Focused field                                                                  |
|                    |                    | invalid | Input value is invalid                                                         |
|                    | rightSlot          |         | Right-sided block element that displays additional data, i.e. card brand icon  |
|                    | label              |         | Text field input label                                                         |
|                    |                    | focused | Focused field                                                                  |
|                    |                    | invalid | Input value is invalid                                                         |
|                    | input              |         | HTML input element                                                             |
|                    |                    | focused | Focused field                                                                  |
|                    |                    | invalid | Input value is invalid                                                         |
|                    | error              |         | Input error message                                                            |
| checkbox           |                    |         | Checkbox component                                                             |
|                    | container          |         | Container-element for the rest of elements                                     |
|                    | label              |         | Text input-field label                                                         |
| button             |                    |         | Button component                                                               |
|                    | container          |         | Container-element for button                                                   |
| loader             |                    |         | Loader-component that indicates request sending                                |
|                    | container          |         | Container-element for the rest of elements; overlaps displayed form            |
|                    | block              |         | Loader and text component; placed in the center of container element           |
|                    | spinner            |         | Animated loader SVG-icon                                                       |
|                    | text               |         | Text label                                                                     |
| footer             |                    |         | Footer component                                                               |
|                    | container          |         | Container-element for SVG-icons                                                |
| cardForm           |                    |         | Card form component                                                            |
|                    | container          |         | Container-element for the rest of elements                                     |
|                    | body               |         | Container-element of the form                                                  |
|                    | title              |         | Form's title text                                                              |
|                    | textInput          |         | The same as $textInput.container, but for inline-styles it has higher priority |
|                    | cardInput          |         | Card input container style                                                     |
|                    | cardholderInput    |         | Cardholder input container style                                               |
|                    | dateInput          |         | Date input container style                                                     |
|                    | cvvInput           |         | CVV2/CVC2 code input container style                                           |
|                    | cpfInput           |         | CPF input container style                                                      |
|                    | submit             |         | The same as $button.container, but for inline-styles it has higher priority    |
|                    | footer             |         | The same as $footer.container, but for inline-styles it has higher priority    |
| payForm            |                    |         | Payment form component                                                         |
|                    | container          |         | Container-element for the rest of elements                                     |
|                    | body               |         | Container-element for the form                                                 |
|                    | title              |         | Form's title text                                                              |
|                    | total              |         | Total amount displayed                                                         |
|                    | order              |         | Order ID displayed                                                             |
|                    | textInput          |         | The same as $textInput.container, but for inline-styles it has higher priority |
|                    | cardInput          |         | Card input container style                                                     |
|                    | cardholderInput    |         | Cardholder input container style                                               |
|                    | dateInput          |         | Date input container style                                                     |
|                    | cvvInput           |         | CVV2/CVC2 code input container style                                           |
|                    | checkbox           |         | The same as $checkbox.container, but for inline-styles it has higher priority  |
|                    | cpfInput           |         | CPF input container style                                                      |
|                    | installmentsSelect |         | Installments select container style                                            |
|                    | submit             |         | The same as $button.container, but for inline-styles it has higher priority    |
|                    | footer             |         | The same as $footer.container, but for inline styles it has higher priority    |
| payBySavedCardForm |                    |         | Payment by saved card form component                                           |
|                    | container          |         | Container-element for the rest of elements                                     |
|                    | body               |         | Container-element for the form                                                 |
|                    | title              |         | Form's title text                                                              |
|                    | total              |         | Total amount displayed                                                         |
|                    | order              |         | Order ID displayed                                                             |
|                    | textInput          |         | The same as $textInput.container, but for inline-styles it has higher priority |
|                    | cardInput          |         | Card input container style                                                     |
|                    | cvvInput           |         | CVV2/CVC2 code input container style                                           |
|                    | submit             |         | The same as $button.container, but for inline-styles it has higher priority    |
|                    | footer             |         | The same as $footer.container, but for inline styles it has higher priority    |

### Texts

Texts customization can be applied via `customTexts` property.

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/7_Text_customization.png)

```javascript
props: {
  customTexts: {
    'save-card.label': 'Add this card',
    submit: 'Confirm payment',
  },
  ...
}
```

#### CardForm elements

| Text                                      | Description                                                |
| ----------------------------------------- | ---------------------------------------------------------- |
| title                                     | Form's title text                                          |
| card-number.label                         | Card number input-field description                        |
| card-number.placeholder                   | Placeholder for card number input-field                    |
| card-number.required-error                | Error text for required card number input-field            |
| card-number.invalid-error                 | Error text for invalid value in card number input-field    |
| cardholder.label                          | Cardholder input-field description                         |
| cardholder.placeholder                    | Placeholder for cardholder input-field                     |
| cardholder.required-error                 | Error text for required cardholder input-field             |
| cardholder.invalid-error                  | Error text for invalid value in cardholder input-field     |
| expiry-date.label                         | Expiry date input-field description                        |
| expiry-date.placeholder                   | Placeholder for expiry date input-field                    |
| expiry-date.required-error                | Error text for required expiry date input-field            |
| expiry-date.invalid-error                 | Error text for invalid value in expiry date input-field    |
| cvv2-cvc2.label                           | CVV2/CVC2 input-field description                          |
| cvv2-cvc2.placeholder                     | Placeholder for CVV2/CVC2 input-field                      |
| cvv2-cvc2.required-error                  | Error text for required CVV2/CVC2 input-field              |
| cvv2-cvc2.invalid-error                   | Error text for invalid value in CVV2/CVC2 input-field      |
| living-country-select.placeholder         | Placeholder for living country select-field                |
| living-country-select.focused-placeholder | Placeholder for focused living country select-field        |
| living-country-select.required-error      | Error text for required living country select-field        |
| living-state.placeholder                  | Placeholder for living state input-field                   |
| living-state.required-error               | Error text for required living state input-field           |
| living-state.invalid-error                | Error text for invalid value in living state input-field   |
| living-city.placeholder                   | Placeholder for living city input-field                    |
| living-city.required-error                | Error text for required living city input-field            |
| living-city.invalid-error                 | Error text for invalid value in living city input-field    |
| living-address.placeholder                | Placeholder for living address input-field                 |
| living-address.required-error             | Error text for required living address input-field         |
| living-address.invalid-error              | Error text for invalid value in living address input-field |
| submit                                    | Submit-control label                                       |

#### CardSavingForm elements

| Text                       | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| title                      | Form's title text                                       |
| card-number.label          | Card number input-field description                     |
| card-number.placeholder    | Placeholder for card number input-field                 |
| card-number.required-error | Error text for required card number input-field         |
| card-number.invalid-error  | Error text for invalid value in card number input-field |
| cardholder.label           | Cardholder input-field description                      |
| cardholder.placeholder     | Placeholder for cardholder input-field                  |
| cardholder.required-error  | Error text for required cardholder input-field          |
| cardholder.invalid-error   | Error text for invalid value in cardholder input-field  |
| expiry-date.label          | Expiry date input-field description                     |
| expiry-date.placeholder    | Placeholder for expiry date input-field                 |
| expiry-date.required-error | Error text for required expiry date input-field         |
| expiry-date.invalid-error  | Error text for invalid value in expiry date input-field |
| cvv2-cvc2.label            | CVV2/CVC2 input-field description                       |
| cvv2-cvc2.placeholder      | Placeholder for CVV2/CVC2 input-field                   |
| cvv2-cvc2.required-error   | Error text for required CVV2/CVC2 input-field           |
| cvv2-cvc2.invalid-error    | Error text for invalid value in CVV2/CVC2 input-field   |
| submit                     | Submit-control label                                    |

#### PayForm elements

| Text                                      | Description                                                |
| ----------------------------------------- | ---------------------------------------------------------- |
| total                                     | Label-text before total amount                             |
| order                                     | Order value label                                          |
| card-number.label                         | Card number input-field description                        |
| card-number.placeholder                   | Placeholder for card number input-field                    |
| card-number.required-error                | Error text for required card number input-field            |
| card-number.invalid-error                 | Error text for invalid value in card number input-field    |
| cardholder.label                          | Cardholder input-field description                         |
| cardholder.placeholder                    | Placeholder for cardholder input-field                     |
| cardholder.required-error                 | Error text for required cardholder input-field             |
| cardholder.invalid-error                  | Error text for invalid value in cardholder input-field     |
| expiry-date.label                         | Expiry date input-field description                        |
| expiry-date.placeholder                   | Placeholder for expiry date input-field                    |
| expiry-date.required-error                | Error text for required expiry date input-field            |
| expiry-date.invalid-error                 | Error text for invalid value in expiry date input-field    |
| cvv2-cvc2.label                           | CVV2/CVC2 input-field description                          |
| cvv2-cvc2.placeholder                     | Placeholder for CVV2/CVC2 input-field                      |
| cvv2-cvc2.required-error                  | Error text for required CVV2/CVC2 input-field              |
| cvv2-cvc2.invalid-error                   | Error text for invalid value in CVV2/CVC2 input-field      |
| cpf.label                                 | CPF input-field description                                |
| cpf.placeholder                           | Placeholder for CPF input-field                            |
| cpf.required-error                        | Error text for required CPF input-field                    |
| cpf.invalid-error                         | Error text for invalid value in CPF input-field            |
| living-country-select.placeholder         | Placeholder for living country select-field                |
| living-country-select.focused-placeholder | Placeholder for focused living country select-field        |
| living-country-select.required-error      | Error text for required living country select-field        |
| living-state.placeholder                  | Placeholder for living state input-field                   |
| living-state.required-error               | Error text for required living state input-field           |
| living-state.invalid-error                | Error text for invalid value in living state input-field   |
| living-city.placeholder                   | Placeholder for living city input-field                    |
| living-city.required-error                | Error text for required living city input-field            |
| living-city.invalid-error                 | Error text for invalid value in living city input-field    |
| living-address.placeholder                | Placeholder for living address input-field                 |
| living-address.required-error             | Error text for required living address input-field         |
| living-address.invalid-error              | Error text for invalid value in living address input-field |
| save-card.label                           | Card binding option checkbox description                   |
| installments.label                        | Installments tooltip-field description                     |
| submit                                    | Submit-control label                                       |

#### PayBySavedCardForm elements

| Text                                      | Description                                                |
| ----------------------------------------- | ---------------------------------------------------------- |
| total                                     | Label-text before total amount.                            |
| order                                     | Order value label                                          |
| saved-card-number.label                   | Masked 4-last cards's digits element label                 |
| cvv2-cvc2.label                           | CVV2/CVC2 input-field description                          |
| cvv2-cvc2.placeholder                     | Placeholder for CVV2/CVC2 input-field                      |
| cvv2-cvc2.required-error                  | Error text for required CVV2/CVC2 input-field              |
| cvv2-cvc2.invalid-error                   | Error text for invalid value in CVV2/CVC2 input-field      |
| living-country-select.placeholder         | Placeholder for living country select-field                |
| living-country-select.focused-placeholder | Placeholder for focused living country select-field        |
| living-country-select.required-error      | Error text for required living country select-field        |
| living-state.placeholder                  | Placeholder for living state input-field                   |
| living-state.required-error               | Error text for required living state input-field           |
| living-state.invalid-error                | Error text for invalid value in living state input-field   |
| living-city.placeholder                   | Placeholder for living city input-field                    |
| living-city.required-error                | Error text for required living city input-field            |
| living-city.invalid-error                 | Error text for invalid value in living city input-field    |
| living-address.placeholder                | Placeholder for living address input-field                 |
| living-address.required-error             | Error text for required living address input-field         |
| living-address.invalid-error              | Error text for invalid value in living address input-field |
| submit                                    | Submit-control label                                       |

### Post message

When integrating the form widget, you have the ability to programmatically submit the form using the postMessage method. This can be particularly useful for applications requiring advanced handling or integration with parent windows.

#### Form submit

To submit the form widget, you can send a message with the following structure:

```js
// Find iframe element
const iframe = document.getElementById('js-sdk');

const data = {
  submit: true,
};

// Pass config if iframe loaded
iframe.contentWindow.postMessage(data, '*');
```

Upon receiving the message containing { submit: true }, the form widget will:

- Validate: the form fields will be validated according to the specified rules (e.g., required fields, proper formats).
- Submit: if the validation is successful, the form will be submitted automatically.

#### Post Messages from JS SDK

The JS SDK sends Post Messages to the parent window to communicate the status of form processing and results. Your application should listen for these messages to handle different states of the widget.

All Post Messages from JS SDK have the following structure:

```js
{
  event: 'EVENT_NAME',
  origin: 'UNLIMIT_JS_SDK',
  // Additional data depending on event type
}
```

##### BIN_SERVICE_LOOKUP Event

When form (CardForm, CardSavingForm or PayForm) receives card brand information, the JS SDK sends this message:

```js
{
  event: 'BIN_SERVICE_LOOKUP',
  origin: 'UNLIMIT_JS_SDK',
  data: {
    bin: '4000000',
    card_brand: 'VISA',
    card_type: 'CREDIT',
    card_issuer: 'JPMORGAN CHASE BANK',
    country: 'US'
  }
}
```

##### CARD_NUMBER_VALIDATED Event

When the user enters valid card number in the form (CardForm, CardSavingForm or PayForm), the JS SDK sends this message:

```js
{
  event: 'CARD_NUMBER_VALIDATED',
  origin: 'UNLIMIT_JS_SDK',
  data: {
    last4: '1111'
  }
}
```

##### FORM_INVALID Event

When the user fills out the any form (CardForm, CardSavingForm, PayForm, or PayBySavedCardForm) incorrectly, the JS SDK sends this message:

```js
{
  event: 'FORM_INVALID',
  origin: 'UNLIMIT_JS_SDK',
  errors: {
    CARD_NUMBER: ['REQUIRED'],
    EXPIRY_DATE: ['REQUIRED'],
    SECURITY_CODE: ['REQUIRED']
  }
}
```

##### PROCESSING_START Event

When any form (CardForm, CardSavingForm, PayForm, or PayBySavedCardForm) begins processing a submission, it sends this message:

```js
{
  event: 'PROCESSING_START',
  origin: 'UNLIMIT_JS_SDK'
}
```

##### PROCESSING_SUCCESS Event

When form processing completes successfully, the JS SDK sends a result message:

```js
{
  event: 'PROCESSING_SUCCESS',
  origin: 'UNLIMIT_JS_SDK',
  type: 'SUCCESS',
  data: {
    // Response data from the payment/cardbinding/cardsaving API
  }
}
```

For CardSavingForm, this event contains a temporary token that represents the saved card:

```js
{
  event: 'PROCESSING_SUCCESS',
  origin: 'UNLIMIT_JS_SDK',
  type: 'SUCCESS',
  data: {
    status: 200,
    body: {
      card_account: {
        temporary_token: '1513a0a0-937b-44ea-911d-8d8469a943bf',
        pan_last_4: '1111',
        token_expires_at: '2025-08-21T10:38:03.439'
      }
    }
  }
}
```

##### PROCESSING_ERROR Event

When form processing fails or encounters an error, the JS SDK sends an error message:

```js
{
  event: 'PROCESSING_ERROR',
  origin: 'UNLIMIT_JS_SDK',
  type: 'ERROR',
  error: {
    // Error details from the API or processing
  }
}
```

**Usage Example:**

```js
// Listen for messages from the JS SDK
window.addEventListener('message', function (event) {
  // Check if the message is from Unlimit JS SDK
  if (event.data.origin === 'UNLIMIT_JS_SDK') {
    switch (event.data.event) {
      case 'PROCESSING_START':
        console.log('Form processing started');
        showLoadingIndicator();
        break;

      case 'PROCESSING_SUCCESS':
        console.log('Form processing completed successfully:', event.data.data);
        hideLoadingIndicator();
        handleSuccessfulPayment(event.data.data);
        break;

      case 'PROCESSING_ERROR':
        console.log('Form processing failed:', event.data.error);
        hideLoadingIndicator();
        handlePaymentError(event.data.error);
        break;

      default:
        console.log('Unknown event:', event.data.event);
    }
  }
});

function showLoadingIndicator() {
  document.getElementById('loading').style.display = 'block';
}

function hideLoadingIndicator() {
  document.getElementById('loading').style.display = 'none';
}

function handleSuccessfulPayment(data) {
  // Handle successful payment
}

function handlePaymentError(error) {
  // Handle payment error
}
```

**When these messages are sent:**

- **BIN_SERVICE_LOOKUP**: Sent when card brand information is received
- **CARD_NUMBER_VALIDATED**: Sent when valid card number is entered
- **FORM_INVALID**: Sent when submission form is filled out incorrectly
- **PROCESSING_START**: Sent when any form submission begins processing
- **PROCESSING_SUCCESS**: Sent when processing completes successfully
- **PROCESSING_ERROR**: Sent when processing fails or encounters an error

These messages allow your application to respond to all stages of form processing, providing complete control over the user experience and error handling.
