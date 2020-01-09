# myraveapp
Implementation of inline payment for rave in ionic 4/5

# Prerequisites

TypeScript,
JavaScript,
CSS and Sass,
HTML.

# Installing Ionic CLI 5 and Cordova
- npm install -g ionic cordova

- ionic start myraveapp blank

- cd myraveapp

- npm install --save rave-ionic4

- ionic cordova plugin add cordova-plugin-inappbrowser

- npm install --save @ionic-native/in-app-browser

- Add the module to your AppModule

- Ensure that you have set up a redirect url to handle the response sent from rave. See here for guide lines on how to set up your redirect url

# Usage

import { Rave, RavePayment, Misc } from 'rave-ionic4';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/

constructor(
  private rave: Rave, 
  private ravePayment: RavePayment, 
  private misc: Misc,
  private iab: InAppBrowser,
  ) { }

...


this.rave.init(PRODUCTION_FLAG, "YOUR_PUBLIC_KEY")
      .then(_ => {
        var paymentObject = this.ravePayment.create({
          customer_email: "user@example.com",
          amount: 2000,
          customer_phone: "234099940409",
          currency: "NGN",
          txref: "rave-123456",
          meta: [{
              metaname: "flightID",
              metavalue: "AP1234"
          }]
      })
        this.rave.preRender(paymentObject)
          .then(secure_link => {
            secure_link = secure_link +" ";
            const browser: InAppBrowserObject = this.rave.render(secure_link, this.iab);
            browser.on("loadstop")
                .subscribe((event: InAppBrowserEvent) => {
                  if(event.url.indexOf('https://your-redirect-url') != -1) {
                    if(this.rave.paymentStatus(url) == 'failed') {
                      this.alertCtrl.create({
                        title: "Message",
                        message: "Oops! Transaction failed"
                      }).present();
                    }else {
                      this.alertCtrl.create({
                        title: "Message",
                        message: "Transaction successful"
                      }).present();
                    }
                    browser.close()
                  }
                })
          }).catch(error => {
            // Error or invalid paymentObject passed in
          })
      })


# Instance Members

init(PRODUCTION_FLAG, PUBLIC_KEY)

You must call the init method with the PRODUCTION_FLAG set to true or false and your PUBLIC KEY. If your production flag is set to true, you will need to pass in your live public key otherwise, you pass in your sandbox public key

- Returns: Promise
preRender(validatedPaymentObject) You must preconnect to Rave to obtain a secure link that will enable you to load the payment UI. Prior to calling this method you must have called RavePayment.create() to validate your payment object.

- Returns: Promise
render(paymentLink) Start the Rave UI to collect payment from user.

- Returns: InAppBrowserObject
- Use the InAppBrowserObject returned to close the modal once the transaction completes by binding to the loadend event and checking for your redirect url as was shown above.

- paymentStatus(url) Get's the status of the transaction and returns it as a string. The status could either be success or ````failed```.

# Parameter(s)

- url: this is the url gotten from the inappbroswer event event.url

- Returns: String

You should use the returned status to determine whether or not you shoud show a success or error message to your users.

NOTE: IOS users may still need to rely on the Done button at the bottom left of the opened.

# Rave Payment
create(paymentObject) You must validate the paymentObject you want to use to load the Rave payment UI. See https://developer.flutterwave.com/docs/rave-inline-1 for more documentation of the parameters.

Returns: Object (either an error or your validated payment object)
- amount() The amount of the payment

- email() The customer's email

- txref() The transaction reference of the payment

- currency() The currency of the payment

# Test bank accounts
Here are the test account details on rave.

- Access Bank Account number: 0690000031 otp: 12345

- Providus Bank Account number: 5900102340, 5900002567 otp: 12345

- Test card details on rave Here is a test card you can use to test for a transaction:

- Test MasterCard PIN authentication 5531 8866 5214 2950 cvv 564 Expiry: 09/22 Pin 3310 otp 12345

- Test Visa Card 3D-Secure authentication 4187 4274 1556 4246 cvv: 828 Expiry: 09/21 Pin 3310 otp 12345

- Test MasterCard 3DSecure authentication 5438 8980 1456 0229 cvv 564 Expiry: 10/20 Pin 3310 otp 12345

- Test Mastercard 3DSecure authentication 2 5399 8383 8383 8381 cvv 470 Expiry: 10/22 Pin 3310 otp 12345

- Test NoAuth Visa Card 4751 7632 3669 9647 Expiry: 09/21

- Test VisaCard 3D-Secure Authentication 4242 4242 4242 4242 cvv: 812 Expiry: 01/21 Pin 3310 otp 12345

- Test Verve Card (PIN) 5061 4604 1012 0223 210 Expiry Month 12 Expiry Year 21 cvv: 780 Pin: 3310 otp 12345

- Test VisaCard (Address Verification) 4556 0527 0417 2643 cvv: 899 Expiry: 01/21

- Test card Declined (Address Verification) 5143 0105 2233 9965 cvv 276 Expiry: 08/21 Pin 3310

- Test Card Fraudulent 5590 1317 4329 4314 cvv 887 Expiry: 11/20 Pin 3310 otp 12345

- Test Card Insufficient Funds 5258 5859 2266 6506 cvv 883 Expiry: 09/21 Pin 3310 otp 12345

- Pre-authorization Test Card 5377 2836 4507 7450 cvv 789 Expiry: 09/21 Pin 3310

- Test card - Do Not Honour 5143010522339965 cvv 276 Expiry: 08/21 Pin 3310

- Test Card - Insufficient Funds 5258585922666506 cvv 883 Expiry: 09/21 Pin 3310 otp 12345

- Test Card - Invalid Transaction 5551658157653822 Cvv 276 Expiry: 08/21

- Test Card - Restricted Card, Retain Card 5551651630381384 Cvv 276 Expiry: 08/21

- Test Card - Function Not Permitted to Cardholder 5258582054729020 Cvv 887 Expiry: 11/20

- Test Card - Function Not Permitted to Terminal 5258588264565682 Cvv 887 Expiry: 11/20

- Test Card - Transaction Error 5258589130149016 Cvv 887 Expiry: 11/20

- Test Card - Incorrect PIN 5399834697894723 CVV 883 Expiry: 09/21 Pin 3325 otp 12345

# Support
For more details and technical questions regarding this sample code please notify us on (flutterwave issue tracker url) or please email at support@flutterwavego.com
