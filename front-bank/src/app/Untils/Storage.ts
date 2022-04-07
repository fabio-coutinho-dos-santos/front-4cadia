
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
    this.setItem(StorageKeysTypes.LOGGED,"FALSE")
    this.setItem(StorageKeysTypes.ID_USER,"")
  }

  public cleanTokenStorage(){
    this.setItem(StorageKeysTypes.TOKEN,"")
  }

  public cleanLoggedStorage(){
    this.setItem(StorageKeysTypes.LOGGED,"")
  }

  public cleanIdUserStorage(){
    this.setItem(StorageKeysTypes.ID_USER,"")
  }
}
