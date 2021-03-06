import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { SendEmailService } from '../../services/send-email.service';
import { Meta ,Title} from '@angular/platform-browser';

declare var $: any;
declare var grecaptcha: any;

@Component({
  templateUrl: 'contactanos.html',
  styleUrls: ['contactanos.component.css'],
  providers: [SendEmailService]
})

export class ContactanosComponent implements OnInit {
  public firstName: string;
  public mail: string;
  public cellular: string;
  public phone: string;
  public subject: string;
  public message: string;
  public reCaptcha: string;
  public messageError: string;
  public messageExit: string;
  public valid: boolean = true;
  public recaptchaSiteKey = GLOBAL.recaptchaSiteKey;
  public toMail = GLOBAL.toMail;

  constructor(private _route: ActivatedRoute, private _router: Router, private _sendEmailService: SendEmailService, private meta: Meta,private title1: Title) {
    this.messageError = '';
    this.messageExit = '';
    this.title1.setTitle('Contáctanos Matisses');
    this.meta.addTag({ name: 'title', content: 'Contáctanos Matisses' });
    this.meta.addTag({ name: 'keywords', content: 'contacto, matisses' });
    this.meta.addTag({ name: 'description', content: 'Contáctanos Matisses' });
    this.meta.addTag({ name: 'image', content: 'http://www.matisses.co/assets/images/medellin.jpg' });
    this.meta.addTag({ property: 'og:url', content: 'http://www.matisses.co/assets/images/medellin.jpg' });
    this.meta.addTag({ property: 'og:title', content: 'Contáctanos Matisses' });
    this.meta.addTag({ property: 'og:image', content: 'http://www.matisses.co/assets/images/medellin.jpg' });
    this.meta.addTag({ property: 'og:description', content: 'Contáctanos Matisses' });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(function() {
      $("html, body").animate({ scrollTop: 0 }, 1000);
    });
  }

  public onCaptchaComplete(response: any) {
    this.reCaptcha = response.token;
  }

  public enviar(contactForm) {
    this.valid = true;
    this.messageError = '';
    this.messageExit = '';
    if (this.firstName == null || this.firstName.length <= 0 ||
      this.mail == null || this.mail.length <= 0 ||
      this.subject == null || this.subject.length <= 0 ||
      this.message == null || this.message.length <= 0 ||
      !this.reCaptcha) {
      this.messageError = 'Debes llenar todos los campos obligatorios para poder proceder con el envío.';
      this.valid = false;
      return;
    } else {
      /*envie mensaje*/
      let celular = 'No suministrado';
      let telefono = 'No suministrado';
      if (this.cellular != null && this.cellular.length > 0) {
        celular = this.cellular;
      }
      if (this.phone != null && this.phone.length > 0) {
        telefono = this.phone;
      }

      let mailMessage = {
        templateName: 'contactanos',
        params: {
          'cliente': this.firstName,
          'celular': celular,
          'telefono': telefono,
          'correo': this.mail,
          'asunto': this.subject,
          'mensaje': this.message
        },
        from: 'Contacto Matisses <info@matisses.co>',
        to: [this.toMail, this.mail],
        subject: this.subject
      }
      this._sendEmailService.enviar(mailMessage).subscribe(
        response => {
          this.messageExit = 'Gracias por contactarnos, tu mensaje se envió exitosamente. Te responderemos en el menor tiempo posible.';
          contactForm.reset();
          this.limpiar();
          return;
        },
        error => {
          console.error(error);
          this.messageError = 'Se produjo un error interno enviando el mensaje. Por favor inténtalo más tarde.';
        }
      );
    }
  }

  public limpiar() {
    this.firstName = '';
    this.mail = '';
    this.cellular = '';
    this.phone = '';
    this.subject = '';
    this.message = '';
    grecaptcha.reset();
    this._router.navigate(['/contactanos']);
  }
}
