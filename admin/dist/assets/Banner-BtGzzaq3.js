import{_ as ue}from"./Header-C_d6U9Mw.js";import{F as re}from"./Footer-DigKJm0u.js";import{i as g}from"./axios-Dkq8iht1.js";import{e as n,I as pe,r as d,a as de,o as me,b as i,c as x,d as q,w as o,g as r,u as w,h as V,j as O,i as A,m as he,G as m,p as ge,q as fe}from"./index-BIJFk_Lq.js";import{_ as _e}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{P as M}from"./PlusCircleOutlined-2n_K5DW1.js";var ve={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M885.2 446.3l-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0060.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43l-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z"}}]},name:"inbox",theme:"outlined"};function J(c){for(var a=1;a<arguments.length;a++){var l=arguments[a]!=null?Object(arguments[a]):{},h=Object.keys(l);typeof Object.getOwnPropertySymbols=="function"&&(h=h.concat(Object.getOwnPropertySymbols(l).filter(function(_){return Object.getOwnPropertyDescriptor(l,_).enumerable}))),h.forEach(function(_){be(c,_,l[_])})}return c}function be(c,a,l){return a in c?Object.defineProperty(c,a,{value:l,enumerable:!0,configurable:!0,writable:!0}):c[a]=l,c}var S=function(a,l){var h=J({},a,l.attrs);return n(pe,J({},h,{icon:ve}),null)};S.displayName="InboxOutlined";S.inheritAttrs=!1;const f=c=>(ge("data-v-3185517f"),c=c(),fe(),c),ye={style:{background:"#fff",padding:"12px",minHeight:"calc(100vh - 170px)"}},xe=f(()=>r("h3",null,"Logo",-1)),ke=f(()=>r("h3",{style:{margin:"10px"}},"Banner",-1)),Ce=["href"],Le=["src"],we={key:1,class:"editable-row-operations"},Oe={key:0},Se=f(()=>r("a",null,"Hủy",-1)),Ie={key:1},$e=f(()=>r("a",{href:"#",style:{color:"red"}},"Xóa",-1)),Te={class:"ant-upload-drag-icon"},Ve=f(()=>r("p",{class:"ant-upload-text"}," Nhấp hoặc kéo tệp vào khu vực này để tải lên",-1)),ze=f(()=>r("p",{class:"ant-upload-hint"}," Hỗ trợ tải lên một lần ",-1)),Be={class:"ant-upload-drag-icon"},He=f(()=>r("p",{class:"ant-upload-text"}," Nhấp hoặc kéo tệp vào khu vực này để tải lên",-1)),De=f(()=>r("p",{class:"ant-upload-hint"}," Hỗ trợ tải lên một lần ",-1)),Ue={__name:"Banner",setup(c){const a=d([]),l=d({pageSize:10,showSizeChanger:!1,showQuickJumper:!1,showTotal:t=>`Total ${t} items`}),h=d(null),_=[{title:"Ảnh",dataIndex:"url",key:"url"},{title:"Vị trí",dataIndex:"position",key:"position"},{title:"Hành động",dataIndex:"operation"}],v=de({}),Q=t=>{Object.assign(a.value.filter(u=>t===u.key)[0],v[t]),console.log(v[t]);const e=he(v[t]);e.balance=e.balance.replace(/\D/g,""),g.put(`/users/${t}`,e).then(u=>{}).catch(u=>{console.log(u)}),delete v[t]},X=t=>{delete v[t]},E=t=>{g.delete(`/banner/${t}`).then(e=>{a.value=a.value.filter(u=>u._id!==t),m.msg("Xóa thành công",{icon:1,time:3e3})}).catch(e=>{console.log(e)})},k=d(null);me(()=>{g.get("/me/profile").then(t=>{h.value=t.user,g.get("/banner/").then(e=>{const u=e;a.value=u.docs,l.value={...l.value,total:e.totalDocs+1,pageSize:e.limit,current:e.page,showSizeChanger:!0,showQuickJumper:!0,showTotal:b=>`Tổng kết qủa ${e.totalDocs} kết quả`}}).catch(e=>{console.log(e)}),g.get("/logo").then(e=>{k.value=e.url}).catch(e=>{})})});const z=t=>{I.value=!0,g.get("/banner",{params:{page:t.current,limit:t.pageSize,search:t.search||""}}).then(e=>{const u=e;a.value=u.docs,l.value={...l.value,total:e.totalDocs+1,pageSize:e.limit,current:e.page,showSizeChanger:!0,showQuickJumper:!0,showTotal:b=>`Tổng kết qủa ${e.totalDocs} kết quả`},I.value=!1}).catch(e=>{console.log(e),I.value=!1})},G=t=>{z(t)};d({search:""});const I=d(!1),R=()=>{C.value=!0},C=d(!1),W=()=>{if(console.log(p.value),!p.value.url){m.msg("Vui lòng chọn ảnh",{icon:2,time:3e3});return}if(!p.value.position){m.msg("Vui lòng nhập vị trí",{icon:2,time:3e3});return}g.post("/banner",p.value).then(t=>{z({current:1,pageSize:10,search:""}),m.msg("Thêm thành công",{icon:1,time:3e3}),p.value={url:"",position:0},$.value=[]}).catch(t=>{console.log(t)}),C.value=!1},$=d([]),Y=t=>{const e=t.file.status;e!=="uploading"&&console.log(t.file,t.fileList),e==="done"?(m.msg(`${t.file.name} tải lên thành công`,{icon:1,time:2e3}),p.value.url=t.file.response.url):e==="error"&&m.msg(`${t.file.name} Lỗi tải lên`,{icon:2,time:2e3})},p=d({url:"",position:0}),B="https://api.p88hk.info/upload",Z="https://api.p88hk.info",T=t=>{if(!t)return"";const e=t.replace("public","");return console.log(e),Z+e},L=d(!1),K=()=>{L.value=!0},H=d([]),ee=t=>{const e=t.file.status;e!=="uploading"&&console.log(t.file,t.fileListLogo),e==="done"?(m.msg(`${t.file.name} tải lên thành công`,{icon:1,time:2e3}),k.value=t.file.response.url):e==="error"&&m.msg(`${t.file.name} Lỗi tải lên`,{icon:2,time:2e3})},te=()=>{if(!k.value){m.msg("Vui lòng chọn ảnh",{icon:2,time:3e3});return}g.put("/logo",{url:k.value}).then(t=>{m.msg("Thay đổi logo thành công",{icon:1,time:3e3})}).catch(t=>{console.log(t)}),L.value=!1};return(t,e)=>{const u=i("a-image"),b=i("a-col"),D=i("a-button"),U=i("a-row"),ne=i("a-typography-link"),F=i("a-popconfirm"),oe=i("a-table"),ae=i("a-layout-content"),N=i("a-upload-dragger"),le=i("a-input-number"),se=i("a-form-item"),ie=i("a-form"),P=i("a-modal"),ce=i("a-layout");return x(),q(ce,null,{default:o(()=>[n(ue,{selectedKeys:["1"]}),n(ae,{style:{padding:"20px 50px"}},{default:o(()=>[r("div",ye,[xe,n(U,null,{default:o(()=>[n(b,{span:12},{default:o(()=>[n(u,{src:T(k.value),width:"100%"},null,8,["src"])]),_:1}),n(b,{span:12,style:{"text-align":"right","margin-bottom":"10px"}},{default:o(()=>[n(D,{type:"primary",onClick:K},{default:o(()=>[n(w(M)),V(" Thay đổi logo ")]),_:1})]),_:1})]),_:1}),ke,n(U,null,{default:o(()=>[n(b,{span:12}),n(b,{span:12,style:{"text-align":"right","margin-bottom":"10px"}},{default:o(()=>[n(D,{type:"primary",onClick:R},{default:o(()=>[n(w(M)),V(" Thêm banner ")]),_:1})]),_:1})]),_:1}),h.value?(x(),q(oe,{key:0,onChange:G,columns:_,"data-source":a.value,bordered:"",pagination:l.value,scroll:{x:1500,y:700}},{bodyCell:o(({column:s,text:Fe,record:y})=>[["url"].includes(s.dataIndex)?(x(),O("a",{key:0,href:T(y.url),target:"_blank"},[r("img",{src:T(y.url),alt:"",style:{width:"200px",height:"150px"}},null,8,Le)],8,Ce)):s.dataIndex==="operation"?(x(),O("div",we,[v[y.key]?(x(),O("span",Oe,[n(ne,{onClick:j=>Q(y.key)},{default:o(()=>[V("Lưu")]),_:2},1032,["onClick"]),n(F,{title:"Bạn có muốn hủy thao thác?",onConfirm:j=>X(y.key)},{default:o(()=>[Se]),_:2},1032,["onConfirm"])])):(x(),O("span",Ie,[n(F,{title:"Bạn có muốn xóa ảnh này","ok-text":"Xóa","cancel-text":"Hủy",onConfirm:j=>E(y._id)},{default:o(()=>[$e]),_:2},1032,["onConfirm"])]))])):A("",!0)]),_:1},8,["data-source","pagination"])):A("",!0)])]),_:1}),n(re),n(P,{visible:C.value,"onUpdate:visible":e[3]||(e[3]=s=>C.value=s),title:"Thêm banner",onOk:W},{default:o(()=>[n(N,{fileList:$.value,"onUpdate:fileList":e[0]||(e[0]=s=>$.value=s),name:"file",multiple:!1,onChange:Y,action:B},{default:o(()=>[r("p",Te,[n(w(S))]),Ve,ze]),_:1},8,["fileList"]),n(ie,{layout:"vertical",model:p.value,autocomplete:"off",onFinish:t.onFinishAdd},{default:o(()=>[n(se,{label:"Vị trí",value:p.value.position,"onUpdate:value":e[2]||(e[2]=s=>p.value.position=s)},{default:o(()=>[n(le,{style:{width:"100%"},value:p.value.position,"onUpdate:value":e[1]||(e[1]=s=>p.value.position=s)},null,8,["value"])]),_:1},8,["value"])]),_:1},8,["model","onFinish"])]),_:1},8,["visible"]),n(P,{visible:L.value,"onUpdate:visible":e[5]||(e[5]=s=>L.value=s),title:"Thêm banner",onOk:te},{default:o(()=>[n(N,{fileList:H.value,"onUpdate:fileList":e[4]||(e[4]=s=>H.value=s),name:"file",multiple:!1,onChange:ee,action:B},{default:o(()=>[r("p",Be,[n(w(S))]),He,De]),_:1},8,["fileList"])]),_:1},8,["visible"])]),_:1})}}},Je=_e(Ue,[["__scopeId","data-v-3185517f"]]);export{Je as default};
