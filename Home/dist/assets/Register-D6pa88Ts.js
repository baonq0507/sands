import{a as F,r as c,f as N,o as V,l as w,q as o,t as y,v as B,y as T,x as e,z as a,J as d,C as U,D as i,E as A,M as D}from"./index-CwvAlKn0.js";const E={id:"login_wrap"},P={id:"login"},R={class:"notranslate"},J={__name:"Register",setup(S){const t=F({inviteCode:"",username:"",password:"",passwordConfirm:"",password2:"",agreeToTerms:!0}),m=c(""),x=N(),p=c(!1),h=c(!1),C=async u=>{if(p.value)return;p.value=!0,h.value=!0;const n=d.load(1);w.post("/auth/register",u).then(r=>{d.msg("Đăng ký thành công",{icon:1,time:5e3}),setTimeout(()=>{x.push("/login")},2e3)}).catch(r=>(console.log(r),r.response.status===422||r.response.status===500?d.msg(r.response.data.message,{icon:2,time:5e3}):d.msg("Đã có lỗi xảy ra, vui lòng thử lại sau",{icon:2,time:5e3}),!1)).finally(()=>{p.value=!1,h.value=!1,d.close(n)})},M=u=>{console.log("Failed:",u)};return V(()=>{console.log("mounted"),w.get("/config/get-invite-code").then(u=>{m.value=u.inviteCode})}),(u,n)=>{const r=o("a-typography-text"),v=o("a-input"),l=o("a-form-item"),g=o("a-input-password"),_=o("router-link"),b=o("a-checkbox"),q=o("a-button"),z=o("a-form");return y(),B("div",E,[T("div",P,[e(z,{model:t,name:"basic",autocomplete:"off",onFinish:C,onFinishFailed:M,style:{width:"100%"}},{default:a(()=>[m.value?(y(),U(r,{key:0,class:"ant-form-text",type:"",style:{"padding-bottom":"10px"}},{default:a(()=>[i(" Nếu không có mã đề nghị, vui lòng nhập: "),T("b",R,A(m.value),1)]),_:1})):D("",!0),e(l,{name:"inviteCode",rules:[{required:!0,message:"Vui lòng nhập mã mời"}]},{default:a(()=>[e(v,{value:t.inviteCode,"onUpdate:value":n[0]||(n[0]=s=>t.inviteCode=s),size:"large",placeholder:"Mã mời"},null,8,["value"])]),_:1}),e(l,{name:"username",rules:[{required:!0,message:"Tên đăng nhập không được để trống"},{min:6,message:"Tên đăng nhập phải có ít nhất 6 ký tự"},{max:20,message:"Tên đăng nhập không được quá 20 ký tự"},{pattern:/^[a-zA-Z0-9]+$/,message:"Tên đăng nhập chỉ chứa ký tự và số"}]},{default:a(()=>[e(v,{value:t.username,"onUpdate:value":n[1]||(n[1]=s=>t.username=s),size:"large",placeholder:"Tên đăng nhập"},null,8,["value"])]),_:1}),e(l,{name:"password",rules:[{required:!0,message:"Mật khẩu không được để trống"},{min:6,message:"Mật khẩu phải có ít nhất 6 ký tự"}]},{default:a(()=>[e(g,{value:t.password,"onUpdate:value":n[2]||(n[2]=s=>t.password=s),size:"large",placeholder:"Mật khẩu",autocomplete:"new-password"},null,8,["value"])]),_:1}),e(l,{name:"passwordConfirm",rules:[{required:!0,message:"Vui lòng xác nhận mật khẩu"},{min:6,message:"Mật khẩu phải có ít nhất 6 ký tự"},{validator:(s,f,k)=>{console.log(f,t.password),f!==t.password?k("Mật khẩu không khớp"):k()}}]},{default:a(()=>[e(g,{value:t.passwordConfirm,"onUpdate:value":n[3]||(n[3]=s=>t.passwordConfirm=s),size:"large",placeholder:"Xác nhận mật khẩu"},null,8,["value"])]),_:1},8,["rules"]),e(l,{name:"password2",rules:[{required:!0,message:"Mật khẩu rút tiền không được để trống"},{min:6,message:"Mật khẩu rút tiền phải có ít nhất 6 ký"}]},{default:a(()=>[e(g,{value:t.password2,"onUpdate:value":n[4]||(n[4]=s=>t.password2=s),size:"large",placeholder:"Mật khẩu rút tiền"},null,8,["value"])]),_:1}),e(_,{to:"/login"},{default:a(()=>[i("Đăng nhập với tài khoản đã có")]),_:1}),e(l,{name:"agreeToTerms",valuePropName:t.agreeToTerms,rules:[{required:!0,message:"Vui lòng đồng ý với điều khoản"}]},{default:a(()=>[e(b,{checked:t.agreeToTerms,"onUpdate:checked":n[5]||(n[5]=s=>t.agreeToTerms=s)},{default:a(()=>[i(" Tôi đồng ý với "),e(_,{href:"#"},{default:a(()=>[i("điều khoản ")]),_:1}),i(" của trang web này ")]),_:1},8,["checked"])]),_:1},8,["valuePropName"]),e(l,null,{default:a(()=>[e(q,{type:"primary","html-type":"submit",style:{width:"100%"}},{default:a(()=>[i(" Đăng ký ")]),_:1})]),_:1})]),_:1},8,["model"])])])}}};export{J as default};
