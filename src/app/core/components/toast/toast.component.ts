import {Component} from '@angular/core';
declare var bootstrap: any;


@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  public static showToast(title: string, content: string): void {
    if (document !== undefined)
    {
      const toastLiveExample = document.getElementById('liveToast');
      const toastTitle = document.getElementById("toast-title");
      const toastBody = document.getElementById("toast-body");

      if (toastTitle)
        toastTitle.innerText = title;

      if (toastBody)
        toastBody.innerText = content;

      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()
    }
  }
}
