import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-escaneo-qr',
  templateUrl: './escaneo-qr.page.html',
  styleUrls: ['./escaneo-qr.page.scss'],
})
export class EscaneoQrPage implements OnDestroy {
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;
  scannedData: string = '';
  private codeReader: BrowserMultiFormatReader;
  private scanning: boolean = false; 

  constructor(private alertController: AlertController) {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ionViewWillEnter() {
    this.startScan(); // Hace que se inicie el escaneo apenas se ingresa a la página
  }

  async startScan() {
    this.scanning = true;
    this.codeReader
      .decodeFromVideoDevice(undefined, this.video.nativeElement, (result, err) => {
        if (result && this.scanning) {
          this.scannedData = result.getText();
          this.scanning = false; 
          this.showAlert('Escaneado correctamente', `Resultado: ${this.scannedData}`);
          this.stopScan(); // Se detiene el escaneo una vez se haya leído el código qr
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
    this.stopScan(); // La cámara se apaga cuando se sale de la página
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
