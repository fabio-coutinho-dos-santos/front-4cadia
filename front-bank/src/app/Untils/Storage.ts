
import StorageKeysTypes  from "./StorageKeyTypes"

export class Storage{

  constructor(){}

  public setItem(key:string,value:string){
    localStorage.setItem(key,value)
  }

  public getItem(key:string){
    return  localStorage.getItem(key)
  }

  public cleanStorage(){
    this.setItem(StorageKeysTypes.TOKEN,"")
  }

  public cleanTokenStorage(){
    this.setItem(StorageKeysTypes.TOKEN,"")
  }
}
