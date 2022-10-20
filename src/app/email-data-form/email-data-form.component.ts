import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
interface BusLine {
  id: number;
  line: string;
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

  lines: BusLine[] = [
    { id: 388, line: 'Slaný - Nádraží Veleslavín' },
    { id: 389, line: 'Louny - Nádraží Veleslavín' },
    { id: 388, line: 'Nádraží Veleslavín - Slaný' },
    { id: 389, line: 'Nádraží Veleslavín - Louny' },
  ];

  to = 'honza.kimr@email.cz'; //'podnety@idsk.cz';

  name?: string;

  fromStation?: string
  busLine?: BusLine;

  time = '07:00';

  constructor() { }

  ngOnInit() {
  }

  isValid(): boolean {
    return !!this.name && !!this.fromStation && !!this.busLine && this.time.length > 0;
  }

  getSubjectString(): string {
    const date = new Date();
    return `Přeplněný autobus linky ${this.busLine?.id ?? '<i>číslo_autobusu</i>'} (${this.busLine?.line ?? '<i>trasa_autobusu</i>'}) ${date.toLocaleDateString('cs-CZ')}`;
  }

  getBodyString(): string {
    return `Dobrý den,\n\nautobus číslo ${this.busLine?.id ?? '<i>číslo_autobusu</i>'} na trase ${this.busLine?.line ?? '<i>trasa_autobusu</i>'} byl od stanice ${this.fromStation ?? '<i>ze_stnice</i>'} (odjezd: ${this.time}) přeplněný.` +
      `\nBylo by možné navýšit kapacitu autobusů v tento čas?\n\nS pozdravem\n\n${this.name ?? '<i>jmeno</i>'}`;
  }

  getMailtoString(): string {
    if (!this.isValid()) {
      return '#';
    }

    return `mailto:${this.to}?subject=${encodeURIComponent(this.getSubjectString())}&body=${encodeURIComponent(this.getBodyString())}`;
  }
}
