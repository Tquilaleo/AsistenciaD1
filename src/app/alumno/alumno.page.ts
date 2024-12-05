import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ConsumoApiService } from '../service/consumoapi.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  now: Date = new Date(); 
  nombre: string = ''; 
  fecha: string = this.now.toLocaleString(); 
  capturedPhoto: string | null = null;
  latitude: number | null = null;
  longitude: number | null = null;

  constructor(private router: Router, 
    private alertController: AlertController, 
    consumoapi: ConsumoApiService,
    private camera: Camera, 
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.nombre = navigation.extras.state['nombre'];
    }
  }

  salirAplicacion() {
    this.router.navigate(['/login']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Activa tu ubicación',
      message: 'Debes activar tu ubicación para poder registrar tu asistencia',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
            this.router.navigate(['/qralumno']);
          },
        },
      ],
    });

    await alert.present();
    
  }

   // Función para tomar la foto
   async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    try {
      const imageData = await this.camera.getPicture(options);
      this.capturedPhoto = `data:image/jpeg;base64,${imageData}`;
      console.log('Foto tomada correctamente:', this.capturedPhoto);
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  // Función para obtener la ubicación
  async getLocation() {
    try {
      const position = await this.geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log('Ubicación obtenida:', this.latitude, this.longitude);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }


}
