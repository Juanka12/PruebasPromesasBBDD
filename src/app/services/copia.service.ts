import { SqliteDbCopy } from "@ionic-native/sqlite-db-copy/ngx";
import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class CopiaService {
  constructor(private sqlDbCopy: SqliteDbCopy, private platform: Platform) {}

  copiarBBDD() {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        this.sqlDbCopy
        .copy("Horario16.db", 0)
        .then(() => {
          resolve("Copia realizada");
        })
        .catch((error) => {
          console.log("copia" + JSON.stringify(error));
          reject("Fallo al copiar la BD");
        });
        })
        .catch(() => {
          reject("Plataforma no preparada");
        });
    });
  }
}
