import { Component, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-escaneo-qr',
  templateUrl: './escaneo-qr.page.html',
  styleUrls: ['./escaneo-qr.page.scss'],
})
export class EscaneoQrPage implements OnDestroy, AfterViewInit {
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;
  scannedData: string = '';
  private codeReader: BrowserMultiFormatReader;
  scanning: boolean = false; 
  scanningSpace:boolean=true;

  constructor(private alertController: AlertController) {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngAfterViewInit() {
    this.startScan(); // Hace que se inicie el escaneo apenas se ingresa a la página
    console.log('entra y escanea');
    this.scannedData=("")
    console.log('limpia?');
  }

  async startScan() {
    console.log('Valor de video:', this.video); 


    if (!this.video) {
      console.error('Elemento video no está disponible');
      return;
    }
    this.scanning = true;
    this.codeReader
      .decodeFromVideoDevice(undefined, this.video.nativeElement, (result, err) => {
        if (result && this.scanning) {
          this.scanningSpace=false;

          this.scannedData = result.getText();
          this.scanning = false; 
          this.showAlert('Escaneado correctamente', `Resultado: ${this.scannedData}`);
          this.stopScan(); 
          console.log("Resultado :)")
        }
        if (err && !(err instanceof Error)) {
          console.error(err);
        }
      })
      .catch((err) => {
        console.error('Error en el escaneo: ', err);
        this.showAlert('Error', 'No se pudo iniciar el escaneo');
      });
  }
  

  

  stopScan() {
    this.scanning = false; 
    const videoElement = this.video.nativeElement;
    const stream = videoElement.srcObject as MediaStream;

    if (stream) {
      const tracks = stream.getTracks(); 
      tracks.forEach(track => track.stop()); 
      videoElement.srcObject = null; 
    }

  }

  ngOnDestroy() {
    this.scannedData='';
    console.log("Detener scan, Borra algo?")
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
