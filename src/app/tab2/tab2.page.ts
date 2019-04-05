import { Component } from '@angular/core';
import { NativeStorage} from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import {  BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  output: any;
  sensors : any = []
  constructor(private storage: Storage, private bluetoothSerial : BluetoothSerial, public events: Events) {
    events.subscribe('data:created', (data) => {
      this.output = data;
    })
  }  
}
