import{f as j,r as c,g as D,o as E,l as J,q as _,t as f,v as F,y as a,x as e,z as t,M as v,C as z,J as B,A as U,D as i,L as y,X as Q}from"./index-CwvAlKn0.js";import{H as X}from"./HomeOutlined-DbiD1w2U.js";const I={id:"game"},P={class:"info"},W={style:{padding:"15px"}},Y=a("div",null,"Tổng quan",-1),Z=a("div",null,"Mở 1 tài khoản",-1),ee=a("div",null,"Trực tuyến",-1),te=a("div",null,"Ngoại tuyến",-1),le=a("div",null,"Trò chơi",-1),ne=a("div",null,"Gửi và rút tiền",-1),ae=a("div",null,"Báo cáo",-1),ue={key:0,class:"content-overview"},se=a("p",null,"Kích thước nhóm",-1),ie=a("p",null,"0",-1),oe=a("p",null,"Số lượng đại lý",-1),de=a("p",null,"0",-1),re=a("p",null,"Số lượng người chơi",-1),_e=a("p",null,"0",-1),pe=a("p",null,"Độ cân bằng",-1),he=a("p",null,"0.00",-1),ge=a("p",null,"Số tiền nạp",-1),ce=a("p",null,"0",-1),fe=a("p",null,"Số tiền rút",-1),me=a("p",null,"0",-1),ve=a("p",null,"Khối lượng mua",-1),ye=a("p",null,"0",-1),ke=a("p",null,"Số lượng giải thưởng",-1),we=a("p",null,"0",-1),be=a("p",null,"Đảo ngược hoạt động",-1),Te=a("p",null,"0",-1),Fe={key:1,class:"content-new-acc"},qe=a("h4",null,"Lời khuyên:",-1),Ve=a("p",null,"1. Mật khẩu ban đầu của thành viên đã đăng ký tự động là",-1),Ce=a("p",null,"2. Để nâng cao hiệu quả hoạt động của máy chủ, hệ thống sẽ tự động xóa các tài khoản chưa nạp tiền trong một tháng hoặc chưa đăng nhập trong hai tháng và có số tiền dưới 10 tệ",-1),Ne=a("p",null,"3. Liên kết khuyến mãi cố định：",-1),Ue={key:2,class:"content-new-acc"},Se={key:3,class:"content-new-acc"},xe={key:4,class:"content-new-acc"},ze={__name:"Agency",setup(Me){const S=j(),p=c("overview"),H=c("1"),m=r=>{if(r==="report"){B.msg("Bạn không phải đại lý",{icon:2,time:2e3}),H.value="normal";return}p.value=r},d=c({typeNew:"1",numUse:"",discount:"",username:"",status:"1",code:"",startTime:"",endTine:""}),K=r=>{},x=c(D("user"));E(()=>{J.get("/me/profile").then(r=>{x.value=r.user}).catch(r=>{console.log(r),S.push("/login")})});const q=r=>{console.log("Success:",r),B.msg("Bạn không phải đại lý",{icon:2,time:2e3})},C=c("normal"),M=c("https://p88hk.info/register?ref="+x.value.inviteCode),A=c("1"),$=c("1");return(r,n)=>{const G=_("a-typography.Title"),L=_("a-space"),l=_("a-col"),o=_("a-row"),V=_("a-card"),g=_("a-input"),u=_("a-form-item"),k=_("a-button"),w=_("a-form"),N=_("a-radio-button"),R=_("a-radio-group"),O=_("a-textarea"),h=_("a-select-option"),b=_("a-select"),T=_("a-date-picker");return f(),F("div",I,[a("div",P,[e(L,{align:"center",style:{display:"flex"}},{default:t(()=>[e(U(X),{style:{color:"#fff","font-size":"25px",display:"block"},onClick:n[0]||(n[0]=s=>U(S).push("/"))}),e(G,{style:{color:"#fff","font-size":"18px"},class:"notranslate"},{default:t(()=>[i(" Trung tâm đại lý ")]),_:1})]),_:1})]),a("div",W,[e(o,{gutter:[10,10]},{default:t(()=>[e(l,{span:"6",class:y(["tabs gutter-row",{primary:p.value=="overview"}]),onClick:n[1]||(n[1]=s=>m("overview"))},{default:t(()=>[Y]),_:1},8,["class"]),e(l,{span:"6",class:y(["tabs",{primary:p.value=="newAcc"}]),onClick:n[2]||(n[2]=s=>m("newAcc"))},{default:t(()=>[Z]),_:1},8,["class"]),e(l,{span:"6",class:y(["tabs",{primary:p.value=="online"}]),onClick:n[3]||(n[3]=s=>m("online"))},{default:t(()=>[ee]),_:1},8,["class"]),e(l,{span:"6",class:y(["tabs",{primary:p.value=="ofline"}]),onClick:n[4]||(n[4]=s=>m("ofline"))},{default:t(()=>[te]),_:1},8,["class"]),e(l,{span:"6",class:y(["tabs",{primary:p.value=="game"}]),onClick:n[5]||(n[5]=s=>m("game"))},{default:t(()=>[le]),_:1},8,["class"]),e(l,{span:"6",class:y(["tabs",{primary:p.value=="money"}]),onClick:n[6]||(n[6]=s=>m("money"))},{default:t(()=>[ne]),_:1},8,["class"]),e(l,{span:"6",class:y(["tabs",{primary:p.value=="report"}]),onClick:n[7]||(n[7]=s=>m("report"))},{default:t(()=>[ae]),_:1},8,["class"])]),_:1})]),p.value==="overview"?(f(),F("div",ue,[e(o,{gutter:"10"},{default:t(()=>[e(l,{span:"24"},{default:t(()=>[e(V,{title:"Tổng quan về proxy"},{default:t(()=>[e(o,null,{default:t(()=>[e(l,{span:"12"},{default:t(()=>[se]),_:1}),e(l,{span:"12",align:"right"},{default:t(()=>[ie]),_:1})]),_:1}),e(o,null,{default:t(()=>[e(l,{span:"12"},{default:t(()=>[oe]),_:1}),e(l,{span:"12",align:"right"},{default:t(()=>[de]),_:1})]),_:1}),e(o,null,{default:t(()=>[e(l,{span:"12"},{default:t(()=>[re]),_:1}),e(l,{span:"12",align:"right"},{default:t(()=>[_e]),_:1})]),_:1}),e(o,null,{default:t(()=>[e(l,{span:"12"},{default:t(()=>[pe]),_:1}),e(l,{span:"12",align:"right"},{default:t(()=>[he]),_:1})]),_:1})]),_:1})]),_:1}),e(l,{span:"24",style:{padding:"15px"}},{default:t(()=>[e(w,null,{default:t(()=>[e(o,{gutter:"10"},{default:t(()=>[e(l,{span:"8"},{default:t(()=>[e(u,null,{default:t(()=>[e(g,{placeholder:"Thời gian bắt đầu",style:{width:"100%"}})]),_:1})]),_:1}),e(l,{span:"8"},{default:t(()=>[e(u,null,{default:t(()=>[e(g,{placeholder:"Thời gian kết thúc",style:{width:"100%"}})]),_:1})]),_:1}),e(l,{span:"8",align:"right"},{default:t(()=>[e(k,{type:"primary",style:{width:"100%"}},{default:t(()=>[e(U(Q)),i(" Hỏi thăm ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(l,{span:"24"},{default:t(()=>[e(V,{title:"Tổng quan về xổ số"},{default:t(()=>[e(o,null,{default:t(()=>[e(l,{span:"12"},{default:t(()=>[ge]),_:1}),e(l,{span:"12",align:"right"},{default:t(()=>[ce]),_:1})]),_:1}),e(o,null,{default:t(()=>[e(l,{span:"12"},{default:t(()=>[fe]),_:1}),e(l,{span:"12",align:"right"},{default:t(()=>[me]),_:1})]),_:1}),e(o,null,{default:t(()=>[e(l,{span:"12"},{default:t(()=>[ve]),_:1}),e(l,{span:"12",align:"right"},{default:t(()=>[ye]),_:1})]),_:1}),e(o,null,{default:t(()=>[e(l,{span:"12"},{default:t(()=>[ke]),_:1}),e(l,{span:"12",align:"right"},{default:t(()=>[we]),_:1})]),_:1}),e(o,null,{default:t(()=>[e(l,{span:"12"},{default:t(()=>[be]),_:1}),e(l,{span:"12",align:"right"},{default:t(()=>[Te]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])):v("",!0),p.value==="newAcc"?(f(),F("div",Fe,[e(o,{style:{"justify-content":"center"}},{default:t(()=>[e(l,{span:"22"},{default:t(()=>[e(R,{style:{"margin-bottom":"16px"},value:C.value,"onUpdate:value":n[8]||(n[8]=s=>C.value=s),onChange:K},{default:t(()=>[e(N,{value:"normal"},{default:t(()=>[i("Mở tài khoản thông thường")]),_:1}),e(N,{value:"link"},{default:t(()=>[i("Liên kết mở tài khoản")]),_:1}),e(N,{value:"linkMangaer"},{default:t(()=>[i("Quản lý liên kết")]),_:1})]),_:1},8,["value"])]),_:1})]),_:1}),C.value==="normal"?(f(),z(o,{key:0},{default:t(()=>[e(l,{span:"24"},{default:t(()=>[e(V,null,{default:t(()=>[qe,Ve,Ce,Ne,e(O,{style:{color:"#fff","background-color":"#0C192C"},value:M.value,"onUpdate:value":n[9]||(n[9]=s=>M.value=s)},null,8,["value"])]),_:1})]),_:1}),e(l,{span:"24"},{default:t(()=>[e(V,{title:"Mở tài khoản thông thường"},{default:t(()=>[e(w,{layout:"vertical",model:d.value,autocomplete:"off",onFinish:q,onFinishFailed:r.onFinishFailed},{default:t(()=>[e(u,{label:"Kiểu người chơi",name:"typeNew",rules:[{required:!0,message:"Vui lòng chọn kiểu người chơi"}]},{default:t(()=>[e(b,{value:d.value.typeNew,"onUpdate:value":n[10]||(n[10]=s=>d.value.typeNew=s)},{default:t(()=>[e(h,{value:"1"},{default:t(()=>[i("Người chơi")]),_:1}),e(h,{value:"2"},{default:t(()=>[i("Đại lý")]),_:1})]),_:1},8,["value"])]),_:1}),e(u,{label:"Tên người dùng",name:"username",rules:[{required:!0,message:"Vui lòng nhập tên người dùng"}]},{default:t(()=>[e(g,{value:d.value.numUse,"onUpdate:value":n[11]||(n[11]=s=>d.value.numUse=s)},null,8,["value"])]),_:1}),e(u,{label:"Giảm giá xổ số",name:"discount",rules:[{required:!0,message:"Vui lòng nhập nhập số lượng giảm giá"}]},{default:t(()=>[e(g,{value:d.value.discount,"onUpdate:value":n[12]||(n[12]=s=>d.value.discount=s),placeholder:"0.0-0.0"},null,8,["value"])]),_:1}),e(u,null,{default:t(()=>[e(k,{type:"primary",style:{width:"100%"},"html-type":"submit"},{default:t(()=>[i("Mở tài khoản")]),_:1})]),_:1})]),_:1},8,["model","onFinishFailed"])]),_:1})]),_:1})]),_:1})):v("",!0),C.value==="link"?(f(),z(o,{key:1},{default:t(()=>[e(l,{span:"24"},{default:t(()=>[e(V,{title:"Mở tài khoản thông thường"},{default:t(()=>[e(w,{layout:"vertical",model:d.value,autocomplete:"off",onFinish:q,onFinishFailed:r.onFinishFailed},{default:t(()=>[e(u,{label:"Kiểu người chơi",name:"typeNew",rules:[{required:!0,message:"Vui lòng chọn kiểu người chơi"}]},{default:t(()=>[e(b,{value:d.value.typeNew,"onUpdate:value":n[13]||(n[13]=s=>d.value.typeNew=s)},{default:t(()=>[e(h,{value:"1"},{default:t(()=>[i("Người chơi")]),_:1}),e(h,{value:"2"},{default:t(()=>[i("Đại lý")]),_:1})]),_:1},8,["value"])]),_:1}),e(u,{label:"Số lượng sử dụng",name:"numUse",rules:[{required:!0,message:"Vui lòng nhập số lượng sử dụng"}]},{default:t(()=>[e(g,{value:d.value.numUse,"onUpdate:value":n[14]||(n[14]=s=>d.value.numUse=s)},null,8,["value"])]),_:1}),e(u,{label:"Giảm giá xổ số",name:"discount",rules:[{required:!0,message:"Vui lòng nhập nhập số lượng giảm giá"}]},{default:t(()=>[e(g,{value:d.value.discount,"onUpdate:value":n[15]||(n[15]=s=>d.value.discount=s),placeholder:"0.0-0.0"},null,8,["value"])]),_:1}),e(u,null,{default:t(()=>[e(k,{type:"primary",style:{width:"100%"},"html-type":"submit"},{default:t(()=>[i("Mở tài khoản")]),_:1})]),_:1})]),_:1},8,["model","onFinishFailed"])]),_:1})]),_:1})]),_:1})):v("",!0)])):v("",!0),p.value==="game"?(f(),F("div",Ue,[e(w,{layout:"vertical",model:d.value,autocomplete:"off",onFinish:q,onFinishFailed:r.onFinishFailed,style:{width:"100%"}},{default:t(()=>[e(o,{gutter:"10"},{default:t(()=>[e(l,{span:"8"},{default:t(()=>[e(u,{label:"Thời gian bắt đầu",name:"startTime",rules:[{required:!0,message:"Vui lòng chọn thời gian bắt đầu"}]},{default:t(()=>[e(T,{style:{width:"100%"},placeholder:"Thời gian bắt đầu"})]),_:1})]),_:1}),e(l,{span:"8"},{default:t(()=>[e(u,{label:"Thời gian kết thúc",name:"endTime",rules:[{required:!0,message:"Vui lòng chọn thời gian kết thúc"}]},{default:t(()=>[e(T,{style:{width:"100%"},placeholder:"Thời gian kết thúc"})]),_:1})]),_:1}),e(l,{span:"8"},{default:t(()=>[e(u,{label:"Game",name:"endTime",rules:[{required:!0,message:"Vui lòng chọn loại game"}]},{default:t(()=>[e(b,{style:{width:"100%"},placeholder:"Chọn game",value:A.value,"onUpdate:value":n[16]||(n[16]=s=>A.value=s)},{default:t(()=>[e(h,{value:"1"},{default:t(()=>[i("Tất cả loại game")]),_:1})]),_:1},8,["value"])]),_:1})]),_:1}),e(l,{span:"8"},{default:t(()=>[e(u,{label:"Tình trạng đặt hàng",name:"status",rules:[{required:!0,message:"Vui lòng chọn loại game"}]},{default:t(()=>[e(b,{style:{width:"100%"},placeholder:"Chọn trạng thái",value:$.value,"onUpdate:value":n[17]||(n[17]=s=>$.value=s)},{default:t(()=>[e(h,{value:"1"},{default:t(()=>[i("Chưa có kết quả")]),_:1}),e(h,{value:"2"},{default:t(()=>[i("Đã thắng")]),_:1}),e(h,{value:"3"},{default:t(()=>[i("Đã thua")]),_:1}),e(h,{value:"4"},{default:t(()=>[i("Đã hủy")]),_:1})]),_:1},8,["value"])]),_:1})]),_:1}),e(l,{span:"8"},{default:t(()=>[e(u,{label:"Số phiên",name:"status",rules:[{required:!0,message:"Vui lòng nhập số phiên"}]},{default:t(()=>[e(g,{style:{width:"100%"},placeholder:"Số phiên"})]),_:1})]),_:1}),e(l,{span:"8"},{default:t(()=>[e(u,{label:"Mã đơn hàng",name:"code",rules:[{required:!0,message:"Vui lòng nhập mã đơn hàng"}]},{default:t(()=>[e(g,{style:{width:"100%"},placeholder:"Mã đơn hàng"})]),_:1})]),_:1}),e(l,{span:"24"},{default:t(()=>[e(u,null,{default:t(()=>[e(k,{size:"lg",type:"primary",style:{width:"100%"},"html-type":"submit"},{default:t(()=>[i("Hỏi thăm")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["model","onFinishFailed"])])):v("",!0),p.value==="online"||p.value==="ofline"?(f(),F("div",Se,[e(w,{layout:"vertical",model:d.value,autocomplete:"off",onFinish:q,onFinishFailed:r.onFinishFailed,style:{width:"100%"}},{default:t(()=>[e(o,{gutter:"10",style:{"align-content":"bottom"}},{default:t(()=>[e(l,{span:"12"},{default:t(()=>[e(u,{name:"startTime",rules:[{required:!0,message:"Vui lòng chọn thời gian bắt đầu"}]},{default:t(()=>[e(T,{style:{width:"100%"},placeholder:"Thời gian bắt đầu"})]),_:1})]),_:1}),e(l,{span:"12"},{default:t(()=>[e(u,{name:"endTime",rules:[{required:!0,message:"Vui lòng chọn thời gian kết thúc"}]},{default:t(()=>[e(T,{style:{width:"100%"},placeholder:"Thời gian kết thúc"})]),_:1})]),_:1}),e(l,{span:"12"},{default:t(()=>[e(u,{name:"username",rules:[{required:!0,message:"Vui lòng nhập tên người dùng"}]},{default:t(()=>[e(g,{style:{width:"100%"},placeholder:"Tên người dùng"})]),_:1})]),_:1}),e(l,{span:"12"},{default:t(()=>[e(u,null,{default:t(()=>[e(k,{size:"lg",type:"primary",style:{width:"100%"},"html-type":"submit"},{default:t(()=>[i("Hỏi thăm")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["model","onFinishFailed"])])):v("",!0),p.value==="money"?(f(),F("div",xe,[e(w,{layout:"vertical",model:d.value,autocomplete:"off",onFinish:q,onFinishFailed:r.onFinishFailed,style:{width:"100%"}},{default:t(()=>[e(o,{gutter:"10",style:{"align-content":"bottom"}},{default:t(()=>[e(l,{span:"8"},{default:t(()=>[e(u,{name:"startTime",rules:[{required:!0,message:"Vui lòng chọn thời gian bắt đầu"}]},{default:t(()=>[e(T,{style:{width:"100%"},placeholder:"Thời gian bắt đầu"})]),_:1})]),_:1}),e(l,{span:"8"},{default:t(()=>[e(u,{name:"endTime",rules:[{required:!0,message:"Vui lòng chọn thời gian kết thúc"}]},{default:t(()=>[e(T,{style:{width:"100%"},placeholder:"Thời gian kết thúc"})]),_:1})]),_:1}),e(l,{span:"8"},{default:t(()=>[e(u,{name:"typeMoney",rules:[{required:!0,message:"Vui lòng chọn khoản tiền"}]},{default:t(()=>[e(b,{style:{width:"100%"},placeholder:"Chọn khoản tiền"},{default:t(()=>[e(h,{value:"1"},{default:t(()=>[i("Nạp tiền")]),_:1}),e(h,{value:"2"},{default:t(()=>[i("Rút tiền")]),_:1})]),_:1})]),_:1})]),_:1}),e(l,{span:"8"},{default:t(()=>[e(u,{name:"status",rules:[{required:!0,message:"Vui lòng chọn khoản tiền"}]},{default:t(()=>[e(b,{style:{width:"100%"},placeholder:"Chọn khoản tiền"},{default:t(()=>[e(h,{value:"1"},{default:t(()=>[i("Chế biến")]),_:1}),e(h,{value:"2"},{default:t(()=>[i("Kì thi đã vượt qua")]),_:1}),e(h,{value:"3"},{default:t(()=>[i("Hủy biên")]),_:1})]),_:1})]),_:1})]),_:1}),e(l,{span:"8"},{default:t(()=>[e(u,{name:"username",rules:[{required:!0,message:"Vui lòng nhập tên người dùng"}]},{default:t(()=>[e(g,{style:{width:"100%"},placeholder:"Tên người dùng"})]),_:1})]),_:1}),e(l,{span:"8"},{default:t(()=>[e(u,{name:"stt",rules:[{required:!0,message:"Vui lòng nhập số thứ tự"}]},{default:t(()=>[e(g,{style:{width:"100%"},placeholder:"Số thứ tự"})]),_:1})]),_:1}),e(l,{span:"24"},{default:t(()=>[e(u,null,{default:t(()=>[e(k,{size:"lg",type:"primary",style:{width:"100%"},"html-type":"submit"},{default:t(()=>[i("Hỏi thăm")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["model","onFinishFailed"])])):v("",!0)])}}};export{ze as default};
