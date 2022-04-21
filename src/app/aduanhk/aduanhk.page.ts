import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavController, ModalController, LoadingController, ToastController,Platform } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { ServiceService } from '../services/service.service';
import {Observable, ReplaySubject, throwError} from "rxjs/index";
import { catchError } from 'rxjs/operators';
import { UtilService } from 'src/app/services/util.service';



@Component({
  selector: 'app-aduanhk',
  templateUrl: './aduanhk.page.html',
  styleUrls: ['./aduanhk.page.scss'],
})
export class AduanhkPage implements OnInit {
  FormAduanHk:FormGroup;
  authenticationState = new ReplaySubject(); 
  authService: any;
  message:any;
  validations = {
    'lokasi': [
      { type: 'required', message: 'lokasi harus diisi.' }
    ],
    'deskripsi': [
      { type: 'required', message: 'deskripsi harus diisi.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder, 
    private navCtrl: NavController, 
    public loadingController: LoadingController,
    public modalController: ModalController,
    private platform: Platform,
    public toastController: ToastController,
    private serviceService: ServiceService,
    private router: Router,
    public util: UtilService
  ) { }

  ngOnInit() {
    this.FormAduanHk=this.formBuilder.group({
      lokasi:new FormControl('', Validators.compose([
        Validators.required
      ])),
      deskripsi:new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  async submitAduanHk(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();

    this.serviceService.submitaduanhk(this.FormAduanHk.value, 'housekeeping/add').subscribe(
      data => {
        this.presentToast("Aduan Anda Terkirim");
        console.log(this.FormAduanHk.value);
        this.FormAduanHk.reset();
        loading.dismiss();
      },
         error => {
          this.presentToast(error);
          loading.dismiss();
      }
    );
  }

  async presentToast(Message) {
    const toast = await this.toastController.create({
      message: Message,
      duration: 2500,
      position: "bottom"
    });
    toast.present();
  }
  onBack() {
    this.router.navigate(['home']);
  }


  }


