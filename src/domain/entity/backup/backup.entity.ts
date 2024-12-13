import moment from 'moment';

export class BackupEntity {
  id: string;
  name: string;
  createdAt: string;
  relactiveDate: string;

  constructor(id: string, name: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = moment(createdAt).format("MMM Do YY");
    this.relactiveDate = moment(createdAt).fromNow();
  }
}
