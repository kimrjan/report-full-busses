import { Component, OnInit } from '@angular/core';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-email-data-form',
  templateUrl: './email-data-form.component.html',
  styleUrls: ['./email-data-form.component.scss']
})
export class EmailDataFormComponent implements OnInit {

  stations: string[] = [
    'Slaný,žel.st.',
    'Slaný,aut.nádr.',
    'Slaný,Pražská',
    'Slaný,Žel.zast.předměstí',
    'Slaný,odb.Drnov',
    'Dědina',
    'Divoká Šárka',
    'Nádraží Veleslavín',
  ];

  lines: string[] = [
    '388 Slaný - Nádraží Veleslavín',
    '389 Louny - Nádraží Veleslavín',
    '388 Nádraží Veleslavín - Slaný',
    '389 Nádraží Veleslavín - Louny',
  ];

  to = 'honza.kimr@email.cz'; //'podnety@idsk.cz';

  name = '';

  fromStation = '';
  busLine = '';

  time = '';

  constructor() { }

  ngOnInit() {
  }

  isValid(): boolean {
    return this.name.length > 0 && this.fromStation.length > 0 && this.busLine.length > 0 && this.time.length > 0;
  }

  getSubjectString(): string {
    const date = new Date();
    return `Přeplněný autobus linky ${this.busLine} ${date.toLocaleDateString('cs-CZ')}`;
  }

  getBodyString(): string {
    return `Dobrý den,\nod stanice ${this.fromStation} v ${this.time}\nS pozdravem\n\n${this.name}`;
  }

  getMailtoString(): string {
    if (!this.isValid()) {
      return '';
    }
    return `mailto:${this.to}?subject=${this.getSubjectString()}&body=${this.getBodyString()}`;
  }
}
