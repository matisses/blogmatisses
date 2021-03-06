export class Item {
  public _id: string;
  //public name: string;
  public itemcode: string;
  public shortitemcode: string;
  //public refProveedor: string;
  public itemname: string;
  public description: string;
  public availablestock: number;
  public model: string;
  public urlmercadolibre: string;
  public newFrom: Date;
  public active: boolean;
  public selectedQuantity: number;
  public dimensions: {
    depth: number,
    height: number,
    width: number
  };
  public weight: number;
  public priceaftervat: number;
  public priceBeforeVAT: number;
  public priceaftervatFormat: string;
  public priceBeforeVATFormat: string;
  public department: {
    code: string,
    name: string
  };
  public group: {
    code: string,
    name: string
  };
  public subgroup: {
    code: string,
    name: string
  };
  public stock: Array<any>;
  public images: Array<string>;
  public color: Array<any>;
  public sinSaldo: number;
  public descuento: number;
  public priceafterdiscount: number;
  public priceafterdiscountFormat: string;
  public taxpercent: number;
  public precioVisible: boolean;
  public agregadoLista:boolean;
  public cantidadElegida:number;
  public cantidadComprada:number;
  public messageError:string;

  constructor() {

  }

  public newItem(itemcode, itemname, price) {
    this.itemname = itemname;
    this.itemcode = itemcode;
    this.shortitemcode = this.itemcode.substring(0, 3) + this.itemcode.substring(16);
    this.priceaftervat = price;
    this.priceafterdiscountFormat=this.formatNumber(price);
    return this;
  }

  public newItemCarrito(itemcode, itemname, price, quantity) {
    this.itemname = itemname;
    this.itemcode = itemcode;
    this.shortitemcode = this.itemcode.substring(0, 3) + this.itemcode.substring(16);
    this.priceaftervat = price;
    this.priceafterdiscountFormat=this.formatNumber(price);
    this.selectedQuantity = quantity;
    return this;
  }

  public formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
}
