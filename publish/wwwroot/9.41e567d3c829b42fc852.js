(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"6ANv":function(t,e,s){"use strict";s.r(e),s.d(e,"ShopModule",function(){return _});var n=s("ofXK"),c=s("PCNd"),i=s("tyNb");class o{constructor(){this.brandId=0,this.typeId=0,this.sort="name",this.pageNumber=1,this.pageSize=6}}var r=s("fXoL"),a=s("tk/3");class p{constructor(){this.data=[]}}var b=s("Y5B4"),u=s("C46D"),h=s("AytR");let d=(()=>{class t{constructor(t){this.http=t,this.baseUrl=h.a.apiUrl,this.products=[],this.brands=[],this.types=[],this.pagination=new p,this.shopParams=new o,this.productCache=new Map}getProducts(t){if(!1===t&&(this.productCache=new Map),this.productCache.size>0&&!0===t&&this.productCache.has(Object.values(this.shopParams).join("-")))return this.pagination.data=this.productCache.get(Object.values(this.shopParams).join("-")),Object(u.a)(this.pagination);let e=new a.e;return 0!==this.shopParams.brandId&&(e=e.append("brandId",this.shopParams.brandId.toString())),0!==this.shopParams.typeId&&(e=e.append("typeId",this.shopParams.typeId.toString())),this.shopParams.search&&(e=e.append("search",this.shopParams.search)),e=e.append("sort",this.shopParams.sort),e=e.append("pageIndex",this.shopParams.pageNumber.toString()),e=e.append("pageSize",this.shopParams.pageSize.toString()),this.http.get(this.baseUrl+"products",{observe:"response",params:e}).subscribe(t=>{this.productCache.set(Object.values(this.shopParams).join("-"),t.body.data),this.pagination=t.body,console.log(this.products)}),this.http.get(this.baseUrl+"products",{observe:"response",params:e}).pipe(Object(b.a)(t=>this.pagination))}setShopParams(t){this.shopParams=t}getShopParams(){return this.shopParams}getProduct(t){let e;return this.productCache.forEach(s=>{e=s.find(e=>e.id===t)}),e?(console.log("suresh3"),Object(u.a)(e)):this.http.get(this.baseUrl+"products/"+t)}getBrands(){return this.brands.length>0?Object(u.a)(this.brands):(this.http.get(this.baseUrl+"products/brands").subscribe(t=>{this.brands=t,console.log(this.brands)}),this.http.get(this.baseUrl+"products/brands").pipe(Object(b.a)(t=>t)))}getTypes(){return this.types.length>0?Object(u.a)(this.types):(this.http.get(this.baseUrl+"products/types").subscribe(t=>{this.types=t,console.log(this.types)}),this.http.get(this.baseUrl+"products/types").pipe(Object(b.a)(t=>t)))}}return t.\u0275fac=function(e){return new(e||t)(r.Xb(a.b))},t.\u0275prov=r.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();function l(t,e){if(1&t&&(r.Tb(0,"span"),r.Bc(1," Showing "),r.Tb(2,"strong"),r.Bc(3),r.Sb(),r.Bc(4," of "),r.Tb(5,"strong"),r.Bc(6),r.Sb(),r.Bc(7," Results "),r.Sb()),2&t){const t=r.cc();r.Cb(3),r.Ec(" ",(t.pageNumber-1)*t.pageSize+1," - ",t.pageNumber*t.pageSize>t.totalCount?t.totalCount:t.pageNumber*t.pageSize," "),r.Cb(3),r.Cc(t.totalCount)}}function g(t,e){1&t&&(r.Tb(0,"span"),r.Bc(1," There is "),r.Tb(2,"strong"),r.Bc(3,"0"),r.Sb(),r.Bc(4," Results for this filter "),r.Sb())}let m=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Hb({type:t,selectors:[["app-paging-header"]],inputs:{pageNumber:"pageNumber",pageSize:"pageSize",totalCount:"totalCount"},decls:3,vars:2,consts:[[4,"ngIf"]],template:function(t,e){1&t&&(r.Tb(0,"header"),r.zc(1,l,8,3,"span",0),r.zc(2,g,5,0,"span",0),r.Sb()),2&t&&(r.Cb(1),r.ic("ngIf",e.totalCount&&e.totalCount>0),r.Cb(1),r.ic("ngIf",0===e.totalCount))},directives:[n.m],styles:[""]}),t})();var f=s("3Pt+"),S=s("cAP4");let v=(()=>{class t{constructor(t){this.basketService=t}ngOnInit(){}addItemToBasket(){this.basketService.addItemToBasket(this.product)}}return t.\u0275fac=function(e){return new(e||t)(r.Nb(S.a))},t.\u0275cmp=r.Hb({type:t,selectors:[["app-product-item"]],inputs:{product:"product"},decls:16,vars:8,consts:[[1,"card","h-100","shadow-sm"],[1,"image","position-relative",2,"cursor","pointer"],[1,"img-fluid","bg-info",3,"src","alt"],[1,"d-flex","align-items-center","justify-content-center","hover-overlay"],["type","button",1,"btn","btn-primary","fa","fa-shopping-cart","mr-2",3,"click"],["type","button",1,"btn","btn-primary",3,"routerLink"],[1,"card-body","d-flex","flex-column"],[3,"routerLink"],[1,"text-uppercase"],[1,"mb-2"],[1,"text-muted"]],template:function(t,e){1&t&&(r.Tb(0,"div",0),r.Tb(1,"div",1),r.Ob(2,"img",2),r.Tb(3,"div",3),r.Tb(4,"button",4),r.ac("click",function(){return e.addItemToBasket()}),r.Sb(),r.Tb(5,"button",5),r.Bc(6,"View"),r.Sb(),r.Sb(),r.Sb(),r.Tb(7,"div",6),r.Tb(8,"a",7),r.Tb(9,"h6",8),r.Bc(10),r.Sb(),r.Sb(),r.Tb(11,"span",9),r.Bc(12),r.dc(13,"currency"),r.Sb(),r.Tb(14,"small",10),r.Bc(15,"9 mins"),r.Sb(),r.Sb(),r.Sb()),2&t&&(r.Cb(2),r.jc("src",e.product.pictureUrl,r.vc),r.jc("alt",e.product.name),r.Cb(3),r.kc("routerLink","/shop/",e.product.id,""),r.Cb(3),r.kc("routerLink","/shop/",e.product.id,""),r.Cb(2),r.Cc(e.product.name),r.Cb(2),r.Cc(r.ec(13,6,e.product.price)))},directives:[i.d,i.f],pipes:[n.d],styles:[".btn[_ngcontent-%COMP%]{width:30%;height:40px}.image[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover{opacity:1}.image[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover   button[_ngcontent-%COMP%]{transform:none;opacity:1}.hover-overlay[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%;top:0;left:0;background:#ffffff80;opacity:0;transition:all .5s}.hover-overlay[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{z-index:1000;transition:all .5s}.hover-overlay[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:first-of-type{transform:translateX(-20px)}.hover-overlay[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-of-type{transform:translateX(20px)}"]}),t})();var C=s("knEY");let y=(()=>{class t{constructor(){this.pageChanged=new r.n}ngOnInit(){}onPagerChange(t){this.pageChanged.emit(t.page)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Hb({type:t,selectors:[["app-pager"]],inputs:{totalCount:"totalCount",pageSize:"pageSize",pageNumber:"pageNumber"},outputs:{pageChanged:"pageChanged"},decls:1,vars:4,consts:[["previousText","\u2039","nextText","\u203a","firstText","\xab","lastText","\xbb",3,"boundaryLinks","totalItems","ngModel","itemsPerPage","pageChanged"]],template:function(t,e){1&t&&(r.Tb(0,"pagination",0),r.ac("pageChanged",function(t){return e.onPagerChange(t)}),r.Sb()),2&t&&r.ic("boundaryLinks",!0)("totalItems",e.totalCount)("ngModel",e.pageNumber)("itemsPerPage",e.pageSize)},directives:[C.a,f.k,f.m],styles:[""]}),t})();const P=["search"];function T(t,e){if(1&t&&(r.Tb(0,"option",17),r.Bc(1),r.Sb()),2&t){const t=e.$implicit,s=r.cc(2);r.ic("selected",s.shopParams.sort===t.value)("value",t.value),r.Cb(1),r.Dc(" ",t.name," ")}}function O(t,e){if(1&t){const t=r.Ub();r.Tb(0,"li",18),r.ac("click",function(){r.tc(t);const s=e.$implicit;return r.cc(2).onBrandSelected(s.id)}),r.Bc(1),r.Sb()}if(2&t){const t=e.$implicit,s=r.cc(2);r.Fb("active",t.id==s.shopParams.brandId),r.ic("value",t.id),r.Cb(1),r.Dc(" ",t.name," ")}}function k(t,e){if(1&t){const t=r.Ub();r.Tb(0,"li",18),r.ac("click",function(){r.tc(t);const s=e.$implicit;return r.cc(2).onTypeSelected(s.id)}),r.Bc(1),r.Sb()}if(2&t){const t=e.$implicit,s=r.cc(2);r.Fb("active",t.id==s.shopParams.typeId),r.ic("value",t.id),r.Cb(1),r.Dc(" ",t.name," ")}}function w(t,e){if(1&t){const t=r.Ub();r.Rb(0),r.Tb(1,"h5",10),r.Bc(2,"Brands"),r.Sb(),r.Tb(3,"select",11),r.ac("change",function(e){return r.tc(t),r.cc().onSortSelected(e.target.value)}),r.zc(4,T,2,3,"option",12),r.Sb(),r.Tb(5,"h5",13),r.Bc(6,"Brands"),r.Sb(),r.Tb(7,"ul",14),r.zc(8,O,2,4,"li",15),r.Sb(),r.Tb(9,"h5",13),r.Bc(10,"Types"),r.Sb(),r.Tb(11,"ul",16),r.zc(12,k,2,4,"li",15),r.Sb(),r.Qb()}if(2&t){const t=r.cc();r.Cb(4),r.ic("ngForOf",t.sortOptions),r.Cb(4),r.ic("ngForOf",t.brands),r.Cb(4),r.ic("ngForOf",t.types)}}function B(t,e){if(1&t){const t=r.Ub();r.Tb(0,"div",19),r.Tb(1,"input",20,21),r.ac("keyup.enter",function(){return r.tc(t),r.cc().onSearch()}),r.Sb(),r.Tb(3,"button",22),r.ac("click",function(){return r.tc(t),r.cc().onSearch()}),r.Bc(4,"Search"),r.Sb(),r.Tb(5,"button",23),r.ac("click",function(){return r.tc(t),r.cc().onReset()}),r.Bc(6,"Reset"),r.Sb(),r.Sb()}}function I(t,e){if(1&t&&(r.Tb(0,"div",24),r.Ob(1,"app-product-item",25),r.Sb()),2&t){const t=e.$implicit;r.Cb(1),r.ic("product",t)}}function z(t,e){if(1&t){const t=r.Ub();r.Tb(0,"div",26),r.Tb(1,"app-pager",27),r.ac("pageChanged",function(e){return r.tc(t),r.cc().onPageChanged(e)}),r.Sb(),r.Sb()}if(2&t){const t=r.cc();r.Cb(1),r.ic("pageSize",t.shopParams.pageSize)("totalCount",t.totalCount)("pageNumber",t.shopParams.pageNumber)}}let x=(()=>{class t{constructor(t){this.shopService=t,this.sortOptions=[{name:"Alphabetical",value:"name"},{name:"Price: Low to High",value:"priceAsc"},{name:"Price: Hight to Low",value:"priceDesc"}],this.shopParams=this.shopService.getShopParams()}ngOnInit(){this.getProducts(!0),this.getBrands(),this.getTypes()}getProducts(t=!1){this.shopService.getProducts(t).subscribe(t=>{this.products=t.data,this.totalCount=t.count},t=>{console.log(t)})}getBrands(){this.shopService.getBrands().subscribe(t=>{this.brands=[{id:0,name:"All"},...t]},t=>{console.log(t)})}getTypes(){this.shopService.getTypes().subscribe(t=>{this.types=[{id:0,name:"All"},...t]},t=>{console.log(t)})}onBrandSelected(t){const e=this.shopService.getShopParams();e.brandId=t,e.pageNumber=1,this.shopService.setShopParams(e),this.getProducts()}onTypeSelected(t){const e=this.shopService.getShopParams();e.typeId=t,e.pageNumber=1,this.shopService.setShopParams(e),this.getProducts()}onSortSelected(t){const e=this.shopService.getShopParams();e.sort=t,this.shopService.setShopParams(e),this.getProducts()}onPageChanged(t){const e=this.shopService.getShopParams();e.pageNumber!==t&&(e.pageNumber=t,this.shopService.setShopParams(e),this.getProducts(!0))}onSearch(){const t=this.shopService.getShopParams();t.search=this.searchTerm.nativeElement.value,t.pageNumber=1,this.shopService.setShopParams(t),this.getProducts()}onReset(){this.searchTerm.nativeElement.value="",this.shopParams=new o,this.shopService.setShopParams(this.shopParams),this.getProducts()}}return t.\u0275fac=function(e){return new(e||t)(r.Nb(d))},t.\u0275cmp=r.Hb({type:t,selectors:[["app-shop"]],viewQuery:function(t,e){if(1&t&&r.Fc(P,1),2&t){let t;r.qc(t=r.bc())&&(e.searchTerm=t.first)}},decls:11,vars:7,consts:[[1,"container","mt-3"],[1,"row"],[1,"col-3"],[4,"ngIf"],[1,"col-9"],[1,"d-flex","justify-content-between","align-items-center","pb-2"],[3,"totalCount","pageSize","pageNumber"],["class","form-inline",4,"ngIf"],["class","col-4 mb-4",4,"ngFor","ngForOf"],["class","d-flex justify-content-center ",4,"ngIf"],[1,"text-warning","ml-3","mt-4","mb-3"],[1,"custom-select","mb-4",3,"change"],[3,"selected","value",4,"ngFor","ngForOf"],[1,"text-warning","ml-3","my-2"],[1,"list-group","mb-3"],["class","list-group-item",3,"active","value","click",4,"ngFor","ngForOf"],[1,"list-group","mb-2"],[3,"selected","value"],[1,"list-group-item",3,"value","click"],[1,"form-inline"],["placeholder","Search","type","text",1,"form-control","mr-2",2,"width","300px",3,"keyup.enter"],["search",""],[1,"btn","btn-outline-primary","my-2",3,"click"],[1,"btn","btn-outline-success","ml-2","my-2",3,"click"],[1,"col-4","mb-4"],[3,"product"],[1,"d-flex","justify-content-center"],[3,"pageSize","totalCount","pageNumber","pageChanged"]],template:function(t,e){1&t&&(r.Tb(0,"div",0),r.Tb(1,"div",1),r.Tb(2,"section",2),r.zc(3,w,13,3,"ng-container",3),r.Sb(),r.Tb(4,"section",4),r.Tb(5,"div",5),r.Ob(6,"app-paging-header",6),r.zc(7,B,7,0,"div",7),r.Sb(),r.Tb(8,"div",1),r.zc(9,I,2,1,"div",8),r.Sb(),r.zc(10,z,2,3,"div",9),r.Sb(),r.Sb(),r.Sb()),2&t&&(r.Cb(3),r.ic("ngIf",e.types&&e.brands),r.Cb(3),r.ic("totalCount",e.totalCount)("pageSize",e.shopParams.pageSize)("pageNumber",e.shopParams.pageNumber),r.Cb(1),r.ic("ngIf",e.products),r.Cb(2),r.ic("ngForOf",e.products),r.Cb(1),r.ic("ngIf",e.totalCount>0))},directives:[n.m,m,n.l,f.n,f.s,v,y],styles:[".list-group-item[_ngcontent-%COMP%]{cursor:pointer;border:none;padding:10px 20px;font-size:1.1em}.list-group-item[_ngcontent-%COMP%]:focus{outline:none}.list-group-item.active[_ngcontent-%COMP%]{border-radius:10px}.list-group-item[_ngcontent-%COMP%]:not(.active):hover{color:#fff;background-color:#e95620b3;border-radius:10px}"]}),t})();var N=s("tc9g");function j(t,e){if(1&t){const t=r.Ub();r.Tb(0,"div",2),r.Tb(1,"div",3),r.Ob(2,"img",4),r.Sb(),r.Tb(3,"div",3),r.Tb(4,"h3"),r.Bc(5),r.Sb(),r.Tb(6,"p",5),r.Bc(7),r.dc(8,"currency"),r.Sb(),r.Tb(9,"div",6),r.Tb(10,"i",7),r.ac("click",function(){return r.tc(t),r.cc().decrementQuantiy()}),r.Sb(),r.Tb(11,"span",8),r.Bc(12),r.Sb(),r.Tb(13,"i",9),r.ac("click",function(){return r.tc(t),r.cc().incrementQuantiy()}),r.Sb(),r.Tb(14,"button",10),r.ac("click",function(){return r.tc(t),r.cc().addItemToBasket()}),r.Bc(15,"Add to Cart"),r.Sb(),r.Sb(),r.Sb(),r.Tb(16,"div",11),r.Tb(17,"div",12),r.Tb(18,"h4"),r.Bc(19,"Description"),r.Sb(),r.Tb(20,"p"),r.Bc(21),r.Sb(),r.Sb(),r.Sb(),r.Sb()}if(2&t){const t=r.cc();r.Cb(2),r.jc("src",t.product.pictureUrl,r.vc),r.jc("alt",t.product.name),r.Cb(3),r.Cc(t.product.name),r.Cb(2),r.Cc(r.ec(8,6,t.product.price)),r.Cb(5),r.Cc(t.quantity),r.Cb(9),r.Cc(t.product.description)}}const M=[{path:"",component:x},{path:":id",component:(()=>{class t{constructor(t,e,s,n){this.shopservice=t,this.activateRoute=e,this.bcService=s,this.basketService=n,this.quantity=1,this.bcService.set("@productDetails","")}ngOnInit(){this.loadProduct()}addItemToBasket(){this.basketService.addItemToBasket(this.product,this.quantity)}incrementQuantiy(){this.quantity++}decrementQuantiy(){this.quantity>1&&this.quantity--}loadProduct(){this.shopservice.getProduct(+this.activateRoute.snapshot.paramMap.get("id")).subscribe(t=>{this.product=t,this.bcService.set("@productDetails",t.name)},t=>{console.log(t)})}}return t.\u0275fac=function(e){return new(e||t)(r.Nb(d),r.Nb(i.a),r.Nb(N.c),r.Nb(S.a))},t.\u0275cmp=r.Hb({type:t,selectors:[["app-product-detials"]],decls:2,vars:1,consts:[[1,"container","mt-5"],["class","row",4,"ngIf"],[1,"row"],[1,"col-6"],[1,"img-fluid","w-100",3,"src","alt"],[2,"font-size","2em"],[1,"d-flex","justify-content-start","align-items-center"],[1,"fa","fa-minus-circle","text-warning","mr-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"font-weight-bold",2,"font-size","1.5em"],[1,"fa","fa-plus-circle","text-warning","mx-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"btn","btn-outline-secondary","btn-lg","ml-4",3,"click"],[1,"row","mt-5"],[1,"col-12","ml-3"]],template:function(t,e){1&t&&(r.Tb(0,"div",0),r.zc(1,j,22,8,"div",1),r.Sb()),2&t&&(r.Cb(1),r.ic("ngIf",e.product))},directives:[n.m],pipes:[n.d],styles:[""]}),t})(),data:{breadcrumb:{alias:"productDetails"}}}];let U=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.Lb({type:t}),t.\u0275inj=r.Kb({imports:[[i.g.forChild(M)],i.g]}),t})(),_=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.Lb({type:t}),t.\u0275inj=r.Kb({imports:[[n.c,c.a,U]]}),t})()}}]);