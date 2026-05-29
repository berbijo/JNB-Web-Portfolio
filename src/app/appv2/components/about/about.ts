import { Component } from '@angular/core';
import { OWNER } from '../../../constants/portfolio.constants';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  owner = OWNER;

  toastMessage = '';
  showToast = false;

  copyEmail() {
    const email = 'joshuaberbie0@gmail.com';

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(email);
    }

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
      '_blank'
    );

    this.showToastMessage('Email copied');
  }

  copyPhone() {
    const phone = '+639771027584'; 

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(phone).then(() => {
        this.showToastMessage('Phone copied');
      });
    } else {
      this.fallbackCopy(phone);
    }
  }

  fallbackCopy(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;

    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    document.execCommand('copy');

    document.body.removeChild(textarea);

    this.showToastMessage('Copied');
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    }
  }
}