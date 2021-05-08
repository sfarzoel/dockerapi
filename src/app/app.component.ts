import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  data = [];
  private hubConnection: signalR.HubConnection

   public startConnection = () => {
     this.hubConnection = new signalR.HubConnectionBuilder()
                             .withUrl('https://webapi101.herokuapp.com/results')
                             .build();

     this.hubConnection
       .start()
       .then(() => console.log('Connection started'))
       .catch(err => console.log('Error while starting connection: ' + err))
   }

   public addTransferChartDataListener = () => {
     this.hubConnection.on('Charbel', (data) => {
       this.data = data;
       this.data.forEach(element => {
        element.statement = element.pass == true ? "Marbrouk":"Hard Luck"
      });
       console.log(data);
     });
   }

  constructor(private apiCaller : HttpClient)
  {
     this.apiCaller.get('http://webapi101.herokuapp.com/api/Student/GetResults').subscribe((data : [any]) => {
      //console.log(data);
      this.data = data;
      this.data.forEach(element => {
        element.statement = element.pass == true ? "Marbrouk":"Hard Luck"
      });
      this.startConnection();
      this.addTransferChartDataListener();
    })
  }

 }



