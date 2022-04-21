import { Component, OnInit } from '@angular/core';
import { Platform, NavController,LoadingController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  features: any[] = [
    {id: 1, name: 'Catering', src: 'assets/images/cat.png', background: 'rgba(27,150,181, 0.1)', page: ''},
  ]; 

  laundry: any[] = [
    {id: 1, name: 'Laundry', src: 'assets/icons/laundry.png', background: 'rgba(27,150,181, 0.1)', page: ''},
  ];

  housekeeping: any[] = [
    {id: 1, name: 'House Keeping', src: 'assets/icons/hk.png', background: 'rgba(27,150,181, 0.1)', page: ''},
  ];

  admaintan: any[] = [
    {id: 1, name: 'Maintenance', src: 'assets/icons/mainten.png', background: 'rgba(27,150,181, 0.1)', page: ''},
  ];


  Username:any;
  DataLogin:any;
  constructor(
    public loadingController: LoadingController,
    private serviceService: ServiceService,
    private router: Router,
    public util: UtilService

  ) {}

  ngOnInit() {
    //ambil data dari localstorage
    let dataStorage=JSON.parse(localStorage.getItem(this.serviceService.TOKEN_KEY));
    // this.Username=dataStorage.data.Username;
    this.serviceService.CekUser().subscribe(
      data => {
        this.DataLogin=data;
        console.log(this.DataLogin)
        this.Username=this.DataLogin.body.name;
      },
      error => {
        console.log("error");
      }
    );
  }

  async logout(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    localStorage.clear();
    this.serviceService.logout();
    loading.dismiss();
   }


openRest() {
  this.router.navigate(['catering']);
}

openHkeeping() {
  this.router.navigate(['housekeeping']);
}

openLaundry(){
  this.router.navigate(['aduanlaundry']);
}

openAdmaintan(){
  this.router.navigate(['aduanmaintenance']);
}


}






