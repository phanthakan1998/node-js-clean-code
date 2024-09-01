export class HistoryLog {
  id: string;
  userId: string;
  action: string;
  details: object;

  constructor(id: string, action: string, userId: string, details: object) {
    this.id = id;
    this.userId = userId;
    this.action = action;
    this.details = details;
  }
}
