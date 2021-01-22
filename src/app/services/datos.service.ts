import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DatosService {
  private db: SQLiteObject;
  private horasList: any[] = [];
  private cursosList: any[] = [];

  /*
  Este servicio supone que se ha copiado la bbdd
  */
  /*
   *Platform nos dice si el la plataforma a usar esta lista, entre otras cosas.
   */
  /*
  Un objeto SQLite se encarga de gestionar la bbdd
  */
  constructor(private platform: Platform, private sqlite: SQLite) {}

  async executeSentence(target:any[],sqlSentence: string, searchParam: any[]) {
    return new Promise((resolve,reject) => {
    let consultable = true;
    if (!this.db) {
      this.openDB()
        .then(()=>{
          console.log(this.db);   
        })
        .catch(() => {
          consultable = false;
          reject("Fallo al cargar");
        });
    }
    if (consultable) {
      this.db
        .executeSql(sqlSentence, searchParam)
        .then((data) => {
          for(let i=0;data.rows.length;i++){
            let obj=data.rows.item(i);
            target.push(obj);
          }
          resolve("Sentencia ejecutada");
        })
        .catch((e) => {
          console.log("fallo al ejecutar sentencia "+JSON.stringify(e));
          reject("Fallo al ejecutar sentencia");
        });
    }
  });
  }
  

  getHoras() {
    const sql = "Select descripcion as nombre from horasSemana";
    this.executeSentence(this.horasList,sql,[]);
  }
  getCursos(estudio) {
    const sql = "SELECT grupo.idGrupo as id, grupo.nombre FROM grupo INNER JOIN estudios ON grupo.idEstudios = estudios.idEstudios  WHERE estudios.nombre LIKE ?";
    this.executeSentence(this.cursosList,sql,[estudio]);
  }

  openDB() {
    return new Promise((resolve,reject) => {
    this.platform
      .ready()
      .then(() => {
        //si la plataforma esta preparada voy a abrir la bbdd ya copiada
        this.sqlite
          //si la bbdd no existe la crea y la abre y si existe la abre
          .create(this.getConector())
          .then((db: SQLiteObject) => {
            this.db = db;
            resolve("DB abierta correctamente");
          })
          .catch((err) => {
            console.log(err);
            reject("Fallo al abrir DB");
          });
      })
      .catch(()=>{
        reject("Fallo al comprobar el dispositivo");
      });
    });
  }

  private getConector() {
    return {
      name: "Horario16.db",
      location: "default",
      createFromLocation: 1,
    };
  }
}
