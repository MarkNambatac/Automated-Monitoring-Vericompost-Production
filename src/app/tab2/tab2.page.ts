import { Component } from '@angular/core';
import { NativeStorage} from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  message1: any;
  constructor(private storage: Storage) {
    
  }

  getData() {
    this.storage.get('myitem')
  .then(
  data => {
    this.message1 = data;
    console.log(`From tab 2: ${data}`);
  },
    error => console.error(error)
  );
  }

  async clear() {
    this.storage.clear();
  }

}
