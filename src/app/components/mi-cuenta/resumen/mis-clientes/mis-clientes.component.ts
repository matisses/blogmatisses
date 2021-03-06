import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SessionUsuarioService } from '../../../../services/session-usuario.service';
import { CustomerService } from '../../../../services/customer.service';
import { CityService } from '../../../../services/city.service';

//declare var jquery: any;
declare var $: any;

@Component({
  selector: 'matisses-clientes',
  templateUrl: 'mis-clientes.html',
  styleUrls: ['mis-clientes.component.css'],
  providers: [CustomerService, CityService,SessionUsuarioService]
})


export class ClientesComponent implements OnInit {
  public title: string;
  public clientes: Array<any>;
  public customer: any;
  public nombreUsuario: string;
  public documentCustomer:string;
  public totalesDTO:any;
  public fileList: FileList;
  public formDataRut: FormData;
  public formDataSC: FormData;
  public messageError:string;
  public successMessage:string;
  public updateMessage:string="";
  public seguridadSocialR:any;
  public montoRedimir:number;
  public fileUploadCc:any;
  public codigoDecorador: string;
  public codigoRedimir:string=null;
  public tipoRedencion:string;
  public facturasCliente:Array<any>;
  public totalComisionEfectivo:number=0;
  public totalComisionBono:number=0;

  constructor(private _route: ActivatedRoute, private _router: Router,private _customerService: CustomerService,private _userService: SessionUsuarioService,private _cityService: CityService) {
    this.title = 'Este es el cuerpo de login';
    this.formDataRut=new FormData();
    this.formDataSC=new FormData();
    this.clientes = new Array<any>();
    this.facturasCliente = new Array<any>();
    this.montoRedimir=0;
    this.inicializarCliente();
    this.inicializarTotales();

  }

  ngOnInit() {
    this.documentCustomer=localStorage.getItem('doc-customer');
    this.nombreUsuario=localStorage.getItem('nombre-usuario');
    localStorage.setItem('username-admin',this.nombreUsuario);
    this.buscarCliente();
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $("html, body").animate({ scrollTop: 0 }, 1000);
    });

  }

  public inicializarCliente(){

    this.customer= {
    'CardCode': '',
    'CardName':'',
    'CardType': '',
    'GroupCode': '',
    'Address': '',
    "ZipCode": null,
    'MailAddress': '',
    'MailZipCode': null,
    'Phone1': '',
    'Phone2': null,
    'Fax': null,
    'ContactPerson': null,
    'Notes': null,
    'PayTermsGrpCode': -1,
    'CreditLimit': 0,
    'MaxCommitment': 0,
    'DiscountPercent': 0,
    'VatLiable': '',
    'FederalTaxID': '',
    'DeductibleAtSource':'',
    'DeductionPercent': 0,
    'DeductionValidUntil': null,
    'PriceListNum': 1,
    'IntrestRatePercent': 0,
    'CommissionPercent': 0,
    'CommissionGroupCode': 0,
    'FreeText': null,
    'SalesPersonCode': 0,
    'Currency': 'COP',
    'RateDiffAccount': null,
    'Cellular': '',
    'AvarageLate': null,
    'City': '',
    'County': '',
    "Country": 'CO',
    'MailCity': '',
    'MailCounty': '',
    'MailCountry': 'CO',
    'EmailAddress': '',
    "Picture": null,
    "DefaultAccount": null,
    "DefaultBranch": null,
    "DefaultBankCode": "-1",
    "AdditionalID": null,
    "Pager": null,
    "FatherCard": null,
    "CardForeignName": "",
    "FatherType": "cPayments_sum",
    "DeductionOffice": null,
    "ExportCode": null,
    "MinIntrest": 0,
    "CurrentAccountBalance": 0,
    "OpenDeliveryNotesBalance": 0,
    "OpenOrdersBalance": 0,
    "VatGroup": null,
    "ShippingType": null,
    "Password": null,
    "Indicator": null,
    "IBAN": null,
    "CreditCardCode": -1,
    "CreditCardNum": null,
    "CreditCardExpiration": null,
    "DebitorAccount": "",
    "OpenOpportunities": null,
    "Valid": "tNO",
    "ValidFrom": null,
    "ValidTo": null,
    "ValidRemarks": null,
    "Frozen": "tNO",
    "FrozenFrom": null,
    "FrozenTo": null,
    "FrozenRemarks": null,
    "Block": "3125800077",
    "BillToState": "11",
    "ExemptNum": null,
    "Priority": -1,
    "FormCode1099": null,
    "Box1099": null,
    "PeymentMethodCode": "-1",
    "BackOrder": "tYES",
    "PartialDelivery": "tYES",
    "BlockDunning": "tNO",
    "BankCountry": null,
    "HouseBank": "",
    "HouseBankCountry": "CO",
    "HouseBankAccount": "",
    "ShipToDefault": "FAC-Nro2",
    "DunningLevel": null,
    "DunningDate": null,
    "CollectionAuthorization": "tNO",
    "DME": null,
    "InstructionKey": null,
    "SinglePayment": "tNO",
    "ISRBillerID": null,
    "PaymentBlock": "tNO",
    "ReferenceDetails": null,
    "HouseBankBranch": "",
    "OwnerIDNumber": null,
    "PaymentBlockDescription": -1,
    "TaxExemptionLetterNum": null,
    "MaxAmountOfExemption": 0,
    "ExemptionValidityDateFrom": null,
    "ExemptionValidityDateTo": null,
    "LinkedBusinessPartner": null,
    "LastMultiReconciliationNum": null,
    "DeferredTax": "tNO",
    "Equalization": "tNO",
    "SubjectToWithholdingTax": "tNO",
    "CertificateNumber": null,
    "ExpirationDate": null,
    "NationalInsuranceNum": null,
    "AccrualCriteria": "tNO",
    "WTCode": null,
    "BillToBuildingFloorRoom": "3125800077",
    "DownPaymentClearAct": "28050501",
    "ChannelBP": null,
    "DefaultTechnician": null,
    "BilltoDefault": "FAC-Nro2",
    "CustomerBillofExchangDisc": null,
    "Territory": null,
    "ShipToBuildingFloorRoom": "3125800077",
    "CustomerBillofExchangPres": null,
    "ProjectCode": null,
    "VatGroupLatinAmerica": null,
    "DunningTerm": null,
    "Website": null,
    "OtherReceivablePayable": null,
    "BillofExchangeonCollection": null,
    "CompanyPrivate": "cCompany",
    "LanguageCode": 25,
    "UnpaidBillofExchange": null,
    "WithholdingTaxDeductionGroup": -1,
    "ClosingDateProcedureNumber": null,
    "Profession": null,
    "BankChargesAllocationCode": null,
    "TaxRoundingRule": "trr_CompanyDefault",
    "Properties1": "tNO",
    "Properties2": "tNO",
    "Properties3": "tNO",
    "Properties4": "tNO",
    "Properties5": "tNO",
    "Properties6": "tNO",
    "Properties7": "tNO",
    "Properties8": "tNO",
    "Properties9": "tNO",
    "Properties10": "tNO",
    "Properties11": "tNO",
    "Properties12": "tNO",
    "Properties13": "tNO",
    "Properties14": "tNO",
    "Properties15": "tNO",
    "Properties16": "tNO",
    "Properties17": "tNO",
    "Properties18": "tNO",
    "Properties19": "tNO",
    "Properties20": "tNO",
    "Properties21": "tNO",
    "Properties22": "tNO",
    "Properties23": "tNO",
    "Properties24": "tNO",
    "Properties25": "tNO",
    "Properties26": "tNO",
    "Properties27": "tNO",
    "Properties28": "tNO",
    "Properties29": "tNO",
    "Properties30": "tNO",
    "Properties31": "tNO",
    "Properties32": "tNO",
    "Properties33": "tNO",
    "Properties34": "tNO",
    "Properties35": "tNO",
    "Properties36": "tNO",
    "Properties37": "tNO",
    "Properties38": "tNO",
    "Properties39": "tNO",
    "Properties40": "tNO",
    "Properties41": "tNO",
    "Properties42": "tNO",
    "Properties43": "tNO",
    "Properties44": "tNO",
    "Properties45": "tNO",
    "Properties46": "tNO",
    "Properties47": "tNO",
    "Properties48": "tNO",
    "Properties49": "tNO",
    "Properties50": "tNO",
    "Properties51": "tNO",
    "Properties52": "tNO",
    "Properties53": "tNO",
    "Properties54": "tNO",
    "Properties55": "tNO",
    "Properties56": "tNO",
    "Properties57": "tNO",
    "Properties58": "tNO",
    "Properties59": "tNO",
    "Properties60": "tNO",
    "Properties61": "tNO",
    "Properties62": "tNO",
    "Properties63": "tNO",
    "Properties64": "tNO",
    "CompanyRegistrationNumber": null,
    "VerificationNumber": null,
    "DiscountBaseObject": "dgboNone",
    "DiscountRelations": "dgrLowestDiscount",
    "TypeReport": "atCompany",
    "ThresholdOverlook": "tNO",
    "SurchargeOverlook": "tNO",
    "DownPaymentInterimAccount": null,
    "OperationCode347": "ocGoodsOrServiciesAcquisitions",
    "InsuranceOperation347": "tNO",
    "HierarchicalDeduction": "tNO",
    "ShaamGroup": "sgServicesAndAsset",
    "WithholdingTaxCertified": "tNO",
    "BookkeepingCertified": "tNO",
    "PlanningGroup": null,
    "Affiliate": "tNO",
    "Industry": null,
    "VatIDNum": null,
    "DatevAccount": null,
    "DatevFirstDataEntry": "tYES",
    "GTSRegNo": null,
    "GTSBankAccountNo": null,
    "GTSBillingAddrTel": null,
    "ETaxWebSite": null,
    "HouseBankIBAN": "",
    "VATRegistrationNumber": null,
    "RepresentativeName": null,
    "IndustryType": null,
    "BusinessType": null,
    "Series": 1,
    "AutomaticPosting": "apNo",
    "InterestAccount": null,
    "FeeAccount": null,
    "CampaignNumber": null,
    "AliasName": null,
    "DefaultBlanketAgreementNumber": null,
    "EffectiveDiscount": "dgrLowestDiscount",
    "NoDiscounts": "tNO",
    "GlobalLocationNumber": null,
    "EDISenderID": null,
    "EDIRecipientID": null,
    "ResidenNumber": "rntSpanishFiscalID",
    "RelationshipCode": null,
    "RelationshipDateFrom": null,
    "RelationshipDateTill": null,
    "UnifiedFederalTaxID": null,
    "AttachmentEntry": null,
    "TypeOfOperation": null,
    "EndorsableChecksFromBP": "tYES",
    "AcceptsEndorsedChecks": "tNO",
    "OwnerCode": null,
    "BlockSendingMarketingContent": "tNO",
    "AgentCode": null,
    "EDocGenerationType": null,
    "EDocStreet": null,
    "EDocStreetNumber": null,
    "EDocBuildingNumber": null,
    "EDocZipCode": null,
    "EDocCity": null,
    "EDocCountry": null,
    "EDocDistrict": null,
    "EDocRepresentativeFirstName": null,
    "EDocRepresentativeSurname": null,
    "EDocRepresentativeCompany": null,
    "EDocRepresentativeFiscalCode": null,
    "EDocRepresentativeAdditionalId": null,
    "EDocPECAddress": null,
    "IPACodeForPA": null,
    "UpdateDate": 1521522000000,
    "UpdateTime": "1644:45:00",
    "ExemptionMaxAmountValidationType": "emaIndividual",
    "ECommerceMerchantID": null,
    "U_EsAutorret": "N",
    "U_BPCO_RTC": "RS",
    "U_BPCO_TDC": "13",
    "U_BPCO_CS": "11001",
    "U_BPCO_City": "11001",
    "U_BPCO_TP": "01",
    "U_BPCO_Nombre": "",
    "U_BPCO_1Apellido": "",
    "U_BPCO_2Apellido": "",
    "U_BPCO_BPExt": "01",
    "U_BPCO_TBPE": "01",
    "U_BPCO_Address": "",
    "U_Manejo": "DIA",
    "U_BD_Erst": "Y",
    "U_BD_Datev": null,
    "U_saldoCL": null,
    "U_FechaNacimiento": -2208971024000,
    "U_Sexo": "2",
    "U_OK1_AC_ECO": null,
    "U_FactorRedondeo": null,
    "U_IdCatTer": null,
    "BPAddresses": {
        "BPAddress": [
            {
                "AddressName": "",
                "Street": "",
                "Block": "",
                "ZipCode": null,
                "City": "",
                "County": '',
                "Country": "CO",
                "State": "11",
                "FederalTaxID": "",
                "TaxCode": "",
                "BuildingFloorRoom": "",
                "AddressType": "bo_ShipTo",
                "AddressName2": null,
                "AddressName3": null,
                "TypeOfAddress": null,
                "StreetNo": null,
                "BPCode": "",
                "RowNum": 1,
                "GlobalLocationNumber": null,
                "Nationality": null,
                "TaxOffice": null,
                "GSTIN": null,
                "GstType": null,
                "U_Municipio": ""
            }


        ]
    },
    "ContactEmployees": {
        "ContactEmployee": null
    },
    "BPAccountReceivablePaybleCollection": {
        "BPAccountReceivablePayble": null
    },
    "BPPaymentMethods": {
        "BPPaymentMethod": null
    },
    "BPWithholdingTaxCollection": {
        "BPWithholdingTax": null
    },
    "BPPaymentDates": {
        "BPPaymentDate": null
    },
    "BPBranchAssignment": {
        "BPBranchAssignmentItem": null
    },
    "BPBankAccounts": {
        "BPBankAccount": null
    },
    "BPFiscalTaxIDCollection": {
        "BPFiscalTaxID": null
    },
    "DiscountGroups": {
        "DiscountGroup": null
    },
    "BPIntrastatExtension": null,
    "BPBlockSendingMarketingContents": {
        "BPBlockSendingMarketingContent": null
    }
  }
  }

  public inicializarTotales(){
    this.totalesDTO= {
    'puntosAcomulados': '',
    'redimeEfectivo':'',
    'redimeBono':'',
    'puntos': [
       {
           'porcentaje': "5%",
           'concepto': "457 pts. - 9,999 pts."
       }
       ]

  }
}

public buscarCliente() {
  this.clientes = new Array<any>();
  if (this.nombreUsuario != null && this.nombreUsuario.length > 0) {

this._userService.cargarcliente(this.nombreUsuario).subscribe(
  response => {
    this.customer = response;

    this._userService.misClientes(this.documentCustomer).subscribe(
      response => {
        this.clientes=response;

        for(let i = 0; i < this.clientes.length; i++) {

          this._userService.facturasClienteDecorador(this.documentCustomer,this.clientes[i].nit).subscribe(
            response => {
              this.facturasCliente=response;

              for(let i = 0; i < this.facturasCliente.length; i++) {

                this.totalComisionEfectivo=this.totalComisionEfectivo+this.facturasCliente[i].comision;
                this.totalComisionBono=this.totalComisionEfectivo*1.125;


              }

            },
            error => {
              console.error(error);
            }
          );

        }


      },
      error => {
        console.error(error);
      }
    );




  },
  error => {
    console.error(error);
  }
);
}

}


public detalleCliente(nit:string){
  this.facturasCliente= new Array<any>();

  this.totalComisionEfectivo=0;
  this._userService.facturasClienteDecorador(this.documentCustomer,nit).subscribe(
    response => {
      this.facturasCliente=response;

      for(let i = 0; i < this.facturasCliente.length; i++) {

        this.totalComisionEfectivo=this.totalComisionEfectivo+this.facturasCliente[i].comision;


      }

    },
    error => {
      console.error(error);
    }
  );
    $('#detalleFactura').modal('show');
}

public abrirModalRedimir(tipo:string){
  this.tipoRedencion=tipo;
  this.successMessage=null;
  this.montoRedimir=0;
  this.codigoRedimir=null;
  $('#solicitarRedencion').modal('show');
}

onFileChangeR(event, tipo:string) {
  let fileList:FileList = event.target.files;

  for(let i = 0; i < fileList.length; i++) {
    let file: File = fileList[i];
    if(tipo=='RUT'){


      let nameA=file.name.split('.');

      this.formDataRut.append('file', file);
      this.formDataRut.append('nombrearchivo', nameA[0]);
    }
    else if(tipo=='CC'){
      let nameB=file.name.split('.');

      this.formDataSC.append('file', file);
      this.formDataSC.append('nombrearchivo', nameB[0]);

    }


  }


}

public redimir(){

  if(this.codigoDecorador!=this.codigoRedimir || this.codigoRedimir==null ){
    this.messageError="El codigo de decorador es invalido";
    return;
  }
  this.messageError='';
  if(this.montoRedimir==0 || this.montoRedimir==null){
    this.messageError="El monto a redimir debe ser mayor a 0";
    return;
  }
  this.messageError='';
  if(this.formDataRut.get('file')==null){
    this.messageError="Debes adjuntar la cuenta de cobro";
    return;
  }
  this.messageError='';
  if(this.formDataSC.get('file')==null){
    this.messageError="Debes adjuntar la seguridad social";
    return;
  }

 this.successMessage=null;
  let datosSolicitud={
	"tipo":"DC",
	"estado":"PE",
	"monto": this.montoRedimir,
	"modo":this.tipoRedencion,
	"idUsuarioPaginaDTO":{
		"usuarioId":  localStorage.getItem('usuario-id')
	}

}

//servicio solicitarRedencion
this._userService.solicitarRedencion(datosSolicitud).subscribe(
  response => {
    if(response.estado=='0'){


      this.formDataRut.append('idSolicitud',response.valor);
      this.formDataSC.append('idSolicitud', response.valor);
      this._userService.documentosRedencion(this.formDataRut).subscribe(
        response => {

              let respuesta = JSON.parse(JSON.stringify(response));

            },
            error => { console.error(error); }
      );
      this._userService.documentosRedencion(this.formDataSC).subscribe(
        response => {

              let respuesta = JSON.parse(JSON.stringify(response));

            },
            error => { console.error(error); }
      );
      this.successMessage='Solicitud de redención creada correctamente';
    }

  },
  error => {
    console.error(error);
  }
);
}


}
