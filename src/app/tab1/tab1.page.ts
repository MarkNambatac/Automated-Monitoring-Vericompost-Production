import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  output: any;
  message: any;
  responseText: any;
  unpairedDevices: any;
  pairedDevices: any;
  statusMessage: any;
  gettingDevices: boolean;
  items: any = [];

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, 
    private bluetoothSerial: BluetoothSerial, public loadingController: LoadingController,
    private storage: Storage) {
      bluetoothSerial.enable();
  }

  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;


    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {

      });
    }, (err) => {
      console.log(err);
    });

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    }, (err) => {

    })
  }

  success = (data) => alert(data);
  fail = (error) => alert(error);

  async selectDevice(address: any) {
    try { 
      const alertButts = await this.alertCtrl.create({
        header: 'Connect',
        message: 'Do you want to connect with?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
            this.data();
          }
        }]
      });

      try {
        await alertButts.present();
      } catch(e) {
        console.log("Error napud haha");
      }
    } catch(e) {
      console.log("Error Occurred");
    }   
  }


  async disconnect() {
    try {
      const disconnectButt = await this.alertCtrl.create({
        header: 'Disconnect Device',
        message: 'Do you want to Disconnect?',
        buttons: [{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              disconnectButt.dismiss();
            }
          },
          {
            text: 'Disconnect',
            handler: () => {
              this.bluetoothSerial.disconnect();
              this.gettingDevices = null;
            }
          }
        ]
      });
      try {
        await disconnectButt.present();
      }
      catch(e) {
        console.log("Error napud");
      }
      
    } catch(e) {
      console.log("error Occurred");
    }
    
  }

  data() {
    setInterval(() => {
      this.read();
    }, 3000);
  }


  read() {
    this.bluetoothSerial.readUntil('\n').then((data) => {
      console.log(`Data : ${data}`);
      var actual_data = JSON.parse(data);
      this.output = actual_data;
      console.log(actual_data.temperature);
      this.addItem(data);
    });
  }

  async clear() {
    this.storage.clear();
  }

  async addItem(item) { 
    try {
      this.storage.get('myitem')
        .then((data) => {
          if(data) {
            console.log("Naa nay myitem daan");
            this.items.push(item);
            return this.storage.set('myitem', this.items);
          } else {
            console.log("Wala pay myitem haha");
            return this.storage.set('myitem', item);
          }
          },
        error => console.error(error)
        );
    } catch(e) {
      console.log(e);
    }
  }


}
