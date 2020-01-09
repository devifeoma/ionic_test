import { Component } from '@angular/core';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { Rave, RavePayment, Misc } from 'rave-ionic4';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

 amount:number = 3700.00;

  constructor(
  private rave: Rave, 
  private ravePayment: RavePayment, 
  private misc: Misc,
  private iab: InAppBrowser
    ) { 
    }



 ravePay() {
      this.rave.init(true, "FLWPUBK_TEST-11a8d0aa19dfbe93e9935230997e57ad-X") //true = production, false = test
      .then(_ => {
        var paymentObject = this.ravePayment.create({
          customer_email: "user@example.com",
          amount: this.amount,
          customer_phone: "234099940409",
          currency: "NGN",
          txref:`JUDITH-qwerty`,
          meta: [{
              metaname: "flightID",
              metavalue: "AP1234"
          }],
          // redirect_url:"http://localhost:8101/home"
      })
        this.rave.preRender(paymentObject)
          .then(secure_link => {
            secure_link = secure_link + " ";
            console.log(String(secure_link), typeof secure_link);
            const browser: InAppBrowserObject = this.rave.render(secure_link, this.iab);
            // const browser = this.iab.create(String(secure_link), "_blank");
            console.log(browser);
            console.log("browser: " + browser);
            console.log("rave: " + this.iab);
            console.log("link: " + secure_link);
            // verifyTransaction();
  
            browser.on("loadstop")
                .subscribe((event: InAppBrowserEvent) => {
                  // .subscribe(event => {
                    console.log("the event we are loing for: ", event);
                  if(event.url.indexOf('https://your-callback-url') != -1) {
                    if(this.rave.paymentStatus('url') == 'failed') {
                      console.log("failed Message");
                      console.log("Browser:", browser);
                    }else {
                      console.log("Transaction Succesful");

                    }
                    // browser.close()
                  }
                })
          }).catch(error => {
            // Error or invalid paymentObject passed in
            console.log ("error", error);
          })
      })

    }

}
