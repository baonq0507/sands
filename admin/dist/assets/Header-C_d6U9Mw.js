import{i as G}from"./axios-Dkq8iht1.js";import{r as Q,L as S,o as T,b as d,c as l,d as o,w as e,e as s,h as n,i,g as U}from"./index-BIJFk_Lq.js";const j=U("div",{class:"logo"},null,-1),E={__name:"Header",props:["selectedKeys"],setup(H){const _=H,t=Q(S("profile"));return T(()=>{G.get("/me/profile").then(c=>{console.log(c),t.value=c.user,console.log(t.value.permissions.user.length)})}),(c,m)=>{const a=d("router-link"),u=d("a-menu-item"),L=d("a-menu"),z=d("a-layout-header");return l(),o(z,null,{default:e(()=>[j,t.value?(l(),o(L,{key:0,selectedKeys:_.selectedKeys,"onUpdate:selectedKeys":m[0]||(m[0]=r=>_.selectedKeys=r),theme:"dark",mode:"horizontal",style:{lineHeight:"64px"}},{default:e(()=>{var r,v,f,p,y,g,k,h,w,C,K,N,b,x,B,V,M,q;return[t.value&&((v=(r=t.value.permissions)==null?void 0:r.user)!=null&&v.includes("view"))?(l(),o(u,{key:"1"},{default:e(()=>[s(a,{to:"/"},{default:e(()=>[n("Người dùng")]),_:1})]),_:1})):i("",!0),t.value&&((p=(f=t.value)==null?void 0:f.permissions.game)!=null&&p.includes("view"))?(l(),o(u,{key:"2"},{default:e(()=>[s(a,{to:"/game"},{default:e(()=>[n("Game")]),_:1})]),_:1})):i("",!0),s(u,{key:"3"},{default:e(()=>[s(a,{to:"/profile"},{default:e(()=>[n("Đổi mật khẩu")]),_:1})]),_:1}),t.value&&((g=(y=t.value.permissions)==null?void 0:y.setting)!=null&&g.includes("view"))?(l(),o(u,{key:"4"},{default:e(()=>[s(a,{to:"/setting"},{default:e(()=>[n("Cài đặt người dùng")]),_:1})]),_:1})):i("",!0),t.value&&((h=(k=t.value.permissions)==null?void 0:k.requestMoney)!=null&&h.includes("view"))?(l(),o(u,{key:"5"},{default:e(()=>[s(a,{to:"/request-money"},{default:e(()=>[n("Quản lý nạp rút")]),_:1})]),_:1})):i("",!0),t.value&&((C=(w=t.value.permissions)==null?void 0:w.cskh)!=null&&C.includes("view"))?(l(),o(u,{key:"6"},{default:e(()=>[s(a,{to:"/cskh"},{default:e(()=>[n("Chăm sóc khách hàng")]),_:1})]),_:1})):i("",!0),t.value&&((N=(K=t.value.permissions)==null?void 0:K.userBalance)!=null&&N.includes("edit"))?(l(),o(u,{key:"7"},{default:e(()=>[s(a,{to:"/user-balance"},{default:e(()=>[n("Cộng trừ tiền")]),_:1})]),_:1})):i("",!0),t.value&&((x=(b=t.value.permissions)==null?void 0:b.inviteCode)!=null&&x.includes("view"))?(l(),o(u,{key:"8"},{default:e(()=>[s(a,{to:"/invite-code"},{default:e(()=>[n("Mã mời")]),_:1})]),_:1})):i("",!0),t.value&&((V=(B=t.value.permissions)==null?void 0:B.settingNoti)!=null&&V.includes("view"))?(l(),o(u,{key:"9"},{default:e(()=>[s(a,{to:"/setting-noti"},{default:e(()=>[n("Cài đặt thông báo")]),_:1})]),_:1})):i("",!0),t.value&&((q=(M=t.value.permissions)==null?void 0:M.game)!=null&&q.includes("view"))?(l(),o(u,{key:"10"},{default:e(()=>[s(a,{to:"/history-bet"},{default:e(()=>[n("Lịch sử đặt cược")]),_:1})]),_:1})):i("",!0),s(u,{key:"11"},{default:e(()=>[s(a,{to:"/banner"},{default:e(()=>[n("Banner")]),_:1})]),_:1})]}),_:1},8,["selectedKeys"])):i("",!0)]),_:1})}}};export{E as _};
