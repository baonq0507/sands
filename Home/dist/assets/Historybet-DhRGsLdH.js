import{r as v,g as J,j as p,f as Q,u as R,c as K,w as C,o as P,s as G,l as $,U as M,q as d,t as _,v as f,y as n,x as e,z as s,F as I,B as L,M as O,V as N,A as c,R as W,D as m,E as g,G as X,C as Y}from"./index-CwvAlKn0.js";import{i as V}from"./deposit-Dw15gah2.js";import{H as Z}from"./HomeOutlined-DbiD1w2U.js";const tt={id:"profile"},et={class:"info"},at={class:"info_description"},ot={class:"action_money"},st=["src"],nt=n("span",null,"Nạp tiền",-1),lt=["src"],ct=n("span",null,"Rút tiền",-1),rt={class:"navigation"},it=n("h3",{style:{color:"#ccc"}},"Lịch sử đặt cược",-1),ut={class:"result"},pt={key:0,style:{color:"red"}},dt={key:1,style:{color:"green"}},_t={key:1,style:{color:"#fff","text-align":"center"}},gt={key:2,class:"pagination"},yt={__name:"Historybet",setup(ht){const r=v(J("user")),x=v(p(r.balance)),A=v(p(r.betToday)),z=Q(),y=v([]),E=R();K(()=>E.state.cskh);const i=v({pageSize:10,showSizeChanger:!1,showQuickJumper:!1,showTotal:l=>`Total ${l} items`}),U=l=>{const t={1:"Lớn",2:"Nhỏ",3:"Lẻ",4:"Chẵn"};return l.map(a=>{var b;const h=["số đầu tiên","số thứ hai","số thứ ba","số thứ tư","số thứ năm"],k=a.betInUser.map((S,w)=>{const T=h[w]||`số thứ ${w+1}`,D=t[S.value]||`value ${S.value}`;return`${T}: ${D}`}).join(" - ");return{...a,sessionId:(b=a.betData)==null?void 0:b.id,resultSession:a.betData.betData.join(","),betInUserText:k,createAt:N(a.createdAt),amount:p(a.amount)}})},j=v(20),q=v(3);C(j,()=>{console.log("pageSize",j.value)}),C(q,()=>{console.log("current",q.value)}),P(()=>{var l;G.on(`update-balance-${r.value._id}`,t=>{x.value=p(t.balance)}),$.get("/me/profile").then(t=>{r.value=t.user}).catch(t=>{console.log(t),z.push("/login")}),$.get(`/me/historybet/${(l=r.value)==null?void 0:l._id}`).then(t=>{const a=U(t.docs);y.value=M(a),console.log(t),i.value={...i.value,total:t.totalDocs+1,pageSize:t.limit,current:t.page,showSizeChanger:!0,showQuickJumper:!0,showTotal:h=>`Tổng kết qủa ${t.totalDocs} kết quả`}}).catch(t=>{console.log(t)})});const F=async(l={})=>{var u;const t={...l},a=await $.get(`/me/historybet/${(u=r.value)==null?void 0:u._id}`,{params:t}),h=U(a.docs);y.value=M(h),i.value={...i.value,total:a.totalDocs+1,pageSize:a.limit,current:a.page,showSizeChanger:!0,showQuickJumper:!0,showTotal:k=>`Tổng kết qủa ${a.totalDocs} kết quả`}};C(r,l=>{x.value=p(l.balance),A.value=p(l.betToday)});const H=l=>{F({page:l})};return(l,t)=>{const a=d("a-avatar"),h=d("a-typography.Title"),u=d("a-space"),k=d("a-col"),b=d("a-row"),S=d("a-button"),w=d("a-divider"),T=d("a-typography-text"),D=d("a-pagination");return _(),f("div",tt,[n("div",et,[e(u,{align:"center",style:{display:"flex","justify-content":"space-around"}},{default:s(()=>[e(c(Z),{style:{color:"#fff","font-size":"25px",display:"block"},onClick:t[0]||(t[0]=o=>c(z).push("/"))}),e(a,{size:64,src:c(W)(r.value.avatar),alt:r.value.username},null,8,["src","alt"]),e(h,{style:{color:"#fff","font-size":"18px"},class:"notranslate"},{default:s(()=>[m(g(r.value.username),1)]),_:1})]),_:1})]),n("div",at,[e(b,{gutter:"10",style:{"text-align":"center","justify-content":"center"}},{default:s(()=>[e(k,{span:8},{default:s(()=>[e(u,{direction:"vertical"},{default:s(()=>[e(h,{level:"5",style:{color:"#5d636e",display:"block",height:"30px"}},{default:s(()=>[m(" Số dư tài khoản ")]),_:1}),e(h,{level:"5",style:{color:"#fff","font-size":"20px"},class:"notranslate"},{default:s(()=>[m(g(x.value),1)]),_:1})]),_:1})]),_:1})]),_:1})]),n("div",ot,[e(u,{style:{width:"100%",display:"flex","justify-content":"space-around"}},{default:s(()=>[e(S,{type:"primary",onClick:t[1]||(t[1]=o=>c(X)())},{default:s(()=>[e(u,null,{default:s(()=>[n("img",{src:c(V),alt:""},null,8,st),nt]),_:1})]),_:1}),e(S,{class:"width_draw",onClick:t[2]||(t[2]=o=>c(z).push("/withdraw"))},{default:s(()=>[e(u,null,{default:s(()=>[n("img",{src:c(V),alt:""},null,8,lt),ct]),_:1})]),_:1})]),_:1})]),e(w,{style:{height:"1px","background-color":"#ccc",margin:"0 10px"}}),n("div",rt,[it,y.value.length?(_(!0),f(I,{key:0},L(y.value,o=>(_(),f("div",ut,[n("p",null,"Phiên Id: "+g(o.betData.id),1),n("p",null,"Số đánh: "+g(o.betInUserText),1),n("p",null,"Số tiền cược: "+g(c(p)(o.amount)),1),n("p",null,[e(b,{gutter:"10",style:{"justify-content":"center","align-items":"center","align-self":"center"}},{default:s(()=>[m(" Kết quả: "),(_(!0),f(I,null,L(o.betData.betData,B=>(_(),Y(k,{span:4,key:B},{default:s(()=>[e(T,{class:"result_item2",style:{color:"#fff","font-size":"16px",display:"block","text-align":"center"}},{default:s(()=>[m(g(B),1)]),_:2},1024)]),_:2},1024))),128))]),_:2},1024)]),n("p",null,"Thời gian: "+g(c(N)(o.betData.timeEnd)),1),n("p",null,[m("Số tiền thắng cược: "),o.interest<=0?(_(),f("span",pt,g(c(p)(o.interest)),1)):(_(),f("span",dt,g(c(p)(o.interest)),1))])]))),256)):(_(),f("div",_t,"Không có kết quả")),y.value.length?(_(),f("div",gt,[e(D,{"show-size-changer":"",current:i.value.current,"onUpdate:current":t[3]||(t[3]=o=>i.value.current=o),pageSize:i.value.pageSize,"onUpdate:pageSize":t[4]||(t[4]=o=>i.value.pageSize=o),total:i.value.total,onChange:H},null,8,["current","pageSize","total"])])):O("",!0)])])}}};export{yt as default};
