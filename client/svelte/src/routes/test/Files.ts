import { writable } from "svelte/store";

export type PhotoList = Array<Photo>
export type PhotoExtensions = 'png' | 'jpeg' | 'jpg' | 'heic' | 'gif' | 'tiff'
export class Photo {
  private _file: File
  private _url: string
  private _byteData: Promise<string|ArrayBuffer|null>
  constructor(fromFile: File) {
    this._file = fromFile
    this._url = URL.createObjectURL(fromFile)
    this._byteData = new Promise((res, rej) => {
      setTimeout(() => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(this._file)
        reader.addEventListener('error', () => { rej("Error occurred") })
        reader.addEventListener('load', () => { res(reader.result) })
      }, 5000)
    })
  }
  public get name(): string { return this._file.name }
  public get url() : string { return this._url }
  public get bytes() : Promise<string|ArrayBuffer|null> { return this._byteData }
}
export const selectedFiles = writable([] as PhotoList)